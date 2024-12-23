import { useContext } from 'react';
import logo from '../assets/letsblog.png'
import { FaFacebook, FaInstagram, FaPinterest, FaSearch, FaTwitter } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function TopBar() {
    const { user, logOut } = useContext(AuthContext)
    return (
        <section className='py-2 md:py-5 px-2 bg-base-100'>
            <nav className='flex justify-between container mx-auto items-start'>
                <div className='md:flex gap-3 hidden'>
                    <FaFacebook />
                    <FaTwitter />
                    <FaPinterest />
                    <FaInstagram />
                </div>
                <div className='md:flex justify-center'>
                    <img src={logo} alt="Blog Logo" className='w-1/4 md:w-1/3' />
                </div>
                <div className='flex items-center '>
                    <div className="drawer drawer-end font-lato">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-4" className="flex gap-3 items-center cursor-pointer">
                                <FaSearch className='md:hidden' />
                                <GiHamburgerMenu className='text-3xl md:hidden' />
                                {
                                    user?.email ?
                                        <>
                                            <span className='hidden md:block bg-[#b28b51] rounded-full p-1'><img src={user?.photoURL
                                            } alt="Profile" className='h-10 w-10 rounded-full' /></span>
                                            <button className='hidden md:block btn btn-active bg-[#b28b51] rounded-sm text-white' onClick={logOut}>Log out</button>
                                        </> :
                                        <>
                                            <Link to={'/auth/login'}>  <button className='hidden md:block btn btn-active bg-[#b28b51] rounded-sm text-white'>Log in</button></Link>
                                            <Link to={'/auth/register'}>  <button className='hidden md:block btn btn-ghost rounded-sm'>Register</button></Link>
                                        </>
                                }
                            </label>
                        </div>
                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-screen w-72 p-4">
                                {/* Sidebar content here */}
                                <div className='mb-5'>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <input type="text" className="grow" placeholder="Search" />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="h-4 w-4 opacity-70">
                                            <path
                                                fillRule="evenodd"
                                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </label>
                                </div>
                                <li><Link to={'/'}>Home</Link>  </li>
                                <li><NavLink to={'/all-blog'}>All blogs</NavLink>  </li>
                                <li><NavLink to={'/featured-blog'}> Featured Blogs</NavLink>  </li>
                                {
                                    user?.email && <>
                                        <li><NavLink to={'/add-blog'}>Add Blog</NavLink>  </li>
                                        <li><NavLink to={'/wish-list'}>Wishlist</NavLink>  </li>
                                        <div className='mt-5 flex flex-col items-center'>
                                            <h4 className='text-center font-semibold mb-5'>About me</h4>
                                            <img src={user?.photoURL} alt="User" className='h-24 w-24 rounded-full mb-2' />
                                            <p className='mb-1 text-gray-500'>{user?.displayName}</p>
                                            <p className='text-gray-500 text-sm'>Email: {user?.email}</p>
                                        </div>
                                    </>
                                }

                                <div className='mt-5 flex justify-center'>
                                    {
                                        user?.email ?
                                            <>

                                                <button className='btn btn-active bg-[#b28b51] rounded-sm text-white' onClick={logOut}>Log out</button>
                                            </> :
                                            <>
                                                <Link to={'/auth/login'}>  <button className='btn btn-active bg-[#b28b51] rounded-sm text-white'>Log in</button></Link>
                                                <Link to={'/auth/register'}>  <button className='btn btn-ghost rounded-sm border-[#b28b51] ml-3'>Register</button></Link>
                                            </>
                                    }
                                </div>
                                <div className='flex gap-3 mt-7 justify-center opacity-55'>
                                    <a href=""> <FaFacebook /></a>
                                    <a href=""> <FaTwitter /></a>
                                    <a href=""> <FaPinterest /></a>
                                    <a href=""> <FaInstagram /></a>
                                </div>
                            </ul>

                        </div>
                    </div>
                </div>
            </nav>
        </section>
    )
}
