const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const get = require("lodash/get");
const set = require("lodash/set");
const has = require("lodash/has");
const isUndefined = require("lodash/isUndefined");
const { isEmpty } = require("../../../utils/common");

//Load models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const {
  validateProfileInput,
  validateExperience,
  validateEducation
} = require("./validation");

const getCurrentUserProfile = (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user._id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

const getProfileByHandle = (req, res) => {
  //Grab the handle from the URL
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

const getProfileByUserId = (req, res) => {
  //Grab the handle from the URL
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      errors.profile = "There is no profile for this user";
      res.status(404).json(errors);
    });
};

const getAllProfiles = (req, res) => {
  //Grab the handle from the URL
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      errors.profile = "There are no profiles";
      res.status(404).json(errors);
    });
};

const createOrUpdateProfile = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) set(profileFields, "handle", req.body.handle);
  if (req.body.company) set(profileFields, "company", req.body.company);
  if (req.body.website) set(profileFields, "website", req.body.website);
  if (req.body.location) set(profileFields, "location", req.body.location);
  if (req.body.bio) set(profileFields, "bio", req.body.bio);
  if (req.body.status) set(profileFields, "status", req.body.status);
  if (req.body.githubUsername)
    set(profileFields, "githubUsername", req.body.githubUsername);
  if (has(req.body, "skills")) {
    set(profileFields, "skills", get(req, "body.skills", "").split(","));
  }
  if (req.body.youtube) set(profileFields, "social.youtube", req.body.youtube);
  if (req.body.facebook)
    set(profileFields, "social.facebook", req.body.facebook);
  if (req.body.instagram)
    set(profileFields, "social.instagram", req.body.instagram);
  if (req.body.twitter) set(profileFields, "social.twitter", req.body.twitter);
  if (req.body.linkedin)
    set(profileFields, "social.linkedin", req.body.linkedin);

  Profile.findOne({ user: req.user._id })
    .then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: get(req, "user.id") },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create
        Profile.findOneAndUpdate({
          handle: get(profileFields, "handle")
        }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          ///Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    })
    .catch(err => res.status(404).json(errors));
};

const addExperience = (req, res) => {
  const { errors, isValid } = validateExperience(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: get(req, "user.id") }).then(profile => {
    const newExperience = {
      title: get(req, "body.title"),
      company: get(req, "body.company"),
      location: get(req, "body.location"),
      from: get(req, "body.from"),
      to: get(req, "body.to"),
      current: get(req, "body.current"),
      description: get(req, "body.description")
    };

    //Add to the experience array
    profile.experience.unshift(newExperience);
    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => {
        res.status(404).json({ error: "Error saving the Job experience" });
      });
  });
};

const addEducation = (req, res) => {
  const { errors, isValid } = validateEducation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: get(req, "user.id") }).then(profile => {
    const newEducation = {
      school: get(req, "body.school"),
      degree: get(req, "body.degree"),
      fieldOfStudy: get(req, "body.fieldOfStudy"),
      from: get(req, "body.from"),
      to: get(req, "body.to"),
      current: get(req, "body.current"),
      description: get(req, "body.description")
    };

    //Add to the experience array
    profile.education.unshift(newEducation);
    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => {
        res.status(404).json({ error: "Error saving the Education Inputs" });
      });
  });
};

const deleteExperience = (req, res) => {
  Profile.findOne({ user: get(req, "user.id") }).then(profile => {
    if (
      isUndefined(
        get(profile, "experience", []).find(e => e.id === req.params.exp_id)
      )
    ) {
      res.status(404).json({
        error: `There is no experience record with an id ${req.params.exp_id}`
      });
    }
    set(
      profile,
      "experience",
      get(profile, "experience", []).filter(e => e.id !== req.params.exp_id)
    );
    //Save Profile
    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => {
        res.status(404).json({ error: "Error deleting the Experience item" });
      });
  });
};

const deleteEducation = (req, res) => {
  Profile.findOne({ user: get(req, "user.id") }).then(profile => {
    if (
      isUndefined(
        get(profile, "education", []).find(e => e.id === req.params.educ_id)
      )
    ) {
      res.status(404).json({
        error: `There is no education record with an id ${req.params.educ_id}`
      });
    }
    set(
      profile,
      "education",
      get(profile, "education", []).filter(e => e.id !== req.params.educ_id)
    );
    //Save Profile
    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => {
        res.status(404).json({ error: "Error deleting the Education item" });
      });
  });
};

const deleteProfile = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    res.json({ sucess: true });
  });
};

module.exports = {
  getCurrentUserProfile,
  getProfileByHandle,
  getProfileByUserId,
  getAllProfiles,
  createOrUpdateProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteProfile
};
