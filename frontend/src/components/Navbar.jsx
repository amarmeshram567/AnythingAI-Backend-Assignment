import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { ArrowRight, CheckSquare, CircleUserRoundIcon, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser, setShowUserLogin } = useAppContext();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setOpen(false);
        navigate("/");
        toast.success("Logged out successfully");
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-3">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <CheckSquare className="h-4 w-4 text-white" />
                    </div>
                    <h1 className="text-lg font-bold text-gray-700">
                        TaskFlow
                    </h1>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">

                    {/* Not logged in */}
                    {!user && (
                        <button
                            onClick={() => setShowUserLogin(true)}
                            className="px-4 py-1.5 flex items-center gap-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300"
                        >
                            Login
                        </button>
                    )}

                    {/* Logged in */}
                    {user && (
                        <>
                            {/* User Icon */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <CircleUserRoundIcon className="h-6 w-6 text-gray-700" />
                            </button>

                            {open && (
                                <div
                                    ref={dropdownRef}
                                    className="
                                        absolute right-2 top-14
                                        w-56 sm:w-60
                                        bg-white shadow-lg
                                        border border-gray-200
                                        rounded-md z-50
                                    "
                                >
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <p className="font-semibold truncate capitalize">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-gray-600 truncate">
                                            {user.email}
                                        </p>

                                        <span className="inline-block mt-2 rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-xs capitalize">
                                            {user.role}
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                            )}

                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
