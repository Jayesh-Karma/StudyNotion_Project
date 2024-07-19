const { default: mongoose } = require("mongoose");
const {instance} = require("../Config/razorpayConnect");
const Course = require("../Models/CourseModel");
const User = require("../Models/userModel");
const sendVerification = require("../Utils/sendMailer");
const { courseEnrollmentEmail } = require("../mailTemplates/courseEnroll");
const { paymentSuccessEmail } = require("../mailTemplates/PaymentSucessfullEmail");
// const mongoose = require("mongoose");
require("dotenv").config()
const crypto = require("crypto");
const CourseProgressModel = require("../Models/CourseProgressModel");
// This is the latest version and this will run for multiple orders 
exports.capturePayment =  async(req,res) =>{
    // fetch courses from frontend 
    const {courses} = req.body;
    // attach user id from request 
    const user_id = req.user.id;

    // check and validate
    if(courses.length === 0){
        return res.status(200).json({
            success:false,
            message:"Please provide Course id"   
        })
    }

    // count total amount of courses
    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(400).json({ success:false, message:"course not found"})
            }

            const u_id = new mongoose.Types.ObjectId(user_id);

            if(course.studentsEnrolled.includes(u_id)){
                return res.status(400).json({
                    success:false,
                    message:"Student is already enrolled"
                })
            }

            totalAmount += course.price;

        }
        catch(error){
            return res.status(400).json({
                success:false,
                message:"Can't make payment",
                error:error.message
            })
        }
    }


    const options = {
        amount : totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString()
    }

    try{
        const paymentResponce = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponce
        })
    }
    catch(error){
        console.log(error  )
        return res.status(400).json({
            success:false,
            message:"Can't make payment",
            error:error.message
        })
    }
}


exports.verifyPayment =  async(req,res) =>{
    const razorpay_order_id = req?.body?.razorpay_order_id;
    const razorpay_payment_id = req?.body?.razorpay_payment_id;
    const razorpay_signature = req?.body?.razorpay_signature;
    const courses = req?.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Payment failed"
        })
    }

    let body = razorpay_order_id+ "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.Razorpay_Secret)
    .update(body.toString())
    .digest("hex");

    if(expectedSignature === razorpay_signature){
        // enroll students 
        enrollStudent(courses, userId, res);

        //return res
        return res.status(200).json({
            success:true,
            message:"Payment Successfull",
            
        })
    }

    return res.status(400).json({
        success:false,
        message:"Payment failed"
    })
}

const enrollStudent = async(courses, userId, res) =>{

    if(!courses || !userId){
        return res.status(400).json({
            success:true,
            message:"Please Provide data for courses or userId"
        })
    }

    for(const courseId of courses){
       try{
        const enrolledCourse = await Course.findOneAndUpdate({_id:courseId}
            ,{$push:{ studentsEnrolled:userId}},
            {new:true})

        if(!enrolledCourse){
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }
        console.log(courseId, userId)
        // initialize course progress model
        const courseProgressInit = await CourseProgressModel.create({
            courseId:courseId,
            userId:userId,
            completedVideo:[]
        })

        // fnd the user and put courses in their model
        const studentEnrolled = await User.findByIdAndUpdate({_id:userId}, 
            {$push:{
                courses: courseId,
                courseProgress:courseProgressInit._id
            }}, {new:true}
        )

        const emailResponce = await sendVerification(studentEnrolled.email, 
            `Successfully enrolled in ${enrolledCourse.courseName}`, 
            courseEnrollmentEmail(enrolledCourse.courseName , studentEnrolled.firstname));

            console.log("Email sended successfully", emailResponce.response)


       }
       catch(error){
        console.log(error)
            return res.status(400).json({
                success:false,
                message:error.message
            })
       }
    }
}

//  payment successfull emaikl
exports.paymentMail = async(req,res) =>{
    try{
        const {orderId, paymentId, amount} = req.body;
        const userId = req.user.id;

        if(!orderId || !paymentId || !amount){
            return res.status(400).json({
                success:false,
                message:"Invalid Details"
            })
        }

        const enrolledStudent = await User.findById(userId);

        await sendVerification(enrolledStudent  .email, "Payment Successfull", paymentSuccessEmail(enrollStudent.name, amount, orderId, paymentId));
        


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in sending mail",
            error:error.message
        })
    }
}

//  This  will only run for a single order 

// exports.createOrder = async(req,res) =>{
//     try{
//         //fetching courseid and userid for creating order 
//         const userId = req.user.id;
//         const {courseId} = req.body;

//         //validation
//         if(!courseId){
//             return res.status(500).json({
//                 success:false,
//                 message: "provide a valid course id"
//             })
//         }

//         //check user is already enrolled or not 
//         let course;
//         try{

//             //search user in course id 
//             course = await Course.findById(courseId);
//             if(!course){
//                 res.json({
//                     success:false,
//                     message: "Could not find the course ",  
//                     error
//                 })
//             }

//             //check if student is already enrolled in course or not 
//             const uId = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uId)){
//                 return res.status(200).json({
//                     success:false,
//                     message:"Student is already enrolled in this course "
//                 })
//             }

//         }catch(error){
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
//         }

//         /// fetch amunt from course 
//         // :-> setting options for sending money via razorpay 
//         const amount = course.price;
//         const currency = "INR";

//         const options ={
//             amount:amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:courseId,
//                 userId
//             }
//         }

//         const paymentResponce = await instance.orders.create(options);
//         console.log(paymentResponce);

//         return res.status(200).json({
//             success:true,
//             message:"payment created successfully",
//             courseName:course.courseName,
//             description:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponce.id,
//             currency:paymentResponce.currency,
//             amount:paymentResponce.amount
//         })

//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message: "Error occured while creting order or payment ",
//             error
//         })
//     }
// }


// exports.verifySignature = async(req,res) =>{
//     // fetch webhook secret code which is available on the server 
//     const webhookSecret = "123456";

//     //fetch signature(which is sended by razor pay into headers );
//     const signature = req.headers["x-razorpay-signature"];
    
//     // we have to match this signature with the webhooksecret but the signature is encrypted by three steps and if we want to match it with webhookSecret then we have to process the webhookSecret with the same three process to encrypt it and then we match it with signature 

//     const shaMethod = crypto.createHmac("sha256", webhookSecret);
//     shaMethod.update(JSON.stringify(req.body));
//     const digest = shaMethod.digest("hex");

//     if(signature === digest){
//         console.log("Payment is authorized ")

//         const {courseId, userId} = req.body.payload.payment.entity.notes;
//         try{
//             // payment is authorized so enroll the user in the course 
//             const enrollInCourse = await Course.findByIdAndUpdate({_id: courseId}, {
//                 $push:{
//                     studentsEnrolled:userId
//                 }
//             }, { new:true });

//             if( !enrollInCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found"
//                 })
//             }

//             console.log(enrollInCourse);

//             // now find the student and push course id in its model
//             const enrolledStudent = await User.findByIdAndUpdate({_id : userId}, {
//                 $push:{
//                     courses:courseId
//                 }
//             }, {new :true });

//             // send mail 

//             const sendMail = await sendVerification(
//                 enrolledStudent.email, 
//                 "Congratulations, You have successfully enrolled in a newcourse",
//                 "Congrts , you have onboarded into new course "
//             )

//             console.log(sendMail);

//             return res.status(200).json({
//                 success:true,
//                 message:"successfully enrolled in a new course "
//             })
//         }catch(error){
//             return res.status(500).json({
//                 success:false,
//                 message:error.message+"into payment controller"
//             })
//         }
//     }else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid request in payment gateway "
//         })
//     }
// };