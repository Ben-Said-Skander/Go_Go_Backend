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

async function getAllImages(req, res) {
  try {
    const images = await Image.find();
    const Image = await Promise.all(images.map(async (image) => {
      const stream = bucket.openDownloadStream(mongoose.Types.ObjectId(image.gridFSId));
      const buffer = await new Promise((resolve, reject) => {
        let chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
      });
      return {
        id: image.id,
        contentType: image.contentType,
        data: buffer.toString('base64')
      };
    }));
    res.json(imageModels);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

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
