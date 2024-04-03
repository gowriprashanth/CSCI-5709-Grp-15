const Attachment = require("../models/Attachment");
const Ticket = require("../models/Ticket");
const Team = require("../models/Team");
const fs = require("fs");

const getAllMembers = async (req, res) => {
  try {
    return await Team.findOne({ _id: req.params.id }, { members: 1 });
  } catch (error) {
    console.error("error error error", error);
    return { message: "Server error" };
  }
};

module.exports = {
  getAllMembers,
};
