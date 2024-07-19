import React from 'react'

const ExploreCard = ({setCurrentCard, currentCard, card}) => {
  return (
    // <div className={`lg:translate-x-80 lg:translate-y-10  lg:h-80  p-6 rounded-lg flex lg:flex-row  lg:justify-between 
    // ${currentCard === card.heading ? "bg-white shadow-[14px_14px_0px_0px] shadow-yellow-50 text-black":" bg-richblack-800 text-white"}
    //  hover:bg-white hover:text-black transition-all duration-200`}
     
    //  onClick={()=> setCurrentCard(card.heading)}
    //  >
    <div className={`w-[300px] lg:w-[30%] p-5
    ${currentCard === card.heading ? "bg-white shadow-[14px_14px_0px_0px] shadow-yellow-50 text-black":" bg-richblack-800 text-white"}
     hover:bg-white hover:text-black transition-all duration-200 lg:flex lg:flex-col justify-between  rounded-lg`}
     
     onClick={()=> setCurrentCard(card.heading)}
     >
      {/* card heading  and details  */}
        <div className=' '>
            <h2 className='text-2xl font-bold mb-3'>{card.heading}</h2>
            <p className=' text-richblack-400'>{card.description}</p>
        </div>

        <div className='flex flex-row justify-between border-t-[0.2px] border-pure-greys-200 border-dashed pt-2'>
            <div className='flex flex-row gap-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                </svg>
            <p>Beginner</p>
            </div>

            <div className='flex flex-row gap-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
            </svg>
            <p>Lessons</p>

            </div>
        </div>
    </div>
  )
}

export default ExploreCard
