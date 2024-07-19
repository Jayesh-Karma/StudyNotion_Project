import React from 'react'
import HighlightText from './HighlightText'
import img1 from "../../assets/Images/Know_your_progress.svg";
import img2 from "../../assets/Images/Compare_with_others.svg";
import img3 from "../../assets/Images/Plan_your_lessons.svg"
import CTButton from './CTButton';

const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-5 mt-[110px] items-center'>
        <div className=' text-4xl font-semibold text-center'>
        Your swiss knife for 
        <HighlightText text={"learning any language"} />
        </div>

        <div className=' text-center text-richblack-600 lg:w-[70%] mx-auto'>
        <p>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </p>
        </div>


      
        <div className='flex lg:justify-center flex-col items-center lg:mt-5'>
            <img className=' object-contain lg:-mr-32' src={img1} alt="Know your progress" />
            <img className=' object-contain' src={img2} alt="not found" />
            <img className=' object-contain lg:-ml-36' src={img3} alt="not found" />
        </div>

        <div className='w-fit'>
            <CTButton active={true}>
                Learn more
            </CTButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection
