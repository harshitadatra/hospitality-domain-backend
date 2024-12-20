const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;
 mongoose.connect(DB_URL)



 const connectDB = () => {
    mongoose
      .connect(DB_URL)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));
  };
  
  module.exports = connectDB;