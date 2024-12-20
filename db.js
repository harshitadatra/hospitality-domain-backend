const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;
// console.log("DB_URL", DB_URL);
//  mongoose.connect('mongodb+srv://harshit22:Hk7YJZ8C1D18PQgv@cluster0.erwxsd6.mongodb.net/hospitality-domain')
 mongoose.connect(DB_URL)



 const connectDB = () => {
    mongoose
      .connect(DB_URL)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));
  };
  
  module.exports = connectDB;