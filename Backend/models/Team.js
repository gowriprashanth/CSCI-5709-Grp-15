/**
 * @author Kuldeep Gajera
 */

const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  members: [
    {
      type: mongoose.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Team", TeamSchema);
