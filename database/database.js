const mongoose = require("mongoose")
const User = require("../model/userModel")

exports.connectDatabase = async()=>{
    await  mongoose.connect(process.env.MONGO_URI)
console.log("database Connected Successfully")

//admin seeding

const isAdminExists = await User.findOne({userEmail:"admin@gmail.com"})
if(!isAdminExists){
    await User.create({
        userEmail : "admin@gmail.com",
        userPassword : "admin",
        userPhoneNumber : "9812121212",
        userName : "admin",
        role : "admin"
    
    })
    console.log("admin seeded")
}else{
    console.log("admin already exists")
}
}