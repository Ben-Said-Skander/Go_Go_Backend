const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  drugs: {
    type: Map,
    of: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("Pharmacy", pharmacySchema);
