const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const { sendEmail } = require("../middleware/email");

const SignUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    sendEmail(
      email,
      "Registration Successful",
      "You received this email as you are just registered with the IssueStack, Welcome to the IssueStack community!"
    );
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const currentDate = new Date();
    sendEmail(email, "Login Successful", `Last Login time: ${currentDate}`);
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Send a forgot password email to the user
const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    const URL = `https://csci5709-web-project.netlify.app/reset-password?token=${resetToken}`;
    sendEmail(
      email,
      "Reset Password",
      `To reset your password please follow the below link, it is valid till 10 minutes only. ${URL}`
    );

    user.resetToken = resetToken;
    await user.save();

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Reset the user's password
const ResetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Verify the reset token and find the user
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the reset token is valid
    if (user.resetToken && user.resetToken != null) {
      // Generate a salt and hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      user.resetToken = null;
      await user.save();
    } else {
      return res
        .status(401)
        .json({ message: "Reset Password link is expired." });
    }

    sendEmail(user.email, "Reset Password", `Password reset successfully.`);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get user information
const UserInfo = async (req, res) => {
  try {
    // Extract the user ID from the JWT token
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find the user based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user information excluding sensitive data like password
    res.json({
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // Include additional fields as needed
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Update the user's password
const UpdatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    // Extract the user ID from the JWT token
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find the user based on the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the current password with the user's password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    sendEmail(
      user.email,
      "Password Update Successful",
      `Your password has been updated successfully. You are getting this email because you have updated your password. If you did not make this change, please contact your Admin immediately.`
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  UserInfo,
  UpdatePassword,
};
