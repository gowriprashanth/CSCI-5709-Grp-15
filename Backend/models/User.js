/**
 * @author Bhautik Koshiya
 */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Employee"],
    required: true,
  },
  teamLead: [
    {
      type: mongoose.ObjectId,
      ref: "Team",
      default: [],
    },
  ],
  resetToken: String,
});

module.exports = mongoose.model("User", userSchema);
