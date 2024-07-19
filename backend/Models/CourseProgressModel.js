const mongoose = require("mongoose");
const Course = require("./CourseModel");
const User = require("./userModel");


const courseProgressSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    completedVideo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subsection"
    }]
})

module.exports = mongoose.model("CourseProgress", courseProgressSchema);

