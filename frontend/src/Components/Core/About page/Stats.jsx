import React from 'react'

const statsData = [
    { count:"5k", label:"Active Students"},
    { count:"10+", label:"Mentors"},
    { count:"200+", label:"Courses"},
    { count:"50+", label:"Awards"},
]

const Stats = () => {
  return (
    
        <div className='w-full bg-richblack-700 lg:p-10'>
            <div className='flex lg:flex-row gap-3 flex-col w-11/12 text-white justify-evenly items-center'>
                {
                    statsData.map((data, idx) => {
                        return(
                            <div className='flex flex-col items-center' key={idx}>
                                <h1 className='text-3xl font-bold'>{data.count}</h1>
                                <p className='text-richblack-500 font-bold'>{data.label}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    
  )
}

export default Stats
