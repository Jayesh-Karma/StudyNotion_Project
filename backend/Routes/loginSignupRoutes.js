const express = require("express");
const { signup, login, changePassword, sendOtp } = require("../Controllers/AuthSignup");
const {auth, isStudent, isInstructor} = require("../Middlewares/authe.js");
const { updateProfile, deleteAccount, uploadImg, getEnrolledCourses } = require("../Controllers/additionalDetaillController.js");
const { resetPasswordToken, resetPassword } = require("../Controllers/resetPassword.js");
const { instructorDashboard } = require("../Controllers/instructorDashboardController");

const router = express.Router();

//login coutes 
router.post("/create-account", signup);
router.post("/login", login);
router.post("/changePassword",auth, changePassword);
router.post("/sendotp", sendOtp);


router.put('/update-user-details', auth, updateProfile);
router.put('/update-img', auth, uploadImg);
router.get('/get-enrolled-courses', auth, isStudent, getEnrolledCourses);
router.delete('/delete-user', auth, deleteAccount)

router.post('/resetPassword', resetPasswordToken);
router.post('/update-password', resetPassword);


router.use("/instructorDashboard", auth, isInstructor, instructorDashboard);


module.exports = router;