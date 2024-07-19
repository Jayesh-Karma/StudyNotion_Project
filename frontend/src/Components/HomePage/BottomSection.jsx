import React from 'react'
import instructor from "../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTButton from './CTButton'
import { FaArrowRight } from 'react-icons/fa6'

const BottomSection = () => {
  return (
    <div className='mt-16'>

    <div className=' flex lg:flex-row flex-col justify-between items-center gap-20'>
        <div className='lg:w-[50%] w-[80%] lg:shadow-[-20px_-20px_0px_0px] mt-5 shadow-[-14px_-14px_0px_0px]'>
         <img src={instructor} alt="Instructor image"/>
        </div>
        {/*  second box */}
        <div className='lg:w-[50%] w-[80%] flex flex-col gap-10'>
            <div className='text-4xl font-semibold'>
                Become an <br />
                <HighlightText text={"Instructor"} />
            </div>

            <div className=' text-richblack-400 w-[80%]'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>

        <div className='w-fit'>
            <CTButton active={true} link={"/signup"}>
                <div className=' w-fit flex gap-2 flex-row justify-center items-center'>
                 <h4>Start Learning Today</h4>
                <FaArrowRight />
                </div>
                </CTButton>
        </div>
        </div>
    </div>
    </div>
  )
}

export default BottomSection
