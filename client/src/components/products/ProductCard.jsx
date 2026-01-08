import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { GoGitCompare } from "react-icons/go";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AppContext } from "../../context/AppContext";
import Rating from "@mui/material/Rating";
import { FaMinus } from "react-icons/fa6";
import { putData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
// import { FaPlus } from "react-icons/fa6";

function ProductCard({
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
  const {
    openProductDetailModel,
    selectedProductCard,
    handleClickOpenProductDetailModel,
    handleCloseOpenProductDetailModel,
    userData,
    addtoCart,
    cartData,
    setCartData,
    isLogin,
  } = useContext(AppContext);

  const [imageData, setImageData] = useState(images?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickViewClick = () => {
    setImageData(images?.[0]);
    const productCardData = {
      id,
      name,
      brand,
      price,
      original,
      discount,
      category,
      images,
    };
    handleClickOpenProductDetailModel(productCardData);
  };

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
      <div className="border border-gray-300 rounded-lg shadow">
        <div className="relative group h-50 overflow-hidden rounded-t-lg flex justify-center ">
          <Link to={`/product/${id}`} onClick={() => scrollTo(0, 0)}>
            <img
              src={images?.[0]}
              alt={name}
              className="w-60 block transition-all duration-700 hover:scale-90 rounded-t-lg group-hover:hidden"
            />
            <img
              src={images?.[1] || images?.[0]}
              alt={name}
              className="hidden w-60 rounded-t-lg group-hover:block transition-all duration-700 hover:scale-110 object-cover"
            />
          </Link>
          <p className="absolute bg-primary text-white top-2 left-2 rounded-full w-7 flex items-center justify-center h-7 text-xs">
            {discount}%
          </p>
          <div className="absolute -top-25 group-hover:top-2 right-5 flex-col flex gap-2 transition-all duration-500 z-10">
            <div
              className="w-7 h-7 bg-white text-black flex items-center justify-center rounded-full hover:bg-primary hover:text-white cursor-pointer"
              onClick={handleQuickViewClick}
            >
              <BsArrowsFullscreen />
            </div>
            <div className="w-7 h-7 bg-white text-black flex items-center justify-center rounded-full hover:bg-primary hover:text-white cursor-pointer">
              <FaRegHeart />
            </div>
            <div className="w-7 h-7 bg-white text-black flex items-center justify-center rounded-full hover:bg-primary hover:text-white cursor-pointer">
              <GoGitCompare />
            </div>
          </div>
        </div>
        <div className="py-5 px-3">
          <p className="text-gray-700 text-sm">{brand}</p>
          <h1 className="font-medium">{name.slice(0, 10)}...</h1>
          <div className="flex items-center">
            <Rating name="rating" size="small" value={rating} />
          </div>
          <div className="flex justify-between text-sm mt-1">
            <p className="line-through text-gray-500">₹{original}</p>
            <p className="text-primary font-medium">₹{price}</p>
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
      {openProductDetailModel && (
        <div
          className="fixed inset-0 bg-[#0000008c] bg-opacity-20 flex items-center justify-center z-500"
          onClick={handleCloseOpenProductDetailModel}
        >
          <div
            className="bg-white h-fit  w-full max-w-3xl rounded-lg max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {selectedProductCard && (
                <div className="p-6">
                  <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                      <img
                        src={selectedProductCard?.images[0]}
                        alt={selectedProductCard.name}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">
                        {selectedProductCard.name}
                      </h2>
                      <p className="text-gray-600 mt-2 text-[14px] font-medium">
                        Brand:{" "}
                        <span className="text-black">
                          {selectedProductCard.brand}
                        </span>
                      </p>
                      <div className="flex items-center">
                        <Rating
                          name="rating"
                          size="small"
                          value={selectedProductCard.rating}
                        />
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <p className="text-lg font-bold text-primary">
                          ₹{selectedProductCard.price}.00
                        </p>
                        <p className="line-through text-gray-500 text-sm">
                          ₹{selectedProductCard.original}.00
                        </p>
                        <span className="px-2 py-1 rounded text-sm font-medium text-[14px]">
                          Available in Stock:{" "}
                          <span className="text-green-600">144 Items</span>
                        </span>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        In maxime minima iste quidem illum ducimus iure vero a
                        est harum recusandae dolorem rerum eveniet, cum commodi
                        obcaecati dicta veniam dolores.
                      </p>
                      <p className="mt-4 text-gray-700">
                        Size: {selectedProductCard.category}
                      </p>
                      <p className="py-2">
                        Free Shipping (Est. Delivery Time 2-3 Days)
                      </p>
                      <div className="space-x-3 flex">
                       
                        {isAdded === false ? (
                          <button
                            className="w-full border border-primary mt-2 py-2 text-primary rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer hover:bg-primary hover:text-white transition-colors"
                            onClick={() =>
                              addToCart(selectedProductCard, userData?._id, quantity)
                            }
                          >
                            <IoCartOutline className="text-xl" /> ADD TO CART
                          </button>
                        ) : (
                          <div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgb(15,14,14)] mt-2 w-full">
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
                      <div className="flex gap-10 mt-6 text-lg">
                        <p className="flex items-center link gap-2">
                          <FaRegHeart /> Add to Wishlist
                        </p>
                        <p className="flex items-center link gap-2">
                          <GoGitCompare /> Add to Compare
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
