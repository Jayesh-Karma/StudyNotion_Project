import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiCirclePlus } from 'react-icons/ci';
import { BiRightArrow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { resetStep, setCourse, setEditCourse, setStep } from '../../../../../Reducers/Slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../Services/Operations/CourseApi';

const CourseBuilder = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [editSection, setEditSection] = useState(null);
  const { course, step } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const cancelEdit = () => {
    setEditSection(null);
    setValue("sectionName", "");
  }

  const gotoNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }

    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add at least one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  }

  const onSubmit = async () => {
    let result;
    setLoading(true);

    if (editSection !== null) {
      result = await updateSection({
        sectionName: getValues().sectionName,
        sectionId: editSection,
        courseId: course._id
      }, token);
    } else {
      result = await createSection({
        sectionName: getValues().sectionName,
        courseId: course._id
      }, token);
    }

    if (result.success) {
      dispatch(setCourse(result.courseDetails));
      cancelEdit();
    }
    setLoading(false);
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSection === sectionId) {
      cancelEdit();
      return;
    }
    
    setEditSection(sectionId);
    setValue("sectionName", sectionName);
  }

  // const goBack = () => {
  //   console.log(step)
  //   dispatch(setEditCourse(true));
  //   // dispatch(setStep(1));
  //   dispatch(resetStep());
  //   console.log(step)
  // }

  const goBack = () =>{
    resetStep()
  }
  return (
    <div>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">Section Name</label>
          <input type="text"
            id="sectionName"
            placeholder="Enter Section Name"
            {...register("sectionName", { required: true })}
            className="w-full p-2 bg-richblack-700 text-richblack-5 rounded-lg"
          />
          {errors.sectionName && <span> Section name is required</span>}
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <button type="submit" className="mt-4 p-2 border border-yellow-50 rounded-lg text-yellow-50 flex items-center gap-x-2">
            {editSection ? "Edit Section Name" : "Create Section"}
            <CiCirclePlus />
          </button>
          {editSection && (
            <button type="button" onClick={cancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-start items-center gap-x-4 mt-3">
        <button onClick={()=> dispatch(resetStep())} className="rounded-md p-2 bg-richblack-700">
          Back
        </button>
        <button onClick={gotoNext} className="p-2 bg-yellow-100 rounded-md flex items-center">
          Next <BiRightArrow />
        </button>
      </div>
    </div>
  )
}

export default CourseBuilder;
