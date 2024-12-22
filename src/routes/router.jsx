import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./Root";
import HomeLayout from "../layout/HomeLayout";
import AddBlog from "../pages/AddBlog";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <HomeLayout />
            },
            {
                path: "/add-blog",
                element: <AddBlog />
            },
            {
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "/auth/register",
                element: <Register />
            }
        ]
    },
]);

export default router;