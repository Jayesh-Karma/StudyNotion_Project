import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData, setLoading } from '../../Reducers/Slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signup } from '../../Services/AuthApi/authApi';
import OTPInput from 'react-otp-input';
import { FaArrowLeft } from 'react-icons/fa';
import { LuTimerReset } from 'react-icons/lu';


const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // console.log(otp);
    const {signupData, loading} = useSelector((state) => state.auth);
    
    // console.log(signupData);
    //submit handler where we attach out otp with signup data
    function submitHandler(e){
        e.preventDefault();
        const {firstname, lastname, email, userType,password, confirmPassword} = signupData;
        
        const res = dispatch(signup(firstname, lastname, email, userType, password, confirmPassword, otp, navigate));

        console.log(res);
    }
    
    useEffect(()=>{
        
        if(!signupData){
            toast.error("Signup first please");
            navigate("/signup")
        }
    },[])
   
    return (
      <div className='w-11/12 text-richblack-5 flex flex-col justify-center items-center h-[80vh] mx-auto'>
      <div className='lg:w-[30%] md:w-[50%]  flex flex-col justify-between items-start gap-y-5'>
            <h1 className=' text-3xl font-bold font-inter'>
               Verify Email
            </h1>
            <p className=' text-richblack-400'>
            A Verification code hads been send to you. Enter the code below
            </p>
      <form className='w-full' onSubmit={submitHandler}>
      {/* <label>
        <input type="number" className='text-black' placeholder='Enter your otp' value={otp} onChange={(e) => setOtp(e.target.value)} />
      </label> */}

      <OTPInput
      value={otp}
      onChange={(value) => {console.log(value); setOtp(value)}}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} 
      style={{
       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                
      />}
    />
      <button className='mt-4 bg-yellow-50 p-2 rounded-lg text-black w-full hover:py-3 transition-all' >Submit</button>
      </form>

      <div className=' w-full flex flex-row justify-between items-center'>
      <Link to={"/login"} className='flex items-center gap-2'>
                   <FaArrowLeft />  Go back to login
      </Link>

      <Link to={"/signup"} className='flex justify-between items-center gap-2'>
      <LuTimerReset />  
      Resend Otp
      </Link>
      </div>


    </div>
    </div>
    
  )
}
  

export default VerifyOtp
