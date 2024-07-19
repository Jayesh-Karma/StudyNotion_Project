const User = require('../Models/userModel');
const sendVerification = require('../Utils/sendMailer');
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async(req,res) =>{
    try{
        // fatching email
        const email = req.body.email;
        //validating email
        const verifyEmail = await User.findOne({email});
        if(!verifyEmail){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist"
            })
        }

        // generate token
        const token = crypto.randomUUID();
        // update token into user database
        
        const savedToken = await User.findOneAndUpdate(
            {email},
            {token:token,
            resetPasswordExpires:Date.now() + 5*60*1000},
            {new:true});

        // create url
        const url = `http://localhost:5173/update-password/${token}`

        // send mail
        await sendVerification(email, "Password Reset link", `Password reset link : ${url}`);

        // return res
        return res.status(200).json({
            success:true,
            message:"Reset password link is sended to your email"
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Something went wrong try again later',
            error: error
        })
    }
}

exports.resetPassword = async(req,res) =>{
    try{
        // we are sending password, comfirm pw and token from frontend into request body
        const { password, confirmPassword, token} = req.body;

        // validate data 
        if(!password || !confirmPassword || !token){
            return res.status(400).json({
                success:false,
                message:"Please enter all fields"
            })    
        }
        //chec pw and confirm pw
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password are not matching please enter them carefully"
            })    
        }

        // check user int odb
        const searchUser = await User.findOne({token:token});

        if(!searchUser){
            return res.status(400).json({
                success:false,
                message:"User does not exist "
            })
        }
// check toek is whether expire or not 
        if(searchUser.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token expired , try again"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const updateUser = await User.findOneAndUpdate(
            {token:token},
        {token:token,
        password:hashedPassword},
        {new:true});

        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong try again later",
            error:error
        })
    }
}