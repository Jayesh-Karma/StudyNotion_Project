import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from 'react-icons/md';
import { COURSE_STATUS } from '../../../../utils/Constants';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../Common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../Services/Operations/CourseApi';


const CoursesTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  console.log(courses);

  const courseDeleteHandler = async(courseId) => {
    setLoading(true);

    const result = await deleteCourse({courseId}, token);
    setLoading(false);
    setConfirmationModal(null)
    const newcourse = await fetchInstructorCourses(token);
    setCourses(newcourse)
    
  }
  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full bg-richblack-800 text-richblack-50 border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 text-gray-600 uppercase tracking-wider">
              Courses
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 text-gray-600 uppercase tracking-wider">
              Details
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 text-gray-600 uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={index}>
                <td className="px-3 py-2 w-52 whitespace-no-wrap border-b border-gray-200 ">
                  <img src={course.thumbnail} className='h-[150px] w-[250px]' alt="Not found" />
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div>
                  <p className=' font-bold text-md p-1'>{course.courseName}</p>
                  <p className=' text-richblack-500'>{course.courseDescription}</p>
                  <p className={`${course.status === 'Draft' ? ' text-pink-500' :' text-caribbeangreen-300'}`}> {course.status} </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {course.duration ? course.duration : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{course.price}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-[20%] gap-10">
                  <button 
                  onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                  className="text-indigo-600 hover:text-indigo-900 " disabled={loading} > 

                    <CiEdit size={25}/>
                  
                  </button>
                  
                  <button onClick={() => {
                    setConfirmationModal({
                     text1:"Do you want to delete this Course ?",
                    text2:"All the data related to this course will be deleted",
                    btn1Text:"Delete",
                    btn2Text:"Cancel",
                    btnHandler1: !loading ? ()=> {courseDeleteHandler(course._id)} : ()=> {},
                    btnHandler2: !loading ? ()=> {setConfirmationModal(null)}: {}
                    })
                  }}>
                    <MdDelete size={25} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-3 py-2 w-52 whitespace-no-wrap border-b border-gray-200 " colSpan="4">
                <p>No courses available</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  );
}

export default CoursesTable;
