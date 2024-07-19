import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className=' font-bold bg-gradient-to-b from-richblue-1000 via-richblue-1100 to-richblue-1200 text-transparent bg-clip-text'>
      {" "}{text}{" "}
    </span>
  )
}

export default HighlightText
