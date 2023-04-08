const Image = require("../models/Image");
var multer = require("multer");
//const upload = multer();

//********************************** */
const getPicture = async (req, res) => {
  Image.findById(req.params.id, (err, image) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    if (!image) {
      return res.status(404).send({ message: "Image not found" });
    }

    res.set("Content-Type", image.contentType);
    res.send(image.data);
  });
};

const getAllImages = async (req, res) => {
  try {
    // Find all images in the GridFS bucket
    const images = await Image.find();
    // Map the images to a new array with only the necessary data
    const imageData = images.map((image) => ({
      id: image._id,
      contentType: image.contentType,
      data: image.data.toString("base64"),
    }));
    console.log(imageData)
    // Send the imageData as the response
    res.send(imageData);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//********************************** */
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  console.log(req.file); // Log the contents of req.file to the console

  const image = new Image({
    data: req.file.buffer,
    contentType: req.file.mimetype,
  });

  image.save((err) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(201).send({ message: "Image uploaded successfully" });
  });
};

module.exports = { getAllImages, uploadImage, getPicture };
