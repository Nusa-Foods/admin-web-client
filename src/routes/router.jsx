import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../context/ProtectedRoute.jsx";

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
                element: <RootLayout />,
                children: [
                    {
                        path: "home",
                        element: <AllArticle />,
                    },
                ],
            },
        ],
    },
]);

export default router;
