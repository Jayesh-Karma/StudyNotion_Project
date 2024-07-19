import React from 'react'
import { Link } from 'react-router-dom'

const CTButton = ({ link, children, active}) => {
  return (
    <Link to={link}>
        
        <div className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold ${active ? " bg-yellow-50 text-black shadow-active-button-border":" bg-richblack-800 text-white shadow-sm"} hover:scale-95 transition-all duration-200`}>
            {children}
        </div>

    </Link>
      
    
  )
}

export default CTButton
