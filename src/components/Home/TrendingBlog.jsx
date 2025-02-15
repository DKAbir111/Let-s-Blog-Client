import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TrendingBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://let-s-blog-server.vercel.app/api/latest-blogs')
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="my-12 container mx-auto font-lato">
            <h3 className="text-3xl text-center text-[#b28b51] font-lustria font-semibold mb-6">
                Trending Blogs
            </h3>

            {loading ? (
                <Marquee pauseOnHover gradient={false} speed={50} aria-live="polite">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center justify-center mx-6 animate-pulse">
                            <div className="w-36 h-36 bg-gray-300 rounded-lg mb-2"></div>
                            <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="w-20 h-3 bg-gray-300 rounded mb-2"></div>
                            <div className="w-32 h-3 bg-gray-300 rounded mb-4"></div>
                            <div className="w-16 h-3 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </Marquee>
            ) : (
                <Marquee pauseOnHover gradient={false} speed={50} aria-live="polite">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="flex flex-col items-center justify-center mx-6">
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-36 h-36 object-cover rounded-lg mb-2"
                            />
                            <div className="text-center">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">{blog.title}</h4>
                                <p className="text-xs text-gray-500 mb-2">{blog.category}</p>
                                <p className="text-xs text-gray-400 mb-4">
                                    {blog.shortDescription.length > 50
                                        ? blog.shortDescription.split(" ").slice(0, 8).join(" ") + "..."
                                        : blog.shortDescription}
                                </p>
                                <Link to={`/blog/${blog._id}`} className="text-sm text-[#b28b51] hover:underline">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </Marquee>
            )}
        </div>
    );
}
