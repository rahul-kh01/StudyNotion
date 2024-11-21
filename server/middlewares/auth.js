const jwtUtil = require("../config/jwtConfig");
require("dotenv").config();


//Auth
exports.auth = async (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header('Authorization').replace("Bearer ", "");

        if (!token) {
            return res.status(400).json({
                sucess: false,
                message: "token not found",
            })
        }

        try {
            const decode = jwtUtil.verifyAccessToken(token);
            req.user = decode
        } catch (error) {
            return res.status(401).json({
                sucess: false,
                message: "token is invalid",
            })
        }

        next()

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "something went wrong while validating token",
            hint: error.message,
        })
    }
}


//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "student") {
            return res.status(401).json({
                sucess: false,
                message: "This is a protected route for Students only",
            })
        }

        next()

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "user role can't be verified, Try agian",
        })
    }
}


//isIntructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "instructor") {
            return res.status(401).json({
                sucess: false,
                message: "This is a protected route for Instructor only",
            })
        }

        next()

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "user role can't be verified, Try agian",
        })
    }
}


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "admin") {
            return res.status(401).json({
                sucess: false,
                message: "This is a protected route for Admin only",
            })
        }

        next()

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "user role can't be verified, Try agian",
        })
    }
}