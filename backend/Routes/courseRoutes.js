const express = require("express");
const { auth, isInstructor, isAdmin, isStudent } = require("../Middlewares/authe");
const { createCourse, getCourseDetail, getAllCourses, deleteCourse, getInstructorCourses, editCourse, getCategoryCourses, getCourseDetailForInstructor, getCourseDetailForStudent } = require("../Controllers/courseController");
const { createSection, updateSection, deleteSection } = require("../Controllers/sectioncController");
const { createSubSection, updateSubSection, deleteSubsection } = require("../Controllers/SubsectionController");
const { courseProgressController } = require("../Controllers/courseProgressController");

const router = express.Router();


//course routes 
router.post('/create-course', auth, isInstructor, createCourse);
router.get("/all-courses", getAllCourses);
router.post("/getDetails", auth, isStudent, getCourseDetail);
router.post("/getDetailsForInstructor", auth, isInstructor, getCourseDetailForInstructor)
router.post("/getDetailsForStudent", getCourseDetailForStudent);
 
router.delete("/delete-course", auth, isInstructor, deleteCourse);
router.put("/edit-course", auth, isInstructor, editCourse);

//create sections and subsections
router.post('/create-section', auth, isInstructor, createSection)
router.put('/update-section', auth, isInstructor, updateSection);
router.delete('/delete-section', auth, isInstructor, deleteSection);

//create subsection 
router.post('/create-subsection', auth, isInstructor, createSubSection);
router.put('/update-subsection', auth, isInstructor, updateSubSection);
router.delete('/delete-subsection', auth, isInstructor, deleteSubsection);  

//instructor courses
router.get('/get-instructor-courses', auth, isInstructor, getInstructorCourses);
router.post('/categorized-courses', getCategoryCourses);

// course progress routes
router.post('/completed-lectures', auth, isStudent, courseProgressController)

module.exports = router;