import React, { useState } from "react";
import { localRequest } from "../utils/axios"; // Ganti dengan path yang sesuai
import { useNavigate } from "react-router-dom";

// Fungsi untuk menghasilkan slug dari judul
const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
};

export default function RecipeCreateForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imgUrl: "",
        bannerUrl: "",
        category: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Hook untuk navigasi
    const navigate = useNavigate();

    // Fungsi untuk menangani perubahan pada input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Fungsi untuk menangani pengiriman formulir
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await localRequest({
                method: "POST",
                url: "/admin/nusa",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    title: formData.title,
                    description: formData.description,
                    imgUrl: formData.imgUrl,
                    bannerUrl: formData.bannerUrl,
                    slug: generateSlug(formData.title),
                    category: formData.category,
                },
            });

            setSuccess(true);
            setError(null);
            navigate("/recipe");
        } catch (err) {
            setError("Failed to create recipe. Please try again.");
            setSuccess(false);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>
            {success && (
                <p className="text-green-600">Recipe created successfully!</p>
            )}
            {error && <p className="text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="imgUrl"
                        value={formData.imgUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Banner URL */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Banner URL
                    </label>
                    <input
                        type="text"
                        name="bannerUrl"
                        value={formData.bannerUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Desserts">Desserts</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Create Recipe
                    </button>
                </div>
            </form>
        </div>
    );
}
