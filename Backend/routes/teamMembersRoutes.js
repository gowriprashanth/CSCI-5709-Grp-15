const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const teamMemberController = require("../controllers/teamMembersController");
const User = require("../models/User");
const Team = require("../models/Team");

router.post("/:id/add-member", async (req, res) => {
  try {
    const teamId = req.params.id;
    const userId = req.body.userId;

    const team = await teamMemberController.addMember(teamId, userId);

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json(team);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const teams = await teamMemberController.getAllMembers(req, res);
    if (!teams) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(teams.members);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id/members/:memberId", async (req, res) => {
  try {
    const teamId = req.params.id;
    const memberId = req.params.memberId;

    const team = await teamMemberController.deleteMember(teamId, memberId);

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
