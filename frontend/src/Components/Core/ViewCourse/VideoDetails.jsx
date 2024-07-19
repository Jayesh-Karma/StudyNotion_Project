import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../Services/Operations/CourseApi';
import { updateCompletedLecture } from '../../../Reducers/Slices/viewCourseSlice';
import { Player } from 'video-react';

import 'video-react/dist/video-react.css';
import { AiFillPlayCircle } from 'react-icons/ai';
import ModelBtn from '../../Common/ModelBtn';
import { RiRestartFill } from 'react-icons/ri';

const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef();
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, completedLectures } = useSelector((state) => state.viewCourse);

    const [videoData, setVideoData] = useState(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourseData = async () => {
            if (!courseSectionData.length || !courseId || !sectionId || !subSectionId) {
                navigate("/dashboard/enrolled-courses");
                return;
            }
            
            const section = courseSectionData.find(course => course._id === sectionId);
            const subSection = section?.subSection.find(sub => sub._id === subSectionId);
            
            if (subSection) {
                setVideoData(subSection);
                setVideoEnded(false);
            }
        }
        fetchCourseData();
    }, [courseSectionData, courseId, sectionId, subSectionId, navigate]);

    const isFirstVideo = () => {
        const sectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
        const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(data => data._id === subSectionId);

        return sectionIndex === 0 && subSectionIndex === 0;
    }

    const isLastVideo = () => {
        const sectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
        const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(data => data._id === subSectionId);
        const isLastSubSection = subSectionIndex === courseSectionData[sectionIndex].subSection.length - 1;
        const isLastSection = sectionIndex === courseSectionData.length - 1;

        return isLastSection && isLastSubSection;
    }

    const goToNextVideo = () => {
        const sectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
        const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(data => data._id === subSectionId);

        if (subSectionIndex < courseSectionData[sectionIndex].subSection.length - 1) {
            const nextSubSectionId = courseSectionData[sectionIndex].subSection[subSectionIndex + 1]._id;
            navigate(`/dashboard/course/${courseId}/section/${sectionId}/subsection/${nextSubSectionId}`);
        } else if (sectionIndex < courseSectionData.length - 1) {
            const nextSectionId = courseSectionData[sectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[sectionIndex + 1].subSection[0]._id;
            navigate(`/dashboard/course/${courseId}/section/${nextSectionId}/subsection/${nextSubSectionId}`);
        }
    }

    const goToPrevVideo = () => {
        const sectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
        const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(data => data._id === subSectionId);

        if (subSectionIndex > 0) {
            const prevSubSectionId = courseSectionData[sectionIndex].subSection[subSectionIndex - 1]._id;
            navigate(`/dashboard/course/${courseId}/section/${sectionId}/subsection/${prevSubSectionId}`);
        } else if (sectionIndex > 0) {
            const prevSectionId = courseSectionData[sectionIndex - 1]._id;
            const prevSubSectionId = courseSectionData[sectionIndex - 1].subSection[courseSectionData[sectionIndex - 1].subSection.length - 1]._id;
            navigate(`/dashboard/course/${courseId}/section/${prevSectionId}/subsection/${prevSubSectionId}`);
        }
    }

    const handleLectureCompletion = async () => {
        setLoading(true);

        const res = await markLectureAsComplete({ courseId, subSectionId }, token);
        console.log(res)
        dispatch(updateCompletedLecture(subSectionId));
        setLoading(false);
    }

    return (
        <div className=' relative '>
            {!videoData ? (
                <div>No Data Found</div>
            ) : (
                <Player
                    ref={playerRef}
                    aspectRatio='16:9'
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                    src={videoData.videoUrl}
                >
                    {/* <AiFillPlayCircle /> */}
                    {videoEnded && (
                        <div className=' p-5 absolute left-96 top-48 z-50  rounded-lg flex flex-col justify-center items-center'>

                            <div className=' p-2 text-xl font-inter'>
                            {!completedLectures?.includes(subSectionId) && (
                                <ModelBtn 
                                    disabled={loading}
                                    onclick={handleLectureCompletion}
                                    text={!loading ? "Mark as Completed" : "Loading..."}
                                />
                            )}
                            </div>
                            <ModelBtn
                                disabled={loading}
                                onClick={() => {
                                    if (playerRef.current) {
                                        playerRef.current.seek(0);
                                        setVideoEnded(false);
                                    }
                                }}
                                // text="Rewatch"
                                classname="text-5xl rounded-full"
                            >
                                <RiRestartFill />
                            </ModelBtn>
                            <div className=' flex flex-row justify-between items-center gap-x-5 p-2'>
                                {!isFirstVideo() && (
                                    <button
                                        disabled={loading}
                                        onClick={goToPrevVideo}
                                        className='cursor-pointer p-3 text-md rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5 hover:bg-richblack-500 transition-all'
                                    >
                                        Prev
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button
                                        disabled={loading}
                                        onClick={goToNextVideo}
                                        className='cursor-pointer p-2 rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5  hover:bg-richblack-500 transition-all'
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </Player>
            )}
            <h1 className=' p-5 text-richblack-5 text-xl'>{videoData?.title}</h1>
            <p className=' px-5 text-richblack-200'>{videoData?.description}</p>
        </div>
    )
}

export default VideoDetails;
