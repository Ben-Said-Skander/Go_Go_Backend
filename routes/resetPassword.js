const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");
const User = require("../models/User");
router.route("/").post(async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const verificationCode = function generateVerificationCode() {
    const code = Math.random().toString(36).substring(6); // generate a random string of 6 characters
    return code.toUpperCase(); // convert the code to uppercase for consistency
  };
  user.verificationCode = verificationCode;
  await user.save();
  res.status(200).json({ message: `Email sent with sucess.` });

  resetPasswordController.sendPasswordResetEmail(email, verificationCode);

  res.send("Email sent");
});
module.exports = router;
