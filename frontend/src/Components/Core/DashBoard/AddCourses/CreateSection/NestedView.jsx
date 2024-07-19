import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSolidDownArrow } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import { deleteSection, deleteSubSection } from '../../../../../Services/Operations/CourseApi';
import { setCourse } from '../../../../../Reducers/Slices/courseSlice';
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../Common/ConfirmationModal';



const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
 
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubsection, setViewSubsection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);


  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({sectionId, courseId:course._id}, token)
    
    if(result){
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)

  }

  const handleDeleteSubSection = async(subsectionId, sectionId)=>{
    
    const result = await deleteSubSection({subsectionId, sectionId, courseId:course._id} , token);
    
    if(result){
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  }

 
  return (
    <div className='mt-3'>

      <div className='text-richblack-5 rounded-lg bg-richblack-700 p-6 px-8'>
        {
          course?.courseContent.map((section) => (
            <details key={section._id} open>

              <summary className='flex items-center gap-x-3 justify-between border-b-2'>

                <div className='flex items-center gap-x-3'>
                  <RxDropdownMenu />
                  <p>{section.sectionName}</p>
                </div>

                <div className='flex items-center'>
                  <button
                    onClick={()=> handleChangeEditSectionName(section._id, section.sectionName)}>
                    <MdEdit />
                  </button>

                  <button
                    onClick={() => setConfirmationModal({
                      text1: "Delete this Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btnHandler1: () => handleDeleteSection(section._id),
                      btnHandler2: () => setConfirmationModal(null)
                    })
                    }>
                    <RiDeleteBin6Line />
                  </button>

                  <span>|</span>
                  <BiSolidDownArrow className={``} />
                </div>
              </summary>

              <div>
                {
                  section?.subSection?.map((data) => (
                    <div key={data?._id}
                      onClick={() => setViewSubsection(data)}
                      className='flex items-center justify-between gap-x-3 border-b-[1px] border-b-richblack-300 px-5 py-1'
                    >

                      <div className='flex items-center gap-x-3'>
                        <RxDropdownMenu />
                        <p>{data.title}</p>
                      </div>

                      <div onClick={(e) => e.stopPropagation()} className='flex items-center gap-x-3'>
                        <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                          <MdEdit />
                        </button>

                        <button onClick={() => 
                            setConfirmationModal({
                              text1: "Delete this Sub Section",
                              text2: "Selected lecture will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btnHandler1: () => handleDeleteSubSection(data._id, section._id),
                              btnHandler2: () => setConfirmationModal(null)})
                          }>
                          
                              <RiDeleteBin6Line />
                      </button>
                    </div>

                    </div>
              ))
                }

                <button onClick={()=> setAddSubSection(section._id)}
                  className='mt-4 flex items-center gap-x-2 text-yellow-100'
                >
                  <AiOutlinePlus />
                  <p>Add Lecture</p>
                </button>
            </div>

            </details>
      ))
        }

    </div>
          {
            addSubSection ? (<SubSectionModal
              modalData={addSubSection}
              setModalData={setAddSubSection}
              add={true}
            />) 
            : viewSubsection ? (<SubSectionModal 
              modalData={viewSubsection}
              setModalData={setViewSubsection}
              view={true}
            />) 
            : editSubSection ? (<SubSectionModal 
              modalData={editSubSection}
              setModalData={setEditSubSection}
              edit={true}
            />)
            : (<div> </div>)
          }


            {
              confirmationModal ? ( <ConfirmationModal  modalData={confirmationModal} />) : ( <div> </div>)
            }
    </div>
  )
}

export default NestedView
