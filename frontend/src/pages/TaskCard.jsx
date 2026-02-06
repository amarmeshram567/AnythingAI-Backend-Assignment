import { Trash2, Edit, User, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useAppContext } from "../context/AppContext";

const TaskCard = ({ task, onDelete, onUpdate, isDeleting, isUpdating }) => {
    const { user } = useAppContext();

    const isOwner = task.createdBy?._id === user?._id;

    // console.log("tasks: ", task)
    // console.log("Users: ", user)

    return (
        <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:scale-95 duration-300 flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold capitalize text-gray-900 line-clamp-2">
                    {task.title}
                </h3>

                {/* Show buttons for owner */}
                {isOwner && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onUpdate(task._id)}
                            disabled={isUpdating}
                            className="p-2 rounded-md text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                        >
                            <Edit className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => onDelete(task._id)}
                            disabled={isDeleting}
                            className="p-2 rounded-md text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm mb-6">{task.description}</p>

            {/* Footer */}
            <div className="flex justify-between items-center text-gray-500 text-xs">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(task.createdAt), "MMM d, yyyy")}</span>
                </div>

                {user?.role === "admin" && task.createdBy && (
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{task.createdBy.name}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
