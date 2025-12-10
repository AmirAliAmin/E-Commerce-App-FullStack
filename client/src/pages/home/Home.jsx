import React from "react";
import Hero from "../../components/home/Hero";
import CartSlider from "../../components/home/CartSlider";
import { FaTruckFast } from "react-icons/fa6";
import AdsBannerSlider from "../../components/home/AdsBannerSlider";
import Ads from "../../components/home/Ads";
import PopularProducts from "../../components/products/PopularProducts";
import LatestProducts from "../../components/products/LatestProducts";
import ProuductSection from "../../components/ProuductSection";

function Home() {
  return (
    <div>
      <Hero />
      <CartSlider />
      <PopularProducts/>
      <AdsBannerSlider/>
      <section className="container  flex items-center justify-center py-10">
        <div className="w-[80%] gap-3 flex justify-between flex-wrap items-center border-2 px-2 py-5 rounded-xl border-primary text-gray-800">
          <div className="flex items-center md:text-2xl gap-3">
            <FaTruckFast />
            <h1 className="uppercase">Free Shipping</h1>
          </div>
          <p className="text-xs md:text-sm xl:text-lg">
            Free Delivery Now On Your First Order and over $200
          </p>
          <h2 className="md:text-2xl font-extrabold">- Only $200*</h2>
        </div>
      </section>
      <LatestProducts/>
      <Ads/>
      <ProuductSection/>
    </div>
  );
}

export default Home;
