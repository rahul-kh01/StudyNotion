const RatingandReview = require("../models/RatingandReview")
const Course = require("../models/Course")
const { mongo, default: mongoose } = require("mongoose");

//creating rating
exports.createRating = async (req, res) => {
    try {
        //get user id
        const userId = req.user.id

        //fetch data from req body
        const { rating, review, courseId } = req.body

        //check if user enrolled or not
        // const course = await Course.findById({ _id: courseId })
        // if (!course.studentEnrolled.includes(userId)) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "User not enrolled in this course",
        //     })
        // }
        const CourseDetailsAPI = await Course.findOne({ _id: courseId, studentEnrolled: { $elemMatch: { $eq: userId } } })
        if (!CourseDetailsAPI) {
            return res.status(404).json({
                success: false,
                message: "Student not enrolled in this course",
            })
        }

        //already reviewed
        const alreadyReviewed = await RatingandReview.findOne({ user: userId, course: courseId })
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Student already reviewed this course",
            })
        }
        //create rating & review
        const RatingReview = await RatingandReview.create({ user: userId, course: courseId, rating, review })

        //update in course
        const updatedCourseDetailsAPI = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push:
                    { ratingAndreviews: RatingReview._id }
            },
            { new: true }
        )
        console.log(updatedCourseDetailsAPI)

        // return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            RatingReview,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}



//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
        //get courseId
        const { courseId } = req.body
        //calculate average rating
        const result = await RatingandReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ])

        //return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            })
        }

        //if rating not exist
        return res.status(200).json({
            success: true,
            message: "Average rating is 0, no rting given till now",
            averageRating: 0
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}



//getAllRating
exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingandReview.find({})
            .sort({ rating: "desc" })
            .populate({ path: "user", select: "firstName lastName email image" })
            .populate({ path: "course", select: "courseName" })
            .exec()

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//get course all rating  ###may be updated if courseid not valid
exports.courseAllRating = async (req, res) => {
    try {
        const { courseId } = req.body

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "CourseId required",
            })
        }

        const allReviews = await RatingandReview.find({ _id: courseId })
            .sort({ rating: "desc" })
            .populate({ path: "user", select: "firstname lastname email image" })
            .exec()

        return res.status(200).json({
            success: true,
            message: "All reviews of this course fetched successfully",
            data: allReviews,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}