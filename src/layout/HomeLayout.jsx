import Banner from "../components/Home/Banner";
import Newsletter from "../components/Home/NewsLetter";
import RecentBlogs from "../components/Home/RecentBlogs";
import VividImpressions from "../components/Home/VividImpressions";


export default function HomeLayout() {
    return (
        <div>
            <Banner />
            <RecentBlogs />
            <VividImpressions />
            <Newsletter />

        </div>
    )
}
