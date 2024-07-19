import React, { useEffect, useState } from 'react'
import VideoPlayerSidebar from '../Components/Core/ViewCourse/VideoPlayerSidebar'
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../Components/Core/ViewCourse/CourseReviewModal';
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../Services/Operations/CourseApi';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoofLectures } from '../Reducers/Slices/viewCourseSlice';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId, sectionId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
// console.log(courseId, sectionId)
    useEffect(()=>{
        const fullCourseData = async() =>{
            const data = await getFullDetailsOfCourse(courseId, token);

                    console.log(data)
            dispatch(setCourseSectionData(data?.courseDetails?.courseContent));
            dispatch(setCourseEntireData(data.courseDetails));
            dispatch(setCompletedLectures(data.completedVideos)); 
            let lectures =0;
            data?.courseDetails?.courseContent?.forEach(element => {
                // console.log(element.subSection.length   )
                lectures += element?.subSection?.length 
            });
            // console.log(lectures)
            dispatch(setTotalNoofLectures(lectures));
        }
        fullCourseData()
    } ,[courseId])

    return (
    <>
         <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoPlayerSidebar  setReviewModal={setReviewModal} />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-6">
                    <Outlet />
                </div>
            </div>
        </div>
        { reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse
