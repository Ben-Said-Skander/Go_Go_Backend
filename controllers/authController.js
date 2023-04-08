const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    // create JWTs
    res.status(200).json({ success: `User ${email} is logged in!` });
    console.log("Response status code:", res.statusCode);
    console.log(match);
  } else {
    res.sendStatus(401);
  }
};


// Login with JWT
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
     
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      //httpOnly: true,
      //secure: false,
      //sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Set the access token as a response header
    res.setHeader('Authorization', `Bearer ${accessToken}`);

    // Send authorization access token to user
    res.json({ userId: foundUser._id });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin, login };
