const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imageSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  data: {
    type: Buffer,
    required: false,
  },
  contentType: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("Image", imageSchema);
