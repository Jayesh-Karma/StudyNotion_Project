import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../Services/apiConnector';
import { contactUs } from '../../Services/apis';
import toast from 'react-hot-toast';
import CountryCode from '../../data/countrycode.json';


const ContactUs = () => {
    const [loading, setLoading] = useState();
    const { register, handleSubmit, reset, formState:{ errors, isSubmitSuccessful} } = useForm();


    //  form submission
    const submitContactForm = async (data) =>{
        setLoading(true);
        console.log(data);
        try{
            const res = await apiConnector("POST", contactUs.CONTACT_US, data);
            console.log(res);
            toast.success(res.data.message);
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }
        setLoading(false);
    }

    //  reset form
    useEffect(() => {
        if(isSubmitSuccessful){

            reset({
                email :"",
                firstname:"",
                lastname:"",
                message:"",
                phone:"",
                countryCode:"",
            })
        }


    }, [isSubmitSuccessful, reset])
    
    return (
<div className='text-white mb-2'>

{ loading ?  <div className='h-[600px] flex flex=col justify-center items-center'> Loading </div> :  
            <form onSubmit={handleSubmit(submitContactForm) } className='mt-10' >

          <div   className='flex flex-row w-full items-center gap-3 mb-5    '>
            <div>
            <label htmlFor="firstname">First Name <sup className=' text-pink-400'>*</sup></label>
                <input 
                type="text"
                placeholder='Enter Firstname'
                name='firstname'
                {...register("firstname", {required:true})}
                className='w-full rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5'
                  />
                  {
                    errors.firstname && <span className='text-pink-400'>Enter your Firstname</span>
                  }
            </div>
            <div>
            <label htmlFor="lastname">Last Name </label>
                <input 
                type="text"
                placeholder='Enter Last Name'
                name='lastname'
                {...register("lastname")}
                className='w-full rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5'
                  />
            </div>
          </div>

          {/*  email */}
          <div className=''>
            <label htmlFor="email">Email <sup className='text-pink-400'>*</sup></label>
            <input 
            type="email"
            placeholder='Enter your Email Address'
            name='email'
            {...register("email", {required:true})}
            className='p-[10px] rounded-[0.5rem] bg-richblack-700 w-full mb-5 '
             />
             {
                errors.email && <span className='text-pink-400'>Enter your email carefully</span>
             }

          </div>

          {/*  phone number  */}
             <div>
                <label htmlFor="phone">Phone no <sup className='text-pink-400'>*</sup></label>
                <div className=' flex flex-row lg:justify-start gap-3 items-center'>
                    <select 
                    name="countryCode" 
                    id="phone"
                    {...register("countryCode", {required:true})}
                    className='p-[10px] w-[80px] bg-richblack-700 rounded-[0.554m]'
                    >
                    {
                        CountryCode.map((code, idx) => {
                            return(
                                <option 
                                value={code.code}
                                className=' rounded-[0.5rem]'
                                > {`${code.code}  ${code.country}`}</option>
                            )
                        })
                    }
                    </select>
                    <input type="tel" maxLength={10} minLength={10} name="phone" placeholder='Enter your phone ' className='w-full p-[10px] bg-richblack-700 rounded-[0.5rem]' {...register("phone", {required:true})} />
                </div>
                    {
                        errors.countryCode || errors.phone && ( <span className='text-pink-400'> Enter Phone number</span>)
                    }
             </div>



          {/* message box */}
          <div className='mt-5'>
            <label htmlFor="message">Enter your Message <sup className='text-pink-400'>*</sup></label>
            <textarea 
            name="message" 
            id="message" 
            cols="7"
            rows="3"
            placeholder='Enter your Message here'
            {...register("message", {required:true})}
            className='w-full p-[14px] rounded-[0.5rem] bg-richblack-700'
            />
            {
                errors.message && <span className='text-pink-400'>enter your message</span>
            }
          </div>

          {/*  button */}
          <button className='w-full bg-yellow-50 text-black p-[10px] rounded-lg mt-5 font-bold'>Send Message</button>

        </form>
}       
    </div>
  )
}

export default ContactUs
