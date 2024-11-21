const express = require('express')
const serverless = require("serverless-http")
const dbConnect = require('./config/database')
const userRoutes = require("./routes/User")
const courseRoutes = require("./routes/Course")
const paymentsRoutes = require("./routes/Payments")
const profileRoutes = require("./routes/Profile")
const cookieParser = require('cookie-parser')
const cors = require("cors")
const { cloudinaryConnect } = require("./config/cloudinary")
const fileupload = require('express-fileupload')
require('dotenv').config()

// server
const app = express()

const PORT = process.env.PORT || 8000
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL2
]

//database connect
dbConnect()

//middewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)


//cloudinary connection
cloudinaryConnect()

// routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentsRoutes)
app.use("/api/v1/profile", profileRoutes)


// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your Server is Up and running..."
    })
})
app.listen(PORT, () => console.log(`backend running at port${PORT}`))

module.exports.handler = serverless(app);