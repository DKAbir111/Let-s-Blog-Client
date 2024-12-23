import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./Root";
import HomeLayout from "../layout/HomeLayout";
import AddBlog from "../pages/AddBlog";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlog from "../pages/FeaturedBlog/FeaturedBlog";
import WishList from "../pages/WishList/WishList";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomeLayout />
            },
            {
                path: "/add-blog",
                element: <PrivateRoutes><AddBlog /></PrivateRoutes>
            },
            {
                path: '/all-blog',
                element: <AllBlogs />,
                loader: () => fetch('http://localhost:5001/api/blogs')
            },
            {
                path: '/featured-blog',
                element: <FeaturedBlog />
            },
            {
                path: '/wish-list',
                element: <PrivateRoutes><WishList /></PrivateRoutes>
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