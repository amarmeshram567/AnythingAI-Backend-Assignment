const mongoose = require("mongoose")


const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });


const Task = mongoose.model("Task", taskSchema)

module.exports = Task