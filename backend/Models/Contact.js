const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    },
    message:{
        type:String
    },
    countryCode:{
        type:Number,
    }

})

module.exports = mongoose.model("ContactUs", contactUsSchema);