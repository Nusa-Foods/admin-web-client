import React, { useEffect, useState } from "react";
import { localRequest } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function EventsList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ensure useNavigate is called at the top level of the component
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch events
        const fetchEvents = async () => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem("token");

                const response = await localRequest({
                    method: "GET",
                    url: "/admin/event",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvents(response.data);
            } catch (err) {
                setError("Failed to fetch events. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-4">
            {/* Create Event Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Event List</h1>
                <button
                    onClick={() => handleNavigate("/create-event")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Create Event
                </button>
            </div>

            {/* Events Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left font-medium text-gray-700">
                                Event
                            </th>
                            <th className="py-3 px-4 text-left font-medium text-gray-700">
                                Slug
                            </th>
                            <th className="py-3 px-4 text-left font-medium text-gray-700">
                                Quota
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr
                                key={event._id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-3 px-4">{event.title}</td>
                                <td className="py-3 px-4">{event.slug}</td>
                                <td className="py-3 px-4">{event.quota}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
