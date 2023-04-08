require("dotenv").config();
const express = require("express");
const app = express();
var multer = require("multer");
//const cors = require("cors");
//const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
//const credentials = require("./middleware/credentials");
const Image = require("./models/Image");
const Blog = require("./models/Blog");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 3600;
const hostname = "192.168.1.15";

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Check if the req origin is the same as allowed origin or not
//app.use(credentials);

// Cross Origin Resource Sharing   :  check if the front end is allowed to access the api if not bloke it
//app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/blog", require("./routes/blog"));
app.use("/user", require("./routes/user"));
app.use("/medicines", require("./routes/medicine"));
app.use("/pharmacies", require("./routes/pharmacy"));
app.use("/user/forgotPassword", require("./routes/resetPassword"));
// Get the image
app.use("/image", require("./routes/image"));

//Post an image
const createNewBlogWithImage = async (req, res, userId) => {
  if (
    !req?.body?.title ||
    !req?.body?.category ||
    !req?.body?.body ||
    !req?.body?.userId ||
    !req?.file
  ) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const image = await Image.create({
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    const result = await Blog.create({
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      userId: req.body.userId, // Add userId to the new blog
      imageId: image._id,

    });

    res.status(201).json(result);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};


app.post("/images",  upload.single("image"), async (req, res) => {
  try {
    //const userId = req.userId; // Get userId from the request object

    // Call the controller with the userId parameter
    await createNewBlogWithImage(req, res);
  } catch (err) {
    console.error(err);
  }
});
//middleware to verify jwt when sending req
app.use(verifyJWT);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, hostname, () =>
    console.log(`Server running at http://${hostname}:${PORT}`)
  );
});
