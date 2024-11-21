const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        trim: true,
    },
    courseDescription: {
        type: String,
        trim: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    whatYouWillLearn: {
        type: String,
        required: true
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ], 
    ratingAndreviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingandReview",
        }
    ],
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
        // required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required    : true,
    },
    studentEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }],
    instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    }
},
{timestamps:true})
module.exports = mongoose.model("Course", courseSchema)