const User = require("../models/User");
const bcrypt = require("bcrypt");
const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
  console.log(users);
};

const deleteUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.params.id });
  res.json(result);
  console.log(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
  console.log(user);
};
const updateName = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "ID parameter is required." });
    }

    const user = await User.findOne({ _id: req.params?.id }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `No User matches ID ${req.body.id}.` });
    }
    if (req.body?.fullname) {
      user.fullname = req.body.fullname;
      const result = await user.save();
      res.json(result);
      res.status(200).json({ message: `Name changed with sucess.` });
    } else {
      res.status(404).json({ message: `Name Required ${req.body.id}.` });
    }
  } catch (error) {
    console.log(error);
  }
};
const updateEmail = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "ID parameter is required." });
    }

    const user = await User.findOne({ _id: req.params?.id }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `No User matches ID ${req.body.id}.` });
    }

    if (req.body?.email) {
      user.email = req.body.email;

      const result = await user.save();
      res.json(result);
      res.status(200).json({ message: `Email changed with sucess.` });
    } else {
      res.status(404).json({ message: `Email Required ${req.body.id}.` });
    }
  } catch (error) {
    console.log(error);
  }
};
const updatePhone = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "ID parameter is required." });
    }

    const user = await User.findOne({ _id: req.params?.id }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `No User matches ID ${req.body.id}.` });
    }

    if (req.body?.phoneNumber) {
      user.phoneNumber = req.body.phoneNumber;

      const result = await user.save();
      res.json(result);
      res.status(200).json({ message: `Phone Number changed with sucess.` });
    } else {
      res
        .status(404)
        .json({ message: `Phone Number Required ${req.body.id}.` });
    }
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "ID parameter is required." });
    }
    const user = await User.findOne({ _id: req.params?.id }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `No User matches ID ${req.body.id}.` });
    }
    if (req.body?.password) {
      const hashedPwd = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPwd;
      const result = await user.save();
      res.json(result);
      res.status(200).json({ message: `Password changed with sucess.` });
    } else {
      res
        .status(404)
        .json({ message: `New Password Required ${req.body.id}.` });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  updateName,
  updateEmail,
  updatePhone,
  updatePassword,
};
