import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../../../Reducers/Slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/Constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../Services/Operations/CourseApi';

const PublishCourse = () => {

    const {course} = useSelector((state)=> state.course);
    const {token} = useSelector((state) => state.auth);

    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, setValue, getValues, handleSubmit, formState:{errors}} = useForm()

    function goToCourse(){
        dispatch(resetCourseState());
         navigate("/dashboard/my-courses")
    }

    console.log(getValues());
    async function handleCoursePublish(){
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ) || 
            ( course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
                // no updation in the form 
                // console.log("Hitting")
                goToCourse();
                return;
            }

            // make call
            const formData = new FormData();
            formData.append("courseId", course._id);
            const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
            formData.append("status", courseStatus)

            setLoading(true);
            const result = await editCourseDetails(formData, token);
            // console.log(result)
            if(result){
                goToCourse();
            }
            setLoading(false);
    }


    //onSubmit handler 
    const onSubmit = () => {
        handleCoursePublish();
    }

    const goBack = () =>{
        dispatch(setStep(2));
    }

  return (
    <div className='rounded-lg bg-richblack-800 border-richblack-700 p-5'>

        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>

                <label htmlFor="public">Make this Course as Public </label>
                    <input 
                    type="checkbox"
                    id='public'
                    {...register("public")}
                    className=' rounded h-4 w-4' />

            </div>

            <div className='flex flex-row items-center gap-x-3'>
                <button
                disabled={loading}
                type='button'
                onClick={goBack}
                className='flex items-center rounded-md p-1 border border-richblack-700'
                >
                    Back
                </button>

                <button
                disabled={loading}
                type='submit'
                className='p-1 bg-yellow-50 text-richblack-800'
                >
                    Save Changes
                </button>
            </div>
        </form>
    
    </div>
  )
}

export default PublishCourse
