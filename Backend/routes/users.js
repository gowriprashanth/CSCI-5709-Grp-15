const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

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

router.put("/teamLead/:memberId", async (req, res) => {
  const userId = req.params.memberId;
  const newTeamLeadId = req.body.teamLead;
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $push: { teamLead: newTeamLeadId } }
    );
  } catch (error) {
    console.error("Error updating team lead:", error);
  }

  res.json({
    message: `Team ${userId} updated with new team leads`,
    teamLead: newTeamLeadId,
  });
});

router.delete("/removeTeamLead/:userId/:teamId", async (req, res) => {
  try {
    const { userId, teamId } = req.params;
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { teamLead: teamId } }
    );

    if (result.nModified > 0) {
      res.status(200).json({ message: "Team lead removed successfully." });
    }
    //  } else {
    //    res.status(404).json({ message: 'User or team ID not found.' });
    //  }
  } catch (error) {
    console.error("Error removing team lead:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/getTeamLead/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId, "teamLead");
    if (user) {
      res.status(200).json({ teamLead: user.teamLead });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error fetching team lead:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(StatusCodes.OK).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
