import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/app";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false)

    // fetch tasks
    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get("/api/v1/tasks");
            if (data.success) {
                setTasks(data.tasks);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch tasks");
        } finally {
            setIsLoading(false);
        }
    };

    console.log(tasks)

    // create task
    const createTask = async (taskData) => {
        setIsLoading(true);
        try {
            const { data } = await api.post("/api/v1/tasks", taskData);
            if (data.success) {
                toast.success("Task created");
                setTasks((prev) => [data.task, ...prev]);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Create failed");
        } finally {
            setIsLoading(false);
        }
    };

    // update task
    const updateTask = async (id, updatedData) => {
        setIsLoading(true);
        try {
            const { data } = await api.put(`/api/v1/tasks/${id}`, updatedData);
            if (data.success) {
                toast.success("Task updated");
                setTasks((prev) =>
                    prev.map((task) => (task._id === id ? data.task : task))
                );
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setIsLoading(false);
        }
    };

    // delete task
    const deleteTask = async (id) => {
        setIsLoading(true);
        try {
            const { data } = await api.delete(`/api/v1/tasks/${id}`);
            if (data.success) {
                toast.success("Task deleted");
                setTasks((prev) => prev.filter((task) => task._id !== id));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const value = {
        user,
        setUser,
        tasks,
        setIsLoading,
        isLoading,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        showUserLogin,
        setShowUserLogin,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
}
