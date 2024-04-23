const Post = require("../models/Post");


const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(204).json({ message: "No Posts found" });
  res.json(posts);
  console.log(posts);
};

const getPost = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Post ID required" });
  const Post = await Post.findOne({ _id: req.params.id }).exec();
  if (!Post) {
    return res
      .status(204)
      .json({ message: `Post ID ${req.params.id} not found` });
  }
  res.json(Post);
  console.log(Post);
};

const createNewPost = async (req, res) => {
  if (!req?.body?.driverName || !req?.body?.driverCar || !req?.body?.destination) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const result = await Post.create({
      driverName: req.body.driverName,
      driverCar: req.body.driverCar,
      destination: req.body.destination,
    });

    res.status(201).json(result);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

const deletePost = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Post ID required" });
  const Post = await Post.findOne({ _id: req.params.id }).exec();
  if (!Post) {
    return res
      .status(204)
      .json({ message: `Post ID ${req.params.id} not found` });
  }
  const result = await Post.deleteOne({ _id: req.params.id });
  res.json(result);
  console.log(result);
};



module.exports = {
  getAllPosts,
  getPost,
  createNewPost,
  deletePost
};
