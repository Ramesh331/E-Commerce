const Product = require("../../../model/productModel")

exports.createProduct = async (req,res)=>{
    const {productName,productDescription,productPrice,productStatus,productStockQty} = req.body
    if(!productName || !productDescription || !productPrice || !productStatus  || ! productStockQty){
        return res.status(400).json({
            message :"Provide all the information "
        })
    }

    //insert into the product Colleciton
    await Product.create({
        productName,
        productDescription,
        productPrice,
        productStockQty,
        productStatus
    })
    res.status(200).json({
        message : "product created successfully"
    })

}