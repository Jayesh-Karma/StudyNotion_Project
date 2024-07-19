const SubSection = require("../Models/SubsectionModel");
const Section = require("../Models/SectionModel");
const Course = require("../Models/CourseModel");
const { uploadImgToCloud, deleteAssetFromCloud } = require("../Utils/imageUploader");
const { default: mongoose } = require("mongoose");

exports.createSubSection = async(req,res) =>{
    try{

        const {sectionId, courseId, title, description} = req.body;
        const video = req.files.videoFile;

        // validation 
        
        if(video){
            console.log("video is present")
        }
        
        console.log("Received data:", { sectionId, courseId, title, description, video });
        if(!sectionId || !title || !description || !video || !courseId){
            return  res.status(400).json({
                success:false,
                message:"All fields are required "
            }) 
        }
        // upload video to cloudinary 
        const videoDetails = await uploadImgToCloud(video, "Course-Videos");
        
        //save in db 
        const subsectionDetails = await SubSection.create({
            title,
            timeDuration:(videoDetails.duration/ 60).toFixed(3),
            description,
            videoUrl:videoDetails.secure_url,
            cloud_publicId:videoDetails.public_id
        })

        console.log(subsectionDetails);
        //update section with subsection id
        // sectionId = new mongoose.Types.ObjectId(sectionId)
        const sectionUpdate = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {$push:{
                                                                    subSection:subsectionDetails._id,
                                                                }}, {new:true})
                                                                .populate("subSection");

        // we have to use populate here 
// /we have to update the  course status to published 
console.log(sectionUpdate)
        const courseDetails = await Course.findById({_id:courseId}).populate({
          path:"courseContent",
          populate:{
            path:"subSection"
          }
        })

console.log(courseDetails)
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully ",
            updatedSection :sectionUpdate,
            subsectionDetails,
            courseDetails
        })

    }catch(error){
      console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error occurred in creating subsection",
            error:error.message
        })
    }
}

// update subsection controller 
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description, courseId } = req.body
        const subSection = await SubSection.findById(subSectionId)
        console.log(subSection)

        if (!subSection) {
          return res.status(404).json({
            success: false,
            message: "SubSection not found",
          })
        }
    
        if (title !== undefined) {
          subSection.title = title
        }
    
        if (description !== undefined) {
          subSection.description = description
        }
        if (req.files && req.files.videoFile !== undefined) {
          const video = req.files.videoFile
          const uploadDetails = await uploadImgToCloud(
            video,
            "Course-Videos"
          )
          let durationTime =Math.floor(uploadDetails.duration/60);
          let remainTime = uploadDetails.duration%60;
          subSection.videoUrl = uploadDetails.secure_url
          subSection.timeDuration = `${durationTime}:${remainTime}`
        }
    
        await subSection.save()
    
        // find updated section and return it

        const courseDetails = await Course.findById({_id:courseId}).populate({
          path:"courseContent",
          populate:{
            path:"subSection"
          }
        })
    
    
        return res.json({
          success: true,
          message: "SubSection updated successfully",
          courseDetails

        })

    } catch (error) {
      console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error occurred in updating subsection",
            error : error.message
        })
    }
}


//delete subsection 
exports.deleteSubsection = async(req,res) =>{
    try{
        const { subsectionId, sectionId, courseId } = req.body
        
        console.log(subsectionId, sectionId, courseId)
        
        if(!subsectionId || !sectionId || !courseId){
          return res.status(400).json({
            success:false,
            message:"Try Again Later",
          })
        }
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subsectionId,
        },
      }
    )
    const subSection = await SubSection.findById({ _id: subsectionId })
    console.log("Subsection delete krte time ka data ", subSection)
    if (!subsectionId) {
      return res
      .status(404)
      .json({ success: false, message: "SubSection not found" })
    }
    const resp = await deleteAssetFromCloud(subSection.cloud_publicId, "video");
    if(!resp){
      return res
      .status(404)
      .json({ success: false, message: "Cannot delete from cloud" })
    }
    const deleteSub = await SubSection.findByIdAndDelete({_id:subsectionId});
    
    console.log(resp);
    // search for updated course and return it
    const courseDetails = await Course.findByIdAndUpdate({_id:courseId}
    ).populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    })

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      courseDetails
    })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occurred while deleting subsection",
            error: error.message
        })
    }
}