import React from 'react'
import { useSelector } from 'react-redux'
import ModelBtn from '../../Common/ModelBtn';
import { buycourse } from '../../../Services/Operations/payment';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../../../Reducers/Slices/cartSlice';

const RenderTotalAmount = () => {
    const {total, cart} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    
    const navigate = useNavigate();
    const dispatch = useNavigate();

    const handleBuyCourse = async () => {
        const courses = cart.map((course) => course._id);
         const res = await buycourse(token, courses, user, navigate, dispatch);
        if(res){
          dispatch(resetCart())
        }
    }
  return (
    <div className=' bg-richblack-700 p-5 flex flex-col gap-y-2 rounded-xl mt-6'>
      <div className=' flex flex-row items-center gap-3 text-xl'>
      <p>Total :</p>
      <p>Rs {total }</p>
      </div>

      <ModelBtn
      classname={" text-xl hover:bg-yellow-300 hover:scale-105 transition-all ease-in-out"}
      text={"Buy Now"} 
      onclick={handleBuyCourse}
      />
    </div>
  )
}

export default RenderTotalAmount
