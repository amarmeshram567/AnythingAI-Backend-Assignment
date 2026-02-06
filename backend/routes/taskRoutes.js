const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const { createTask, getTasks, deleteTask, updateTask } = require('../controllers/taskControllers');
const authorizeRoles = require('../middleware/roleMiddleware');

const taskRouter = express.Router();

taskRouter.post('/',
    verifyToken,
    createTask
);
taskRouter.get("/",
    verifyToken,
    getTasks
);
taskRouter.put("/:id",
    verifyToken,
    authorizeRoles("admin", "user"),
    updateTask
)
taskRouter.delete("/:id",
    verifyToken,
    authorizeRoles("admin", "user"),
    deleteTask
);


module.exports = taskRouter