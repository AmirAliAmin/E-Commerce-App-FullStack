import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../search/Search";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { GoGitCompare } from "react-icons/go";
import Navbar from "./Navbar";
import { RxCross1 } from "react-icons/rx";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { RiMenu2Line } from "react-icons/ri";
import { AppContext } from "../../context/AppContext";
import CartDrawer from "../cart/CartDrawer";
import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";

function Header() {
  const [boxOpen, setBoxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const {
    openCartPanel,
    setOpenCartPanel,
    toggleDrawer,
    isLogin,
    setIsLogin,
    setActiveTab,
    userData,
    logout
  } = useContext(AppContext);
  const navigate = useNavigate();

  // const logout = ()=>{
  //   fetchData(API_PATH.AUTH.LOGOUT).then((res)=>{
  //     console.log(res);
  //     if (res?.success === true) {
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("refreshToken");
  //       setIsLogin(false);
  //       navigate("/login")
  //     }
  //   })
  // }
  return (
    <header className="bg-white fixed z-500 w-full">
      <div className="top-strip py-2 border-t border-b border-gray-200 text-[#3E3E3E]">
        <div className="container hidden lg:block">
          <div className="flex items-center justify-between ">
            <div className="col1 w-[50%]">
              <p className="text-[14px] font-medium">
                Get up to 50% off new season styles, limited time only
              </p>
            </div>
            <div className="col2 flex items-center justify-end">
              <ul className="flex justify-center items-center gap-4">
                <li className="list-none">
                  <Link
                    to={"/help-center"}
                    className="text-[13px] link font-medium "
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to={"/order-tracking"}
                    className="text-[13px] link font-medium"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="header py-4 border-b border-gray-200">
          <div className="container flex items-center justify-between">
            <div
              onClick={() => setBoxOpen(!boxOpen)}
              className="block lg:hidden text-3xl text-gray-700"
            >
              <RiMenu2Line />
            </div>
            <div className="col1 w-[25%]">
              <Link to={"/"}>
                <img src="/logo.jpg" />
              </Link>
            </div>
            <div className="col2 w-[45%] hidden lg:block">
              <Search />
            </div>
            <div className="col3 w-[30%] flex items-center justify-end ">
              <ul className="flex items-center gap-5">
                {isLogin === false ? (
                  <li className="list-none text-[#3E3E3E] hidden lg:block">
                    <Link to={"/login"} className="link text-[16px] ">
                      Login
                    </Link>
                    <span className="pr-4">|</span>{" "}
                    <Link to={"/register"} className="link text-[16px]">
                      Register
                    </Link>
                  </li>
                ) : (
                  <li className="list-none text-[#3E3E3E]  relative group transition-all duration-500">
                    <Link className=" text-[22px] flex items-center gap-2 ">
                      <FaRegUserCircle className="link" />{" "}
                      <span className="text-[14px]  flex-col hidden md:flex">
                        <span>{userData?.name}</span>
                        <span className="text-[10px]">
                          {userData?.email}
                        </span>
                      </span>
                    </Link>
                    <ul className="absolute bg-white w-[100px] max-w-[100px] shadow-md z-1000 p-2   text-center  border  hidden group-hover:block transition-all duration-500 rounded-md">
                      <li className="py-1 border-b border-gray-300 cursor-pointer link flex items-center gap-1">
                        <FaRegUserCircle />
                        <p
                          onClick={() => {
                            navigate("/my-account"), setActiveTab("account");
                          }}
                        >
                          Account
                        </p>
                      </li>
                      <li className="py-1 border-b border-gray-300 cursor-pointer link flex items-center gap-1 ">
                        <IoBagHandleSharp />
                        <p
                          onClick={() => {
                            navigate("/my-account"), setActiveTab("order");
                          }}
                        >
                          Order
                        </p>
                      </li>
                      <li className="py-1 border-b border-gray-300 cursor-pointer link flex items-center gap-1 ">
                        <FaThList />
                        <p
                          onClick={() => {
                            navigate("/my-account"), setActiveTab("list");
                          }}
                        >
                          My List
                        </p>
                      </li>
                      <li className="py-1 border-b border-gray-300 cursor-pointer link flex items-center gap-1" onClick={logout}>
                        <HiOutlineLogout />
                        <Link>Logout</Link>
                      </li>
                    </ul>
                  </li>
                )}
                <li className="list-none text-[#3E3E3E] relative group ">
                  <Link className="link text-[16px] flex items-center relative">
                    <GoGitCompare className="text-[20px]" />{" "}
                    <span className="absolute bg-primary w-4 h-4 rounded-full -right-2 -top-2 flex justify-center items-center text-white text-xs">
                      4
                    </span>
                  </Link>
                  <div className="hidden  group-hover:block absolute bg-[#070707ba] px-7 py-1 rounded-lg  text-white mt-2 right-0.5   text-xs group-hover:transition-all duration-500">
                    Compare
                  </div>
                </li>
                <li className="list-none text-[#3E3E3E] relative group">
                  <Link className="link text-[16px] flex items-center relative">
                    <FaRegHeart className="text-[20px]" />
                    <span className="absolute bg-primary w-4 h-4 rounded-full -right-2 -top-2 flex justify-center items-center text-white text-xs">
                      4
                    </span>
                  </Link>
                  <div className="hidden group-hover:block absolute bg-[#070707ba]  px-7 py-1 rounded-lg  text-white mt-2 right-0.5 text-xs group-hover:transition-all duration-500">
                    WishList
                  </div>
                </li>
                <li className="list-none text-[#3E3E3E] relative group">
                  <Link
                    className="link text-[16px] flex items-center relative"
                    onClick={() => setOpenCartPanel(!openCartPanel)}
                  >
                    <IoCartOutline className="text-[25px]" />{" "}
                    <span className="absolute bg-primary w-4 h-4 rounded-full -right-2 -top-2 flex justify-center items-center text-white text-xs">
                      4
                    </span>
                  </Link>
                  <div className="hidden group-hover:block absolute bg-[#070707ba] px-7 py-1 rounded-lg  text-white mt-2 right-0.5  text-xs group-hover:transition-all duration-500">
                    Cart
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openCartPanel && <CartDrawer />}
        <Navbar setBoxOpen={setBoxOpen} boxOpen={boxOpen} />
        {boxOpen && (
          <div
            className={`fixed z-20 bg-white  h-screen top-0 w-70 ${
              boxOpen ? "transition-all duration-500" : ""
            }`}
          >
            <div className="flex items-center justify-between px-5 mt-6">
              <img src="/logo.jpg" alt="" className="w-40" />
              <h1
                className="cursor-pointer hover:transition-all hover:scale-120"
                onClick={() => setBoxOpen(false)}
              >
                <RxCross1 />
              </h1>
            </div>
            <div className="flex flex-col justify-between h-fit gap-4 px-10 py-5">
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="link">
                    <Link to={"/"}>Fashion</Link>
                  </h1>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setMenuOpen(menuOpen === "Fashion" ? null : "Fashion")
                    }
                  >
                    {" "}
                    {menuOpen === "Fashion" ? (
                      <CiSquareMinus className="text-2xl" />
                    ) : (
                      <CiSquarePlus className="text-2xl" />
                    )}
                  </div>
                </div>
                {menuOpen === "Fashion" && (
                  <ul className="pl-3 space-y-2 mt-1 text-gray-700">
                    <li className="flex justify-between items-center link">
                      Men{" "}
                    </li>
                    <li className="flex justify-between items-center link">
                      Women{" "}
                    </li>
                    <li className="flex justify-between items-center link">
                      Girls
                    </li>
                  </ul>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="link">
                    <Link>Electronics</Link>
                  </h1>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setMenuOpen(
                        menuOpen === "Electronics" ? null : "Electronics"
                      )
                    }
                  >
                    {" "}
                    {menuOpen === "Electronics" ? (
                      <CiSquareMinus className="text-2xl" />
                    ) : (
                      <CiSquarePlus className="text-2xl" />
                    )}
                  </div>
                </div>

                {menuOpen === "Electronics" && (
                  <ul className="pl-3 space-y-2 mt-1 text-gray-700">
                    <li className="flex justify-between items-center link">
                      Smart Watch{" "}
                    </li>
                    <li className="flex justify-between items-center link">
                      Laptops{" "}
                    </li>
                    <li className="flex justify-between items-center link">
                      Mobiles
                    </li>
                  </ul>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="link">
                    <Link>Bags</Link>
                  </h1>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setMenuOpen(menuOpen === "Bags" ? null : "Bags")
                    }
                  >
                    {" "}
                    {menuOpen === "Bags" ? (
                      <CiSquareMinus className="text-2xl" />
                    ) : (
                      <CiSquarePlus className="text-2xl" />
                    )}
                  </div>
                </div>
                {menuOpen === "Bags" && (
                  <ul className="pl-3 space-y-2 mt-1 text-gray-700">
                    <li className="flex justify-between items-center link">
                      Men Bags
                    </li>
                    <li className="flex justify-between items-center link">
                      Women Bags
                    </li>
                    <li className="flex justify-between items-center link">
                      Girls Bags
                    </li>
                  </ul>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="link">
                    <Link>Footwear</Link>
                  </h1>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setMenuOpen(menuOpen === "Footwear" ? null : "Footwear")
                    }
                  >
                    {" "}
                    {menuOpen === "Footwear" ? (
                      <CiSquareMinus className="text-2xl" />
                    ) : (
                      <CiSquarePlus className="text-2xl" />
                    )}
                  </div>
                </div>
                {menuOpen === "Footwear" && (
                  <ul className="pl-3 space-y-2 mt-1 text-gray-700">
                    <li className="flex justify-between items-center link">
                      Men Footwear
                    </li>
                    <li className="flex justify-between items-center link">
                      Women Footwear
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex justify-between items-center">
                <h1 className="link">
                  <Link>Groceries</Link>
                </h1>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setMenuOpen(menuOpen === "Groceries" ? null : "Groceries")
                  }
                >
                  {" "}
                  {menuOpen === "Groceries" ? (
                    <CiSquareMinus className="text-2xl" />
                  ) : (
                    <CiSquarePlus className="text-2xl" />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="link">
                  <Link>Beauty</Link>
                </h1>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setMenuOpen(menuOpen === "Beauty" ? null : "Beauty")
                  }
                >
                  {" "}
                  {menuOpen === "Beauty" ? (
                    <CiSquareMinus className="text-2xl" />
                  ) : (
                    <CiSquarePlus className="text-2xl" />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="link">
                  <Link>Wellness</Link>
                </h1>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setMenuOpen(menuOpen === "Wellness" ? null : "Wellness")
                  }
                >
                  {" "}
                  {menuOpen === "Wellness" ? (
                    <CiSquareMinus className="text-2xl" />
                  ) : (
                    <CiSquarePlus className="text-2xl" />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="link">
                  <Link>Jewellery</Link>
                </h1>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setMenuOpen(menuOpen === "Jewellery" ? null : "Jewellery")
                  }
                >
                  {" "}
                  {menuOpen === "Jewellery" ? (
                    <CiSquareMinus className="text-2xl" />
                  ) : (
                    <CiSquarePlus className="text-2xl" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
