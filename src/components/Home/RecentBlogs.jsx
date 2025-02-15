import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";

const RecentBlogs = () => {
    const { user, addWishList } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://blog-server-new-steel.vercel.app/api/top-posts')
                .then(res => {
                    setBlogs(res.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching recent blogs:", error);
                    setLoading(false);
                });
        }
        fetchData();
    }, []);

    return (
        <section className="py-16 bg-gray-50 font-lato" data-aos="fade-up">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-semibold text-[#b28b51] mb-8 font-lustria">Recent Blogs</h2>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="bg-white rounded-sm shadow-lg overflow-hidden animate-pulse">
                                <div className="w-full h-56 bg-gray-300"></div>
                                <div className="p-6">
                                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="h-8 bg-gray-300 rounded w-20"></div>
                                        <div className="h-8 bg-gray-300 rounded w-24"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {blogs?.length === 0 && (
                            <p className="text-gray-500 col-span-3">No recent blogs found.</p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs?.map((blog) => (
                                <div key={blog._id} className="bg-white rounded-sm shadow-lg overflow-hidden transform transition-transform duration-300" data-aos="flip-left">
                                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-56 object-cover" />
                                    <div className="p-6">
                                        <motion.p
                                            className="text-sm font-bold"
                                            animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1], color: ["#000000", "#b28b51", "#000000"] }}
                                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                                        >
                                            {blog.category}
                                        </motion.p>
                                        <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-4">{blog.title}</h3>
                                        <p className="text-gray-600 mb-4">{blog.shortDescription}</p>
                                        <div className="flex justify-between items-center">
                                            <Link to={`/blog/${blog._id}`} className="btn btn-sm rounded-sm bg-[#888888] text-white">
                                                Details
                                            </Link>
                                            <button
                                                className="btn btn-sm rounded-sm bg-[#b28b51] text-white hover:bg-yellow-700"
                                                onClick={() => {
                                                    user?.email
                                                        ? addWishList(blog._id, user?.email)
                                                        : toast.error('Please login to add to wishlist');
                                                }}
                                            >
                                                Add to Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default RecentBlogs;