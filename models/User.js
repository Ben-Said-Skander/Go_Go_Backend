const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  roles: {
    User: {
      type: Number,
      default: 5150,
    },
    Editor: Number,
    Admin: Number,
  },
});
module.exports = mongoose.model("User", userSchema);
