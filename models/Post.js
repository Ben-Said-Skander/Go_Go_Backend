const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  driverName: {
    type: String,
    required: true,
  },
  driverCar: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);