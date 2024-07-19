const User = require("../Models/userModel");
const Otp = require("../Models/OTP");
const Profile = require("../Models/profileModel");


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendVerification = require("../Utils/sendMailer");
const { passwordUpdated } = require("../mailTemplates/updatePasswordTemp");

exports.sendOtp = async(req, res) =>{
    try{
        // fetching email from db
        const { email } = req.body;

        // chechking it in db
        const ress = await User.findOne({email});

        if(ress){
            return res.status(401).json({
                success:false,
                message:"User already exist"
            });
        }

        // generate otp 
        var generatedOtp = await otpGenerator.generate(6, {digits:true, specialChars:false, lowerCaseAlphabets:false, upperCaseAlphabets:false});

        // check if it is already present in the db or not 
        var checkOtp = await Otp.findOne({otp:generatedOtp});
        
        while(checkOtp){

        var generatedOtp = await otpGenerator.generate(6, {digits:true, specialChars:false, lowerCaseAlphabets:false, upperCaseAlphabets:false});
            checkOtp = await Otp.findOne({otp:generatedOtp});

        }

        // console.log("Otp generated "+ generatedOtp);

        var otpPayload = { email, otp:generatedOtp}; 
        const otpsaved = await Otp.create(otpPayload);

        console.log(otpsaved);

        res.status(200).json({
            success:true,
            message:"Otp generated succesfully",
            data:otpsaved
        })


    }catch(error){
        console.log("Error is in Auth Signup page ", error);
        return res.status(200).json({
            success:false,
            message:"Can't send otp try again later",
            data:error
        })
    }
}


// sign up controller 

exports.signup = async(req,res) =>{
    try{
        // fetching all details from the request 
        const {firstname, lastname, email, password, confirmPassword, accountType, phone ,otp } = req.body;

        // validations 
        if(!firstname || !lastname || !email || !password ||!confirmPassword || !accountType || !otp){
            return res.status(403).json({
                success:false,
                message:"fill all details"
            })
        }
        
        //  then check password and confirm password 
        if(password != confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password does not match ",
            })
        }
        
        // check user is already registered or not 
        const emailFind = await User.findOne({email});

        if(emailFind){
            return res.status(405).json({
                success:false,
                message:"Email already registered ",
            })
        }

        // fetch recent otp
        const recentOtp = await Otp.findOne({email:email}).sort({createdAt : -1}).limit(-1);

        // console.log(recentOtp);
        // validate otp 
        if(!recentOtp){
            return res.status(400).json({
                success:false,
                message:"Otp not found"
            })
        }
        else if(recentOtp.otp != otp){
              return res.status(400).json({
                success:false,
                message:"Otp not matched"
              })
        }

        // send data into db
        const hashedPassword = await bcrypt.hash(password, 10);

        const additinalData = await Profile.create({
            gender:null,
            dob:null,
            about:null,
            phone:phone,
        })

        const userDetails = await User.create({
            firstname,
            lastname, 
            email,
            password:hashedPassword,
            accountType,
            additonalDetail: additinalData._id,
            img:`https://api.dicebear.com/8.x/initials/svg?seed=${firstname} ${lastname}`,
            profile_public_id:null

        })
        // .populate("additonalDetail").exec();


        return res.status(200).json({
            success:true,
            message:"User registered succesfully",
            userDetails
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error occured while sign up",
            data: error.message
        })
    }
}

exports.login = async(req,res) =>{
    try{
        const {email, password} = req.body;
        
        // valid email or password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Enter all details properly"
            })
        }

        //user check exist or not 
        const user = await User.findOne({email}).populate("additonalDetail");

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User is not registered",
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email : user.email,
                role: user.accountType,
                id: user._id
            }
            // generate token
            const token = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            })

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 *60* 1000),
                httpOnly: true,
              }

            // save token into cookie
              
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully"
            });
            
        }
        else{
            return res.status(400).json({
                success:false,
                message:'Password is incorrect'
            })
        }
    }catch(error){
        return res.status(500).json({
            message:"Error occured while login",
            error:error.message
        })
    }
}

// change password 
exports.changePassword = async(req,res) =>{
    try{
        const {oldPassword, newPassword, confirmPassword} = req.body;

        const userDetails = await User.findById(req.user.id);

        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Fill all fields properly"
            })
        }

        if(newPassword != confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password does not matched"
            })
        }

        
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );

        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Password does not matched"
            })
        };

        // encrypt and change the password 
        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
          req.user.id,
          { password: encryptedPassword },
          { new: true }
        )

        //send notification mail 
        const sendMail = await sendVerification(updatedUserDetails.email, "Password for your courseRace account has been changed",
            passwordUpdated(email, req.user.firstname)
        )

        return res.status(200).json({
            success:true,
            message:"Passwrd has been changed",
            updatedUserDetails
        })


    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in changing password",
            error
        })
    }
}