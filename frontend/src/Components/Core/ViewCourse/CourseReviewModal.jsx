import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component';
import ModelBtn from '../../Common/ModelBtn';
import { createRating } from '../../../Services/Operations/CourseApi';
import { IoClose } from 'react-icons/io5';

const CourseReviewModal = ({setReviewModal}) => {
  const {user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const {handleSubmit, register, setValue, formState:{errors}} = useForm()
  console.log(user) 


  useEffect(()=>{
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  },[])

  function ratingChange(newRating){
    setValue("courseRating", newRating)
  }

  async function onSubmit(data){
    const res = await createRating({
      courseId: courseEntireData._id ,
      rating: data.courseRating,
      review: data.courseExperience
    }, token)

    if(res){
      setValue("courseExperience", "");
      setValue("courseRating", 0);
      setReviewModal(false)
    }
    console.log(res);
  }
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm"> 
    <div className=' bg-richblack-800 text-white opacity-100 p-6 rounded-lg border border-richblack-300'>
          {/*  Modal Header */}
          <div className=' flex flex-row justify-between items-center mb-2'>
            <p>Add Review</p>
            <button
            onClick={()=>setReviewModal(false)}><IoClose /></button>
          </div>

          {/*  Modal body */}
          <div className=' '>

              <div className=' flex flex-row items-start justify-start gap-3'>
                <img src={user?.img} alt="" 
                  className=' aspect-square w-[50px] rounded-full object-cover'
                />
                  <div>
                    <p>{user.firstname} {user.lastname}</p>
                    <p>Posting Publicly</p>
                  </div>
              </div>

              <form
              onSubmit={handleSubmit(onSubmit)}
              className=' mt-6 flex flex-col items-center'>

                <ReactStars 
                  count={5}
                  onChange={ratingChange}
                  size={30}
                  activeColor="#ffd700"
                />
                
                <div >
                  <label htmlFor="courseExperience"></label>
                  <textarea id="courseExperience" placeholder='Add your Experience here'
                    {...register("courseExperience", { required: true})}
                    className=' form-style min-h-[130px] w-full rounded-lg bg-richblack-900 p-3'
                  />
                  {
                    errors.courseExperience && (
                      <span>
                        Please add your Experience here
                      </span>
                    )
                  }
                </div>

                  <div className=' flex flex-row gap-x-8 items-center'>
                      <button onClick={()=>setReviewModal(false)}>
                        Cancel
                      </button>
                      
                      <div>
                      <ModelBtn 
                        text={"Save"}
                      />
                      </div>
                  </div>
              </form>
          </div>

      </div>
    </div>
  )
}

export default CourseReviewModal
