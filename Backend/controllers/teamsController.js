const Attachment = require("../models/Attachment");
const Ticket = require("../models/Ticket");
const Team = require("../models/Team");
const fs = require("fs");

const createTeam = async (data) => {
  const { id, name, description, order, isDeleted, members } = data.data;
  try {
    const team = await Team.create({
      id: id,
      name: name,
      description: description,
      order: order,
      isDeleted: isDeleted,
      members: members,
    });
    return (data.message = "Team created successfully");
  } catch (err) {
    console.log(err);
    return (data.message = "Failed to create team");
  }
};

const getAllTeams = async (req, res) => {
  try {
    return await Team.find({});
  } catch (error) {
    console.log(error);
    return error;
  }
};

const markDelete = async (teamId) => {
  const updatedTeam = await Team.findByIdAndUpdate(
    teamId,
    { isDeleted: true },
    { new: true }
  );
  if (!updatedTeam) {
    return { message: "Team not found" };
  }
  return {
    message: "Team marked as deleted successfully",
    team: updatedTeam,
  };
};

const updateTeam = async (teamId, data) => {
  try {
    const update = data;
    const updatedTeam = await Team.findByIdAndUpdate(teamId, update, {
      new: true,
    });
    if (!updatedTeam) {
      return { message: "Team not found" };
    }
    return { message: "Team updated successfully", team: updatedTeam };
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  markDelete,
  updateTeam,
};
