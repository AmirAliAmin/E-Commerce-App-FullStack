import React, { useContext, useEffect, useState } from "react";
import { IoBagHandleSharp } from "react-icons/io5";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { putData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import { BsPaypal } from "react-icons/bs";
import { SiRazorpay } from "react-icons/si";

function Checkout() {
  const { cartData, address, setAddress, userData, alertBox } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddress,setShowAddress] = useState(false)
  const [formField, setFormField] = useState({
    name: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField(() => {
      return {
        ...formField,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
    }
  }, []);
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await putData(API_PATH.ADDRESS.UPDATE(userData._id), {
      address_line: formField.address_line,
      city: formField.city,
      state: formField.state,
      pincode: formField.pincode,
      country: formField.country,
      mobile: formField.mobile,
      status: formField.status,
    });

    if (res?.success) {
      setAddress((prev) => [
        {
          ...prev[0],
          ...formField,
        },
      ]);
      alertBox("Address updated", "success");
    }
  } catch (error) {
    alertBox("Something went wrong", "error");
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    if (address) {
      setFormField({
        name: userData?.name,
        address_line: address?.[0]?.address_line,
        city: address?.[0]?.city,
        state: address?.[0]?.state,
        pincode: address?.[0]?.pincode,
        country: address?.[0]?.country,
        mobile: address?.[0]?.mobile,
        status: address?.[0]?.status,
        userId: address?.[0]?.userId,
      });
    }
  }, [address]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="py-10 pb-10">
      <div className="container  w-[80%] max-w-[80%] flex flex-wrap gap-5 ">
        <div className="w-full md:w-[65%]">
          <form action="" onSubmit={handleSubmit}>
            <div className="shadow-md rounded-md p-5 bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)] flex justify-between items-center">
                <h2>Billing DETAILS</h2>
                <p
                      className="text-primary cursor-pointer"
                      onClick={() => setShowAddress(!showAddress)}
                    >
                      Add/Update Address
                    </p>
              </div>
              {
                showAddress && (
                  <div>
              <div className="py-5">
                <div className="flex justify-between w-full gap-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={formField.name}
                    onChange={onChangeInput}
                    className="outline-none border border-gray-500 w-full py-1 px-3"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={formField.country}
                    onChange={onChangeInput}
                    className="outline-none border border-gray-500 w-full py-1 px-3"
                  />
                </div>
                <h1 className="my-4">Address Line</h1>
                <input
                  type="text"
                  placeholder="House number and street name"
                  name="address_line"
                  value={formField.address_line}
                  onChange={onChangeInput}
                  className="outline-none border border-gray-500 w-full py-1 px-3 mb-5"
                />
                <h1 className="my-4">Town/City</h1>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formField.city}
                  onChange={onChangeInput}
                  className="outline-none border border-gray-500 w-full py-1 px-3 mb-5"
                />
                <h1 className="my-4">State/Country</h1>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formField.state}
                  onChange={onChangeInput}
                  className="outline-none border border-gray-500 w-full py-1 px-3 mb-5"
                />
                <h1 className="my-4">Postcode/ZIP</h1>
                <input
                  type="text"
                  placeholder="ZIP code"
                  name="pincode"
                  value={formField.pincode}
                  onChange={onChangeInput}
                  className="outline-none border border-gray-500 w-full py-1 px-3 mb-5"
                />
              </div>
            <button type="submit" className="w-full py-2 bg-primary text-white">
              Save
            </button>

                  </div>
                )
              }
            </div>
          </form>
           <div className="bg-[#f1faff] hover:bg-[#eee9e9] w-full py-2 border border-gray-300 text-gray-600 flex justify-center mt-6">
                {address.map((adrr)=>(
                  <div key={adrr._id}>
                    <p>{adrr?.address_line},{adrr.city},{adrr.state},{adrr.country}</p>
                  </div>
                ))}
              </div>
        </div>
        <div className="w-full md:w-[30%]">
          <div className="shadow-md rounded-md p-5 bg-white">
            <h3 className="pb-3">YOUR ORDER</h3>
            <hr className="text-gray-300" />
            <p className="flex items-center justify-between mt-2 py-1">
              <span className="text-[16px] font-bold">Product</span>
              <span className="text-[16px] font-bold">Subtotal</span>
            </p>
            <hr className="text-gray-300" />
            <div className="no-scroll overflow-y-auto h-40">
            {cartData?.map((item) => (
              <p
                className="flex items-center justify-between mt-2"
                key={item._id}
              >
                <span className="text-[14px]">{item?.productTitle}</span>
                <span className="text-[14px]">${item?.subTotal}</span>
              </p>
            ))}
            </div>

            <div className="flex items-center justify-between mt-7 py-1">
              <span className="text-[16px] font-bold">Total</span>
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
            </div>
            <button
              className="mt-2 w-full py-2 flex items-center justify-center gap-1 border border-[#2C4184] rounded-md text-[#2C4184] font-extrabold"
              onClick={() => navigate("/checkout")}
            >
              <SiRazorpay className="" />
              Razorpay
            </button>
            <button
              className="mt-2 w-full py-2 flex items-center justify-center gap-1 border border-[#2C4184] cursor-pointer rounded-md text-[#2C4184] font-extrabold"
              onClick={() => navigate("/checkout")}
            >
              <BsPaypal/>
              <span className="text-[#2C4184]">Pay</span> <span className="text-[#1E9ED8]">Pay</span>
              
            </button>
            <button
              className="mt-2 w-full py-2 flex items-center justify-center gap-1 bg-primary rounded-md text-white"
              onClick={() => navigate("/checkout")}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
