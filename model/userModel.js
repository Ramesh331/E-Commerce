const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    userEmail : {
        type : String,
        required : [true, "e-mail is needed"]
    },
    userName : {
        type : String,
        required : [true,"username required"]
    },
    userPhoneNumber : {
        type:Number,
        required :[true,"PhoneNumber is needed"]
    },
    userPassword : {
        type:String,
        required :[true,"Password is needed"]
    },
    role : {
        type : String,
        enum : ["customer","admin"],
        default : "customer"
    },
    otp : {
        type : String
    },
    isOtpVerified : {
        type : Boolean,
        default : false
    }
}) 

const User = mongoose.model("User", userSchema )
module.exports = User