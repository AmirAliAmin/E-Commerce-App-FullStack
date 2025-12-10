import React from "react";
import { assets } from "../../assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  return (
    <div className="container">
      <div className=" w-full overflow-hidden">
        <Slider {...settings}>
          <div>
            <img
              src={assets.slider1}
              alt=""
              className="object-cover rounded-xl"
            />
          </div>
          <div>
            <img
              src={assets.slider2}
              alt=""
              className="object-cover rounded-xl"
            />
          </div>
          <div>
            <img
              src={assets.slider3}
              alt=""
              className="object-cover rounded-xl"
            />
          </div>
          <div>
            <img
              src={assets.slider4}
              alt=""
              className="object-cover rounded-xl"
            />
          </div>
          <div>
            <img
              src={assets.slider5}
              alt=""
              className="object-cover rounded-xl"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Hero;
