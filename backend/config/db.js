const mongoose = require('mongoose')


const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Database connected")
    }).catch((e) => {
        console.log(e)
    });
};

module.exports = connectDB

