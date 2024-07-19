import React from 'react'
import HighlightText from './HighlightText';
import { FaArrowRight } from 'react-icons/fa6';
import CTButton from './CTButton';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({childern,codeBoxGradient, heading, subHeading, position, button1, button2, bgGradient, codeColor, codeContent}) => {
  return (
    <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>

    {/*  section one 1 */}
    <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-300 font-bold text-base w-[85%] mt-3'>
            {subHeading}
        </div>
        <div className='flex gap-7 mt-7 '>
            <CTButton active={button1.active} link={button1.link} >
                <div className='flex gap-2 items-center'>
                    {button1.text} <FaArrowRight />  
                </div>
            </CTButton>

            <CTButton active={button2.active} link={button2.link} >
                {button2.text}
            </CTButton>
        </div>
    </div>


{/*  Section two code vala section */}
    <div className='h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] border-2 border-pure-greys-600'>
    {codeBoxGradient}
        <div className='text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold '>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1 `}>

            <TypeAnimation 
                    
            sequence={[codeContent, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}

            />

        </div>
    
    </div>

    </div>
  )
}

export default CodeBlocks;