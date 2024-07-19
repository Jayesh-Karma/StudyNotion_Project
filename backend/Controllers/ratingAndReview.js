const Ratings = require("../Models/RatingReview");
const Course = require("../Models/CourseModel");
const { default: mongoose } = require("mongoose");

//create ratings 
exports.createRating = async (req, res) => {
    try {

        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        //check user is enrolled in this course or not 
        const alreadyEnrolled = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } }
        });

        if (!alreadyEnrolled) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in this course ",
            })
        }

        //check that user is not already reviewed course
        const alreadyReview = await Ratings.findOne({ user: userId, course: courseId });

        if (alreadyReview) {
            return res.status(403).json({
                success: false,
                message: "You Already Reviewed course"
            })
        }

        //create rating review in db
        const createRatingReview = await Ratings.create({
            rating,
            review,
            course: courseId,
            user: userId
        })

        createRatingReview.save();
        //update course inside the course model
        const pushInCourse = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingReviews: createRatingReview._id
                }
            }, { new: true })

            
        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully",
            createRatingReview
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred in create rating",
            error
        })
    }
}


//get average rating 
exports.getAverageRating = async(req,res) =>{
    try{
        //fetching course id
        const courseId = req.body.courseId;

        //calculate average course rating 
        // we are going to perform aggregation for the average value 
        const result = await Ratings.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },{
                $group:{
                    _id:null,
                    averageRating:{ $avg:"$rating"}
                }
            }
        ])

        //return rating 
        if(result.length >0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        // if no rating review exist
        return res.status(200).json({
            success:true,
            message:"Average rating is 0, no rating for this course ",
            averageRating:0
        })


    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error occurred in getting average rating",
            error
        })
    }
}

//getall ratings reviews 
exports.getAllRating = async(req,res) =>{
    try{
        const allRatingReviews = await Ratings.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstname lastname email img"
        })
        .populate({
            path:"course",
            select:"courseName"
        })
        .exec();

        return res.status(200).json({
            success:true,
            message:"All eviews fetched easily",
            data:allRatingReviews
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error occurred in getting all ratings and reviews",
            error
        })
    }
}