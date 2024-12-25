import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "aos/dist/aos.css";
import AOS from "aos";

const Banner = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        const data = [
            {
                imageUrl: "https://i.ibb.co.com/RgTwT3n/education.jpg",
                title: "Education for All",
                shortDescription:
                    "Explore the world of education, where knowledge empowers individuals to build a better future.",
            },
            {
                imageUrl: "https://i.ibb.co.com/pZnXvcX/health.webp",
                title: "Health and Wellness",
                shortDescription:
                    "Discover tips, resources, and insights on living a healthy and balanced lifestyle.",
            },
            {
                imageUrl: "https://i.ibb.co.com/vkL4pKd/technology.jpg",
                title: "Advancing Technology",
                shortDescription:
                    "Stay updated with the latest trends in technology, from innovations to breakthroughs shaping the future.",
            },
            {
                imageUrl: "https://i.ibb.co.com/mDwCBDm/travel.jpg",
                title: "World Travel Adventures",
                shortDescription:
                    "Embark on a journey to explore beautiful destinations, cultures, and unforgettable experiences.",
            },
        ];

        setBlogs(data);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
    };

    return (
        <div className="relative overflow-hidden">

            <Slider {...settings}>
                {blogs.map((blog, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden"
                    >

                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-96 object-cover"
                        />

                        <div className="absolute bg-black bg-opacity-60 flex flex-col justify-center items-center text-white h-full w-full top-0">
                            <h3 className="text-2xl font-semibold mb-3 font-lustria" data-aos="fade-down">{blog.title}</h3>
                            <p className="text-sm mb-4 font-lato text-center">{blog.shortDescription}</p>

                            <motion.div
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Link
                                    to="/all-blog"
                                    className="btn rounded-sm bg-[#b28b51] border-none text-white"
                                    data-aos="fade-up"
                                >
                                    Explore More
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
