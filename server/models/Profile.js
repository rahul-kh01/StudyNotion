const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ["Male", "Female","Non-Binary", "Prefer not to say", "Others"],
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
})
module.exports = mongoose.model("profile", profileSchema)