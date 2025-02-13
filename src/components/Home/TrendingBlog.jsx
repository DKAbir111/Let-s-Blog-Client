import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export default function TrendingBlogs({ topPosts, loading }) {


    // Fetch the top posts from the API


    if (loading) {
        return (
            <div className="flex justify-center items-center col-span-3 text-[#b28b51]">
                <span className="loading loading-bars loading-md"></span>
            </div>
        );
    }


    return (
        <div className="my-12 container mx-auto font-lato">
            <h3 className="text-3xl text-center text-[#b28b51] font-lustria font-semibold mb-6">
                Trending Blogs
            </h3>
            <Marquee pauseOnHover gradient={false} speed={50} aria-live="polite">
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
                                {/* Improved text truncation */}
                                {blog.shortDescription.length > 50
                                    ? blog.shortDescription.split(" ").slice(0, 8).join(" ") + "..."
                                    : blog.shortDescription}
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


// prop-validation
TrendingBlogs.propTypes = {
    topPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
};
