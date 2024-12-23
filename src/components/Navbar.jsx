import { Link, NavLink } from "react-router-dom";
import TopBar from "./TopBar";

export default function Navbar() {
    return (
        <div>
            <TopBar />
            <nav className=" bg-base-100 border p-3 hidden md:block">
                <ul className="flex justify-center gap-7 font-lato text-sm">
                    <li><Link>Home</Link>  </li>
                    <li><NavLink to={'/add-blog'}>Add Blog</NavLink>  </li>
                    <li><NavLink to={'/all-blog'}>All blogs</NavLink>  </li>
                    <li><NavLink to={'/featured-blog'}> Featured Blogs</NavLink>  </li>
                    <li><NavLink to={'/wish-list'}>Wishlist</NavLink>  </li>
                </ul>
            </nav>
        </div>
    )
}
