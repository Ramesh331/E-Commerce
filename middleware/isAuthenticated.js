const jwt = require("jsonwebtoken")
const User = require("../model/userModel")
const promisify = require("util").promisify

const isAuthenticated = async(req,res,next)=>{
    const token = req.headers.authorization
    if(!token){
        res.status(400).json({
            message : "Please Login"
        })
    }
    const decoded = jwt.verify(token,process.env.SECRET_KEY,(err,success)=>{
        if(err){
            res.status(400).json({
                message :"Invalid Token"
            })
        }else{
            res.status(200).json({
                message : "valid Token"
            })
        }
    })

     
// alternative
try {
    // const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
    const doesUserExist = await User.findOne({_id : decoded.id})
    if(! doesUserExist){
      return res.status(400).json({
          message : "User doesn't exists with that token/id"
      })
    }
    req.user = doesUserExist
    next()
}catch(err){
    res.status(400).json({
        message : err.message
    })
}
      // check if decoded id exists in user Table


}


module.exports = isAuthenticated