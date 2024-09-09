import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../context/ProtectedRoute.jsx";
import Login from "../view/Login.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../view/Home.jsx";
import EventsList from "../view/event.jsx";
import RecipesList from "../view/recipes.jsx";
import EventCreateForm from "../view/createEvent.jsx";
import RecipeCreateForm from "../view/createRecipe.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/",
                        element: <RootLayout />,
                        children: [
                            {
                                path: "home",
                                element: <Home />,
                            },
                            {
                                path: "event",
                                element: <EventsList />,
                            },
                            {
                                path: "recipe",
                                element: <RecipesList />,
                            },
                            {
                                path: "create-event",
                                element: <EventCreateForm />,
                            },
                            {
                                path: "create-recipe",
                                element: <RecipeCreateForm />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;
