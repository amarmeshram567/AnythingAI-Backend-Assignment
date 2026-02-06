// const mongoose = require('mongoose')


// const connectDB = async () => {
//     await mongoose.connect(process.env.MONGO_URI).then(() => {
//         console.log("Database connected")
//     }).catch((e) => {
//         console.log(e)
//     });
// };

// module.exports = connectDB


const mongoose = require("mongoose")

let isConnected = false

const connectDB = async () => {
    if (isConnected) return

    try {
        await mongoose.connect(process.env.MONGO_URI)

        isConnected = true
        console.log("MongoDB Connected")
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
        throw error
    }
}

module.exports = connectDB
