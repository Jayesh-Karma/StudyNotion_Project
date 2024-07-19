const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({

    gender:{
        type:String,
    },
    dob:{
        type:String,
    },
    about:{
        type:String,
        trim:true
    },
    phone:{
        type:String,
        trim:true

    }


})


module.exports = new mongoose.model("Profile", profileSchema);