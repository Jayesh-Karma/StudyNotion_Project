const CourseProgressModel = require("../Models/CourseProgressModel");
const SubsectionModel = require("../Models/SubsectionModel");


exports.courseProgressController = async (req, res) =>{
    try{
        const {courseId, subSectionId} = req.body;
        const userId = req.user.id;

        if(!courseId || !subSectionId){
            return res.status(404).json({
                success:false,
                message:"Can't get courseId or subsection id"
            })
        }
        
        //chck whether the subsection is valid or not 
        const subSectioCheck = await SubsectionModel.findById(subSectionId);
        if(!subSectioCheck){
            return res.status(404).json({
                success:false,
                message:"Invalid Subsection"
            })
            
        }
        
        // check a model exist or not for user and that progress
        const checkInProgressModel = await CourseProgressModel.findOne({
            courseId:courseId,
            userId:userId
        })
        
        console.log( "Course progress initialization done ",checkInProgressModel)
        if(!checkInProgressModel){
            return res.status(404).json({
                success:false,
                message:"Course Progress Doesn't exist"
            })
        }
        
        // check if it is already exist or not in the course model
        if(checkInProgressModel.completedVideo.includes(subSectionId)){
            return res.status(400).json({
                success:false,
                message:"Subsection Allready completed"
            })
        }
        
        await checkInProgressModel.completedVideo.push(subSectionId);
        await checkInProgressModel.save()
        
        // console.log( "Check progress  initialization done ",checkInProgressModel)

        return res.status(200).json({
            success:true,
            message:"Course completed successfully",
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            error:"Internal server Error"
        })
    }
}