const Course = require('../Models/CourseModel');
const Category = require('../Models/Category');
const User = require("../Models/userModel")

const {uploadImgToCloud, deleteAssetFromCloud} = require('../Utils/imageUploader');
const SectionModel = require('../Models/SectionModel');
const { default: mongoose } = require('mongoose');
const CourseProgressModel = require('../Models/CourseProgressModel');
const { convertSecondsToDuration } = require('../Utils/secToDuration');

exports.createCourse = async(req,res) =>{
    try{
        //fetching data 
        const {courseName,
            courseDescription,
            whatWillYouLearn,
            price,
            tag,
            category, 
          instructions} = req.body;
        const thumbnail = req.files.thumbnail;

        //validations 
        console.log(courseName);
        if (!req.files.thumbnail) {
            console.log("Thumbnail file is not present in the request");
        }
        if(!courseName || !courseDescription || !whatWillYouLearn || !price || !category){
            
            return res.status(400).json({
                success:false,
                message:"Please enter all fields"
            })
        }

        //check for instructor from DB
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details from courseController: " +instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found "
            })
        }

        // check given tag is valid or not 
        // const cid = new mongoose.Types.ObjectId(category);
        const tagDetails = await Category.findById({_id:category});
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"There is no specific category for your course"
            })
        }

        //uploading thumbnail
        console.log(tagDetails)
        const uploadThumbnail = await uploadImgToCloud(thumbnail, "Thumbnails")

        console.log(uploadThumbnail)
        //sending data into database ;
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatWillYouLearn,
            instructions: instructions,
            price,
            tags:tag,
            category:tagDetails._id,
            thumbnail:uploadThumbnail.secure_url,
            thumbnail_publicId:uploadThumbnail.public_id,
            status:"Draft"
        })

        //add this new course in instructor user schema
         await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                } 
            },
            {new : true }
         )

         await Category.findByIdAndUpdate({
            _id:tagDetails._id
         },
        {
            $push:{ course:newCourse._id },
        },
        {new: true});

        //rreturn responce 
        
        res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse
        })

    }catch(error){
        console.log(error)
        
        return res.status(500).json({
            success:false,
            message:"Error in creating course",
            error:error.message
        })
    }
}

//get all courses 
exports.getAllCourses = async(req, res) =>{
    try{
        const allCourses = await Course.find({})    
        //     ({
        //     courseName:true,
        //     courseDescription:true,
        //     price:true,
        //     instructor:true,
        //     ratingReviews:true,
        //     studentsEnrolled:true,
        //     thumbnail:true
        // })
        .populate("instructor")
        .populate("courseContent")
        .exec();

        return res.status(200).json({
            success:true,
            message:"Fettched all courses successfully",
            allCourses
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't fetch course data",
            error:error
        })
    }
}

exports.getCourseDetailForStudent = async(req,res) => {
  try{
    const {courseId} = req.body;
    // console.log("Request object",req.user.id)
    // console.log(req.body)
  
    // console.log(courseId)
    
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid Course ID' });
    }
    // find course and fetch data 
    const courseDetails = await Course.findById({_id:courseId})
    .populate({
        path:"instructor",
        populate:{
            path:"additonalDetail"
        }
    })
    .populate("category")
    .populate("ratingReviews")
    .populate({
        path:"courseContent",
        populate:{
            path:"subSection"
        }
    })
    .exec();

    if(!courseDetails){
      return res.status(500).json({
          success:false,
          message:"Course not found"
      })
  }
     
    return res.status(200).json({
      success:true,
      message:"Course found",
      courseDetails
  })


  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Can't fetch course data",
      error:error.message
  })
  }
}

exports.getCourseDetailForInstructor = async(req,res) => {
  try{
    const {courseId} = req.body;
    const userId = req.user.id;
    console.log("Request object",req.user.id)
    // console.log(req.body)
  
    // console.log(courseId)
    
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid Course ID' });
    }
    // find course and fetch data 
    const courseDetails = await Course.findById({_id:courseId})
    .populate({
        path:"instructor",
        populate:{
            path:"additonalDetail"
        }
    })
    .populate("category")
    .populate("ratingReviews")
    .populate({
        path:"courseContent",
        populate:{
            path:"subSection"
        }
    })
    .exec();

    if(!courseDetails){
      return res.status(500).json({
          success:false,
          message:"Course not found"
      })
  }
     
    return res.status(200).json({
      success:true,
      message:"Course found",
      courseDetails
  })


  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Can't fetch course data",
      error:error
  })
  }
}

