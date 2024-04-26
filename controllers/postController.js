const Post = require("../models/Post");


const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(204).json({ message: "No Posts found" });
  res.json(posts);
  console.log(posts);
};

const createNewPost = async (req, res) => {
  if (!req?.body?.fullname || !req?.body?.carModel || !req?.body?.destination) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const result = await Post.create({
      fullname: req.body.fullname,
      carModel: req.body.carModel,
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
    return res.status(400).json({ message: "User ID required" });
  const post = await Post.findOne({ _id: req.params.id }).exec();
  if (!post) {
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
  createNewPost,
  deletePost
};
