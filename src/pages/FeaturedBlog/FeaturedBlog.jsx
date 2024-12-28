import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import DataTable from "react-data-table-component";

const FeaturedBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addWishList, user } = useContext(AuthContext);

    // Fetch blog data
    useEffect(() => {
        fetch("https://full-stack-job-portal-server.onrender.com/api/top-posts")
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


    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
            cell: row => (
                <span className="text-gray-800 font-semibold">{row.title}</span>
            ),
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
            cell: row => (
                <span className="text-gray-600">{row.category}</span>
            ),
        },
        {
            name: 'Short Description',
            selector: row => row.shortDescription,
            sortable: true,
            cell: row => (
                <span className="text-gray-700">{row.shortDescription}</span>
            ),
        },
        {
            name: 'Word Count',
            selector: row => row.wordCount,
            sortable: true,
            cell: row => (
                <span className="text-gray-600">{row.wordCount}</span>
            ),
        },
        {
            name: 'Action',
            cell: row => (
                <div className="flex space-x-2">
                    <Link
                        className="btn btn-sm rounded-sm bg-[#b28b51] text-white py-2 px-4"
                        to={`/blog/${row._id}`}
                    >
                        Details
                    </Link>
                    <button
                        className="btn btn-sm rounded-sm border-2 border-[#b28b51] text-[#b28b51] py-2 px-4 hover:bg-[#b28b51] hover:text-white hover:border-[#b28b51]"
                        onClick={() => {
                            user?.email ?
                                addWishList(row._id, user?.email) :
                                toast.error('Please login to add to wishlist');
                        }}
                    >
                        Wishlist
                    </button>
                </div>
            ),
        }
    ];


    if (loading) {
        return <div className="flex justify-center items-center col-span-3 text-[#b28b51]">
            <span className="loading loading-bars loading-md"></span>
        </div>
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-8 text-center text-gray-900 font-lustria">Featured Blogs</h1>
            <div className="overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={blogs}
                    pagination
                    highlightOnHover
                    responsive

                    customStyles={{
                        headCells: {
                            style: {
                                backgroundColor: '#b28b51',
                                color: 'white',
                                fontWeight: 'bold',
                                padding: '12px',
                            }
                        },
                        cells: {
                            style: {
                                padding: '12px',
                            }
                        },
                        rows: {
                            style: {
                                padding: '12px',
                                borderBottom: '1px solid #e5e7eb',
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default FeaturedBlog;
