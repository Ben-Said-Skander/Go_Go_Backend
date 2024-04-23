const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://maryemtayeb:OdmDnK0czdgksPQB@cluster0.w0lp418.mongodb.net/test", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDB;

// FXpIPsEsxdcZr3H2
