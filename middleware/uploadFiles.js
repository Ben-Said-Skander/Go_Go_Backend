const express = require("express");
const app = express();
//middleware that make u store files in the server
const multer = require("multer");

//configuring the middleware multer
const upload = multer({
  limits: {
    fileSize: 60000000,
  },
  // cb call back function : called if there is an error
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    //first parametre : error , boolean : if the request should be accepted
    cb(undefined, true);
  },
});

module.exports = { upload };
