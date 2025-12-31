import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { MdOutlineCancel } from "react-icons/md";
import { assets } from "../../assets/assets";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function CartDrawer() {
  const { openCartPanel, setOpenCartPanel, toggleDrawer, cartData } =
    useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div
      className="absolute inset-0 h-screen z-50 bg-[#00000030]"
      onClick={() => setOpenCartPanel(false)}
    >
      <div
        className="h-screen w-80 md:w-89 bg-white fixed right-0 px-5 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between md:pb-5 border-b-2 border-gray-200">
          <h1 className="font-bold text-[18px]">
            Shopping Cart ({cartData.length})
          </h1>
          <MdOutlineCancel
            className="text-2xl cursor-pointer link"
            onClick={() => setOpenCartPanel(false)}
          />
        </div>
        <div className="overflow-y-scroll overflow-x-hidden max-h-60 md:max-h-[300px] no-scroll mt-2">
          {cartData?.map((item) => (
            <div key={item._id} className="w-full flex gap-4 my-2">
              <div className="w-[25%]">
                <img src={item?.images} alt="" className="w-full" />
              </div>
              <div className="w-[70%] ">
                <h1 className="font-medium text-[16px] md:mb-2 overflow-y-auto w-full h-auto">
                  {item?.productTitle}
                </h1>
                <p className="font-medium text-[14px] text-gray-700">
                  Qty: <span>{item?.quantity}</span>
                </p>
                <p className="font-medium text-[14px] text-gray-700">
                  Price:
                  <span className="font-medium text-[14px] text-primary">
                    ${item.price}
                  </span>{" "}
                </p>
                <RiDeleteBin5Line className="mt-2 text-xl link" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 absolute bottom-2.5 left-2.5">
          <div className="">
            <div className="flex items-center justify-between">
              <h1>1 Item</h1>
              <p className="text-primary">$999.00</p>
            </div>
            <div className="flex items-center justify-between">
              <h1>Shipping</h1>
              <p className="text-primary">$7.00</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h1>Total (tax excl.)</h1>
              <p className="text-primary">$93.00</p>
            </div>
          </div>
          <div className="w-full flex justify-center gap-2">
            <button
              className="bg-primary py-2 px-8 hover:bg-red-100 hover:text-primary border border-primary cursor-pointer  text-white rounded-lg whitespace-nowrap"
              onClick={() => {
                navigate("/cart"), setOpenCartPanel(false);
              }}
            >
              View Cart
            </button>
            <button
              className="bg-primary py-2 px-8 hover:bg-red-100 hover:text-primary border border-primary cursor-pointer  text-white rounded-lg"
              onClick={() => navigate("/checkout")}
            >
              CheckOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
