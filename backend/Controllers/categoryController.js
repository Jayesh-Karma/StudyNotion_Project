const Category = require("../Models/Category");
const Course = require("../Models/CourseModel");

exports.createCategory = async(req, res) =>{
    try {
        // fetch data from body 
        const {name, description} = req.body;

        //validate data
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Fill all fields properly"
            })
        }

        // send data into db
        const saveTag = await Category.create(
            {name : name,
            description:description})

         res.status(200).json({
            success:true,
            message:"Tag saved succesfully",
            saveTag
        })

    } catch (error) {
         res.status(500).json({
            success:false,
            message:"Something went wrong in Category controller",
            error:error
        }) 
    }
}


// get all Category 
exports.getAllCategory= async(req, res) =>{
    try{
        // get data from db
        const allTags = await Category.find({}, {name:true, description:true});

        if(!allTags){
        return res.status(404).json({
                success:false,
                message:"Categories not fetched",
                allTags
            })    
        }

        return res.status(200).json({
            success:true,
            message:"All the Category are fetched",
            allTags
        })
         
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in get Category controller ",
            error:error
        })
    }
}

// category page details 
exports.categoryPageDetails = async(req,res) =>{
    try{
        //get course id 
        const {categoryId} = req.body;

        //fetch c courses according to course id 
        const selectedCategory = await Category.findById({_id:categoryId})
        .populate({
            path:"course",
            populate:{
                path:"instructor"
            }
        })
        .exec();

        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"No course found"
            })
        }

        //get courses of different category
        const differentCategory = await Category.find({
            _id:{ $ne: categoryId},
        })
        .populate({
            path:"course",
            populate:{
                path:"instructor"
            }
        })

        //now get top selling course 
        const allCategories = await Category.find()
        .populate({
          path: "course",
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = await Course.find({}).populate("instructor")
        

        return res.status(200).json({
            success:true,
            message:"Courses according to category fetched successfully",
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses
            }
        })

    }catch(error){
        return res.status(500).json({
            success:false,  
            message:"Something went wrong in get Category controller ",
            error:error
        })
    }
}