import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../../../Services/Operations/CourseApi';
import { useSelector } from 'react-redux';
import ModelBtn from "../../Common/ModelBtn"
import {IoIosArrowDown, IoIosArrowDropleft, IoIosArrowDropright, IoIosArrowUp} from "react-icons/io"

const VideoPlayerSidebar = ({setReviewModal}) => {

  const {courseId, sectionId, subSectionId} = useParams();
  const [activeStatus , setActiveStaus] = useState("");
  const [videobarActive, setVideobarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation()
  
  const { courseSectionData, courseEntireData, totalNoofLectures, comletedLectures} = useSelector((state) => state.viewCourse)
  // console.log(courseSectionData, courseEntireData, Number(totalNoofLectures), comletedLectures)


  function setAllThings(){
    if(!courseSectionData?.length){
      return;
    }
    
    const currentSectionIdx = courseSectionData?.findIndex((data) => data._id === sectionId);
    
    const currentSubsectionIdx = courseSectionData[currentSectionIdx]?.subSection?.findIndex((data) => data._id === subSectionId);
    const activeSubsectionId = courseSectionData[currentSectionIdx]?.subSection[currentSubsectionIdx]?._id

    // /set current section here 
    setActiveStaus(courseSectionData?.[currentSectionIdx]?._id);
    //  set current subsection here 
    setVideobarActive(activeSubsectionId);
  }



  useEffect(() =>{
    setAllThings();
  }, [courseSectionData, courseEntireData, location.pathname]);


  return (
    <div className=' flex flex-col border border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] w-[20%] bg-richblack-800 pt-5'>
    {/*  for back button and heading  */}
    <div className=' text-richblack-5'>
          {/*  for buttons */}
          <div  className=' flex flex-row items-center justify-between pl-5 pr-5'>
            <div onClick={()=> navigate("/dashboard/enrolled-courses")} className=' cursor-pointer'> <IoIosArrowDropleft size={30}/> </div>
            <ModelBtn 
                  text={"Add Review"}
                  onclick={() => setReviewModal(true)}
                />
          </div>
          <div className=' flex flex-col justify-center items-start mt-2 pl-5 pr-5'>
              <p className=' text-xl'>{courseEntireData?.courseName}</p>
              <p className=' text-md text-richblack-300'>{comletedLectures?.length} / {totalNoofLectures}</p>
          </div>

        </div>

        <div>
          {
            courseSectionData?.map((section, idx) => (
            
              <div
              onClick={() => setActiveStaus(section?._id)} key={idx}>
                  
                  <div className=' bg-richblack-700 text-richblack-5 flex flex-row justify-between items-center p-3'>
                    <p>{section?.sectionName}</p>
                    {
                      (activeStatus ===  section._id) ?  
                      <IoIosArrowUp /> : <IoIosArrowDown />

                    }
                  </div>

                  <div>
                  {
                    activeStatus === section?._id && (
                      <div>
                        {
                          section?.subSection?.map((topic, idx) => (
                            <div className={`flex gap-4 cursor-pointer p-5 ${videobarActive === topic?._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-900 text-white"}`} key={idx}
                             onClick={()=>{ 
                                // console.log(courseEntireData._id, "sectionId", section._id, "subsectionId", topic._id)
                                navigate(`dashboard/course/${courseEntireData?._id}/section/${section?._id}/subsection/${topic?._id}`)
                                setVideobarActive(topic?._id)
                                }} >
                              <input type="checkbox" disabled 
                              checked={ comletedLectures?.includes(topic?._id)}
                             
                              />
                              <span>
                                {topic?.title}
                              </span>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                  </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default VideoPlayerSidebar
