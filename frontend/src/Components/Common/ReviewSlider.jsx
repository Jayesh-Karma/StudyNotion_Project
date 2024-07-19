import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import { FreeMode, Navigation, Pagination} from "swiper"
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../Services/apiConnector';
import { categories, ratingEndpoint } from '../../Services/apis';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa6';


const ReviewSlider = () => {  
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

    useEffect(()=> {
        const fetchAll = async() =>{
            const res = await apiConnector("GET", ratingEndpoint.GET_ALL_RATINGS);
            if(res?.data?.success){
                setReviews(res?.data?.data);
            }
        }
        fetchAll()
    }, [])
    
    console.log(reviews)
    return (
    <div className=' p-5 m-5 text-white'>
        {
            reviews.length < 1 ? (
                <div> No Reviews Found</div>
            ) : (
                <div className=' h-[190px]'>
                    <Swiper
                    slidesPerView={4}
                    spaceBetween={24}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay:2500
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className='w-full'
                    >
                        {
                            reviews.map((review, idx) => (
                                <SwiperSlide key={idx}>

                                <div className=' flex flex-row justify-start gap-5 items-center'>
                                    <img src={review?.user?.img ? review?.user?.img : `https://api.dicebear.com/8.x/initials/svg?seed=${review?.user?.firstname} ${review?.user?.lastname}`} alt="Profile pic"
                                    className=' h-9 w-9 object-cover rounded-full' />
                                    

                                    <div className=' flex flex-col'>
                                    <p>{review?.user?.firstname} {review?.user?.lastname} </p>
                                    <p className=' text-sm text-richblack-200'>{review?.course?.courseName}</p>
                                    </div>
                                </div>
                                    <p className=' mt-3'>   
                                        {"  "+ review?.review}
                                    </p>


                                <div className=' flex flex-row items-center gap-x-3'>
                                    <p>{review?.rating}</p>
                                    <ReactStars count={5} value={Number(review?.rating)} size={20} edit={false} 
                                    activeColor="#ffd700" emptyIcon={<FaStar />} fullIcon={<FaStar />} />
                                </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            )
        }
    </div>
  )
}

export default ReviewSlider
