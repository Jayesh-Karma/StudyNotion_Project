import React from 'react'
import ModelBtn from './ModelBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm"> 
    <div className=' bg-richblue-800 text-white opacity-100 p-6 rounded-lg border border-richblack-500'>
        <p>
            {modalData.text1}
        </p>
        
        <p>
            {modalData.text2}
        </p>
        
        <div className='flex gap-5 mt-2'>
                <ModelBtn 
                    onclick={modalData?.btnHandler1}
                    text={modalData?.btn1Text}
                />

                <button className=' border-2 p-2 rounded-md border-richblack-600' onClick={modalData?.btnHandler2}>
                    { modalData?.btn2Text}
                </button>
        </div>
      
      </div>
    </div>
  )
}

export default ConfirmationModal
