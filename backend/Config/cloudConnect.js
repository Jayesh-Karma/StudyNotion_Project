const cloudinary = require("cloudinary").v2;
require("dotenv").config();          

exports.cloudify = async() =>{
    try{
    
       await cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });
    console.log("Cloudinary connected succesfully");
}
catch(error){
    console.log("Error in connecting with cloud "+error);
}
    
}