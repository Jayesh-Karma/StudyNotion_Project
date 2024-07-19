import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component';
import { GiNinjaStar } from 'react-icons/gi';
import { RiDeleteBin6Fill, RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../Reducers/Slices/cartSlice';
import RatingStar from '../../Common/RatingStar';
import { FaShoppingCart } from 'react-icons/fa';

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    cart.map((item, idx) => console.log(item))

  return (
    <div className=' flex flex-row flex-wrap'>
      {
        cart.map((course, idx) => (
            <div key={idx} className=' m-6 bg-richblack-700 p-5 rounded-3xl w-64'> 
                <div className='flex flex-col justify-between items-start gap-y-2  '>
                <img className=' aspect-square h-52 object-cover bg-richblack-800 p-2 rounded-xl' src={course.thumbnail} alt="" />
                    <p className=' text-richblack-50 text-2xl font-bold '>{course?.courseName}</p>
                    <p className=' text-richblack-200 '>{course?.category?.name}</p>
                    <div className=' flex flex-row justify-start items-center gap-3'>
                        <RatingStar Star_Size={20} />
                        <span>{course?.ratingAndReviews}</span>

                        <span>{course.ratingAndReviews} Ratings</span>
                    </div>  

                <div className='flex flex-row items-center gap-x-2'>
                    <button 
                    className=' flex flex-row justify-between items-center gap-3 bg-richblack-600 p-2 rounded-xl  text-pink-400'
                    onClick={()=> dispatch(removeFromCart(course._id))}
                    >
                        <RiDeleteBin6Line  />
                        <span>Remove</span> 
                    </button>

                    <p className=' flex flex-row items-center gap-2 text-xl text-yellow-100'>RS. {course?.price} <FaShoppingCart /></p>

                </div>
                </div>

            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
