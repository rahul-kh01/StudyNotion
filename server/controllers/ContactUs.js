const { contactUsEmail } = require("../mail/template/contactFormRes")
const { mailSender } = require("../utilis/mailSender")
const { default: mongoose } = require('mongoose')
const Contact = require('../models/Contact')


exports.contactUsController = async (req, res) => {
  const { email, firstName, lastName, message, phoneNo, countrycode } = req.body
  try {
    const msg = await Contact.create({
      email,
      firstName,
      lastName,
      message,
      contactNumber: {
        phoneNo,
        countrycode,
      },
    })

    await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstName, lastName, message, phoneNo, countrycode)
    )

    return res.json({
      success: true,
      message: "Email send successfully",
      msg
    })
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong..." + error.message,
    })
  }
}

exports.getAllMessages = async (req, res) => {
  try {
    const allMessages = await Contact.find({})
    return res.json({
      success: true,
      message: "All messages fetched successfully",
      allMessages,
    })
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong..." + error.message,
    })
  }
}

exports.deleteMessage = async (req, res) => {
  const { id } = req.params
  try {
    const deleteMessage = await Contact.findByIdAndDelete(id)
    return res.json({
      success: true,
      message: "Message deleted successfully",
      deleteMessage,
    })
  }
  catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong..." + error.message,
    })
  } 
}