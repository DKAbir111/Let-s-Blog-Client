import Banner from "../components/Home/Banner";
import Newsletter from "../components/Home/NewsLetter";
import RecentBlogs from "../components/Home/RecentBlogs";


export default function HomeLayout() {
    return (
        <div>
            <Banner />
            <RecentBlogs />
            <Newsletter />

        </div>
    )
}
