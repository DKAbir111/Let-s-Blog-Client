import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "aos/dist/aos.css";
import AOS from "aos";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";  // Import framer-motion

const RecentBlogs = ({ loading, blogs }) => {

    const { user, addWishList } = useContext(AuthContext);


    useEffect(() => {
        AOS.init();
        AOS.refresh(); // Ensure AOS is refreshed after initial load
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center col-span-3 text-[#b28b51]">
                <span className="loading loading-bars loading-md"></span>
            </div>
        );
    }

    return (
        <section className="py-16 bg-gray-50 font-lato" data-aos="fade-up">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-semibold text-[#b28b51] mb-8 font-lustria">Recent Blogs</h2>
                {/* Show message if no blogs are found */}
                {blogs?.length === 0 && !loading && (
                    <p className="text-gray-500 col-span-3">No recent blogs found.</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs?.map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-white rounded-sm shadow-lg overflow-hidden transform transition-transform duration-300"
                            data-aos="flip-left"
                        >
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-56 object-cover"
                            />
                            {/* Blog Content */}
                            <div className="p-6">
                                <motion.p
                                    className="text-sm font-bold"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [1, 0.8, 1],
                                        color: ["#000000", "#b28b51", "#000000"],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "easeInOut",
                                    }}
                                >
                                    {blog.category}
                                </motion.p>
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
            </div>
        </section>
    );
};

export default RecentBlogs;

//prop-validation
RecentBlogs.propTypes = {
    loading: PropTypes.bool.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

