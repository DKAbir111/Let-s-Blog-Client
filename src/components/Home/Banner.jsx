import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import logo from '../../assets/letsblog.png'
export default function Banner() {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500
    };
    return (
        <div className="slider-container container mx-auto">
            <Slider {...settings}>
                <div className="border">
                    <img src={logo} alt="" />
                </div>
                <div>
                    <img src={logo} alt="" />
                </div>
                <div>
                    <img src={logo} alt="" />
                </div>
                <div>
                    <img src={logo} alt="" />
                </div>
                <div>
                    <img src={logo} alt="" />
                </div>
                <div>
                    <img src={logo} alt="" />
                </div>
            </Slider>
        </div>
    );
}
