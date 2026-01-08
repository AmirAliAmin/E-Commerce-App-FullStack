import Rating from "@mui/material/Rating";
import React, { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { GoGitCompare, GoStar } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { putData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";

function ListProductCard({
  id,
  name,
  brand,
  price,
  original,
  discount,
  category,
  images,
  rating,
  item,
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { userData, addtoCart, cartData, setCartData, isLogin } =
    useContext(AppContext);

  const addToCart = (product, userId, quantity) => {
    addtoCart(product, userId, quantity);
    if (isLogin) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  };

  useEffect(() => {
    const item = cartData?.filter((cartItem) =>
      cartItem.productId.includes(id)
    );
    setQuantity(item[0]?.quantity);
    if (item?.length !== 0) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cartData]);

  const minusQty = async () => {
    if (quantity <= 1) return;

    const newQty = quantity - 1;
    setQuantity(newQty);

    const cartItem = cartData?.find((item) => item.productId === id);
    if (!cartItem) return;

    const obj = {
      _id: cartItem._id,
      quantity: newQty,
      subTotal: price * newQty,
    };

    try {
      const res = await putData(API_PATH.CART.UPDATE_CART_QTY, obj);
      if (res?.success) {
        setCartData((prev) =>
          prev.map((item) =>
            item._id === cartItem._id
              ? { ...item, quantity: newQty, subTotal: price * newQty }
              : item
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addQty = async () => {
    const newQty = quantity + 1;
    setQuantity(newQty);

    const cartItem = cartData?.find((item) => item.productId === id);
    if (!cartItem) return;

    const obj = {
      _id: cartItem._id,
      quantity: newQty,
      subTotal: price * newQty,
    };

    try {
      const res = await putData(API_PATH.CART.UPDATE_CART_QTY, obj);
      if (res?.success) {
        setCartData((prev) =>
          prev.map((item) =>
            item._id === cartItem._id
              ? { ...item, quantity: newQty, subTotal: price * newQty }
              : item
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
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
          {isAdded === false ? (
            <button
              className="w-full border border-primary mt-2 py-2 text-primary rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer hover:bg-primary hover:text-white transition-colors"
              onClick={() => addToCart(item, userData?._id, quantity)}
            >
              <IoCartOutline className="text-xl" /> ADD TO CART
            </button>
          ) : (
            <div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)] mt-2">
              <button
                className="bg-gray-200 p-2 cursor-pointer"
                onClick={minusQty}
              >
                <FaMinus />
              </button>
              <p>{quantity || 1}</p>
              <button
                className="bg-primary text-white p-2 cursor-pointer"
                onClick={addQty}
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListProductCard;
