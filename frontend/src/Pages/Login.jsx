import React from 'react'
import TemplateAuth from '../Components/Auth/TemplateAuth'
import img1 from '../assets/Images/login.webp'

const Login = () => {
  return (
    <div>
       <TemplateAuth formtype={"login"}
      heading={"Welcome Back"}
      subHeading={"Build skills for today, tomorrow, and beyond."}
      highlightText={"Education to future-proof your career."}
      img1={img1}
      />
    </div>
  )
}

export default Login
