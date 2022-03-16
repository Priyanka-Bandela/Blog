const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(404).json(e.message);
      //   console.log(e.message);
    }
  } else {
    res.status(401).json("You can update only your account");
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username }); //TO DELETE POST ALSO

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("User has been deleted...");
      } catch (e) {
        res.status(404).json(e);
      }
    } catch (e) {
      res.status(403).json("user not found");
    }
  } else {
    res.status(401).json("You can Delete only your account");
  }
});

//GET USER

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (e) {
    res.status(404).json(e);
  }
});

module.exports = router;
