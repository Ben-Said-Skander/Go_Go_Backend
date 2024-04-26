const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.route("/").get(postController.getAllPosts);
router.route("/:id").delete(postController.deletePost);
router.route("/:id").delete(postController.deletePost);
router.route("/").post(postController.createNewPost);

module.exports = router;
