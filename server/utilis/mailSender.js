const { transporter } = require("../config/mailConfig")
require("dotenv").config()

exports.mailSender = async (email, subject, body) => {
    try {

        let info = await transporter.sendMail({
            from: `StudyNotion | Rahul Karmakar <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${subject}`,
            html: `${body}`,
        })

    } catch (error) {
        console.log(error.message)
    }
} 