// get a course 
exports.getCourseDetail = async(req,res) =>{
    try{
        const {courseId} = req.body;
        const userId = req.user.id;
        console.log("Request object",req.user.id)
        // console.log(req.body)
      
        // console.log(courseId)
        
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
          return res.status(400).json({ success: false, message: 'Invalid Course ID' });
        }
        // find course and fetch data 
        const courseDetails = await Course.findById({_id:courseId})
        .populate({
            path:"instructor",
            populate:{
                path:"additonalDetail"
            }
        })
        .populate("category")
        .populate("ratingReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        .exec();

        let CourseProgress = await CourseProgressModel.findOne({
          courseId:courseId,
          userId:userId
        })

        console.log("courseProgressModel", CourseProgress)
 
        if(!courseDetails){
            return res.status(500).json({
                success:false,
                message:"Course not found"
            })
        }
        let duration = 0;
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDuration = parseInt(subSection.timeDuration);
            duration += timeDuration;
          })
        })

        const totalDuration = convertSecondsToDuration(duration);
        
        return res.status(200).json({
            success:true,
            message:"Course found",
            totalDuration:totalDuration,
            completedVideos:CourseProgress?.completedVideo ? CourseProgress?.completedVideo : [],
            courseDetails
        })


    }catch(error){
      console.log(error)
        return res.status(500).json({
            success:false,
            message:"Can't fetch course data",
            error:error
        })
    }
}

// Edit Course Details 
// exports.editCourse = async (req, res) => {
//     try {
//       const { courseId } = req.body
//       const updates = req.body
//       const course = await Course.findById(courseId)
  
//       if (!course) {
//         return res.status(404).json({ error: "Course not found" })
//       }
  
//       // If Thumbnail Image is found, update it
//       if (req.files) {
//         console.log("thumbnail update")
//         const thumbnail = req.files.thumbnailImage
//         const thumbnailImage = await uploadImageToCloudinary(
//           thumbnail,
//           process.env.FOLDER_NAME
//         )
//         course.thumbnail = thumbnailImage.secure_url
//       }
  
//       // Update only the fields that are present in the request body
//       for (const key in updates) {
//         if (updates.hasOwnProperty(key)) {
//           if (key === "tag" || key === "instructions") {
//             course[key] = JSON.parse(updates[key])
//           } else {
//             course[key] = updates[key]
//           }
//         }
//       }
  
//       await course.save()
  
//       const updatedCourse = await Course.findOne({
//         _id: courseId,
//       })
//         .populate({
//           path: "instructor",
//           populate: {
//             path: "additionalDetails",
//           },
//         })
//         .populate("category")
//         .populate("ratingReviews")
//         .populate({
//           path: "courseContent",
//           populate: {
//             path: "subSection",
//           },
//         })
//         .exec()
  
//       res.json({
//         success: true,
//         message: "Course updated successfully",
//         data: updatedCourse,
//       })
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       })
//     }
//   }
  
  
  // Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate("instructor")
        .populate("category")
        .populate("ratingReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }


exports.deleteCourse = async(req,res) =>{
    try{
        const {courseId} = req.body;

        const course = await Course.findById({_id:courseId});
        
        if(!course){
            return res.status(500).json({
                success:false,
                message:"Course can not found"
            })
        }
        
        const deleteImg = await deleteAssetFromCloud(course.thumbnail_publicId, "image");
        if(!deleteImg){
            return res.status(500).json({
                success:false,
                message:"Error in delting from cloud "
            })
        }
        
        const deleteCor = await SectionModel.deleteMany({_id: {$in: course.courseContent}});

        
        if(!deleteCor){
            return res.status(500).json({
                success:false,
                message:"Error in delting course's sections "
            })
        }

        await Course.findByIdAndDelete({_id: courseId});

            return res.status(200).json({
                success:true,
                message:"Course deleted successfully",
            })
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            sucess:false,
            message:"Error while deleting course",
            error:error.message
        })
    }
}

//courses by instructor
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }

// get courses according to category

exports.getCategoryCourses = async(req, res) => {
  try {
    const { categoryId } = req.body
    console.log("PRINTING CATEGORY ID: ", categoryId);
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId) 
      .populate({
        path: "course",
        populate:{
          path:'courseContent',
          populate:{
            path:'subSection'
          }
        }
      })
      .exec()

      

    //console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    // if (selectedCategory.course.length === 0) {
    //   console.log("No courses found for the selected category.")
    //   return res.status(404).json({
    //     success: false,
    //     message: "No courses found for the selected category.",
        
    //   })
    // }

    function getRandomInt(max) {
      return Math.floor(Math.random() * max)
    }
  
    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course"
      })
      .exec()
      //console.log("Different COURSE", differentCategory)
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "course",
        populate: {
          path: "instructor",
      },
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
     // console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
