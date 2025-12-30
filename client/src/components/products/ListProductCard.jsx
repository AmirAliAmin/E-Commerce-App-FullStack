import Rating from "@mui/material/Rating";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare, GoStar } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { TiStar } from "react-icons/ti";
import { Link } from "react-router-dom";

function ListProductCard({
  id,
  name,
  brand,
  price,
  original,
  discount,
  category,
  images,
  rating
}) {
  return (
    <div>
      <div className="border overflow-hidden w-full h-120 md:h-65 lg:h-60 xl:h-70 lg:h- border-gray-300 flex flex-col md:flex-row rounded-md shadow-lg ">
        <div className="relative group w-full lg:w-[25%] h-full overflow-hidden rounded-l-md">
          <Link to={`/product/${id}`} className="h-[300px] overflow-hidden">
            <img
              src={images?.[0]}
              alt=""
              className=" block transition-all duration-700 hover:scale-90 rounded-l-md group-hover:hidden w-full h-full"
            />
            <img
              src={images?.[1] ? images?.[1] : images?.[0]}
              alt=""
              className="hidden rounded-t-lg group-hover:block  transition-all duration-700 hover:scale-110 w-full h-full"
            />
          </Link>
          <p className="absolute bg-primary text-white top-2 left-2 rounded-full w-7 flex items-center justify-center h-7 text-xs">
            {discount}%
          </p>
          <div className="absolute -top-20 group-hover:top-2 right-5  flex-col flex gap-2  transition-all duration-500 z-10">
            <div className="w-7 h-7 bg-white text-black flex items-center justify-center rounded-full hover:bg-primary hover:text-white ">
              <FaRegHeart />
            </div>
            <div className="w-7 h-7 bg-white text-black flex items-center justify-center rounded-full hover:bg-primary hover:text-white">
              <GoGitCompare />
            </div>
          </div>
        </div>
        <div className="py-5 px-3 w-full md:w-[60%]">
          <p className="text-gray-700 text-xs md:text-sm">{brand}</p>
          <h1 className="font-bold text-2xl">{name}</h1>
          <p className="text-xs md:text-[15px] md:w-100 xl:w-150  text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            accusantium error nemo voluptatum vero laborum, unde accusamus sed
            porro possimus similique sunt, doloribus ipsa? Debitis eligendi
            sequi a minima rerum?
          </p>
          <div className="md:flex items-center hidden">
            <Rating name="rating" size="small" value={rating} />
          </div>
          <div className="flex gap-10 text-xs md:text-sm">
            <p className="line-through text-gray-500">₹{original}.00</p>
            <p className="text-primary">₹{price}.00</p>
          </div>
          <button className="px-5 border border-primary mt-3 py-2 text-primary rounded text-xs flex items-center text-center justify-center gap-1 cursor-pointer hover:bg-primary hover:text-white">
            <IoCartOutline className="text-xs md:text-xl" /> ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListProductCard;
