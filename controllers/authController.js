const User = require("../models/User");
const bcrypt = require("bcrypt");


const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
   
    res.status(200).json({ success: `User ${email} is logged in!` });
    console.log("Response status code:", res.statusCode);
    console.log(match);
  } else {
    res.sendStatus(401);
  }
};




module.exports = { handleLogin };
