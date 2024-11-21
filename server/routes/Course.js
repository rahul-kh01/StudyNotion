const express = require('express')
const router = express.Router()

// Course Controllers Import
const {
    createCourse,
    getAllCourses,
    getCourseDetailsAPI,
    getFullCourseDetailsAPI,
    editCourse,
    getInstructorCourses,
    deleteCourse,
  } = require("../controllers/Course")
const {updateCourseProgress} = require("../controllers/CourseProgress")

// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
    updateCategory,
    deleteCategory,

} = require("../controllers/Category")

// Sections Controllers Import
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
    createSubsection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/Subsection")

const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")




// course routes


// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.put("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.delete("/deleteSection", auth, isInstructor, deleteSection)




// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubsection)
// Edit Sub Section
router.put("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection)




// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetailsAPI", getCourseDetailsAPI)


router.post("/getFullCourseDetailsAPI", auth, getFullCourseDetailsAPI)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)



// category routes only by isAdmin
router.post("/createCategory", auth, isAdmin, createCategory)
router.put("/updateCategory", auth, isAdmin, updateCategory)
router.delete("/deleteCategory", auth, isAdmin, deleteCategory)

router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

//progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)


//rating and review
router.post("/createRating", auth, isStudent, createRating)
router.post("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router 