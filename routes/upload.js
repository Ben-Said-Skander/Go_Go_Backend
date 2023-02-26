const express = require("express");
const sharp = require("sharp");
const router = express.Router();
const upload = require("../middleware/uploadFiles");

//single function that required a String ( upload a single file)
router.route.post("/", upload.single("upload"), async (req, res) => {
  try {
    // req.file  : getting the data    ; sharp to resize the data and saves it using toFile(it takes the filepath as an argument)
    await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toFile(__dirname + `/images/${req.file.originalname}`);
    res.status(201).send("Image uploaded succesfully");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
module.exports = router;
