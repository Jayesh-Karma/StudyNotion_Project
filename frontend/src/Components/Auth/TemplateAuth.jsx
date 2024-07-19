import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import mask from "../../assets/Images/frame.png"

const TemplateAuth = ({heading, formtype, subHeading, highlightText, img1 }) => {
  return (
        <div className='h-full w-full flex flex-row justify-center items-center'>
    <div className='flex lg:flex-row flex-col justify-center items-center'>
      <div className='w-11/12 h-full flex lg:flex-row flex-col-reverse justify-between gap-y-12  text-white py-12 '>
{/* signup div */}

      <div className='lg:w-[35%] flex flex-col justify-evenly'>
        <div className=' w-full flex flex-col'>

        <h1 className=' text-3xl font-inter font-bold leading-snug'>{heading}</h1>
        <p className=' text-richblack-200 text-lg mt-4'>{subHeading}
        <HighlightText text={highlightText}  /> </p>

        </div>
        <div className='w-full mt-10'> 
          {(formtype === "signup") ? <SignupForm /> : <LoginForm />}
        </div>

      </div>

      <div className='lg:w-[60%] flex lg:flex-row justify-end items-center'>
      <div className='lg:w-[60%] relative flex justify-center items-center'>
        <img src={mask} alt="" className=''/>
        <img src={img1} alt="" className=' absolute bottom-3 right-5' />
      </div>

      </div>


      </div>
    </div>
        </div>
  )
}

export default TemplateAuth
