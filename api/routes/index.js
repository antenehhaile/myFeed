const express = require("express");
const router = express();
const usersRoutes = require("./users");
const profileRoutes = require("./profile");
const postsRoutes = require("./posts");

//User Controller Routes
router.use("/users", usersRoutes);

//Profile Controller Routes
router.use("/profile", profileRoutes);

//Posts Controller Routes
router.use("/posts", postsRoutes);

module.exports = router;
