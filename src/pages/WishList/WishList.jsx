import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5001/api/wishlist?email=${user.email}`)
                .then((response) => response.json())
                .then((data) => {
                    setWishlist(data);
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("Error fetching wishlist");
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleRemoveWishlist = (blogId) => {
        fetch(`http://localhost:5001/api/wishlist/${blogId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Removed from wishlist!");
                    setWishlist((prev) => prev.filter((item) => item._id !== blogId));
                } else {
                    toast.error("Failed to remove from wishlist");
                }
            })
            .catch((error) => {
                toast.error("Error removing from wishlist");
                console.log(error);
            });
    };

    if (loading) {
        return <div className="text-center mt-20 text-lg text-gray-600">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-8 text-center text-[#b28b51] font-lustria">
                My Wishlist
            </h1>
            <div className="space-y-6">
                {wishlist.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row"
                    >
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full md:w-1/3 h-48 object-cover"
                        />
                        <div className="p-4 flex-1">
                            <h2 className="text-2xl font-bold text-[#b28b51]">{blog.title}</h2>
                            <p className="text-sm text-gray-600 mb-2">
                                Category: {blog.category}
                            </p>
                            <p className="text-gray-700 mb-4">{blog.shortDescription}</p>
                            <div className="flex justify-between mt-auto">
                                <Link
                                    className="btn btn-sm bg-[#b28b51] text-white px-4 py-2 hover:bg-[#9e7845]"
                                    to={`/blog/${blog._id}`}
                                >
                                    Details
                                </Link>
                                <button
                                    className="btn btn-sm border-2 border-[#b28b51] text-[#b28b51] px-4 py-2 hover:bg-[#b28b51] hover:text-white"
                                    onClick={() => handleRemoveWishlist(blog._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
