const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { fullname, password, email, phone_number } = req.body;
  if (!fullname || !password || !email || !phone_number)
    return res.status(400).json({
      message: "Username , Email ,Phone Number and password are required.",
    });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ fullname: fullname }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      fullname: fullname,
      password: hashedPwd,
      email: email,
      phone_number: phone_number,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${fullname} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
