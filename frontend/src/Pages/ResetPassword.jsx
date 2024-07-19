import React, { useState } from 'react'
import { BiLeftArrow } from 'react-icons/bi';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPasswordCall, sendOtp } from '../Services/AuthApi/authApi';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth)

    // submit handler for password change
    async function submitHandler (e){
        e.preventDefault();  
        const res = dispatch(resetPasswordCall(email, setEmailSent))
        console.log(res);
    }

    // async function resendOtp(){
    //     if(email == ''){
    //         toast.error("Enter Your Email First ");
    //         return;
    //     }
    //         const res = dispatch(resetPasswordCall(email, setEmailSent));
            // console.log("Hello");
        
    // }   


    return (
    <div className='w-11/12 text-richblack-5 flex flex-col justify-center items-center h-[80vh] mx-auto'>
      {
        loading ? (<div> Loading......</div> ):(
            <div className='lg:w-[30%] md:w-[50%]  flex flex-col justify-between items-start gap-y-5'>
                <h1 className=' text-3xl font-bold font-inter'>
                    { !emailSent ? "Reset Password" : "Check Your Email" }
                </h1>
                <p className=' text-richblack-400'>
                    {!emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}` }
                </p>
                <form className='w-full' onSubmit={submitHandler}>
                    { !emailSent && (
                        <div>

                        <label>
                            <p>Email Address <sup className=' text-pink-300'>*</sup></p>
                            <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your Email Address'
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[14px] text-richblack-5'
                             />
                        </label>
                            <button className=' mt-4 bg-yellow-50 p-2 rounded-lg text-black w-full hover:py-3 transition-all' >
                                Reset Password
                            </button>
                        </div>
                    )

                    }
                </form>
                { emailSent && <button className=' mt-4 bg-yellow-50 p-2 rounded-lg text-black w-full hover:py-3 transition-all' onClick={submitHandler} >
                            Resend Email 
                </button>}
                <div>
                <Link to={"/login"} className='flex items-center gap-2'>
                   <FaArrowLeft />  Go back to login

                </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default ResetPassword
