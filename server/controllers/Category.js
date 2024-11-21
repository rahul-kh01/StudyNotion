const { default: mongoose } = require('mongoose')
const Category = require('../models/Category')
const {isAdmin} = require('../middlewares/auth')

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

//create Tag
exports.createCategory = async (req, res) => {
    try {
        //fetch data from req body
        const { name, description } = req.body
        //validation
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        const present = await Category.findOne({ name })
        if (present) {
            return res.status(400).json({
                success: false,
                message: "Category already exists",
            })
        }
        //Tag entry in DB
        const tagDetails = await Category.create({
            name,
            description,
        })
        // console.log(tagDetails)

        //return response
        return res.status(200).json({
            success: true,
            message: "Tag created successfully",
            tagDetails
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        //fetch data from req body
        const { name, description, categoryId } = req.body
        //validation
        if (!name || !categoryId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        //Tag entry in DB
        const tagDetails = await Category.findByIdAndUpdate(categoryId, {
            name,
            description,
        }, { new: true })
        // console.log(tagDetails)

        //return response
        return res.status(200).json({
            success: true,
            message: "Tag updated successfully",
            tagDetails
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        //fetch data from req body
        const { categoryId } = req.body
        //validation
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        //Tag entry in DB
        const category = await Category.findById(categoryId)
        if (category.courses.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Category has courses, cannot delete",
            })
        }
        const tagDetails = await Category.findByIdAndDelete(categoryId)

        //return response
        return res.status(200).json({
            success: true,
            message: "Tag deleted successfully",
            tagDetails
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//get All Tags
exports.showAllCategories = async (req, res) => {
    try {
        //find all tags
        // , { name: true, decsription: true }
        const allTags = await Category.find({})

        //return response
        return res.status(200).json({
            success: true, 
            message: "All tags returned successfully",
            allTags,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//category page details
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor"
          },
        })
        .exec()
  
      // console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })

      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()

        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()

      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)

      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }


