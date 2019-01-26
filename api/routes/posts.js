const express = require("express");
const passport = require("passport");
const router = express();
const posts = require("../controllers/postsController/posts");

// @route   POST api/posts/
// @desc    Create or Update Posts
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  posts.create
);

// @route   GET api/posts/
// @desc    Get All Posts
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), posts.getAll);

// @route   GET api/posts/
// @desc    Get a Post by Id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  posts.getById
);

// @route   DELETE api/posts/:id
// @desc    Delete a post by Id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  posts.deleteRecord
);

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  posts.likePost
);

// @route   POST api/posts/unLike/:id
// @desc    unLike a post
// @access  Private
router.post(
  "/unLike/:id",
  passport.authenticate("jwt", { session: false }),
  posts.unLikePost
);

// @route   POST api/posts/comment/:id
// @desc    Add a comment to a post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  posts.addComment
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove a comment from a post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  posts.removeComment
);

module.exports = router;
