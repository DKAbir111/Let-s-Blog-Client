import { useLoaderData } from "react-router-dom"
import Blog from "./Blog"

export default function AllBlogs() {
    const blogs = useLoaderData()
    return (
        <section className="">
            <h3 className="text-4xl py-12 text-center bg-base-200 font-lustria">All Blogs</h3>
            <div className="grid grid-cols-3 gap-12 bg-base-100 container mx-auto py-10">
                {
                    blogs.map(blog => <Blog key={blog._id} blog={blog} />)
                }
            </div>

        </section>
    )
}
