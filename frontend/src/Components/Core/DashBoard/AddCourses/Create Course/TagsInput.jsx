import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

const TagsInput = ({id, label, name, register, setValue, getValues, placeholder, errors}) => {


  const {course, editCourse} = useSelector((state) => state.course);

  const [tags, setTags] = useState([]);



  useEffect(()=> {
    if(editCourse){
      setTags(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  },[])

  const keydownHandler = (event) =>{
    if(event.key === "Enter" || event.key === ","){
      event.preventDefault();
      const tagvalue = event.target.value.trim();

      if(tagvalue && !tags.includes(tagvalue)){
        const newTags = [...tags, tagvalue];
        setTags(newTags)
        event.target.value = "";
      }
    }
  }

  const handleDeleteTag = (idx) =>{
    const newTags = tags.filter((_ , index) => index !== idx);  
    // console.log(newTags) 
    setTags(newTags);    
  }

  useEffect(()=>{
    setValue(name, tags);
  }, [tags])
  
  return (
    <>
    <div className='flex flex-row gap-3 flex-wrap mt-2'>
    <label htmlFor={name}>{label} <sup>*</sup></label>
      {
        tags.map((tag, idx) =>(
          <span key={idx} className=' bg-yellow-200 rounded-md p-1 text-black' >
            {tag}
            <button type='button' onClick={() => handleDeleteTag(idx)} className=' ml-2 focus:outline-none'>
              <MdClose className='text-md' />
            </button>
          </span>
        ))
      }
  
      <input 
      type="text" 
      name={name} 
      id={name} 
      placeholder={placeholder}
      onKeyDown={keydownHandler}
      className=' text-richblack-5 bg-richblack-700 w-full p-2 rounded-md'
      />
      {
        errors.name &&   <span className="ml-2 text-xs tracking-wide text-pink-200"> {name} is required</span>
      }
    </div>
    </>
  )
}

export default TagsInput
