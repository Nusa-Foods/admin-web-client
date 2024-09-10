import React, { useState } from "react";
import { localRequest } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function EventCreateForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        quota: "",
        date: "", // Added date field
        location: "",
        locUrl: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const { data } = await localRequest({
                method: "POST",
                url: "/admin/event",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    title: formData.title.toUpperCase(),
                    description: formData.description,
                    imageUrl: formData.imageUrl,
                    quota: parseInt(formData.quota),
                    date: formData.date, // Include date in request data
                    location: formData.location,
                    locUrl: formData.locUrl,
                },
            });

            setSuccess(true);
            setError(null);
            navigate("/event");
        } catch (err) {
            setError("Failed to create event. Please try again.");
            setSuccess(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Event</h1>
            {success && (
                <p className="text-green-600">Event created successfully!</p>
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
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Quota */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Quota
                    </label>
                    <input
                        type="number"
                        name="quota"
                        value={formData.quota}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Location URL */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Location URL
                    </label>
                    <input
                        type="text"
                        name="locUrl"
                        value={formData.locUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    );
}
