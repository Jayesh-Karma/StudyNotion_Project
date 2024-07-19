const nodemailer = require("nodemailer");
require("dotenv").config();


const sendVerification = async(email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            auth:{
                user: process.env.USER, 
                pass: process.env.PASS
            }
        })
       
        // console.log("Reached sendMailer") 

        const info = await transporter.sendMail({
            from: `Create Courses log`,
            to: email,
            subject:`${title}`,
            html: `${body}`
        })
        return info;
    }
    catch(error){
        console.log("Error occured while sending mail ", error);
        throw error;
    }
}

module.exports = sendVerification;