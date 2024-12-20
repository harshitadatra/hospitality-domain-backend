const mongoose = require('mongoose')
const userSchema =  new mongoose.Schema({
    userId :String,
    name:String,
    address: String,
    email:String,
    phoneNo :Number,
    password:String,
    userBooking:Array,
})

const userModel = mongoose.model("user",userSchema);
module.exports = userModel