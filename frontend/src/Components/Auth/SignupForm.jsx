import React, { useState } from 'react'
import { BsEye, BsEyeFill, BsEyeSlash } from 'react-icons/bs'

import img1 from "../../assets/Images/signup.webp"
import { useDispatch } from 'react-redux'
import { setSignupData } from '../../Reducers/Slices/authSlice'
import { sendOtp } from '../../Services/AuthApi/authApi'
import { useNavigate } from 'react-router-dom'
const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormdata] = useState({
        firstname:'',
        lastname:'', 
        email:'', 
        password:'',
        confirmPassword:'',
        userType:'Student'
    });
    const[showPw, setShowPw] = useState(false)
    const[showPw2, setShowPw2] = useState(false)
    
    function changeHandler(e){

      let {name, value} = e.target;
      // console.log(name, value, checked, type)
      setFormdata((prev) =>{
        return{
          ...prev,
          [name]: value
        }
      })
      // console.log(formData) 

    }
    
    // submit handler 
    function submitHandler(e){
      // console.log(e)
    e.preventDefault();
    const res1 = dispatch(setSignupData(formData));
    console.log(res1)
    const res2 = dispatch(sendOtp(formData.email, navigate))
    console.log(res2)
      console.log(formData)
      
    }
  

  return (
    <div>
         <form className="flex w-full flex-col gap-y-5" onSubmit={submitHandler}>

        <div className='w-full flex  overflow-hidden'>
          <div className='flex bg-richblack-800 rounded-3xl p-1 gap-2 transition-all duration-100 '>

              <label className={`border border-richblack-800 p-3 transition-all duration-200 ease-in  ${formData.userType === 'Instructor' ? "bg-black rounded-2xl ":""}`}>
              Instructor
              <input 
              type="radio" 
              name="userType" 
              value="Instructor"
              checked={formData.userType === 'Instructor'}
              onChange={changeHandler} 
              className={`hidden`}
              />
              </label>  
              
              <label className={`border border-richblack-800 p-3 transition-all duration-200 ease-in  ${formData.userType === 'Student' ? "bg-black rounded-2xl" :"" }` }>
              Student
              <input 
              type="radio" 
              name="userType" 
              value="Student"
              checked={formData.userType === 'Student'}
              onChange={changeHandler}
              className='hidden'
              />
              </label>
          </div>
        </div>


        <div className='w-full flex justify-between gap-x-6'>
            <label className='mb-1 text-[1rem] leading-[1.375rem] text-richblack-5'>
            <p>First Name <sup className='text-pink-200'>*</sup></p>
            <input 
            type="text" 
            placeholder='Enter first name'
            name='firstname'
            value={formData.firstname}
            onChange={changeHandler}
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[14px] text-richblack-5"
            />
          </label> 
          <label className='mb-1 text-[1rem] leading-[1.375rem] text-richblack-5'>
            <p>Second Name <sup className='text-pink-200'>*</sup></p>
            <input 
            type="text" 
            placeholder='Enter last name'
            name='lastname'
            value={formData.lastname}
            onChange={changeHandler}
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[14px] text-richblack-5"
            />    
          </label> 

        </div>
        <div>
        <label className='mb-1 text-[1rem] leading-[1.375rem] text-richblack-5'>
                <p>Email <sup className='text-pink-200'>*</sup></p>
                <input type="email"
                placeholder='Enter your mail'
                name='email'
                value={formData.email}
                onChange={changeHandler}
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[14px] text-richblack-5"
                /> 
              </label>
        </div>

        <div className='flex justify-between gap-x-4'>
        <label className=' relative mb-1 text-[1rem] leading-[1.375rem] text-richblack-5'>
                <p>Create Password <sup className='text-pink-200'>*</sup></p>
                <input 
                type={(showPw)? `text` : 'password' }
                placeholder='Enter Password'
                name='password'
                value={formData.password}
                onChange={changeHandler}
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
                className="w-full rounded-[1rem] bg-richblack-800 p-[14px] text-richblack-5"
                /> 
                <p onClick={() => setShowPw(!showPw)} className=' absolute bottom-4 right-2'>
                {(showPw) ? <BsEye />: <BsEyeSlash /> }
                </p>

              </label>
              <label className=' relative mb-1 text-[1rem] leading-[1.375rem] text-richblack-5'>
                <p>Confirm Password <sup className='text-pink-200'>*</sup></p>
                <input 
                type={(showPw2)?"text" :"password" }
                placeholder='Confirm Password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={changeHandler}
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[14px] text-richblack-5"
                /> 
                  <p onClick={()=> setShowPw2(!showPw2)} className=' absolute bottom-4 right-2'>
                {(showPw) ? <BsEye />: <BsEyeSlash /> }
                </p>
              </label>
        </div>
                
                <button className=' bg-yellow-50 p-2 rounded-lg text-black font-bold'>
                    Create Account
                </button>
            
        </form>
      
    </div>
  )
}

export default SignupForm
