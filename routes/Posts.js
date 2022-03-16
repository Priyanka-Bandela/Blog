const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (e) {
    res.status(404).json(e);
  }
});

//UPDATE POST

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (e) {
        res.status(403).json(e);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (e) {
    res.status(403).json("user not found");
  }
});

//DELETE POST

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete(req.params.id);
        res.status(200).json("post has been deleted...");
      } catch (e) {
        res.status(403).json(e);
      }
    } else {
      res.status(401).json("You can delete only your account");
    }
  } catch (e) {
    res.status(403).json("user not found");
  }
});

//GET POST

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (e) {
    res.status(404).json(e);
  }
});

//GETALL POST

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let post;

    if (username) {
      post = await Post.find({ username });
    } else if (catName) {
      post = await Post.find({ categories: { $in: [catName] } });
    } else {
      post = await Post.find(post);
    }
    res.status(200).json;
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json(e);
  }
});

module.exports = router;
