import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import TemplateAuth from './Components/Auth/TemplateAuth'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Navbar from './Components/Common/Navbar'
import About from './Pages/About'
import ResetPassword from './Pages/ResetPassword'
import OpenRoute from './Components/Auth/OpenRoute'
import VerifyOtp from './Components/Auth/VerifyOtp'
import UpdatePasswordByMail from './Pages/UpdatePasswordByMail'
import UserDashboard from './Pages/UserDashboard'
import Contactus from './Pages/Contactus'
import Dashboard from './Pages/Dashboard'
import PrivateRoute from './Components/Auth/PrivateRoute'
import MyProfile from './Components/Core/DashBoard/MyProfile'
import Error from './Components/Common/Error'
import Setting from './Components/Core/DashBoard/Setting'
import EnrolledCourses from './Components/Core/DashBoard/EnrolledCourses'
import Cart from './Components/Core/DashBoard/Cart'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/Constants'
import AddCourse from './Components/Core/DashBoard/AddCourses/AddCourse'
import Mycourses from './Components/Core/DashBoard/MyCourse/Mycourses'
import EditCourse from './Components/Core/DashBoard/MyCourse/EditCourse'
import Catalog from './Pages/Catalog'
import CoursePage from './Pages/CoursePage'
import ViewCourse from './Pages/ViewCourse'
import VideoDetails from './Components/Core/ViewCourse/VideoDetails'
import Instructordashboard from './Components/Core/InstructorDashboard/Instructordashboard'


function App() {

  const {user} = useSelector((state) => state.profile)

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
    <Navbar />
      <Routes>

        <Route path='/' element={
        // <OpenRoute>
        <Home />
        // </OpenRoute>
        } />
        <Route path='/catalog/:categoryName' element={<Catalog />} />
        <Route path='/courses/:courseId'element={<CoursePage />} />

        <Route path='/signup' element={<Signup /> } />
        <Route path='/login' element={<Login /> } />
        <Route path='/verify-email' element={<VerifyOtp /> } />
        <Route path='/dashboard' element={<UserDashboard/> } />


        <Route path='/about' element={<About />} />  
        <Route path='/contact' element={<Contactus />} />  
        <Route path='/forgot-password' element={<ResetPassword />} />  
        <Route path='/update-password/:id' element={<UpdatePasswordByMail />} />  


        <Route element={<PrivateRoute> <ViewCourse /></PrivateRoute>} >
            <Route path='/dashboard/course/:courseId/section/:sectionId/subsection/:subSectionId' element={<VideoDetails />} />
        </Route>

        
        <Route element={ <PrivateRoute> <Dashboard />  </PrivateRoute>}>

              <Route path='/dashboard/my-profile' element={<MyProfile />} />  
              <Route path='/dashboard/setting' element={<Setting />} />  

              {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                 <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />} />  
                  <Route path='/dashboard/totalitems' element={<Cart />} />  
                
                  </>
                )
              }

              {
                user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <>
                 <Route path='/dashboard/add-course' element={<AddCourse />} />  
                  <Route path='/dashboard/totalitems' element={<Cart />} />  
                  <Route path='/dashboard/my-courses' element={<Mycourses />} />  
                  <Route path='/dashboard/edit-course/:courseId' element={<EditCourse />} /> 
                  <Route path='/dashboard/instructor'  element={<Instructordashboard />}/>
                  </>
                )
              }
              <Route path='*' element={<Error/>} />

        </Route>  


          <Route path='*' element={<Error />} />
      
      </Routes> 
    </div>
  )
}

export default App
