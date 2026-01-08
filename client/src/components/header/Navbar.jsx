import React, { useContext, useEffect, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoRocketSharp } from "react-icons/io5";
import { AppContext } from "../../context/AppContext";

function Navbar({ setBoxOpen, boxOpen }) {
  const { categoryData } = useContext(AppContext);
  const [homeNav, setHomeNav] = useState("Home");

  const location = useLocation();
  const navigate = useNavigate("")
  useEffect(() => {
    if (location.pathname === "/") {
      setHomeNav("Products");
    } else{
      setHomeNav("Home");
    }
  }, [location.pathname]);

  return (
    <nav className="py-2 border-b border-gray-200 shadow-lg relative">
      <div className="container flex items-center justify-between gap-2 xl:gap-5 ">
        <div className="col_1 hidden lg:block lg:w-[30%] xl:w-[20%] ">
          <button
            className="px-5 py-2 flex items-center gap-1.5 hover:gap-2.5 hover:bg-gray-400 cursor-pointer hover:text-white hover:transition-all duration-700 rounded-lg text-gray-700"
            onClick={() => setBoxOpen(!boxOpen)}
          >
            <RiMenu2Line className="text-xl" /> Shop by Category{" "}
            <FaAngleDown className="text-lg" />
          </button>
        </div>

        <div className="col_2 lg:w-[70%]  xl:w-[60%] overflow-x-auto overflow-y-scroll lg:overflow-visible no-scroll ">
          <ul className="flex items-center  whitespace-nowrap no-scroll gap-5 text-gray-700 ">
            <li className="list-none">
              <Link
                to={homeNav === "Home" ?`/` : `/products`}
                className="link text-[16px] font-medium py-2 block"
                onClick={() => scrollTo(0, 0)}
              >
                {homeNav}
              </Link>
            </li>
            {categoryData?.slice(0, 8)?.map((parent) => (
              <li className="list-none relative group" key={parent._id}>
                <Link
                  to={`/products?catId=${parent._id}`}
                  className="link text-[16px] font-medium py-2 block"
                >
                  {parent.name}
                </Link>
                <div className="absolute top-full left-0 hidden group-hover:block bg-white h-20  pt-2 z-500 shadow-2xl rounded-lg">
                  <ul className="">
                    {parent.children?.map((child) => (
                      <Link
                        to={`/products?subcatId=${child._id}`}
                        key={child._id}
                        className="px-4 py-2 text-gray-800  border-b border-gray-100 link"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col_3 text-gray-700 hidden xl:block ">
          <p className="text-[14px] flex gap-1 items-center">
            <IoRocketSharp /> Free International Delivery
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
