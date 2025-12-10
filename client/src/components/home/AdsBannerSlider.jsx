import React from "react";
import { addBanner, assets } from "../../assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, Links } from "react-router-dom";

function AdsBannerSlider() {
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
    <div className="container py-7">
      <div className="w-full  flex flex-wrap gap-6 ">
        <div className="w-[95%] lg:w-[68%] ">
          <Slider {...settings} className="slider">
            <div className="relative overflow-hidden">
              <img
                src={assets.adBanner1}
                alt=""
                className="object-cover h-full rounded-lg"
              />
              <div className="info absolute top-0 -right-50 opacity-0 w-[50%] h-full z-50 p-0 sm:p-8 flex items-center flex-col justify-center transition-all duration-700">
                <h4 className="text-xs sm:text-[18px] text-left w-full font-medium mb-1">Big Saving Days Sale</h4>
                <p className="text-xs md:text-[35px] w-full font-bold">Women Solid Round Green T-Shirt</p>
                <p className="text-xs md:text-[18px] text-left w-full font-medium mb-1">Starting At Only <span className="text-primary text-xs md:text-2xl font-bold">₹1,550.00</span></p>
                <button className="bg-primary text-white px-3 text-xs md:text-md rounded-lg py-1 md:py-2">SHOP NOW</button>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <img
                src={assets.adBanner2}
                alt=""
                className="object-cover h-full rounded-lg"
              />
              <div className="info absolute top-0 -right-50 opacity-0  w-[50%] h-full z-50 p-0 sm:p-8 flex items-center flex-col justify-center transition-all duration-700">
                <h4 className="text-xs md:text-[18px] text-left w-full font-medium mb-1">Big Saving Days Sale</h4>
                <p className="text-xs md:text-[35px] w-full font-bold">Apple iPhone 13 128 GB, Pink</p>
                <p className="text-xs md:text-[18px] text-left w-full font-medium mb-1">Starting At Only <span className="text-primary text-xs md:text-2xl font-bold">₹35,500.00</span></p>
                <button className="bg-primary text-white px-3 text-xs md:text-md rounded-lg py-1 md:py-2">SHOP NOW</button>
              </div>
            </div>
          </Slider>
        </div>
        <div className="overflow-scroll w-full no-scroll lg:w-[28%] flex lg:flex-col gap-6">
          {addBanner.map((item, index) => (
            <div
              key={index}
              className="relative w-[300px] min-w-[300px] lg:w-full lg:min-w-full"
            >
              <img src={item.image} alt="" className="rounded-lg " />
              <div className="absolute top-0 right-0 w-35 mt-10 lg:mt-2 ">
                <h1 className="font-bold text-xl">{item.title}</h1>
                <p className="text-lg py-2 font-bold">₹{item.price}</p>
                <Link className="uppercase link underline">Shop Now</Link>
              </div>
            </div>
          ))}

          {/* <img src={assets.adBanner4} alt="" className='rounded-lg ' /> */}
        </div>
      </div>
    </div>
  );
}

export default AdsBannerSlider;
