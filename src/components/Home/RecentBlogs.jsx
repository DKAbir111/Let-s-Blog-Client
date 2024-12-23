import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "aos/dist/aos.css";
import AOS from "aos";

const RecentBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/latest-blogs")
            .then((response) => {
                setBlogs(response.data);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
            });
    }, []);

    return (
        <section className="py-16 bg-gray-50" data-aos="fade-up">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">Recent Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                            data-aos="flip-left"
                        >
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-56 object-cover"
                            />
                            {/* Blog Content */}
                            <div className="p-6">
                                <p className="text-sm font-bold text-gray-600">{blog.category}</p>
                                <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-4">{blog.title}</h3>
                                <p className="text-gray-600 mb-4">{blog.shortDescription}</p>
                                {/* Action Buttons */}
                                <div className="flex justify-between items-center">
                                    {/* Details Button */}
                                    <Link
                                        to={`/blog/${blog._id}`}
                                        className="btn btn-sm rounded-sm bg-[#888888] text-white"
                                    >
                                        Details
                                    </Link>
                                    {/* Wishlist Button */}
                                    <button
                                        className="btn btn-sm rounded-sm bg-yellow-600 text-white hover:bg-yellow-700"
                                        onClick={() => handleAddToWishlist(blog._id)}
                                    >
                                        Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const handleAddToWishlist = (blogId) => {
    // Logic to add the blog to the user's wishlist
    console.log(`Added blog with ID ${blogId} to wishlist.`);
    // This can be an API call to add the blog to the wishlist in the database
};

export default RecentBlogs;
