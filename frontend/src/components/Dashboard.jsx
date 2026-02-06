import { useState, useEffect } from "react";
import { Edit, Loader2, RefreshCw } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import TaskCard from "../pages/TaskCard";
import CreateTaskDialog from "../pages/CreateTaskDialog";

const Dashboard = () => {
    const {
        tasks,
        fetchTasks,
        createTask,
        deleteTask,
        updateTask,
        user,
        isLoading,
    } = useAppContext();

    const [deleteId, setDeleteId] = useState(null);
    const [updateTaskData, setUpdateTaskData] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        setDeleteId(id);
        await deleteTask(id);
        setDeleteId(null);
    };

    const handleCreateTask = async (title, description) => {
        await createTask({ title, description });
    };

    const openUpdateForm = (task) => {
        setUpdateTaskData(task);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        await updateTask(updateTaskData._id, {
            title: updateTaskData.title,
            description: updateTaskData.description,
        });
        setUpdateTaskData(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 p-5">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Tasks
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base p-1">
                        {user?.role === "admin" ? "All tasks" : "My tasks"}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    {/* Refresh Button */}
                    <button
                        onClick={fetchTasks}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-60 text-sm sm:text-base"
                    >
                        <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 ${isLoading ? "animate-spin" : ""}`} />
                        <span className="sm:inline">Refresh</span>
                    </button>

                    {/* Create Task Button */}
                    <CreateTaskDialog onCreate={handleCreateTask}>
                        <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base">
                            <span className="sm:hidden">
                                <Edit className="h-4 w-4" />
                            </span>
                            <span className="hidden sm:inline">Create Task</span>
                        </button>
                    </CreateTaskDialog>
                </div>
            </div>

            {/* Task list */}
            {isLoading ? (
                <div className="min-h-[calc(50vh-64px)] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                </div>

            ) : tasks.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No tasks found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 pb-10">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={handleDeleteTask}
                            onUpdate={() => openUpdateForm(task)}
                            isDeleting={deleteId === task._id}
                        />
                    ))}
                </div>
            )}

            {/* Update Form Modal */}
            {updateTaskData && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
                    <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Update Task</h2>
                        <form
                            onSubmit={handleUpdateSubmit}
                            className="flex flex-col gap-3 sm:gap-4"
                        >
                            <div>
                                <p className="text-gray-700 font-semibold">Title</p>
                                <input
                                    type="text"
                                    value={updateTaskData.title}
                                    onChange={(e) =>
                                        setUpdateTaskData({ ...updateTaskData, title: e.target.value })
                                    }
                                    className="border border-gray-200 p-2 mt-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                                    placeholder="Task title"
                                    required
                                />
                            </div>

                            <div>
                                <p className="text-gray-700 font-semibold">Description</p>
                                <textarea
                                    value={updateTaskData.description}
                                    onChange={(e) =>
                                        setUpdateTaskData({
                                            ...updateTaskData,
                                            description: e.target.value,
                                        })
                                    }
                                    className="border border-gray-200 p-2 mt-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                                    placeholder="Task description"
                                    required
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setUpdateTaskData(null)}
                                    className="px-4 py-2 border text-gray-500 border-gray-200 rounded-md text-sm hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
