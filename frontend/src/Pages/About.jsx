import React from 'react'
import Navbar from '../Components/Common/Navbar'
import HighlightText from '../Components/HomePage/HighlightText'
import img1 from "../assets/Images/aboutus1.webp"
import img2 from "../assets/Images/aboutus2.webp"
import img3 from "../assets/Images/aboutus3.webp"
import Quote from '../Components/Core/About page/Quote'
import foundingStory from "../assets/Images/FoundingStory.png"
import Stats from '../Components/Core/About page/Stats'
import LearningGrid from '../Components/Core/About page/LearningGrid'
import Footer from '../Components/Common/Footer'
import AboutContact from '../Components/Core/About page/AboutContact'
import ReviewSlider from '../Components/Common/ReviewSlider'

const About = () => {
  return (

        <div >

        <section className=" relative bg-richblack-700  overflow-visible ">
        <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute  overflow-visible bottom-0 left-[50%] w-[90%] gap-3 lg:gap-5 translate-x-[-50%] translate-y-[30%] flex flex-row justify-evenly items-center ">
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
          </div>
        </div>
      </section>

      {/*  section 2 */}
      <section className=' lg:mt-52 mx-auto py-20 text-2xl font-semibold lg:w-[70%] border-[0.2px] border-richblack-400'>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white'>
          <Quote />
        </div>
      </section>

      {/*  section three */}
      <section className='mx-auto py-20 lg:mt-20'>
        <div className='w-full mx-auto text-white max-w-maxContent'>
          <div className='w-11/12 mx-auto flex flex-col lg:flex-row justify-between gap-10 items-center'>
              <div className= ' text-base flex flex-col lg:w-[48%] justify-between gap-5'>
              {/* Founding story div  */}
                <h1 className=' bg-gradient-to-b from-pink-200 via-pink-300 to-yellow-300 text-transparent bg-clip-text text-4xl font-bold'>Our Founding Story</h1>
                <p className=' text-richblack-300'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                <p className=' text-richblack-300 pt-4'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
              </div>
              {/* Image div */}
              <div  className='lg:w-[50%] lg:p-10'>
                  <img src={foundingStory} alt="" className='' style={{boxShadow:'1px 1px 15px 1px rgba(235,0,0,1)'}} />
              </div>
          </div>

          {/*  vision mission box */}
          <div className='w-11/12 mx-auto mt-36 flex flex-col lg:flex-row justify-between items-center gap-20'>
          {/*  left side box */}
            <div >
              <h1 className=' flex flex-col bg-gradient-to-b from-brown-500 via-brown-400 to-brown-200 text-transparent bg-clip-text font-extrabold text-3xl overflow-hidden mb-10'>Our Vision</h1>
              <p  className=' text-richblack-300 pt-4'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>
            {/* right side box */}
            <div  className='lg:p-10'>
            <h1 className=' flex flex-col  text-3xl overflow-hidden mb-10 font-bold'><HighlightText text={"Our mission"} /></h1>
              <p  className=' text-richblack-300 pt-4'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.  </p>
            </div>
          </div>
        </div> 
      </section>


      {/*  section 4 */}
      <section className='w-[100%] flex flex-row  justify-between items-center'>
        <Stats />
      </section>


      {/*  section 5 */}
      <section className='w-11/12 mx-auto mt-20 mb-10 flex flex-col justify-between items-center'>
        <LearningGrid />
        <AboutContact />
      </section>

      <ReviewSlider />

      <Footer />
      

    </div>
    
  )
}

export default About
