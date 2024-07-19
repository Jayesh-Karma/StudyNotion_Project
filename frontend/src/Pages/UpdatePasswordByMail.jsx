import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../Services/AuthApi/authApi';
import { BsEye, BsEyeSlash, BsEyeSlashFill } from 'react-icons/bs';

const UpdatePasswordByMail = () => {
    
    const token = location.pathname.split("/").at(-1)
    // console.log(token)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('')

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    function submithandler(e){
      e.preventDefault()
      console.log(password,confirmPw)
      const res = dispatch(resetPassword(password, confirmPw, token, navigate))
    }
    

  return (
    <div className='w-11/12 text-richblack-5 flex flex-col justify-center items-center h-[80vh] mx-auto'>
          <div className='lg:w-[30%] md:w-[50%]  flex flex-col justify-between items-start gap-y-5'>
                <h1 className=' text-3xl font-bold font-inter'>
                   Choose new password
                </h1>
                <p className=' text-richblack-400'>
                   Almost done, Enter your new password and you are all set.
                </p>

                <form className='w-full' onSubmit={submithandler}>
                   
                        

                        <label className='relative'>
                            <p>New Password <sup className='   text-pink-300'>*</sup></p>
                            <input 
                            type={show1?`text`:`password`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your Email Address'
                            className=' w-full rounded-[0.5rem] bg-richblack-800 p-[14px] text-richblack-5'
                             />
                         <p onClick={()=> setShow1(!show1)} className=' cursor-pointer absolute bottom-0 right-5'>
                          {(show1) ? <BsEye />: <BsEyeSlash /> }
                        </p>
                        </label>
                        <label className='relative'>
                            <p className='mt-5'>Confirm Password <sup className=' text-pink-300'>*</sup></p>
                            <input 
                            type={show2?`text`:`password`}
                            value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                            placeholder='Enter your Email Address'
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[14px] text-richblack-5'
                             />
                              <p onClick={()=> setShow2(!show2)} className=' cursor-pointer absolute bottom-0 right-5'>
                {(show2) ? <BsEye />: <BsEyeSlash /> }
                </p>
                        </label>
                            <button className=' mt-4 bg-yellow-50 p-2 rounded-lg text-black w-full hover:py-3 transition-all' >
                                Reset Password
                            </button>
                        
                   
                </form>
                <Link to={"/login"} className='flex items-center gap-2'>
                   <FaArrowLeft />  Go back to login

                </Link>  


            </div>
         
    </div>
  )
}

export default UpdatePasswordByMail
