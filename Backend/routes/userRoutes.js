/**
 * @author Bhautik Koshiya
 */
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/signup", UserController.SignUp);
router.post("/signin", UserController.SignIn);
router.post("/forgotPassword", UserController.ForgotPassword);
router.post("/resetPassword", UserController.ResetPassword);
router.post("/update-password", UserController.UpdatePassword);
router.get("/user-info", UserController.UserInfo);

module.exports = router;
