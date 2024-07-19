const CourseModel = require("../Models/CourseModel")


exports.instructorDashboard = async(req,res) =>{
    try{

        const courseDetails = await CourseModel.find({instructor: req?.user?.id});

        const courseData = courseDetails.map((course) =>{
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalRevenue = totalStudentsEnrolled * course.price

            //create an new object with additional fields 
            const courseDatawithStats = {
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalStudentsEnrolled,
                totalRevenue
            }

            return courseDatawithStats

        })  
            return res.status(200).json({
                courses:courseData
            })


    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}