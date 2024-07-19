const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstname :{
        type:String,
        required:true,
        trim:true
    },
    lastname :{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Student", "Instructor", "Admin"]
    },
    additonalDetail:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    img:{
        type:String,
    },
    profile_public_id:{
        type:String
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseProgress'
    }],
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    }

});

module.exports = mongoose.model('User', userSchema);
