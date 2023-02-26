require("dotenv").config();
const express = require("express");
const app = express();
//const cors = require("cors");
//const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
//const verifyJWT = require("./middleware/verifyJWT");
//const cookieParser = require("cookie-parser");
const uploadFiles = require("./middleware/uploadFiles");
//const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3600;
const hostname = "192.168.101.161";

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
app.use(uploadFiles);
// routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
//app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use("/blog", require("./routes/blog"));
app.use("/user", require("./routes/user"));
app.use("/medicines", require("./routes/medicine"));
app.use("/pharmacies", require("./routes/pharmacy"));
app.use("/image", require("./routes/upload"));
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, hostname, () =>
    console.log(`Server running at http://${hostname}:${PORT}`)
  );
});
