const Image = require("../models/Image");

const uploadImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  console.log(req.file); // Log the contents of req.file to the console

  const image = new Image({
    data: req.file.buffer,
    contentType: req.file.mimetype
  });

  image.save((err) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(201).send({ message: 'Image uploaded successfully' });
  });
};

module.exports = uploadImage;
