const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);

    //OR

    // let body = req.body;
    // const createUser = await User.create(body);
    // res.json({
    //   status: true,
    //   message: "successfully registered",
    // });
  } catch (e) {
    debugger;
    console.log(e);
    if (e.message.includes("duplicate")) {
      res.status(404).json({ message: "duplicate user name", status: false });
    } else {
      res.status(404).json(e);
    }
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); //FINDING THE USER
    !user && res.status(404).json("Worng username or password");

    const validated = await bcrypt.compare(req.body.password, user.password); //VALIDATING PASSWORD
    !validated && res.status(404).json("Worng username or password");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (e) {
    res.status(404).json(e);
  }
});

module.exports = router;
