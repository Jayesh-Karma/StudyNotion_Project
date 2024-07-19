const { populate } = require("../Models/CourseModel");
const CourseProgressModel = require("../Models/CourseProgressModel");
const Profile = require("../Models/profileModel");
const User = require("../Models/userModel");
const { uploadImgToCloud, deleteAssetFromCloud } = require("../Utils/imageUploader");
const { convertSecondsToDuration } = require("../Utils/secToDuration");

// exports.updateProfile = async(req, res) =>{
//     try{
//         const {dob, gender, about, phone } = req.body
//         const id = req.user.id;
//         console.log(id)

//         //find profile from user model
//         const userProfile = await User.findById({_id:id});
//         console.log(userProfile);
//         const profileId = userProfile.additonalDetail;
//         const additionalDetails = await Profile.findById({_id:profileId});
//         console.log(additionalDetails)
//         //update profile id 
//         if(dob){
//             additionalDetails.dob = dob;
//         }
//         if(gender){
//             additionalDetails.gender = gender;
//         }
//         if(about){
//             additionalDetails.about = about;
//         }
//         if(phone){
//             additionalDetails.phone = phone;
//         }


//         await additionalDetails.save();

//         return res.status(200).json({
//             success:true,
//             message:"Updated additional details succesfully",
//             additionalDetails
//         })
//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Error occurred while updating user profile ",
//             error:error.message
//         })
//     }

// }

exports.updateProfile = async(req,res) =>{
    try{
        const {
            firstname = "",
            lastname = "",
            dob = "",
            about = "",
            phone = "",
            gender = "",
          } = req.body
          const id = req.user.id
        console.log(id);
          // Find the profile by id
          const userDetails = await User.findById(id)
          const profile = await Profile.findById(userDetails.additonalDetail)
      
          const user = await User.findByIdAndUpdate(id, {
            firstname,
            lastname,
          })
          const userData = await user.save();
          if(!userData){
            return res.status(400).json({
                success:false,
                message:"Error in updating user details",
                error:userData.message
            })
          }
          console.log(user)
      
          // Update the profile fields
          profile.dob = dob
          profile.about = about
          profile.phone = phone
          profile.gender = gender
      
          // Save the updated profile
          await profile.save()
      
          // Find the updated user details
          const updatedUserDetails = await User.findById(id)
            .populate("additonalDetail")
            .exec()

            console.log(updatedUserDetails)
      
          return res.json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
          })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occurred while updating user profile ",
            error:error.message
        })
    }
}
// delete account of user
exports.deleteAccount = async(req,res) =>{
    try{
        const id = req.user.id;
        
        // search user
        const userData = await User.findById(id);

        if(!userData){
            return res.status(400).json({
                success:false,
                message:"Id not found "
            })
        }

        //delete profile inside user schema 
        const profileId = userData.additonalDetail;
        const deleteProfile = await Profile.findByIdAndDelete({_id: profileId});
        // now delet user 
        const deleteUser = await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"Account deleted successfully ",
            deleteUser
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occurred while deleting user profile ",
            error
        })
    }
}

// get all user sdetails 

exports.getAllUserDetails = async(req,res) =>{
    try{
        //fetch id 
        const id = req.user.id;
        //validation
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id not found "
            })
        }

        const userDetails = await User.findById(id).populate("additonalDetail");

        return res.status(200).json({
            success:true,
            message:"Account get successfully ",
            userDetails
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occurred while getting user profile ",
            error
        })
    }
}

// image update 
exports.uploadImg =async(req, res) =>{
    try{
        const profileImg = req.files.profilePic;
        const id = req.user.id;

        console.log("Backend route ", profileImg, id)
        const imgUpload = await uploadImgToCloud(profileImg, "ProfileImg");
        
        if(!imgUpload){
            return res.status(500).json({
                success:false,
                message:"Error occurred while updating user profile ",
                error:imgUpload
            })
        }
        console.log(imgUpload)
        
        const oldData = await User.findById({_id:id});
        console.log(oldData)
        if(oldData.profile_public_id !== null){
            await deleteAssetFromCloud(oldData.profile_public_id);
        }

        const user = await User.findByIdAndUpdate({_id:id},
            {img: imgUpload.secure_url,
            profile_public_id:imgUpload.public_id
            }, {new:true}
        );

        if(!user){
            return res.status(500).json({
                success:false,
                message:"Error occurred while updating user profile ",
                error:"Cant update img in user "
            })
        }

        return res.status(200).json({
            success:true,
            message:"User updated successfully",
            data:user
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error occurred while updating profile picture",
            error:error.message
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const id = req.user.id;

        // Find user details and populate courses
        let userDetails = await User.findOne({ _id: id })
            .populate({
                path: "courses",
                populate: {
                    path: 'courseContent',
                    populate: {
                        path: 'subSection'
                    }
                }
            }).exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'Could not find user details'
            });
        }

        // Below is for progress calculations and is half written we have to complete ot after exams
        userDetails = userDetails.toObject();
        let SubsectionLength = 0;

        for (let i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            SubsectionLength = 0;

            for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }

            let courseProgress = await CourseProgressModel.findOne({
                courseId: userDetails.courses[i]._id,
                userId: id
            });

            let completedVideosCount = courseProgress?.completedVideo.length || 0;

            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100;
            } else {
                const multiplier = Math.pow(10, 2);
                userDetails.totalDuration = Math.round((completedVideosCount / SubsectionLength) * 100 * multiplier) / multiplier;
            }
        }


        return res.status(200).json({
            success: true,
            message: "Courses Fetched",
            totalDuration:userDetails.totalDuration,
            userDetails,
        });

    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return res.status(500).json({
            success: false,
            message: "Problem in fetching enrolled courses",
            error: error.message
        });
    }
};
