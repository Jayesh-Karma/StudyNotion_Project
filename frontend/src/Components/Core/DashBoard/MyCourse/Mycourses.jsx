import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../Services/Operations/CourseApi';
import ModelBtn from '../../../Common/ModelBtn';
import { FaDAndD } from 'react-icons/fa6';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CoursesTable from './CoursesTable';

  const Mycourses = () => {
    const {token} = useSelector((state) => state.auth);
    const [courses, setCourses] = useState();
    const navigate = useNavigate();



    useEffect(() => {
        async function fetchCourses(){
            const result = await fetchInstructorCourses(token);
            setCourses(result);
        } 
        fetchCourses();   
    }, [])
  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <h1>My Courses</h1>
        <ModelBtn onclick={() => navigate("/dashboard/add-course")} classname='flex flex-row items-center gap-3' > Add Courses <MdAdd/> </ModelBtn>
      </div>

      <div>
        <CoursesTable  courses={courses} setCourses={setCourses} />
        {console.log(courses)}
      </div>
    </div>
  )
}

export default Mycourses
