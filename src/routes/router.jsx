import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./Root";
import HomeLayout from "../layout/HomeLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [{
            path: "/",
            element: <HomeLayout />
        }]
    },
]);

export default router;