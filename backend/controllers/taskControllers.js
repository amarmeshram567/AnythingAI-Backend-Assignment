// const Task = require("../models/Task");


// const createTask = async (req, res) => {
//     try {

//         const { title, description } = req.body;

//         if (!title || !description) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             })
//         }

//         const task = await Task.create({
//             title,
//             description,
//             createdBy: req.user.id
//         });


//         return res.status(201).json({
//             success: true,
//             message: "Task Created Successfully",
//             task
//         })


//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success: false,
//             message: "Server Error"
//         })
//     }
// }


// // const getTasks = async (req, res) => {
// //     try {

// //         const tasks = await Task.find({
// //             createdBy: req.user.id
// //         })

// //         return res.status(200).json({
// //             success: true,
// //             message: "Task fetched successfully",
// //             tasks
// //         });

// //     } catch (error) {
// //         console.log(error)
// //         return res.status(500).json({
// //             success: false,
// //             message: "Server Error"
// //         })
// //     }

// // }

// const getTasks = async (req, res) => {
//     try {
//         let tasks;

//         if (req.user.role === "admin") {
//             // Admin sees all tasks
//             tasks = await Task.find().populate("createdBy", "name email role");
//         } else {
//             // Normal user sees only their tasks
//             tasks = await Task.find({ createdBy: req.user.id }).populate("createdBy", "name email role");
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Tasks fetched successfully",
//             tasks
//         });

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }
// }



// const updateTask = async (req, res) => {
//     try {

//         const { id } = req.params;
//         const { title, description } = req.body;

//         if (!title && !description) {
//             return res.status(400).json({
//                 success: false,
//                 message: "At least one field is required to update"
//             })
//         }

//         const task = await Task.findById(id);

//         if (!task) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Task not found"
//             });
//         }

//         if (req.user.role !== "admin" && task.createdBy.toString() !== req.user.id) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Not allowed to update this task"
//             });
//         }

//         const updatedTask = await Task.findByIdAndUpdate(
//             id,
//             {
//                 $set: { title, description }
//             },
//             { new: true, runValidators: true }
//         )

//         return res.status(200).json({
//             success: true,
//             message: "Task updated successfully",
//             task: updatedTask
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }
// }


// const deleteTask = async (req, res) => {
//     try {

//         const { id } = req.params;

//         const task = await Task.findById(id)

//         if (!task) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Task not found"
//             });
//         }

//         if (req.user.role !== "admin" && task.createdBy.toString() !== req.user.id) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Not allowed to delete this task"
//             })
//         }

//         await task.deleteOne()

//         res.status(200).json({
//             success: true,
//             message: "Task deleted successfully"
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success: false,
//             message: "Server Error"
//         })
//     }
// }



// module.exports = {
//     createTask,
//     getTasks,
//     updateTask,
//     deleteTask
// }


const Task = require("../models/Task");

// ================= CREATE TASK =================
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const task = await Task.create({
            title,
            description,
            createdBy: req.user.id
        });

        await task.populate("createdBy", "name email role");

        return res.status(201).json({
            success: true,
            message: "Task Created Successfully",
            task
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ================= GET TASKS =================
const getTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === "admin") {
            // Admin sees all tasks
            tasks = await Task.find().populate("createdBy", "name email role");
        } else {
            // Normal user sees only their tasks
            tasks = await Task.find({ createdBy: req.user.id }).populate("createdBy", "name email role");
        }

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ================= UPDATE TASK =================
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title && !description) {
            return res.status(400).json({
                success: false,
                message: "At least one field is required to update"
            });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Only the owner can update
        if (task.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to update this task"
            });
        }

        task.title = title || task.title;
        task.description = description || task.description;

        await task.save();
        await task.populate("createdBy", "name email");

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ================= DELETE TASK =================
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Only the owner can delete
        if (task.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to delete this task"
            });
        }

        await task.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};
