const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  id: {
    type: String,
    required: false,
  },
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
});
module.exports = mongoose.model("Blog", blogSchema);
