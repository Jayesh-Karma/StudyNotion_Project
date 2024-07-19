const Razorpay = require("razorpay");

require("dotenv").config();

//creating instance 
exports.instance = new Razorpay({
    key_id: process.env.Razorpay_id,
    key_secret: process.env.Razorpay_Secret
})