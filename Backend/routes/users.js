const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { StatusCodes } = require('http-status-codes');

router.get("/getall", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await User.find({})
    res.status(StatusCodes.OK).send(data)
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
