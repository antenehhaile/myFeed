const express = require("express");
const passport = require("passport");
const router = express();
const profile = require("../controllers/profileController/profile");

// @route   GET api/profile
// @desc    Get Current User Profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profile.getCurrentUserProfile
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Private
router.get(
  "/handle/:handle",
  passport.authenticate("jwt", { session: false }),
  profile.getProfileByHandle
);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Private
router.get(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  profile.getProfileByUserId
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Private
router.get(
  "/get",
  passport.authenticate("jwt", { session: false }),
  profile.getAllProfiles
);

// @route   POST api/profile
// @desc    Create/Update User Profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profile.createOrUpdateProfile
);

// @route   POST api/profile/experience
// @desc    Add Experience
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  profile.addExperience
);

// @route   POST api/profile/education
// @desc    Add Education
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  profile.addEducation
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete Experience
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  profile.deleteExperience
);

// @route   DELETE api/profile/education/:educ_id
// @desc    Delete Education
// @access  Private
router.delete(
  "/education/:educ_id",
  passport.authenticate("jwt", { session: false }),
  profile.deleteEducation
);

// @route   DELETE api/profile
// @desc    Delete Profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  profile.deleteProfile
);
module.exports = router;
