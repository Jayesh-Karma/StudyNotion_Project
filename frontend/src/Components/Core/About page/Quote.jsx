import React from 'react'
import HighlightText from '../../HomePage/HighlightText'

const Quote = (color1) => {
  return (
    <div>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combines technology"} />,
        <span className='font-bold bg-gradient-to-b from-pink-100 via-pink-200  to-pink-300 text-transparent bg-clip-text'>
        expertise
        </span>, and community to create an
        <span className='font-bold bg-gradient-to-b from-pink-200 via-yellow-50  to-yellow-100 text-transparent bg-clip-text'>
         , unparalleled educational experience.
        </span>
    </div>
  )
}

export default Quote
