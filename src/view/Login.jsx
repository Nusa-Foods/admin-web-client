// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { localRequest } from "../utils/axios";
import { FaUtensils } from "react-icons/fa";

export default function Login() {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = userData;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            let { data } = await localRequest({
                url: "/admin/login",
                method: "POST",
                data: { email, password },
            });
            console.log(data);
            localStorage.setItem("token", data.accessToken);
            navigate("/home");
        } catch (error) {
            console.error(
                "Login failed:",
                error.response ? error.response.data : error.message
            );
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-4">
            <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md transform transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-4">
                    <FaUtensils size={50} className="text-green-500" />{" "}
                </div>
                <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
                    Welcome to Nusafood CMS
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border border-green-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-8">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={userData.password}
                            onChange={handleChange}
                            className="shadow appearance-none border border-green-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
