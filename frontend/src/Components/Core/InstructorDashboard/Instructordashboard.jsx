import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../Services/Operations/CourseApi';
import { getInstructorData } from '../../../Services/Operations/instructorDashboardApi';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const Instructordashboard = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);  
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile)

  useEffect(()=>{
    const fetchData = async () =>{
        setLoading(true);
        const res = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);

        console.log(res)
        if(res.length){
            setInstructorData(res);
        }

        if(result){
            setCourses(result)
        }
        setLoading(false);
    }
    fetchData()
  },[])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalRevenue, 0)
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled , 0)




    return (
    <div className=' flex flex-col mt-5 justify-center '>
      <div className=' mb-5'> 
        <h1 className=' text-xl font-bold'>Hii {user?.firstname}  <span className=' text-3xl'>👋</span></h1>
        <p className=' text-richblack-200 '>Let's Start something new</p>
      </div>

        {loading ? (<div className='spinner'></div>)
            : courses.length > 0 ? (
              <div className=' w-full'>
              <div className=' flex lg:flex-row flex-col w-full gap-x-5'>
                    <div className='p-2 lg:w-[70%] w-full bg-richblack-800 border border-richblack-300 rounded-lg shadow-lg shadow-richblack-400'>
                    <InstructorChart courses={instructorData} />
                    </div>

                    <div className=' lg:w-[30%] lg:p-6  flex flex-col gap-y-5 bg-richblack-800 border border-richblack-300 rounded-lg shadow-lg shadow-richblack-400'>
                        <p className=' text-lg font-bold mb-5'>Statistics</p>
                        <div >
                        <p className="text-lg text-richblack-200">Total Courses</p>
                         <p className="text-3xl font-semibold text-richblack-50">
                         {courses.length}
                          </p>
                        </div>

                        <div>
                            <p className=' text-lg text-richblack-200'>Total Students</p>
                            <p className=' text-3xl font-semibold text-richblack-50'> {totalStudents}</p>
                        </div>
                        
                        <div>
                            <p className=' text-lg text-richblack-200'>Total Revenue</p>
                            <p className=' text-3xl font-semibold text-richblack-50 text-caribbeangreen-200'>Rs. {totalAmount}</p>
                        </div>
                    </div>

                </div>

                {/*  bottom section */}
                <div className=' mt-5  bg-richblack-800 border border-richblack-300 rounded-lg shadow-lg shadow-richblack-400 p-5'>
                    {/* Render coursees */}
                    <div className=' flex flex-row justify-between items-center'>
                        <p className=' text-md font-bold'>Your Courses</p>
                        <Link to="/dashboard/my-courses" className=' text-yellow-100'>
                            <p>View All</p>
                        </Link>
                    </div>

                    <div className=' grid grid-cols-3 gap-4 mt-3'>
                        {
                            courses.splice(0,3).map((course, idx) => (
                                <div className='p-3 rounded-lg bg-richblack-900'>
                                     <img className=' object-cover aspect-square rounded-md' src={course?.thumbnail} alt="Course Thumbnail" />
                                     <div>
                                        <p className='text-lg font-bold '>{course.courseName}</p>

                                        <div className=' text-richblack-200 flex flex-row items-center gap-x-2'>
                                        <p>{course.studentsEnrolled.length} Students</p>
                                        <p>| </p>
                                        <p>Rs {course.price}</p>
                                        </div>
                                     </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
              </div>
                 
            ) : (
                <div>
                    <p>You have not created a course yet</p>
                    <Link to={"/dashboard/addCourse"}>Create a Course</Link>
                </div>
            )
        }
    </div>
  )
}

export default Instructordashboard
