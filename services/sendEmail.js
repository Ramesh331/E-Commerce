const nodemailer = require("nodemailer");

const sendEmail = async (options) =>{
    var transporter = nodemailer.createTransport({
        service : 'gmail',
        secure : false,
        port : 587,
        auth:{
            user:process.env.USER_EMAIL,
            pass : process.env.USER_PASSWORD 
        }
    })
    
    const mailOptions = {
    from : "Momo company <momo@gmail.com>",
    to : options.email,
    subject :options.subject,
    text : options.message
}

    try {
        await transporter.sendMail(mailOptions)
    }
    catch (error){
        console.error("something went wrong",error)
    }
    

}


module.exports = sendEmail