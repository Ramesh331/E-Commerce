const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const sendEmail = require("../../services/sendEmail")

exports.registerUser = async (req,res)=>{
    const {email,password,phoneNumber,userName} = req.body
    if(!email || !password || !phoneNumber || !userName){
        res.status(200).json({
            message : "provide email,password,username,phoneNumber"
        })
    }
    // check if the user already exists 
    const userFound  = await User.find({userEmail : email})
    if(userFound.length > 0){
        return res.status(400).json({
            message : " user already exists"
        })
    }
    await User.create({
        userEmail : email,
        userPhoneNumber : phoneNumber,
        userName : userName,
        userPassword : bcrypt.hashSync(password,8)
    })
    res.status(200).json({
        message : "User registered successfully!"
    })
}




exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.res(400).json({
            message : "provide email and password"
        })
    }
    // check whether the email exists or not
    const userFound = await User.find({userEmail : email})
    if(userFound.length == 0 ) {
        return res.status(404).json({
            message : "User is not registered"
        })
    }

    // passwordd checking
    const isMatched = bcrypt.compareSync(password,userFound[0].userPassword)

    if(isMatched){
        //generate token of password
        const token = jwt.sign({id:userFound[0]._id},process.env.SECRET_KEY,{
            expiresIn : "30d"
        })

        res.status(200).json({
            message: "user logged in successfully",
            token
        })
    }
    else{
        res.status(404).json({
            message : "Invalid Password"
        })
    }
}


exports.forgotPassword = async (req,res)=>{
    const {email} = req.body
    if(!email){
        return res.status(400).json({
            message : "please send email"
        })
    }
    const userExist = await User.find({userEmail:email})
    if(userExist.length == 0){
        return res.status(400).json({
            message : "Email is not registered"
        })
    }
    
    // send otp to that email
    const otp = otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false})
     userExist[0].otp = otp
     userExist[0].save()
    await sendEmail({
        email : "rameshadhikari579@gmail.com",
        subject : "RESET password 2",
        message : `Your OTP is "${otp}" . Don't share with anyone.}` 
    })

    res.json({
        message : "OTP sent successful"
    })

}



    exports.verifyOtp = async (req,res) =>{
        const {email,otp} = req.body
        if(!email || !otp){
            return res.status(400).json({
                message : "please provide email,otp"
            })
        }
        // check if that otp is correct or not for that email
        const userExists =  await User.find({userEmail : email})
        if(userExists.length == 0){
            return res.status(400).json({
                message : "email is not registered"
            })
        }
        if(userExists[0].otp !== otp){
            res.status(400).json({
            message : "Invalid  OTP "
            })
        }else{
            // dispose the otp so it cant be used next time
            userExists[0].otp = undefined
            userExists[0].isOtpVerified = true
            userExists[0].save()
            res.status(200).json({
                message : "OTP is correct"
            })
        }
    }


    exports.resetPassword = async (req,res) =>{
        const {email,newPassword,confirmPassword} = req.body
        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message : "provide password and confirm password"
            })
        }
    
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message : "Password doesn't match"
            })
        }
        let userExist = await User.find({userEmail:email})
        if(userExist.length == 0){
            return res.status(400).json({
                message : "user Email not registered"
            })
        }
        if(!userExist[0].isOtpVerified){
            return res.status(400).json({
                message : "You cannot perform this action"
            })
        }
        userExist[0].password = bcrypt.hashSync(newPassword,8)
        userExist[0].isOtpVerified = false
        userExist[0].save()
        res.status(200).json({
            message:"Password reset successfully"
        })
    }