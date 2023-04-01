require("dotenv").config();
const express = require("express");
const app = express();
var multer = require("multer");
const upload = multer();
//const cors = require("cors");
//const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
//const verifyJWT = require("./middleware/verifyJWT");
//const cookieParser = require("cookie-parser");
//const credentials = require("./middleware/credentials");

const uploadImage = require("./middleware/uploadImage");
const Image = require("./models/Image");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3600;
const hostname = "192.168.1.14";

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
//app.use(cookieParser());
//app.use(verifyJWT);

// routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
//app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use("/blog", require("./routes/blog"));
app.use("/user", require("./routes/user"));
app.use("/medicines", require("./routes/medicine"));
app.use("/pharmacies", require("./routes/pharmacy"));
// Get the image
app.use("/image", require("./routes/image"));

/*
app.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.send(images);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});
*/
//Post an image
app.post("/images", upload.single("image"), uploadImage);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, hostname, () =>
    console.log(`Server running at http://${hostname}:${PORT}`)
  );
});
