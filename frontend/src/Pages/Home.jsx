import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../Components/HomePage/HighlightText';
import CTButton from '../Components/HomePage/CTButton';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../Components/HomePage/CodeBlocks';
import TimeLineSection from '../Components/HomePage/TimeLineSection';
import LearningLanguageSection from '../Components/HomePage/LearningLanguageSection';
import BottomSection from '../Components/HomePage/BottomSection';
import Footer from '../Components/Common/Footer';
import ExploreMore from '../Components/HomePage/ExploreMore';
import ReviewSlider from '../Components/Common/ReviewSlider';



const Home = () => {
  return (
    <div className=''>

      {/* section 1 */}
      <div className=' relative mx-auto flex flex-col w-11/12 max-w-maxContent justify-between text-white items-center overflow-hidden'>
       
        <Link to={"/signup"} >
           <div className='group m-16 p-2 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 shadow-sm shadow-richblack-500'>
              <div className='flex justify-center items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                <p>Become an Instructor</p>
                <div> <FaArrowRightLong /></div>
              </div>
           </div>

        </Link>

      {/* Heading */}
      <div className='text-center text-4xl font-semibold mt-4'>
         Empower your Future with  
         <HighlightText text={"Coding Skills"} />
      </div>
      {/* sub heading  */}
      <div className='mt-6 w-[90%] text-center text-lg font-bold text-richblue-300  '>
        <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
      </div>

      {/* buttons */}
      <div className='flex flex-row gap-7 mt-8'>
        <CTButton active={true} link={"/signup"}>
          Learn More
        </CTButton>

        <CTButton active={false} link={"/signup"}>
          Book a Demo
        </CTButton>

      </div>

      {/*  video banner  */}
      <div className=' relative mx-3 my-12 divide-x-8 shadow-right-bottom-myBorder'>
        <video src={Banner}
          muted loop autoPlay 
        ></video>
        {/*  <div class="absolute inset-0 bg-gradient-to-tl from-blue-500 to-green-500"></div>
        <div class="absolute right-0 bottom-0 w-1 h-full bg-white"></div> */}
      </div>

    {/*  Code section 1 */}
    <div>
      <CodeBlocks
        active={true}
        position={"lg:flex-row"}
       heading={ 
        <div className=' text-4xl font-semibold'> Unlock Your 
          <HighlightText text={"coding potential"} />
          with our online courses 
        </div>}

        subHeading={
          "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
        }
        button1={
          {
            text:"Try it yourself",
            link:"/signup",
            active:true
          }
        }
        button2={
          {
            text:"Learn more",
            link:"/login",
            active:false
          }
        }
        codeContent={
          `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>My First Webpage</title>
            </head>

            <body>
              <h1>Hello World!</h1>
            </body>
          </html>`
        }
        codeColor={"text-yellow-25"}
        codeBoxGradient={<div className="codeblock1 absolute"> </div>}
      >
      </CodeBlocks>
    </div>

    {/*  code section 2 */}
    <CodeBlocks
        active={true}
        position={" lg:flex-row-reverse"}
       heading={ 
        <div className=' text-4xl font-semibold'> Start
          <HighlightText text={"coding in seconds"} />
          
        </div>}

        subHeading={
          "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson"
        }
        button1={
          {
            text:"Continue Lesson",
            link:"/signup",
            active:true
          }
        }
        button2={
          {
            text:"Learn more",
            link:"/login",
            active:false
          }
        }
        codeContent={
          `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>My First Webpage</title>
            </head>

            <body>
              <h1>Hello World!</h1>
            </body>
          </html>`
        }
        codeColor={"text-richblue-25"}
        codeBoxGradient={<div className="codeblock2 absolute"> </div>}
      >
      </CodeBlocks>

        <ExploreMore />

      </div>



        {/* section 2 white section */}
        <div className=' mt-0 z-0 bg-pure-greys-5 text-richblack-700'>
          <div className='section2Bg h-[310px]'>

            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                <div className='h-[150px]'>
                  {/* this is for matching height */}
                </div>
                <div className='flex flex-row gap-7 text-white'>
                    <CTButton
                    active={true}
                    link={"/signup"}
                    >
                      <div className='flex items-center gap-3'>Explore Full Catalog
                      <FaArrowRightLong />
                      </div>
                    </CTButton>
                   
                    <CTButton
                    active={false}
                    link={"/signup"}
                    >
                      <div className='flex items-center gap-3'>Learn More
                      </div>
                    </CTButton>
                </div>

            </div>

          </div>

          <div className='mx-auto w-[11/12] max-w-maxContent flex flex-col justify-center gap-7 pb-16 p-5' > 
            <div className='flex lg:flex-row flex-col lg:gap-5 gap-3 mb-10 mt-[95px] text-start'>
              <div className='text-4xl font-semibold '>
                Get the Skills you need 
                <HighlightText text={"Job that is in demand"} />
              </div>

              <div className='flex flex-col gap-10 lg:w-[40%]'>
              <div className='text-[16px] '>
              The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTButton active={true} link={"/signup"}>
                Learn More
              </CTButton>
            </div>
            </div>
           
            <TimeLineSection />
            <LearningLanguageSection />
          </div>

        </div>

{/*  section three 3 */}
          <div className='w-[11/12] mx-auto max-w-maxContent flex-col items-center
           justify-between gap-8 bg-richblack-900 text-white'>
           
             <BottomSection />

              <h2 className=' text-center text-4xl font-semibold mt-10'>Reviews from other Learners </h2>
              <div>
                <ReviewSlider />
              </div>
          </div>

          <div className=' bg-richblack-800 '>
          <Footer/>
          </div>

    </div>
  )
}

export default Home
