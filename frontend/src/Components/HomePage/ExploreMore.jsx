import React, { useState } from 'react'
import { HomePageExplore } from '../../data/homepage-explore';
import Home from '../../Pages/Home';
import HighlightText from './HighlightText';
import ExploreCard from './ExploreCard';
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) =>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course?.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
        console.log(courses)
    }
  return (
    <div className=' mt-12 mb-10 transition-all duration-200  '>
       <div className='text-4xl font-semibold text-center'>Unlock the <br />
            <HighlightText text={"Power of Code"} />
       </div>

       <p className='text-center text-richblack-300 text-[16px] mt-3'>Learn to build any thing you can Imagine</p>

       {/* tab creation */}

       <div className=' flex lg:flex-row flex-col rounded-3xl mb-10 lg:rounded-full bg-richblack-800 mt-2 py-2 px-2 cursor-pointer'>
            {
                tabsName.map((item, idx) =>{
                    return(
                     <div className={`text-[16px] flex lg:flex-row items-center gap-2 ${currentTab === item ? "bg-richblack-900 text-richblack-5 font-medium ":
                     "text-richblack-200" } rounded-full transition-all hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 `}
                     key={idx} onClick={() => setMyCards(item)}>
                        {item}
                     </div>   
                    )
                })
            }
       </div>

       {/*  card component  */}

       <div className="hidden lg:block lg:h-[250px]">
       </div>

            <div className=" lg:h-72 lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[100px] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black mb-14 lg:mb-14 lg:px-0 px-3">
                {
                    courses.map((card, idx) =>{
                        return(
                           <ExploreCard 
                           key={idx} 
                           card={card} 
                           setCurrentCard={setCurrentCard}
                           currentCard={currentCard} />
                        );
                    })
                }
            </div>

    </div>
  )
}

export default ExploreMore
