import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {

    const {total, totalItems} = useSelector((state) => state.cart);
    console.log(total, totalItems)

  return (
    <div className=''>
        <h1  className='text-3xl lg:mb-7'>Your Cart</h1>
        <p className=' text-richblack-400 border-b  '> {totalItems} Courses in cart</p>
        {
            total> 0 ?(
                <div className=' flex lg:flex-row flex-col-reverse justify-between items-start w-full'>
                    <RenderCartCourses />
                    <RenderTotalAmount />
                </div>
            ):( <div className='w-full flex flex-col justify-center items-center text-4xl font-light text-richblack-200 mt-5'> Your cart is empty</div>)
        }
    </div>
  )
}

export default Cart
