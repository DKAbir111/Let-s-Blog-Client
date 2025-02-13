import { useEffect, useState } from "react";
import Banner from "../components/Home/Banner";
import Newsletter from "../components/Home/NewsLetter";
import RecentBlogs from "../components/Home/RecentBlogs";
import TrendingBlog from "../components/Home/TrendingBlog";
import VividImpressions from "../components/Home/VividImpressions";
import axios from "axios";

export default function HomeLayout() {
    const [topPosts, setTopPosts] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [topPostsRes, commentsRes] = await Promise.all([
                    fetch("https://let-s-blog-server.vercel.app/api/top-posts").then(res => res.json()),
                    axios.get("https://let-s-blog-server.vercel.app/api/comments/random")
                ]);

                setTopPosts(topPostsRes);
                setCommentData(commentsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Banner />
            <RecentBlogs />
            <TrendingBlog topPosts={topPosts} loading={loading} />
            <VividImpressions commentData={commentData} loading={loading} />
            <Newsletter />
        </div>
    );
}
