const mongoose = require("mongoose")
const Schema = mongoose.Schema
const productSchema = new Schema({
    productName: {
        type : String,
        required : [true,"productName required"]
    },
    productDescription :{
        type : String,
        required : [true,"productDescription required"]
    },
    productStockQty : {
        type : Number,
        required : [true,"productQty required"]
    },
    productPrice : {
        type :Number,
        required :[true,"Product price required"]
    },
    productStatus : {
        type : String,
        enum : ["available","notAvailable"]
    }
},{
    timestamps : true
})

const Product = mongoose.model("Product",productSchema)
module.exports = Product