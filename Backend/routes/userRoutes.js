const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController")

router.post("/signup", UserController.SignUp);
router.post("/signin", UserController.SignIn);
router.post("/forgotPassword", UserController.ForgotPassword)
router.post("/resetPassword", UserController.ResetPassword)

module.exports = router;