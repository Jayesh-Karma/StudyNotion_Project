

const express = require("express");
const router = express.Router();


const { auth, isStudent } = require("../Middlewares/authe");
const { capturePayment, verifyPayment, paymentMail } = require("../Controllers/paymentController");

// paymenty routes 
router.post("/capture-payment", auth, isStudent, capturePayment);
router.post("/verifySignature"  , auth,isStudent ,verifyPayment);
router.post("/sendPaymentMail", auth, isStudent, paymentMail);



module.exports = router;