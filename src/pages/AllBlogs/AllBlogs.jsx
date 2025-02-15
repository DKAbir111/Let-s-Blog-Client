import { useLoaderData } from "react-router-dom";
import Blog from "./Blog";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AllBlogs() {
    const blogs = useLoaderData();
    const [filterBlogs, setFilterBlogs] = useState(blogs || []);
    const [filterText, setFilterText] = useState('');

    const handleSearch = (e) => {
        const searchText = e.target.value;
        axios.get(`https://blog-server-new-steel.vercel.app/api/blogs?q=${searchText}&category=${filterText}`)
            .then(res => {
                setFilterBlogs(res.data);
            }).catch(err => {
                console.log(err);
            });
    };

    const handleFilter = (category) => {
        setFilterText(category);
        axios.get(`https://blog-server-new-steel.vercel.app/api/blogs?&category=${category}`)
            .then(res => {
                setFilterBlogs(res.data);
            }).catch(err => {
                toast.error(err.message);
            });
    };

    return (
        <section>
            <div className="bg-base-200 pt-10 pb-8">
                <h3 className="text-4xl text-center font-lustria">All Blogs</h3>
                <div className="flex container mx-auto justify-between items-center p-3">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1 bg-[#b28b51] text-white rounded-sm">
                            <IoFilter /> Filtered <span className="hidden md:block">by Category</span>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a onClick={() => handleFilter('All')}>All</a></li>
                            <li><a onClick={() => handleFilter('Technology')}>Technology</a></li>
                            <li><a onClick={() => handleFilter('Health')}>Health</a></li>
                            <li><a onClick={() => handleFilter('Travel')}>Travel</a></li>
                            <li><a onClick={() => handleFilter('Education')}>Education</a></li>
                            <li><a onClick={() => handleFilter('Lifestyle')}>Lifestyle</a></li>
                        </ul>
                    </div>
                    <label className="input input-bordered flex items-center gap-2 1/2 md:w-1/3 rounded-sm">
                        <input type="text" className="grow" placeholder="Search" onChange={handleSearch} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 bg-base-100 container mx-auto py-10">
                {
                    filterBlogs?.length > 0 ? filterBlogs.map(blog => <Blog key={blog._id} blog={blog} />) :
                        <div className="text-center text-lg text-gray-500 col-span-3">No blog found.</div>
                }
            </div>
        </section>
    );
}
