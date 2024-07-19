import React from 'react'
import HighlightText from '../../HomePage/HighlightText';
import CTButton from "../../HomePage/CTButton"

const LearningGridArray = [
    
    {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
          "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
            order: 1,
            heading: "Curriculum Based on Industry Needs",
            description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
            order: 2,
            heading: "Our Learning Methods",
            description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 3,
            heading: "Certification",
            description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 4,
            heading: `Rating "Auto-grading"`,
            description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 5,
            heading: "Ready to Work",
            description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
    ];
    
    
const LearningGrid = () => {
    return (
        <div className=' w-[90%] grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 ' >
        {
            LearningGridArray.map((item,idx) =>{
                return (
                    <div key={idx} 
                    className={`
                    ${idx ==0 && " lg:col-span-2 p-5 h-72"}
                    ${item.order%2 !== 0 ? " bg-richblack-700  p-5 h-72":" bg-richblack-800 h-72  p-5"}
                    ${item.order ===3 && " lg:col-start-2  p-5 h-72"}
                    ${item.order < 0 && " bg-transparent"}
                    `}>
                        {
                            item.order <0 
                            ? ( 
                            <div className='flex flex-col h-56 justify-evenly'> 
                                <div className=' text-4xl font-bold text-white'>
                                    {item.heading}
                                    <HighlightText text={item.highlightText} />
                                </div>
                                <p className=' text-richblack-300'>
                                    {item.description}
                                </p>
                                <div className='w-fit'>
                                    <CTButton active={true} link={item.BtnLink}>
                                        {item.BtnText}
                                    </CTButton>
                                </div>
                            </div>
                            )
                            : (<div className=' flex flex-col h-56 justify-evenly'>
                                <h1 className='text-richblack-5 font-medium text-lg'>{item.heading}</h1>
                                <p  className=' text-richblack-300'>{item.description}</p>
                             </div>)
                        }
                    </div>
                )
            })
        }
      
    </div>
  )
}

export default LearningGrid
