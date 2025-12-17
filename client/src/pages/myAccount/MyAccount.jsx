import React, { useContext, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandleSharp, IoClose } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { GoTriangleDown } from "react-icons/go";
import { assets } from "../../assets/assets";
import { FaAngleDown } from "react-icons/fa6";
import { AppContext } from "../../context/AppContext";
import Badge from "../../components/badge";
function MyAccount() {
  const { activeTab, setActiveTab,userData } = useContext(AppContext);
  // Dummy order data
  const orders = [
    {
      orderId: "ORD123456",
      paymentId: "PAY987654",
      product: "Women Wide Jeans",
      name: "Amir Ali Amin",
      phone: "9876543210",
      address: "Street 12, Karachi",
      pincode: "75400",
      total: "$120",
      email: "aliaminamir@gmail.com",
      userId: "USR001",
      status: "pending",
      date: "2024-10-05",
    }
  ];
  const getInitials = (fullName)=>{
    if (!fullName) return "";
    const words = fullName.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

  return (
    <section className="py- w-full">
      <div className="container flex gap-5">
        <div className="col1 md:w-[20%]">
          <div className="card bg-white shadow-lg rounded-md hidden md:block ">
            <div className="w-full p-3 flex items-center justify-center flex-col">
              <div className="w-20 h-20 bg-purple-500 rounded-full text-xl font-bold text-white flex items-center justify-center relative group">
                {getInitials(userData?.name || "")}
                <div className="overlay w-full h-full absolute top-0 left-0 z-50 bg-[#0000006f] overflow-hidden rounded-full opacity-0 group-hover:opacity-100 cursor-pointer items-center justify-center flex ">
                  <IoMdCloudUpload />
                  <input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer overflow-hidden"
                  />
                </div>
              </div>
              <h1>{userData?.name}</h1>
              <h6 className="text-gray-600 text-xs">{userData?.email}</h6>
            </div>
            <ul className="py-3">
              <li
                className={`w-full flex items-center px-2 gap-2 link hover:bg-gray-200 py-2 mb-1 ${
                  activeTab === "account"
                    ? "bg-white text-black shadow-xl border-l-4 border-primary"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("account")}
              >
                <FaRegUserCircle />
                User Profile
              </li>
              <li
                className={`w-full flex items-center  px-2 gap-2 link hover:bg-gray-200 py-2 mb-1 ${
                  activeTab === "list"
                    ? "bg-white text-black shadow-xl border-l-4 border-primary"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("list")}
              >
                <FaThList />
                My List
              </li>
              <li
                className={`w-full flex items-center px-2 gap-2 link hover:bg-gray-200 py-2 mb-1 ${
                  activeTab === "order"
                    ? "bg-white text-black shadow-xl border-l-4 border-primary"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("order")}
              >
                <IoBagHandleSharp />
                My Order
              </li>
              <li className="w-full flex items-center px-2  gap-2 link hover:bg-gray-300 py-2 mb-1">
                <HiOutlineLogout />
                Logout
              </li>
            </ul>
          </div>
        </div>
        <div className="col2 w-full md:w-[80%] lg:w-[70%]">
          <div className="card bg-white p-5 shadow-lg rounded-md ">
            {activeTab === "account" && (
              <div>
                <h2 className="pb-3">MY Profile</h2>
                <hr className="text-gray-300" />

                <form className="py-5">
                  <div className="flex items-center gap-5 flex-wrap">
                    <div className="w-full flex items-center gap-5">
                      <div className="w-[50%]">
                        <label htmlFor="fullName">
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="border border-gray-500 outline-0 py-2 px-2 w-full"
                          />
                        </label>
                      </div>
                      <div className="w-[50%]">
                        <label htmlFor="Email">
                          <input
                            type="email"
                            placeholder="Email"
                            className="border border-gray-500 outline-0 py-2 px-2 w-full"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="phone">
                        <input
                          type="text"
                          placeholder="Phone"
                          className="border border-gray-500 outline-0 py-2 px-2 w-full"
                        />
                      </label>
                    </div>
                  </div>
                  <br />
                  <div className="flex items-center gap-5">
                    <button className="py-2 px-5 cursor-pointer bg-primary text-white w-[100px]">
                      Save
                    </button>
                    <button className="py-2 px-5 border border-primary text-primary cursor-pointer w-[100px]">
                      cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            {activeTab === "list" && (
              <div>
                <h2 className="pb-3">MY Product List</h2>
                <hr className="text-gray-300" />
                <div className="w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                  <div className="w-[15%] rounded-md overflow-hidden">
                    <img src={assets.FashionImage1} alt="" />
                  </div>
                  <div className="w-[85%] relative">
                    <IoClose className="cursor-pointer absolute top-0 right-0 link text-[22px]" />
                    <span className="text-[13px]">Flying Machine</span>
                    <h3 className="text-[15px] link">Women Wide Jeans</h3>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Size: S <GoTriangleDown />
                      </span>
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Qyt: 1 <GoTriangleDown />
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-black text-[14px] font-semibold">
                        $30
                      </span>
                      <span className="line-through text-gray-500 text-[14px] font-medium">
                        $85
                      </span>
                      <span className="text-primary text-[14px] font-semibold">
                        55% OFF
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                  <div className="w-[15%] rounded-md overflow-hidden">
                    <img src={assets.FashionImage1} alt="" />
                  </div>
                  <div className="w-[85%] relative">
                    <IoClose className="cursor-pointer absolute top-0 right-0 link text-[22px]" />
                    <span className="text-[13px]">Flying Machine</span>
                    <h3 className="text-[15px] link">Women Wide Jeans</h3>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Size: S <GoTriangleDown />
                      </span>
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Qyt: 1 <GoTriangleDown />
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-black text-[14px] font-semibold">
                        $30
                      </span>
                      <span className="line-through text-gray-500 text-[14px] font-medium">
                        $85
                      </span>
                      <span className="text-primary text-[14px] font-semibold">
                        55% OFF
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                  <div className="w-[15%] rounded-md overflow-hidden">
                    <img src={assets.FashionImage1} alt="" />
                  </div>
                  <div className="w-[85%] relative">
                    <IoClose className="cursor-pointer absolute top-0 right-0 link text-[22px]" />
                    <span className="text-[13px]">Flying Machine</span>
                    <h3 className="text-[15px] link">Women Wide Jeans</h3>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Size: S <GoTriangleDown />
                      </span>
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Qyt: 1 <GoTriangleDown />
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-black text-[14px] font-semibold">
                        $30
                      </span>
                      <span className="line-through text-gray-500 text-[14px] font-medium">
                        $85
                      </span>
                      <span className="text-primary text-[14px] font-semibold">
                        55% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "order" && (
              <div>
                <h2 className="pb-3">Order</h2>
                <hr className="text-gray-300" />
                <div className="relative overflow-x-auto mt-5 no-scroll">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3 flex items-center justify-center"
                        >
                          {" "}
                          <p className="w-[35px] h-[35px] min-w-[35px] rounded-full text-center flex items-center justify-center">
                            <FaAngleDown />
                          </p>
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          order id
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          payment id
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          product{" "}
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Adress
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Pincode
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Total Amount
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          User Id
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          order Status
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((item, index) => (
                        <tr key={index} className="bg-white border-b border-gray-200">
                          <td className="px-6 py-4 whitespace-nowrap"></td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.orderId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.paymentId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.product}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.pincode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.userId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge status={item.status}/>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
