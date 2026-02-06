import { Link } from "react-router-dom";
import {
    CheckSquare,
    ArrowRight,
    ShieldCheck,
    Users,
    Zap,
    Star,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";



const Feature = ({ icon, title, desc }) => (
    <div className="p-6 border border-gray-200 rounded-xl bg-white hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50 flex items-center justify-center">
            {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{desc}</p>
    </div>
);


const Testimonial = ({ name, role, text }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:scale-95 transition-all duration-300">
        <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ))}
        </div>
        <p className="text-gray-600 mb-4 text-sm">“{text}”</p>
        <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
        </div>
    </div>
);


const Landing = () => {

    const { setShowUserLogin } = useAppContext()

    return (
        <div className="min-h-screen bg-gray-50 overflow-hidden">
            <section className="h-screen flex flex-col items-center justify-center">
                <div className="relative text-center max-w-2xl px-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 mb-6 shadow-lg transform hover:scale-110 transition duration-300">
                        <CheckSquare className="h-8 w-8 text-white" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
                        Manage tasks smarter with{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            TaskFlow
                        </span>
                    </h1>

                    <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
                        A modern task management platform built for speed, security,
                        and productivity.
                    </p>

                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="group inline-flex items-center gap-2 px-6 py-3 text-white bg-indigo-600 rounded-md font-medium shadow-md hover:bg-indigo-700 hover:shadow-xl transition-all duration-300"
                    >
                        Get Started
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition" />
                    </button>
                </div>
            </section>

            {/* Features */}
            <section className="py-20  bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">
                        Why choose TaskFlow?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Feature
                            icon={<Zap className="h-6 w-6 text-indigo-600" />}
                            title="Fast & Simple"
                            desc="Create, manage, and track tasks effortlessly."
                        />
                        <Feature
                            icon={<ShieldCheck className="h-6 w-6 text-indigo-600" />}
                            title="Secure"
                            desc="JWT authentication with role-based access control."
                        />
                        <Feature
                            icon={<Users className="h-6 w-6 text-indigo-600" />}
                            title="Team Ready"
                            desc="Admins and users with proper permissions."
                        />
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Loved by developers
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Testimonial
                            name="Aman Verma"
                            role="Frontend Developer"
                            text="TaskFlow helped me organize my daily work perfectly."
                        />
                        <Testimonial
                            name="Riya Sharma"
                            role="Backend Engineer"
                            text="Authentication and RBAC are implemented really well."
                        />
                        <Testimonial
                            name="Karan Patel"
                            role="Startup Founder"
                            text="Simple, secure, and scalable. Exactly what we needed."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} TaskFlow. All rights reserved.
                </div>
            </footer>
        </div>
    );
};


export default Landing;
