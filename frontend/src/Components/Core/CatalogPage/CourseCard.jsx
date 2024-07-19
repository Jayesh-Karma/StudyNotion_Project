import React, { useEffect, useState } from 'react'
import RatingStar from '../../Common/RatingStar'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/GetAvgRating';


const CourseCard = ({course, Height}) => {
  // console.log(course)
  const [avgRating, setAvgRating] = useState(0); 

  useEffect(() => {
    const count = GetAvgRating(course?.ratingReviews);
    setAvgRating(count);
  }, [course]); 

  return (
    <div>
      <Link to={`/courses/${course?._id}`}>
        <div>
            <div>
                <img src={course?.thumbnail} alt="Course Thumbnail"  className={` ${Height} w-full rounded-xl object-cover`}/>
            </div>
            <div>
                <p className=' text-xl font-bold mt-2'>{course?.courseName}</p>
                <p className=' text-sm font-semibold text-richblack-400'> {course?.instructor?.firstname} {course?.instructor?.lastname}</p>
                <div className=' flex flex-row justify-start items-center gap-x-3'>
                    <span>{avgRating ||0}</span>
                    <RatingStar Review_Count={avgRating} />
                    <span>{course?.ratingReviews?.length} Ratings</span>
                </div>
                <p className=' font-bold text-white text-lg'> <span className=' text-richblack-300'>Buy for</span>  {course?.price} &#8377;</p>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard
