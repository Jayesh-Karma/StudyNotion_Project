const ContactUs = require("../Models/Contact");
const sendVerification = require("../Utils/sendMailer");
const { contactUsEmail } = require("../mailTemplates/contactUs");

exports.createContactUs = async(req,res) =>{
    try{
        //fetch from body
        const {firstname, lastname, email, phone, message, countryCode} = req.body;

        //valdation
        if(!firstname || !lastname || !email || !phone || !countryCode|| !message){
            return res.status(400).json({
                success:false,
                message:"Fill all the fields properly"
            })
        }

        //send data into database 
        const responce = await ContactUs.create({   
            firstname, lastname, email, phone, message, countryCode
        })

        if(!responce){
            return res.status(400).json({
                success:false,
                message:"Error in sendding data into database "
            })
        }

        //send mails 
       const sendMailToSupport = await sendVerification(email, "Thankyou for contacting us", contactUsEmail(email, firstname, lastname,  message, phone));
       const sendMailToUser = await sendVerification("jayeshexternal@gmail.com", "Thankyou for your contacting us", `Thankyou ${firstname} for your valueale feedback`)

       if(!sendMailToSupport || !sendMailToUser){
        return res.status(500).json({
            success:false,
            message:"unable to send mails"
        })
    }
        return res.status(200).json({
            success:true,
            message:"Thankyou for contacting us",
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error Try again later",
            error:error.message
        })
    }
}