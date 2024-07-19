import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserEnrolledCourse } from '../../../Services/AuthApi/profileUpdateApi';
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from 'react-router-dom';


const EnrolledCourses = () => {

  const {user} = useSelector((state) => state.profile);
  // console.log(user)
  const dispatch = useDispatch();
  const [processbar, setProcessBar] = useState(0);
  const [fetchedCourses, setFetchCourses] = useState(null);
  

  const fetchCourses = async () => {
    // console.log("func starter")
    const res =  await dispatch(getUserEnrolledCourse(user.token))
    console.log(res);
    setProcessBar(res.totalDuration)
    setFetchCourses(res.userDetails.courses);
  }


  useEffect(()=> {
    fetchCourses()  
    console.log("Effect called")
  },[]);



  return (
    <div>

        <div className=' text-2xl font-semibold mb-3'>Enrolled Courses</div>
        {
          !fetchedCourses ? (<div> Loading ....</div>) : 
          !fetchedCourses.length ? (<p>You have not enrolled in any course</p> ) : (
            <div>
              <div className=' flex flex-row justify-between items-center border bg-richblack-400 p-2 rounded-lg px-2'>
                <p>Course Name</p>
                {/* <p>Duration</p> */}
                <p>Progress</p>
              </div>
              {/*  cards of ffetched courses */}
              
                {
                    fetchedCourses.map((course, idx) => {
                      return (
                      <div key={idx} className='w-full' >
 
                     <Link to={`/dashboard/course/${course._id}/section/${course.courseContent[0]._id}/subSection/${course.courseContent[0].subSection[0]._id}`} 
                     className='flex flex-row justify-between items-start p-3 border-b'>
                          
                          <div className='flex items-start '>
                            <img width={150} height={150} className=' aspect-square object-cover' src={course.thumbnail} alt="Not found" />
                            <div className=' p-5'>
                              <p className=' text-2xl'>{course.courseName}</p>
                              <p className=' text-xl text-richblack-200'>{course.courseDescription}</p>
                              {/* <p className=' text-sm text-richblack-300'> Total {course.studentsEnrolled.length} Students Enrolled  </p> */}
                            </div>
                           </div>  

                        {/* <div>
                          {course?.totalDuration || 0}
                        </div> */}

                        <div className=' w-[25%] overflow-hidden p-5'>
                          <p>Progress : { processbar} %</p>
                          <ProgressBar completed={processbar} bgColor='#E7C009'  />
                        </div>
                    </Link>
                      </div>
                    )})
                }
            </div>
          )
        }
    </div>
  )
}

export default EnrolledCourses
