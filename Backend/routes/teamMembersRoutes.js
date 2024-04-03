const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const teamMemberController = require("../controllers/teamMembersController");
const User = require("../models/User");
const Team = require("../models/Team");

router.get("/:id", async (req, res, next) => {
  try {
    const teams = await teamMemberController.getAllMembers(req, res);
    if (!teams) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/add-member", async (req, res) => {
  try {
    const teamId = req.params.id;
    const userId = req.body.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Team.findByIdAndUpdate(teamId, { $push: { members: user._id } });

    res.status(200).json({ message: "Member added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
