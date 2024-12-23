import { Link } from "react-router-dom";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";

export default function Blog({ blog }) {
    const { imageUrl, title, shortDescription, category } = blog;
    return (
        <div className="bg-white rounded-sm shadow-lg overflow-hidden font-lato">
            {/* Blog Image */}
            <img src={imageUrl} alt="Blog Image" className="w-full h-64 object-cover" />

            <div className="p-4">
                <h2 className="text-xl font-lustria text-gray-800 text-center font-thin">
                    {title}
                </h2>
                <div className="divider text-[#b28b51] text-sm font-lato">{category}</div>

                <p className="text-gray-600 mt-2">{shortDescription}..</p>

                <div className="flex justify-between items-center mt-4">
                    <Link
                        className="text-sm text-[#b28b51] hover:text-black flex items-center gap-1"
                        to={`/blog/${blog._id}`}
                    >
                        <FaBookOpenReader /> Read More
                    </Link>
                    <button
                        type="button"
                        className="text-sm text-[#b28b51] hover:text-black flex items-center gap-1"
                    >
                        <FaHeart /> Wish List
                    </button>
                </div>
            </div>
        </div>
    );
}

// Prop Validation
Blog.propTypes = {
    blog: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
};
