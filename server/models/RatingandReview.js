const mongoose = require('mongoose')

const ratingAndreviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        trim: true,
        required: true,
    },
})
module.exports = mongoose.model("RatingandReview", ratingAndreviewSchema)