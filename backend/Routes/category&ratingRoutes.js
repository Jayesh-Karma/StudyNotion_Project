const express = require("express");
const router = express.Router();


const { auth, isInstructor, isAdmin, isStudent } = require("../Middlewares/authe");
const { getAverageRating, getAllRating, createRating } = require("../Controllers/ratingAndReview");
const { getAllCategory, categoryPageDetails, createCategory } = require("../Controllers/categoryController");


//admin work  
router.post("/create-category", auth, isAdmin, createCategory);
router.get("/get-category", getAllCategory);
router.post("/selected-category-courses", categoryPageDetails);

 
 
// rating and reviews
router.post("/createRating", auth, isStudent, createRating);
router.get("averageRating", getAverageRating);
router.get("/getAllRatings", getAllRating);

 
module.exports = router;