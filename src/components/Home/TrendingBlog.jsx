import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TrendingBlogs() {
    const [topPosts, setTopPosts] = useState([]);

    // Fetch the top posts from the API
    useEffect(() => {
        fetch("https://full-stack-job-portal-server.onrender.com/api/top-posts")
            .then((response) => response.json())
            .then((data) => setTopPosts(data))
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    return (
        <div className="my-12 container mx-auto font-lato">
            <h3 className="text-3xl text-center text-[#b28b51] font-lustria font-semibold mb-6">
                Trending Blogs
            </h3>
            <Marquee pauseOnHover gradient={false} speed={50}>
                {topPosts.map((blog) => (
                    <div
                        key={blog._id}
                        className="flex flex-col items-center justify-center mx-6"
                    >
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-36 h-36 object-cover rounded-lg mb-2"
                        />
                        <div className="text-center">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                {blog.title}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">{blog.category}</p>
                            <p className="text-xs text-gray-400 mb-4">
                                {blog.shortDescription.split(" ").slice(0, 8).join(" ") + "..."}
                            </p>
                            <Link
                                to={`/blog/${blog._id}`}
                                className="text-sm text-[#b28b51] hover:underline"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    );
}
