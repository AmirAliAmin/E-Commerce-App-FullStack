import React, { useContext, useEffect, useState } from "react";
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

function Header() {
  const [boxOpen, setBoxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  
  const {
    openCartPanel,
    setOpenCartPanel,
    isLogin,
    setActiveTab,
    userData,
    logout,
    categoryData,
    cartData
  } = useContext(AppContext);
  const navigate = useNavigate();

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
          <div className="container w-full flex items-center justify-between">
            <div
              onClick={() => setBoxOpen(!boxOpen)}
              className="block lg:hidden text-3xl text-gray-700"
            >
              <RiMenu2Line />
            </div>
            <div className="col1 w-[25%]">
              <Link to={"/"} onClick={()=>scrollTo(0,0)}>
                <img src="/logo.jpg" />
              </Link>
            </div>
            <div className="col2 w-[45%] hidden lg:block">
              <Search />
            </div>
            <div className="col3 w-[30%] flex items-center justify-end ">
              <ul className="flex items-center gap-3">
                {isLogin === false ? (
                  <li className="list-none text-[#3E3E3E] hidden lg:block">
                    <Link to={"/login"} onClick={scrollTo(0,0)} className="link text-[16px] ">
                      Login
                    </Link>
                    <span className="pr-4">|</span>{" "}
                    <Link to={"/register"}  onClick={scrollTo(0,0)} className="link text-[16px]">
                      Register
                    </Link>
                  </li>
                ) : (
                  <li className="list-none text-[#3E3E3E]  relative group transition-all duration-500">
                    <Link className=" text-[22px] flex items-center gap-1 ">
                      <FaRegUserCircle className="link" />{" "}
                      <span className="text-[14px]  flex-col hidden md:flex">
                        <span>{userData?.name}</span>
                        <span className="text-[10px]">{userData?.email}</span>
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
                      <li
                        className="py-1 border-b border-gray-300 cursor-pointer link flex items-center gap-1"
                        onClick={logout}
                      >
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
                      {cartData?.length}
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
              {categoryData?.map((parent) => (
                <div key={parent._id}>
                  <div className="flex justify-between items-center">
                    <h1 className="link">
                      <Link  to={`/products?catId=${parent._id}`}>{parent.name}</Link>
                    </h1>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setMenuOpen(menuOpen === parent.name ? null : parent.name)
                      }
                    >
                      {" "}
                      {menuOpen === parent.name ? (
                        <CiSquareMinus className="text-2xl" />
                      ) : (
                        <CiSquarePlus className="text-2xl" />
                      )}
                    </div>
                  </div>
                  {menuOpen === parent.name && (
                    <ul className="pl-3 space-y-2 mt-1 text-gray-700">
                      {
                        parent.children?.map((child)=>(
                      <Link to={`/products?subcatId=${child._id}`} className="flex justify-between items-center link">
                        {child.name}
                      </Link>

                        ))
                      }
                     
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
