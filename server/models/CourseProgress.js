const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    completedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSecction",
    }]
})
module.exports = mongoose.model("CourseProgress", progressSchema)