const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    message:{
        type: String,
        required: true,
        trim: true,
    },
    contactNumber:{
        phoneNo: {
            type: Number,
            required: true,
            trim: true,
        },
        countrycode: {
            type: Number,
            required: true,
            trim: true,
        },
    }
})
module.exports = mongoose.model("Contact", contactSchema)