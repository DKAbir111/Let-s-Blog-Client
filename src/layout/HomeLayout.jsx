import Banner from "../components/Home/Banner";
import Newsletter from "../components/Home/NewsLetter";
import RecentBlogs from "../components/Home/RecentBlogs";
import TrendingBlog from "../components/Home/TrendingBlog";
import VividImpressions from "../components/Home/VividImpressions";

export default function HomeLayout() {


    return (
        <div>
            <Banner />
            <RecentBlogs />
            <TrendingBlog />
            <VividImpressions />
            <Newsletter />
        </div>
    );
}
