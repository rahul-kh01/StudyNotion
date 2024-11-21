// Import the required modules
const express = require("express");
const router = express.Router()

// Import the required controllers and middleware functions
const {
    login,
    signUp,
    sendOTP,
    changePassword,
    getAdminData,
    reLogin,
    logout
} = require("../controllers/Auth")
const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword")

const { auth, isAdmin } = require("../middlewares/auth")

const {contactUsController, getAllMessages, deleteMessage} = require("../controllers/ContactUs")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user logout
router.get("/logout", auth, logout)

// Route for re-login
router.post("/refresh", reLogin)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
router.post("/contactus", contactUsController)
router.get("/allcontactmsg",auth, isAdmin, getAllMessages)
router.delete("/deletecontactmsg/:id",auth, isAdmin, deleteMessage)
router.get("/admin-data", auth, isAdmin, getAdminData)
module.exports = router