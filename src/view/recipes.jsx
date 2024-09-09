import React, { useEffect, useState } from "react";
import { localRequest } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function RecipesList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hook for navigation
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const token = localStorage.getItem("token");

                const { data } = await localRequest({
                    method: "GET",
                    url: "/admin/nusa",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setRecipes(data);
            } catch (err) {
                setError("Failed to fetch recipes. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return <p>Loading recipes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-4">
            {/* Create Recipe Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Recipes List</h1>
                <button
                    onClick={() => navigate("/create-recipe")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Create Recipe
                </button>
            </div>

            {/* Recipes Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left font-medium text-gray-700">
                                Title
                            </th>
                            <th className="py-3 px-4 text-left font-medium text-gray-700">
                                Slug
                            </th>
                            <th className="py-3 px-4 text-left font-medium text-gray-700">
                                Category
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe) => (
                            <tr
                                key={recipe.slug}
                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-3 px-4">{recipe.title}</td>
                                <td className="py-3 px-4">{recipe.slug}</td>
                                <td className="py-3 px-4">{recipe.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
