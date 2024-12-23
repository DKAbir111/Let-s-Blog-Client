import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5001/api/random-blogs')
            .then(res => {
                setBlogs(res.data);
            })
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
            {blogs.map((blog, index) => (
                <div
                    key={index}
                    className="relative group rounded-sm overflow-hidden shadow-sm"
                >
                    {/* Image */}
                    <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-96 object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <p className="text-sm font-bold">{blog.category}</p>
                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                        <p className="text-xs">{blog.shortDescription}</p>

                        <div className="mt-2">
                            <Link className="btn btn-sm rounded-sm bg-[#b28b51] border-none text-white">Read More</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Banner;
