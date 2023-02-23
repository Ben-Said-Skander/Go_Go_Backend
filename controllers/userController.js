const User = require("../models/User");

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
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.body.id}.` });
  }
  if (req.body?.fullname) user.fullname = req.body.fullname;

  const result = await user.save();
  res.json(result);
};
const updateEmail = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.body.id}.` });
  }

  if (req.body?.email) user.email = req.body.email;

  const result = await user.save();
  res.json(result);
};
const updatePhone = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.body.id}.` });
  }

  if (req.body?.phone_number) user.phone_number = req.body.phone_number;

  const result = await user.save();
  res.json(result);
};

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  updateName,
  updateEmail,
  updatePhone,
};
