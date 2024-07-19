const mongoose = require("mongoose");

const ratingReview = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:String,
    },
    review:{
        type:String
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        index:true,
    }
})

module.exports = mongoose.model("Ratings", ratingReview);