import React from 'react'
import logo1 from '../../assets/TimeLineLogo/Logo1.svg';
import logo2 from '../../assets/TimeLineLogo/Logo2.svg';
import logo3 from '../../assets/TimeLineLogo/Logo3.svg';
import logo4 from '../../assets/TimeLineLogo/Logo4.svg';
import timelineImg from "../../assets/Images/TimelineImage.png"
const timeline = [
    {
        logo:logo1,
        heading:"LeaderShip",
        description:"Fully commited to the success company"
    },
    {
        logo:logo2,
        heading:"LeaderShip",
        description:"Fully commited to the success company"
    },
    {
        logo:logo3,
        heading:"LeaderShip",
        description:"Fully commited to the success company"
    },
    {
        logo:logo4,
        heading:"LeaderShip",
        description:"Fully commited to the success company"
    },
]

const TimeLineSection = () => {
  return (
    <div>
       
        <div className='flex lg:flex-row flex-col justify-between items-center'>
            <div className='lg:w-[55%] mb-10 flex flex-col justify-evenly gap-12'>
                {
                    timeline.map((elem, idx) =>{
                        return(
                            <div className='flex flex-row gap-6' key={idx}>
                                <div className='w-[50px] h-[50px] bg-white justify-center flex items-center rounded-full'>
                                    <img src={elem.logo} alt="Not found" />
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px] '>{elem.heading}</h2>
                                    <p className='text-base'>{elem.description}</p>
                                </div>

                            </div>
                        )
                    })
                }

            </div>

            <div className='relative shadow-right-bottom-myBorder overflow-hidden'>
                <img src={timelineImg} alt="" />
                
                <div className='absolute w-[80%] lg:w-[80%] bg-caribbeangreen-700 flex lg:flex-row flex-col justify-between text-white uppercase lg:py-10 translate-x-[15%] translate-y-[-50%] p-4'>
                    <div className='flex flex-row  gap-8 items-center lg:border-r lg:border-caribbeangreen-300'>
                        <p className=' text-3xl font-bold'>10</p>
                        <p className=' text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    {/*  second boxx */}
                    <div className='flex flex-row  gap-5 items-center lg:border-r lg:border-caribbeangreen-300'>
                        <p className=' text-3xl font-bold'>250</p>
                        <p className=' text-caribbeangreen-300 text-sm'>Types of Courses</p>
                    </div>
                    
                </div>
            </div>
        </div>
       </div>
  )
}

export default TimeLineSection
