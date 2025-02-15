import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://full-stack-job-portal-server.onrender.com/api/wishlist?email=${user.email}`, {
                withCredentials: true,
            })
                .then((res) => {
                    setWishlist(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("Error fetching wishlist");
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [user?.email]);


    const handleRemoveWishlist = (wishId) => {
        axios.delete(`https://full-stack-job-portal-server.onrender.com/api/wishlist/${wishId}`,
            {
                data: { email: user.email },
                withCredentials: true,
            }
        )
            .then(res => {
                if (res.data.deletedCount > 0 && res.data.acknowledged === true) {
                    toast.success("Blog removed from wishlist");
                    const existingWishlist = wishlist.filter(wish => wish.wishId !== wishId)
                    setWishlist(existingWishlist);
                }
                else {
                    toast.error("Error deleting wishlist");
                }
            })

    };

    if (loading) {
        return <div className="flex justify-center items-center col-span-3 text-[#b28b51]">
            <span className="loading loading-bars loading-md"></span>
        </div>
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-8 text-center text-[#b28b51] font-lustria">
                My Wishlist
            </h1>
            <div className="space-y-6">
                {wishlist.length > 0 ? (wishlist.map((blog) => (
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
                                    onClick={() => handleRemoveWishlist(blog.wishId)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))) :
                    <div>
                        <h2 className="text-lg text-center text-[#b28b51] font-lustria">No wishlist added yet! </h2>
                    </div>
                }
            </div>
        </div>
    );
};

export default WishlistPage;
