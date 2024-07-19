const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected successfully");
    }catch(error){
        console.log(error)
        console.error("Problem in connecting database");
        process.exit(1);
    }
} 