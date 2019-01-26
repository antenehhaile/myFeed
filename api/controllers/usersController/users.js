const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
const passport = require("passport");
const { validateRegistration, validateLogin } = require("./validation");
const get = require("lodash/get");
const set = require("lodash/set");

const register = (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: get(req, "body.email") }).then(user => {
    if (user) {
      set(errors, "email", "Email already Exists");
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(get(req, "body.email"), {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: get(req, "body.name"),
        email: get(req, "body.email"),
        avatar,
        password: get(req, "body.password")
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          set(newUser, "password", hash);
          return newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

const login = (req, res) => {
  const email = get(req, "body.email");
  const password = get(req, "body.password");

  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Find the User
  User.findOne({ email }).then(user => {
    //Check for User
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    //Check the password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ msg: "Success" });
        const tokenPayload = {
          id: get(user, "id"),
          name: get(user, "name"),
          avatar: get(user, "avatar")
        };
        // Sign Token
        jwt.sign(
          tokenPayload,
          keys.secret,
          { expiresIn: 360000 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

module.exports = {
  register,
  login
};
