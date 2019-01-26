const express = require("express");
const router = express();
const users = require("../controllers/usersController/users");

// // @route   POST api/user/register
// // @desc    Register User
// // @access  Public
router.post("/register", users.register);

// // @route   GET api/user/login
// // @desc    Login User / Returns JWT Token
// // @access  Public
router.post("/login", users.login);

module.exports = router;
