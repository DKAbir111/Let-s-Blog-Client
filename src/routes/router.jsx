import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./Root";
import HomeLayout from "../layout/HomeLayout";
import AddBlog from "../pages/AddBlog";

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
            }
        ]
    },
]);

export default router;