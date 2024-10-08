import React from "react";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white text-gray-900 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <FaCog size={32} className="text-green-500" />{" "}
                    {/* Settings icon */}
                    <h1 className="text-4xl font-bold tracking-wide">
                        Nusafood CMS
                    </h1>
                </div>

                {/* Navigation */}
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
