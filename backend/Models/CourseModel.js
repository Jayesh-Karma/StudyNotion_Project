const mongoose = require("mongoose");

const courseSchema  = new mongoose.Schema({
    courseName:{
        type:String,

    },
    courseDescription:{
        type:String,

    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    whatWillYouLearn:{
        type:String,

    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ratings"
    }],
    price:{
        type:String,
    },
    thumbnail:{
        type:String
    },
    thumbnail_publicId:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    tags:{
        type:[String], 
        required:true
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }        ],
    instructions:{
        type:[String]
    },
    status:{
        type:String,
        enum:["Draft", "Published"]
    }
})


module.exports = mongoose.model("Course",courseSchema);