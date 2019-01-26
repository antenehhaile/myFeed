const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const get = require("lodash/get");
const set = require("lodash/set");
const has = require("lodash/has");
const isUndefined = require("lodash/isUndefined");
const { isEmpty } = require("../../../utils/common");
const { validatePost } = require("./validation");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const create = (req, res) => {
  const { errors, isValid } = validatePost(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: get(req, "body.text"),
    name: get(req, "body.name"),
    avatar: get(req, "body.avatar"),
    user: get(req, "user.id")
  });
  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err));
};

const getAll = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ noPostFound: "No posts found posts" })
    );
};

const getById = (req, res) => {
  Post.findById(get(req, "params.id"))
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({
        noPostFound: `No post found with id ${get(req, "params.id")}`
      })
    );
};

const deleteRecord = (req, res) => {
  Profile.findOne({ user: get(req, "user.id") }).then(profile => {
    Post.findById(get(req, "params.id"))
      .then(post => {
        //Check if the user is the creator to allow delting posts
        if (get(post, "user").toString() !== get(req, "user.id")) {
          return res.status(401).json({ noAuthorized: "User not authorized" });
        }

        //Delete the post
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({
          postNotFound: `No post found with id ${get(req, "params.id")}`
        })
      );
  });
};

const likePost = (req, res) => {
  Profile.findOne({ user: get(req, "user.id") }).then(profile => {
    Post.findById(get(req, "params.id"))
      .then(post => {
        //Check if the user has already liked the post
        if (
          !isUndefined(
            get(post, "likes").find(
              l => l.user.toString() === get(req, "user.id")
            )
          )
        ) {
          return res
            .status(400)
            .json({ alreadyLiked: "You have aleady liked this post" });
        }
        post.likes.unshift({ user: get(req, "user.id") });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: "No post found" }));
  });
};

const unLikePost = (req, res) => {
  Profile.findOne({ user: get(req, "user.id") }).then(profile => {
    Post.findById(get(req, "params.id"))
      .then(post => {
        //Check if the user has already liked the post
        if (
          isUndefined(
            get(post, "likes").find(
              l => l.user.toString() === get(req, "user.id")
            )
          )
        ) {
          return res
            .status(400)
            .json({ alreadyLiked: "You have not yet liked this post" });
        }
        set(
          post,
          "likes",
          get(post, "likes", []).filter(
            l => l.user.toString() !== get(req, "user.id")
          )
        );
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: "No post found" }));
  });
};

const addComment = (req, res) => {
  const { errors, isValid } = validatePost(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Post.findById(get(req, "params.id")).then(post => {
    const newComment = {
      text: get(req, "body.text"),
      name: get(req, "body.name"),
      avatar: get(req, "body.avatar"),
      user: get(req, "user.id")
    };
    post.comments.unshift(newComment);
    post
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json({ postNotFound: "Post not found" }));
  });
};

const removeComment = (req, res) => {
  Post.findById(get(req, "params.id")).then(post => {
    if (
      isUndefined(
        get(post, "comments", []).find(
          c => c.id.toString() === get(req, "params.comment_id")
        )
      )
    ) {
      res.status(404).json({ commentNotExists: "Comment does not exist" });
    }

    set(
      post,
      "comments",
      get(post, "comments", []).filter(
        c => c.id.toString() !== get(req, "params.comment_id")
      )
    );
    post
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json({ postNotFound: "Post not found" }));
  });
};
module.exports = {
  create,
  getAll,
  getById,
  deleteRecord,
  likePost,
  unLikePost,
  addComment,
  removeComment
};
