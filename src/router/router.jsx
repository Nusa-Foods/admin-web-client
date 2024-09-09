import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../context/ProtectedRoute.jsx";
import Login from "../view/Login.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../view/Home.jsx";

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
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;
