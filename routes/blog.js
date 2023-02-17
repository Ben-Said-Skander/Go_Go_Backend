const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.route("/").get(blogController.getAllBlogs);

router.route("/:id").delete(blogController.deleteBlog);
router.route("/:id").get(blogController.getBlog);
router.route("/id").post(blogController.createNewBlog);
module.exports = router;
