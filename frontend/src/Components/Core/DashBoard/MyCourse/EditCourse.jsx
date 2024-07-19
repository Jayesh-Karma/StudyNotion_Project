import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getDetailsForInstructor, getFullDetailsOfCourse } from '../../../../Services/Operations/CourseApi';
import { apiConnector } from '../../../../Services/apiConnector';
import { setCourse, setEditCourse } from '../../../../Reducers/Slices/courseSlice';
import RenderSteps from '../AddCourses/RenderSteps';
 
const EditCourse = () => {
    const {courseId} = useParams();
    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state)=> state.auth);

  //  console.log(courseId)

   const fetchDetails = async() =>{
    setLoading(true);
    const result = await getDetailsForInstructor(courseId, token)
    if(result.success){
      dispatch(setEditCourse(true))
      dispatch(setCourse(result.courseDetails))
    }
    setLoading(false);
   }


  useEffect(()=>{
    fetchDetails();
  },[courseId])

    return ( 
   (loading == true) ? (<div> Loading... </div>) :(<div>
      
      <h1>Edit Course</h1>
      <div>
        {
          course ? (<RenderSteps /> ): (<div> Course Details not found </div>)     
        }
      </div>

    </div>)
  )
}

export default EditCourse
