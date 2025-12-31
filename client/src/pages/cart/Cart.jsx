import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { IoClose } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { IoBagHandleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Cart() {
  const [sizeState, setSizeState] = useState(null);
  const [selectedSize, setSelectedSize] = useState("S");
  const { cartData } = useContext(AppContext);
  const handleSizeState = () => {
    setSizeState(true);
  };
  const handleCloseSizeState = (value) => {
    if (value === "S") {
      setSelectedSize("S");
    } else if (value === "L") {
      setSelectedSize("L");
    } else if (value === "XL") {
      setSelectedSize("XL");
    }
    setSizeState(null);
  };
  const [qytState, setQytState] = useState(null);
  const [selectedQyt, setSelectedQyt] = useState(1);
  const handleQytState = () => {
    setQytState(true);
  };
  const handleCloseQytState = (value) => {
    if (value === 1) {
      setSelectedQyt(1);
    } else if (value === 2) {
      setSelectedQyt(2);
    } else if (value === 3) {
      setSelectedQyt(3);
    } else if (value === 4) {
      setSelectedQyt(4);
    } else if (value === 5) {
      setSelectedQyt(5);
    } else if (value === 6) {
      setSelectedQyt(6);
    } else if (value === 7) {
      setSelectedQyt(7);
    } else if (value === 8) {
      setSelectedQyt(8);
    } else if (value === 9) {
      setSelectedQyt(9);
    } else if (value === 10) {
      setSelectedQyt(10);
    }
    setQytState(null);
  };
  const navigate = useNavigate();
  return (
    <section className="py-10 pb-10">
      <div className="container w-[80%] max-w-[80%] flex gap-5 ">
        <div className="w-[70%]">
          <div className="shadow-md rounded-md p-5 bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>Your Cart</h2>
              <p className="mt-0">
                There are{" "}
                <span className="font-bold text-primary">
                  {cartData?.length}
                </span>{" "}
                Product in your cart
              </p>
            </div>
            {cartData?.map((item) => (
              <div className="w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                <div className="w-[15%] rounded-md overflow-hidden">
                  <img src={item.images} alt="" />
                </div>
                <div className="w-[85%] relative">
                  <IoClose className="cursor-pointer absolute top-0 right-0 link text-[22px]" />
                  <span className="text-[13px]">{item.brand}</span>
                  <h3 className="text-[15px] link">{item?.productTitle}</h3>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="relative"></div>
                    <div className="relative">
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Qyt:{item?.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-black text-[14px] font-semibold">
                        Price:
                      ${item.price}
                    </span>
                    <span className="text-primary text-[14px] font-semibold">
                        SubTotal:
                      ${item.subTotal}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[30%]">
          <div className="shadow-md rounded-md p-5 bg-white">
            <h3 className="pb-3">Cart Total</h3>
            <hr />
            <p className="flex items-center justify-between mt-2">
              <span className="text-[14px] font-medium">SubTotal</span>
              <span className="text-primary font-bold">
                {(cartData?.length !== 0
                  ? cartData
                      ?.map((item) => parseInt(item.price) * item.quantity)
                      .reduce((total, value) => total + value, 0)
                  : 0
                )?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "Pkr",
                })}
              </span>
            </p>
            <p className="flex items-center justify-between mt-2">
              <span className="text-[14px] font-medium">Shipping</span>
              <span className="font-bold">Free</span>
            </p>
            <p className="flex items-center justify-between mt-2">
              <span className="text-[14px] font-medium">Estimate for</span>
              <span className=" font-bold">UK</span>
            </p>
            <p className="flex items-center justify-between mt-2">
              <span className="text-[14px] font-medium">Total</span>
              <span className="text-primary font-bold">{(cartData?.length !== 0
                  ? cartData
                      ?.map((item) => parseInt(item.price) * item.quantity)
                      .reduce((total, value) => total + value, 0)
                  : 0
                )?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "Pkr",
                })}</span>
            </p>
            <button
              className="mt-2 w-full py-2 flex items-center justify-center gap-1 bg-primary rounded-md text-white"
              onClick={() => navigate("/checkout")}
            >
              <IoBagHandleSharp className="" />
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
