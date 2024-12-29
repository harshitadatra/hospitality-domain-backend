const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userId: String,
    name: String,
    address: String,
    email: String,
    phoneNo: Number,
    password: String,
    userBooking: Array,
})
const hotelSchema = new mongoose.Schema({
    HotelName: String,
    Description: String,
    Amenities: String,
    PhoneNo: Number,
    Address: String,
    Reviews: Array
})

const bookingSchema = new mongoose.Schema({
    BookingId: String,
    StartDate: Date,
    EndDate: Date,
    NoOfPersons: Number,
    NoOfRooms: Number,
    TypeOfRoom: String

})
const userModel = mongoose.model("user", userSchema);
const hotelModel = mongoose.model("hotel",hotelSchema);
const bookingModel = mongoose.model("booking",bookingSchema)
module.exports = {userModel,hotelModel,bookingModel}