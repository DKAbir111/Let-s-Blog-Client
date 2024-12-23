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
                path: '/all-blog',
                element: <AllBlogs />
            },
            {
                path: '/featured-blog',
                element: <FeaturedBlog />
            },
            {
                path: '/wish-list',
                element: <WishList />
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