import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className='flex w-full lg:flex-row md:flex-col flex-col justify-between items-start gap-10'>
      <div className='lg:w-[60%]'>
        <h1>Add Course</h1>
        <div>
          <RenderSteps />
        </div>
      </div>
      <div className='lg:w-[40%] p-4 bg-richblack-800 text-base rounded-lg'>
        <p className=' text-sm'> Course Upload tips</p>
        <ul className='ml-5 mt-3 list-disc space-y-2 text-xs text-richblack-5'>
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons,
            quizzes, and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the
            course single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>

      </div>
    </div>
  )
}

export default AddCourse
