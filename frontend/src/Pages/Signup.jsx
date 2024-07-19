import React from 'react'
import TemplateAuth from '../Components/Auth/TemplateAuth'
import img1 from "../assets/Images/signup.webp"

const Signup = () => {
  return (
    <div>
     <TemplateAuth formtype={"signup"}
      heading={"Join the millions learning to code with StudyNotion for free"}
      subHeading={"Build skills for today, tomorrow, and beyond."}
      highlightText={"Education to future-proof your career."}
      img1={img1}
      />
    </div>
  )
}

export default Signup
