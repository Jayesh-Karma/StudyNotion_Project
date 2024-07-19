import React, { useEffect, useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../Services/Operations/CourseApi';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import TagsInput from './TagsInput';
import ThumbnailInput from './ThumbnailInput';
import RequirementsField from './RequirementsField';
import { setCourse, setStep } from '../../../../../Reducers/Slices/courseSlice';
import ModelBtn from '../../../../Common/ModelBtn';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/Constants';
import { MdNavigateNext } from 'react-icons/md';


const CreateCourse = () => {
    const {
        register,
        handlerSubmit,
         setValue,
         getValues,
         handleSubmit,
         formState:{errors}
    } = useForm();

    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state) => state.course );
    const {token, isLoading} = useSelector((state) => state.auth);
 
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    const getCategories = async() =>{
        setLoading(true);
        const categories = await fetchCourseCategories();
        if(categories.length > 0){
            setCourseCategories(categories);
        }
        setLoading(false);
        console.log(categories)
        
    }
    
    useEffect(()=>{
        
        if(editCourse){
            setValue("courseTitle", course?.courseName)
            setValue("courseDescription", course?.courseDescription)
            setValue("coursePrice", course?.price)
            setValue("courseTags", course?.courseTags)
            setValue("courseCategories", course?.category)
            setValue("courseBenefits", course?.whatWillYouLearn)
            setValue("courseRequirements", course?.instructions)
            setValue("courseThumbnail", course?.thumbnail)
        }
        
        getCategories();
    }, [])


    const isFromUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseDescription !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.courseTags.toString() ||
            currentValues.courseCategories._id !== course.category._id ||
            currentValues.courseBenefits !== course.whatWillYouLearn ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseThumbnail !== course.thumbnail 
         ){
            return true;
         }
         else{
            return false;
         }
    }
    
    const onSubmit = async (data) =>{
        console.log(getValues());

        // for edited course 
        if(editCourse){
                if(isFromUpdated()){
                const currentValues = getValues();
                const formData = new FormData();
    
                formData.append("courseId", course._id);
                
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle)
                }
                if(currentValues.courseDescription !== course.courseDescription){
                    formData.append("courseDescription", data.courseDescription)
                }
                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice)
                }
                if(currentValues.courseBenefits !== course.whatWillYouLearn){
                    formData.append("whatWillYouLearn", data.courseBenefits)
                }
                if(currentValues.courseCategories._id !== course.category._id){
                    formData.append("category", data.courseCategories)
                }
                if(currentValues.courseTags.toString() !== course.courseTags.toString()){
                    formData.append("courseTags", JSON.stringify(data.courseTags))
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }
                if(currentValues.courseThumbnail !== course.thumbnail){
                    formData.append("thumbnail", data.courseThumbnail)
                }
                
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result){
                    dispatch(setStep(2))
                    
                    dispatch(setCourse(result))
                }
            }
            else{
                toast.error("No changes made in this form")
            }
            return;
         }

         // for newly created course
         const formData = new FormData();
         formData.append("courseName", data.courseTitle)
         formData.append("courseDescription", data.courseDescription)
         formData.append("price", data.coursePrice)
         formData.append("whatWillYouLearn", data.courseBenefits)
         formData.append("category", data.courseCategories)
         formData.append("courseTags", JSON.stringify(data.courseTags))
         formData.append("instructions", JSON.stringify(data.courseRequirements))
         formData.append("thumbnail", data.courseThumbnail)
         formData.append("status", COURSE_STATUS.DRAFT);

         for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        console.log(formData)


        //  setLoading(true);
         const result = await addCourseDetails(formData, token);
         if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
         }
         setLoading(false);
         }
    
    
    return (
    <form onSubmit={handleSubmit(onSubmit)} 
    className='flex flex-col justify-evenly gap-y-3 border border-richblack-700 bg-richblack-800 lg:p-5 rounded-xl '>

        <div>
            <label> Course Title <sup>*</sup></label>
            <input 
             id='courseTitle'
             placeholder='Enter Course Title'
             {...register("courseTitle",{required:true})}
             className='w-full text-richblack-5 bg-richblack-700 p-2 rounded-md'
             />
             {
                errors.courseTitle && <span> Course Title is required</span>
             }
        </div>
      
        <div>
            <label> Course Description <sup>*</sup></label>
            <textarea  
             id='courseDescription'
             placeholder='Enter Course Details'
             {...register("courseDescription",{required:true})}
             className=' min-h-[140px] w-full text-richblack-5 bg-richblack-700 p-2 rounded-md'
             />
             {
                errors.courseDescription && <span> Course Description is required</span>
             }
        </div>

        <div className='relative'>
            <label> Course Price <sup>*</sup></label>
            <input 
             id='coursePrice'
             placeholder='Enter Course Price'
             {...register("coursePrice",{required:true, valueAsNumber:true , pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },})}
             className='w-full text-richblack-5 bg-richblack-700 px-7 p-2 rounded-md'
             />
             <HiOutlineCurrencyRupee className=' absolute text-richblack-5 top-8 left-1 text-xl' />
             {
                errors.coursePrice && <span> Course Price is required</span>
             }
        </div>

        <div>
            <label> Course Category <sup>*</sup></label>
             <select 
             name="courseCategories" 
             id="courseCategories" 
             {...register("courseCategories", {required:true})}
             className='text-richblack-5 bg-richblack-700 p-2 rounded-md w-full'
             >
                <option value="" disabled>---- Choose Category ----</option>
                {
                    !loading && courseCategories.map((option, idx) =>(
                        <option key={idx} value={option?._id} className='text-richblack-5 bg-richblack-700 p-2'>
                            {option.name}
                        </option>
                    ))
                }
             </select>
             {
                errors.courseCategory && <span> Course Category is required</span>
             }
        </div>
        
        {/* tags input */}
        <TagsInput
            id="courseTags"
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags for this Course"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
        />

        {/* thumbnail */}
        <ThumbnailInput 
            label="courseThumbnail"
            id="courseThumbnail"
            name="courseThumbnail"
            placeholder="Upload Thumbnail"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
        />

        <div>
            <label> What will you learn </label>
            <textarea  
             id='courseBenefits'
             placeholder='Enter Course Benefits'
             {...register("courseBenefits",{required:true})}
             className=' min-h-[140px] w-full text-richblack-5 bg-richblack-700 p-2 rounded-md'
             />
             {
                errors.courseDescription && <span> Course Benefits is required</span>
             }
        </div>

        <RequirementsField 
            id="courseRequirements"
            label="Course Requirements"
            name="courseRequirements"
            placeholder="Add Requirements"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
        />

        {
            editCourse && (
                <button
                    onClick={dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300'
                >
                    Continue without Saving
                </button>
            )
        }
        
        <ModelBtn  text={!editCourse ? "Next" : "Save Changes"} >
             
        </ModelBtn>

    </form>
  )
}

export default CreateCourse
