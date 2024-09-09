import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Welcome to Nusafood CMS
                </h1>
                <p className="text-center mb-8 text-gray-600 italic">
                    "The only limit to our realization of tomorrow is our doubts
                    of today."
                    <br />— Franklin D. Roosevelt
                </p>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => handleNavigate("/recipe")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    >
                        Go to Recipes
                    </button>
                    <button
                        onClick={() => handleNavigate("/event")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    >
                        Go to Events
                    </button>
                </div>
            </div>
        </div>
    );
}
