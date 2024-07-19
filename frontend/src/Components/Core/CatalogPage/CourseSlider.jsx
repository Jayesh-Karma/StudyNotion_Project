import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination"
import { Pagination, Autoplay, Navigation } from 'swiper/modules';


import CourseCard from './CourseCard';
// Import Swiper styles
import "swiper/css";

const CourseSlider = ({Courses}) => {
  return (
    <>
    { Courses &&  Courses.length > 0 ? 
     ( <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={50}
        pagination={true}
        autoplay={
          {delay:2500, disableOnInteraction:false}
        }
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        className='mySwiper'
        breakpoints={
          { 1024 : { slidesPerView:3}}
        }
     >
        {
          Courses?.map((course, idx) =>(
            <SwiperSlide key={idx}>
            {/* {console.log(course)} */}
             <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))
        }
      </Swiper>)
      :
      (
        <div className='text-white h-32 flex justify-center items-center '>No Courses Found</div>
      )
    }
    </>
  )
}

export default CourseSlider
