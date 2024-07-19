const Course = require("../Models/CourseModel");
const Section = require("../Models/SectionModel");
const SubSection = require("../Models/SubsectionModel")

exports.createSection = async(req,res) =>{
    try{
        //data fetch
        const {sectionName, courseId} = req.body;

        //validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing sectionname and course id"
            }) 
        }

        //create section
        const sectionCreate = await Section.create({sectionName:sectionName});

        // update it in the course 
        const courseDetails = await Course.findByIdAndUpdate(courseId,
        {
            $push:{
                courseContent:sectionCreate._id
            }
        },{ new:true }).populate({
            path: 'courseContent',
            select: 'sectionName'
        });

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            courseDetails
        })
        

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occurred while creating section",
            error
        })
    }
}


// creating update section controller 
exports.updateSection = async(req,res) =>{
    try{
        const {sectionName, sectionId, courseId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Error occurred while updating section"
            })
        }
        //update section name
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true})
        
        const courseDetails = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

	
            return res.status(200).json({
                success:true,
                message:"Updated section succesfully",
                section:section,
                courseDetails
            })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in updating the section",
            error:error.message
        })
    }
}

// delete section 
exports.deleteSection = async(req,res) =>{
    try{
        const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		// console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		const subse = await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

        return res.status(200).json({
            success:true,
            message:"Deletd section successfully",
            course
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in deleting section",
            error
        })
    }
}