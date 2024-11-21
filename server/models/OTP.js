const mongoose = require('mongoose')
const { mailSender } = require('../utilis/mailSender')
const otpTemplate = require('../mail/template/emailVerificationTemplate')  


const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
		type: Date,
		default: Date.now,
		expires: 600, // The document will be automatically deleted after 5 minutes of its creation time
	},
})

async function sendVerificationEmail(email, otp) {
    try {
        await mailSender(email, "Verification Email Form StudyNotion", otpTemplate(otp))
        // console.log("Email sent sucessfully  ", mailresponse)
    } catch (error) {
        console.log("error occured at sending email", error)
        throw error
    }
}


otpSchema.pre("save", async function (next) {
    console.log("New document saved to database");

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", otpSchema)