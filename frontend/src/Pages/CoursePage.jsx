import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RatingStar from '../Components/Common/RatingStar';
import ConfirmationModal from '../Components/Common/ConfirmationModal';
import { BsShareFill } from 'react-icons/bs';
import { FaCartPlus } from 'react-icons/fa';
import { BiArrowFromLeft, BiPurchaseTag } from 'react-icons/bi';
import Footer from '../Components/Common/Footer';
import Markdown from "react-markdown";
import CourseAccordionBar from '../Components/Core/CourseDetailsPage/CourseAccordionBar';
import GetAvgRating from '../utils/GetAvgRating';
import Error from './Error';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../utils/Constants';
import { addToCart } from '../Reducers/Slices/cartSlice';
import { fetchCourseDetail } from '../Services/Operations/CourseApi';
import { buycourse } from '../Services/Operations/payment';
import ReviewSlider from '../Components/Common/ReviewSlider';

const CoursePage = () => {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null); // Default to null
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState([]);
  const [ratingCount, setRatingCount] = useState(0);
  const [lectureCount, setLecturesCount] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const res = await fetchCourseDetail(courseId);
      if (res.success) {
        setCourseDetails(res.courseDetails);
      } else {
        navigate("/not-found");
      }
      setLoading(false);
    };

    fetchDetails();
  }, [courseId, navigate]);

  useEffect(() => {
    const count = GetAvgRating(courseDetails?.ratingReviews || []);
    setRatingCount(count);
  }, [courseDetails]);

  useEffect(() => {
    let lectures = 0;
    courseDetails?.courseContent?.forEach(element => {
      lectures += element?.subSection?.length || 0;
    });
    setLecturesCount(lectures);
  }, [courseDetails]);

  const shareNow = async () => {
    try {
      await navigator.share({
        title: `Study Junction`,
        text: `Check out this amazing course on ${courseDetails?.category?.name}`,
        url: `http://localhost:5173/courses/${courseId}`
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCart = () => {
    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor, you can't buy a course");
      return;
    }

    if (token) {
      dispatch(addToCart(courseDetails));
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase the course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btnHandler1: () => navigate("/login"),
      btnHandler2: () => setConfirmationModal(null),
    });
  };

  const buyHandler = () => {
    if (token) {
      buycourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase the course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btnHandler1: () => navigate("/login"),
      btnHandler2: () => setConfirmationModal(null),
    });
  };

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!courseDetails) {
    return <Error />;
  }

  return (
    <div className='w-full text-white bg-richblack-900'>
      <div className='pt-10 lg:p-6 flex flex-col justify-center items-center'>
        <div className='bg-richblack-700 lg:w-11/12 lg:p-10 p-5 flex lg:flex-row flex-col justify-between rounded-2xl'>
          <div className='w-[70%] flex flex-col gap-y-3'>
            <p className='lg:text-4xl text-2xl font-bold'>{courseDetails?.courseName}</p>
            <p className='text-xl text-richblack-200'>{courseDetails?.courseDescription}</p>
            <div className='lg:flex lg:flex-row items-center gap-x-3'>
              <RatingStar Review_Count={ratingCount} Star_Size={24} />
              <p>{ratingCount} stars</p>
              <p>({courseDetails?.ratingReviews?.length || 0} Reviews)</p>
              <p>{courseDetails?.studentsEnrolled?.length || 0} Students Enrolled</p>
            </div>
            <p className='text-richblack-300'>Instructor <span className='text-white'>{courseDetails?.instructor?.firstname} {courseDetails?.instructor?.lastname}</span></p>
          </div>

          <div className='lg:w-[20%] lg:aspect-square overflow-visible lg:absolute lg:flex lg:flex-col lg:right-52 bg-richblack-800 p-6 rounded-xl'>
            <img src={courseDetails?.thumbnail} alt="" className='w-full h-full object-cover aspect-square rounded-lg' />
            <p className='text-lg font-semibold text-richblack-300 mt-2'>Price <span className='text-white font-bold'> {courseDetails?.price} Rs.</span></p>
            <div className='flex flex-col p-2 gap-y-2'>
              <button className='p-2 bg-yellow-200 rounded-xl text-black font-bold flex flex-row items-center justify-center gap-x-2'
                onClick={
                  user && user?.courses?.includes(courseId) ? () => navigate("/dashboard/enrolled-courses") : buyHandler
                }>
                {
                  user && user.courses.includes(courseId) ? (<> Watch Now <BiArrowFromLeft /> </>) : (<>Buy Now <BiPurchaseTag /> </>)
                }
              </button>
              {
                user && !user.courses.includes(courseId) &&
                <button className='p-2 bg-richblack-700 rounded-xl flex flex-row justify-center items-center gap-x-2' onClick={handleCart}>Add to Cart <FaCartPlus /></button>
              }
              <button className='p-2 rounded-xl bg-richblack-600 flex flex-row justify-center items-center gap-x-2' onClick={shareNow}>Share Now <BsShareFill /></button>
            </div>
            <p className='text-sm text-richblack-400 text-center'>30-days Money-Back Guarantee</p>
          </div>
        </div>

        <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
          <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
            <div className="my-8 border border-richblack-600 p-8">
              <p className="text-3xl font-semibold">What you'll learn</p>
              <div className="mt-5">
                <Markdown>{courseDetails?.whatWillYouLearn}</Markdown>
              </div>
            </div>

            <div className="max-w-[830px]">
              <div className="flex flex-col gap-3">
                <p className="text-[28px] font-semibold">Course Content</p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex gap-2">
                    <span>{`${courseDetails?.courseContent?.length || 0} section(s)`}</span>
                    <span>{`${lectureCount} lecture(s)`}</span>
                    <span>{`${courseDetails?.totalDuration} total length`}</span>
                  </div>
                  <div>
                    <button className="text-yellow-25" onClick={() => setIsActive([])}>
                      Collapse all sections
                    </button>
                  </div>
                </div>
              </div>

              <div className="py-4">
                {courseDetails?.courseContent?.map((course, index) => (
                  <CourseAccordionBar course={course} key={index} isActive={isActive} handleActive={handleActive} />
                ))}
              </div>
            </div>

            {/* <div className="my-8 border border-richblack-600 p-8">
              <p className="text-3xl font-semibold">Reviews</p>
              <div className="mt-5">
                {courseDetails?.ratingReviews?.map((review, index) => (
                
                  <div className="flex flex-col gap-4 p-4" key={index}>
                  {console.log(review)}
                    <div className="flex items-center gap-4">
                      <img
                        src={review?.user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                        alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold text-richblack-5">
                          {`${review?.user?.firstName} ${review?.user?.lastName}`}
                        </p>
                        <p className="text-sm text-richblack-500">{`Reviewed ${new Date(review?.createdAt).toLocaleDateString()}`}</p>
                      </div>
                    </div>
                    <RatingStar Review_Count={review?.rating} Star_Size={20} />
                    <p className="text-richblack-25">{review?.review}</p>
                  </div>
                ))}
              </div>
            </div> */}
            <div>
              <ReviewSlider />
            </div>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal {...confirmationModal} />}
      <Footer />
    </div>
  );
};

export default CoursePage;
