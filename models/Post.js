const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Post", postSchema);