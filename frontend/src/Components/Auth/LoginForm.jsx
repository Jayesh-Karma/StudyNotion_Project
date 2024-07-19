import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Services/AuthApi/authApi';

const LoginForm = () => {
  const [showPw, setShowPw] = useState(false);
  const [user, setUser] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Change handler
  function changeHandle(event) {
    const { name, value } = event.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Submit handler
  async function submitHandler(event) {
    event.preventDefault();
    console.log(user);
    const res = await dispatch(loginUser(user.email, user.password, navigate));
    console.log(res);
  }

  return (
    <div>
      <form className="flex flex-col w-full gap-y-5" onSubmit={submitHandler}>
        <label className='mb-1 text-[1rem] leading-[1.375rem] text-richblack-5'>
          <p>Email Address <sup className='text-pink-200'>*</sup></p>
          <input 
            type="email" 
            placeholder='Enter Email Address'
            name='email'
            value={user.email}
            onChange={changeHandle}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[14px] text-richblack-5"
            style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
            required
          />
        </label> 
        <label className='relative mb-1 text-[1rem] leading-[1.375rem] text-richblack-5'>
          <p>Password <sup className='text-pink-200'>*</sup></p>
          <input 
            type={showPw ? 'text' : 'password'}
            placeholder='Enter Password'
            name='password'
            value={user.password}
            onChange={changeHandle}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[14px] text-richblack-5"
            style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
            required
          /> 
          <span onClick={() => setShowPw(!showPw)} className='absolute bottom-9 right-5 cursor-pointer'>
            {showPw ? <BsEye /> : <BsEyeSlash />}
          </span>
          <Link to="/forgot-password" className='flex justify-end text-blue-100 text-xs mt-1'>Forgot Password?</Link>
        </label>
        <button type="submit" className='bg-yellow-50 p-2 rounded-lg text-black font-bold'>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
