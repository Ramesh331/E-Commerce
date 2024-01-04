const restrictTo = (...roles)=>{
    return(req,res,next)=>{
        const userRole = req.user.role
        if(!roles.includes(userRole)){
            res.status(403).json({
                message : "You Dont have permission for this Action."
            })
        }else{
            next()
        }
    }
}


module.exports = restrictTo