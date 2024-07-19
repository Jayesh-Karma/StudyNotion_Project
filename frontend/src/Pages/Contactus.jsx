import React from 'react'
import ContactUs from '../Components/Common/ContactUs'
import { PiWechatLogo } from 'react-icons/pi'
import { FaEarthAfrica } from 'react-icons/fa6'
import { FcCallback } from 'react-icons/fc'
import Footer from '../Components/Common/Footer'

const contactArray = [{
    id:1,
    title:'Chat on us',
    details:'Our friendly team is here to help.',
    contact:'info@studynotion.com',
    icon:<PiWechatLogo className=' text-3xl'/>,
},{
    id:2,
    title:'Visit us',
    details:'Come and say hello at our office HQ.',
    contact:'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
    icon:<FaEarthAfrica className=' text-3xl'/>,
},{
    id:3,
    title:'Call us',
    details:'Mon - Fri From 8am to 5pm',
    contact:'+123 456 7869',
    icon:<FcCallback className=' text-3xl' />,
},
]


const Contactus = () => {
  return (
    <div >
      <div className=' lg:w-11/12 mt-12 lg:mx-auto flex flex-col lg:flex-row  gap-10 lg:p-11 p-4'>
        <div className=' p-10 lg:w-[40%] w-full  bg-richblack-800 text-white flex flex-col gap-8 rounded-2xl'>
            {
                contactArray.map((item, idx) =>{
                    return(
                        <div key={idx}>
                            <div className='flex flex-row gap-3 items-center '> 
                             {item.icon} 
                            <h1 className='text-2xl font-bold'>{item.title}</h1>
                            </div>

                            <p className=' text-richblack-100'>{item.details}</p>
                            <p className=' text-richblack-25 font-bold'>{item.contact}</p>
                        </div>
                    )
                })
            }
        </div>
        
        <div className='lg:w-[60%] lg:p-11 p-2 border rounded-2xl border-richblack-400'>
        <div className='text-white'>
        <h1 className='text-4xl font-bold text-center'>Got a Idea? We've got the skills. Let's team up</h1>
        <p className='text-richblack-400 text-center'>Tell us more about yourself and what you're got in mind.</p>
      </div>
        <ContactUs />
        </div>

      </div>
        <Footer />
    </div>
  )
}

export default Contactus
