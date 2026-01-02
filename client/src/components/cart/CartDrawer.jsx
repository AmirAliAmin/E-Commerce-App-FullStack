import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { MdOutlineCancel } from "react-icons/md";
import { assets } from "../../assets/assets";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";

function CartDrawer() {
  const {
    setOpenCartPanel,

    cartData,
    setCartData,
    alertBox,
    
  } = useContext(AppContext);
  const navigate = useNavigate();
  const deleteProduct = async (_id) => {
    try {
      const res = await deleteData(API_PATH.CART.DELETE_CART_PRODUCT(_id));

      if (res?.success) {
        alertBox("Product Deleted from Cart", "success");
        setCartData((prev) => prev.filter((cat) => cat._id !== _id));
        // setIsAdded(false)
      } else {
        alertBox("Product not Deleted from Cart", "error");
      }
    } catch (error) {
      alertBox("Server Error", "error");
      console.log(error);
    }
  };
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
                <RiDeleteBin5Line
                  className="mt-2 text-xl link"
                  onClick={() => deleteProduct(item?._id)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 absolute bottom-2.5 left-2.5">
          <div className="">
            <div className="flex items-center justify-between">
              <h1>{cartData.length} Item</h1>
              <p className="text-primary">{
                (cartData?.length !== 0 ?
                  cartData?.map(item=> parseInt(item.price) * item.quantity).reduce
                  ((total,value)=>total + value ,0):0)?.toLocaleString('en-US',{style:'currency', currency : 'Pkr'})
              }</p>
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
              onClick={() =>{navigate("/checkout"), setOpenCartPanel(false)}}
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
