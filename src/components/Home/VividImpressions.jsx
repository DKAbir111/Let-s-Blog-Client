import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const VividImpressions = () => {
    const [commentData, setCommentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // New state for error handling

    useEffect(() => {
        axios
            .get('https://let-s-blog-server.vercel.app/api/comments/random')
            .then(res => {
                setCommentData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load comments. Please try again later."); // Error message
                setLoading(false);
            });
    }, []);

    return (
        <section className="bg-gray-100 py-12 px-6 font-lato">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-6 text-[#b28b51] p-5 font-lustria">Vivid Impressions</h2>

                {error && (
                    <div className="text-red-500 mb-6">
                        <p>{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-28 md:gap-16 gap-7">
                    {loading ? (
                        <div className="flex justify-center items-center col-span-3 text-[#b28b51]">
                            <span className="loading loading-bars loading-md"></span>
                        </div>
                    ) : (
                        commentData.map((comment) => (
                            <motion.div
                                key={comment._id}
                                className="bg-white p-6 rounded-sm shadow-sm border-l-8 border-[#b28b51]"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex flex-col items-center space-x-4 justify-center">
                                    {/* User Profile */}
                                    <img
                                        src={comment.userProfilePic || '/path/to/default-profile-pic.jpg'} // Fallback image
                                        alt={comment.userName}
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{comment.userName}</h3>
                                    </div>
                                </div>

                                <div className="mt-4 text-gray-700">
                                    {/* Truncated Comment Text */}
                                    <p className="italic text-gray-600">
                                        {comment.text.length > 100
                                            ? `"${comment.text.slice(0, 100)}..."` // Truncate after 100 characters
                                            : `"${comment.text}"`}
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default VividImpressions;
