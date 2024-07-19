const mongoose = require("mongoose");
const sendVerification = require("../Utils/sendMailer");
const otpTemplate = require("../mailTemplates/otpVerificationMail");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60,  
    }
})

otpSchema.pre("save", async function(next){
    await sended(this.email, this.otp);
    next();
})

async function sended(email, otp){
    try{
        let sendOtp = await sendVerification(email, "Verification mail from CourseUs ", otpTemplate(otp));
        console.log("Email sended succssfully ", sendOtp);
    }catch(error){
        console.log("Error while sending otp ", error)
        throw error;
    }
}

module.exports = mongoose.model("OTP", otpSchema);