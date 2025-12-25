import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";

function Hero() {
  const [banner, setBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
    setIsLoading(true);
    fetchData(API_PATH.HOME.GET_ALL_HOME_BANNER).then((res) => {
      if (res?.error === false) {
        setBanner(res.data);
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <div className="container">
      <div className=" w-full overflow-hidden">
        <Slider {...settings}>
          {isLoading === false ? (
            banner.map((item) => (
              <div key={item._id}>
                <img
                  src={item.images}
                  alt=""
                  className="object-cover rounded-xl"
                />
              </div>
            ))
          ) : (
            <div className="ml-130 my-10 items-center justify-center">
              <div className="animate-spin w-10 h-10 border-2 border-primary border-solid rounded-full border-t-transparent"></div>
            </div>
            )}

        </Slider>
      </div>
    </div>
  );
}

export default Hero;
