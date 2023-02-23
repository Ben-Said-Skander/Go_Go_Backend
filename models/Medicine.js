const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  interval: {
    type: String,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Medicine", medicineSchema);
//Mrp2M6iKuNEyCcmU
