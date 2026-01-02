import React, { useContext, useEffect } from "react";
import { IoBagHandleSharp } from "react-icons/io5";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const {cartData} = useContext(AppContext)
   const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <section className="py-10 pb-10">
      <div className="container w-[80%] max-w-[80%] flex gap-5 ">
        <div className="w-[70%]">
          <div className="shadow-md rounded-md p-5 bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>Billing DETAILS</h2>
            </div>
            <div className="py-5">
              <div className="flex justify-between w-full gap-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="outline-none border border-gray-500 w-full py-1 px-3"
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="outline-none border border-gray-500 w-full py-1 px-3"
                />
              </div>
              <h1 className="my-4">Street address</h1>
              <input
                type="text"
                placeholder="House number and street name"
                className="outline-none border border-gray-500 w-full py-1 px-3 mb-5"
              />
              <input
                type="text"
                placeholder="Apartment, suite, unit, etc."
                className="outline-none border border-gray-500 w-full py-1 px-3 mb-5"
              />
              <h1 className="my-4">Town/City</h1>
              <input
                type="text"
                placeholder="City"
                className="outline-none border border-gray-500 w-full py-1 px-3 mb-5"
              />
              <h1 className="my-4">State/Country</h1>
              <input
                type="text"
                placeholder="State"
                className="outline-none border border-gray-500 w-full py-1 px-3 mb-5"
              />
              <h1 className="my-4">Postcode/ZIP</h1>
              <input
                type="text"
                placeholder="ZIP code"
                className="outline-none border border-gray-500 w-full py-1 px-3 mb-5"
              />
            </div>
          </div>
        </div>
        <div className="w-[30%]">
          <div className="shadow-md rounded-md p-5 bg-white">
            <h3 className="pb-3">YOUR ORDER</h3>
            <hr className="text-gray-300" />
            <p className='flex items-center justify-between mt-2 py-1'>
                <span className='text-[16px] font-bold'>Product</span>
                <span className='text-[16px] font-bold'>Subtotal</span>
            </p>
            <hr className="text-gray-300"/>
            {
              cartData?.map((item)=>(
             <p className='flex items-center justify-between mt-2'>
                <span className='text-[14px]'>{item?.productTitle}</span>
                <span className='text-[14px]'>${item?.subTotal}</span>
            </p>

              ))
            }
             <button className='mt-2 w-full py-2 flex items-center justify-center gap-1 bg-primary rounded-md text-white' onClick={()=>navigate("/checkout")}><IoBagHandleSharp className=''/>CHECKOUT</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
