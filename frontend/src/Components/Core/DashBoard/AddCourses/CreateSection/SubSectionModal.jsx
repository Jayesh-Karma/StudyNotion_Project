import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../Services/Operations/CourseApi';
import { setCourse } from '../../../../../Reducers/Slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import ThumbnailInput from '../Create Course/ThumbnailInput';

const SubSectionModal = ({modalData, setModalData, add=false, edit =false, view=false}) => {
  
    const {register, handleSubmit, setValue, getValues, formState:{errors}} = useForm();
  
   
    const { token } = useSelector((state) => state.auth);
    const {course } = useSelector((state) => state.course)
    const dispatch = useDispatch();
    const [loading , setLoading ] = useState(false);

    useEffect(() => {
        if(view || edit){
            setValue("lectureTitle", modalData.title);
            setValue("lectureDescription", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    } ,[view, edit, modalData, setValue])

    const isFormUpdated = () =>{
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title || 
            currentValues.lectureDescription !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ){
            return true;
        }else{
            return false;
        }
    }
    
    const handleEditSubsection = async() =>{
        const currentValues = getValues();
        const formData = new FormData();
        


        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);
        formData.append("courseId", course._id);

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title", currentValues.lectureTitle);
        }
        if(currentValues.lectureDescription !== modalData.description){
            formData.append("description", currentValues.lectureDescription);
        }
        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("videoFile", currentValues.lectureVideo);
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);

        // console.log(result);

        if(result){
            // console.log(result)
            
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async(data) =>{

        if(view){
            return;
        }
        if(edit){
            if(!isFormUpdated()){
                toast.error("No Changes made to the form");
            }else{
                // edit krdo isko ab
                handleEditSubsection();        
            }
            return;
        }

        // create subsection
        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDescription);
        formData.append("videoFile", data.lectureVideo)
        formData.append("courseId", course._id)

       
        
        setLoading(true);

        //api call 
        const result = await createSubSection(formData, token);

        if(result){
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
  

    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
     
      

        <div className=' bg-richblack-900 p-5 rounded-lg border-2 border-richblack-700'>
             <div className='flex flex-row items-center justify-between mb-3'>
                <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing" } Lecture</p>
                <button onClick={ () => (!loading ? setModalData(null) : {})}>
                    <RxCross1 />
                </button>
             </div>

             <form onSubmit={handleSubmit(onSubmit)} className=''>
                <ThumbnailInput 
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.video : null}
                />

                <div>
                    <label htmlFor="lectureTitle">Lecture Title <sup className=' text-pink-400'>*</sup></label>
                    <input type="text"
                    id='lectureTitle'
                    placeholder='Enter your lecture title here'
                    {...register("lectureTitle", {required:true})}
                    className='p-2 rounded-lg w-full bg-richblack-700' 
                    />
                    {
                        errors.lectureTitle && ( <span> Lectuer title is required</span>)
                    }
                </div>
             
                <div>
                    <label htmlFor="lectureDescription">Lecture Description <sup className=' text-pink-400'>*</sup></label>
                    <textarea type="text"
                    id='lectureDescription'
                    placeholder='Enter your lecture Description here'
                    {...register("lectureDescription", {required:true})}
                    className='min-h-[140px] w-full text-richblack-5 bg-richblack-700 p-2 rounded-md' 
                    />
                    {
                        errors.lectureDescription && ( <span> Lectuer Description is required</span>)
                    }
                </div>

                <div>
                 {   !view && (
                                 <div>
                                        <button type='submit'
                                        className='p-2 rounded-md bg-yellow-100 text-richblack-800'>
                                            {loading ? ("Loading...") : (edit ? "Save Changes" : "Save")}
                                            </button>
                                </div>
                                )
                            }
                </div>

             </form>
        </div>


    </div>
  )
}

export default SubSectionModal
