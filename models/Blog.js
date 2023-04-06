const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  
  imageId: {
    type: Schema.Types.ObjectId,
    ref: "Image",
  
  },
});

module.exports = mongoose.model("Blog", blogSchema);
