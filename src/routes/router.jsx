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
import BlogDetails from "../pages/AllBlogs/BlogDetails";
import UpdateBlog from "../pages/UpdateBlog";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomeLayout />,

            },
            {
                path: "/add-blog",
                element: <PrivateRoutes><AddBlog /></PrivateRoutes>
            },
            {
                path: '/all-blog',
                element: <AllBlogs />,
            },
            {
                path: '/featured-blog',
                element: <FeaturedBlog />
            },
            {
                path: "/blog/:id",
                element: <PrivateRoutes><BlogDetails /></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://full-stack-job-portal-server.onrender.com/api/blog/${params.id}`)
            },
            {
                path: "/update-blog/:id",
                element: <PrivateRoutes><UpdateBlog /> </PrivateRoutes>,
                loader: ({ params }) => fetch(`https://full-stack-job-portal-server.onrender.com/api/blog/${params.id}`)
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