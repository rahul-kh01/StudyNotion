const mongoose = require('mongoose')
require("dotenv").config()

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("database connected ...");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = dbConnect