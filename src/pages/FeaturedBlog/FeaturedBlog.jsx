import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const FeaturedBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addWishList, user } = useContext(AuthContext)

    useEffect(() => {
        fetch("http://localhost:5001/api/top-posts")
            .then((response) => response.json())
            .then((data) => {
                setBlogs(data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Error fetching top posts");
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-8 text-center font-lustria">Featured Blogs</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white shadow-lg rounded-lg font-lato">
                    <thead className="bg-[#b28b51] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Title</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Short Description</th>
                            <th className="px-6 py-3 text-left">Word Count</th>
                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id} className="border-b hover:bg-gray-100">
                                <td className="px-6 py-4">{blog.title}</td>
                                <td className="px-6 py-4">{blog.category}</td>
                                <td className="px-6 py-4">{blog.shortDescription}</td>
                                <td className="px-6 py-4">{blog.wordCount}</td>
                                <td className="px-6 py-4 flex">
                                    <Link
                                        className="btn btn-sm rounded-sm bg-[#b28b51] text-white"
                                        to={`/blog/${blog._id}`}

                                    >
                                        Details
                                    </Link>
                                    <button
                                        className="btn btn-sm rounded-sm ml-2 border-2 border-[#b28b51] hover:bg-[#b28b51] hover:border-[#b28b51] hover:text-white"
                                        onClick={() => {
                                            user?.email ?
                                                addWishList(blog?._id, user?.email) :
                                                toast.error('Please login to add to wishlist')
                                        }}
                                    >
                                        Wishlist
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeaturedBlog;
