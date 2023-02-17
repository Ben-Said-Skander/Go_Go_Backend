const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: int,
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
