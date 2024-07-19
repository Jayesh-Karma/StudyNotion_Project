import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModelBtn from '../../Common/ModelBtn';
import { VscCloudUpload } from 'react-icons/vsc';
import toast from 'react-hot-toast';
import { profileUpdate } from '../../../Services/apis';
import { uploadImg } from '../../../Services/AuthApi/profileUpdateApi';

const Setting = () => {

    const {user} = useSelector((state)=> state.profile);
    
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState(null)
    const dispatch = useDispatch();
    console.log(user.img)
    const [profile, setProfile] = useState(`${user?.img}`)

    const handleClickButton =() =>{
        fileInputRef.current.click();
    }


    const handleFileChange = (event) =>{
        const file = event.target.files[0];
        if(file){
            setSelectedFile(file);
            setFileName(file.name)
        }
    }
    (fileName === null) ? console.log("Empty") : console.log(fileName)

    //  img submit handler 
    const submitHandler = async(e) =>{
        e.preventDefault();
        if(!selectedFile){
            toast.error("Select a file first")
        }

        const res = await dispatch(uploadImg({selectedFile}, user.token));
        if(res){
            setSelectedFile(null);
            setFileName(null);
            setProfile(res);
            toast.success("Login Again to see your new profile pic")
        }

        
    }

  return (
    <div className='text-white'>
    {/*  section one  */}
        <div className='flex flex-col lg:flex-row lg:justify-start items-center lg:items-start gap-5 bg-richblack-800 p-3 rounded-lg'>
         <img width={100} height={100} className='rounded-full object-cover' src={profile} alt={user?.firstname + " " + user?.lastname} />

            <div className='flex  flex-col'>
            <p>Change Profile Picture</p>
            <p className='text-sm'>Selected File:   
            <span className=' text-richblack-400'>{ fileName==null ? " No Selected file" : " "+fileName }</span>
            </p>

            <div className=' flex flex-row mt-3 gap-5'>

            <form onSubmit={submitHandler} className='flex gap-3'>
                <input type="file" style={{display:'none'}} onChange={handleFileChange} ref={fileInputRef}  placeholder='' />
            
                <div onClick={handleClickButton} className='p-2 bg-richblack-700 rounded-lg cursor-pointer'>Select File</div>
            
                <ModelBtn text={"Upload"} type="submit" />
            </form> 
            </div>
         </div>


      </div>


      {/*  section 2 */}

    </div>
  )
}

export default Setting
