const Attachment = require("../models/Attachment");
const Ticket = require("../models/Ticket");
const Team = require("../models/Team");
const User = require("../models/User");
const { storeNotificationToIndividualUser } = require("./NotificationController")

const fs = require("fs");

const getAllMembers = async (req, res) => {
  try {
    if (req.query?.populate == "true") {
      return await Team.findOne({ _id: req.params.id }, { members: 1 }).populate("members");
    } else {
      return await Team.findOne({ _id: req.params.id }, { members: 1 });
    }
  } catch (error) {
    console.error("error error error", error);
    return { message: "Server error" };
  }
};

const addMember = async (teamId, userId) => {
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return { message: "Team not found" };
    }

    const user = await User.findById(userId);
    if (!user) {
      return { message: "User not found" };
    }

    await Team.findByIdAndUpdate(teamId, { $push: { members: user._id } });
    storeNotificationToIndividualUser(user.email, `You have been added to ${team.name} team`)
    return { message: "Member added successfully" };
  } catch (error) {
    return { message: error.message };
  }
};

const deleteMember = async (teamId, memberId) => {
  try {
    const team = await Team.findByIdAndUpdate(
      teamId,
      { $pull: { members: memberId } },
      { new: true }
    );
    
    if (!team) {
      return { message: "Team not found" };
    }
    const user = await User.findById(memberId);

    storeNotificationToIndividualUser(user.email, `You have been removed from ${team.name} team`)

    return { message: "Member removed successfully", team: team };
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  getAllMembers,
  addMember,
  deleteMember,
};
