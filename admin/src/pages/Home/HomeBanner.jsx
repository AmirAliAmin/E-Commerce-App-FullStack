import React, { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiExport } from "react-icons/bi";
import { FaEye, FaRegTrashAlt, } from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import { GoPlus } from "react-icons/go";

function HomeBanner() {
    const {setOpenFullScreenPanel } = useContext(AdminContext)
  return (
    <div className="p-5">  
    <div className="flex items-center justify-between flex-wrap">
            <h1 className="py-5 px-3 font-bold text-[20px]">Home Slider Banners</h1>
            <div className="w-full md:w-[40%] lg:w-[50%] ml-auto flex justify-end items-center flex-wrap gap-3 px-2">
                <button className="bg-primary hover:bg-white hover:text-primary hover:border hover:border-primary cursor-pointer text-white py-2 px-5 rounded text-[13px] flex items-center gap-1"><BiExport/>Export</button>
                <button className="border border-primary hover:bg-primary hover:text-white cursor-pointer text-[13px] text-primary py-2 px-5 rounded whitespace-nowrap flex  items-center" variant="outlined" onClick={()=>setOpenFullScreenPanel({
                    open:true,
                    model:"Add Home Banners Slide"
                  })}><GoPlus />Add Home Banner Slide</button> 
              </div>
                </div>
      <div className="relative overflow-x-auto mt-5 no-scroll">
        <table className="text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Image
              </th>

              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b border-gray-200">
              <td className="px-6 py-4">
                <div className="flex w-60 h-20 min-w-50 items-center gap-4 overflow-y-auto overflow-hidden no-scroll rounded-md cursor-pointer">
                  <img
                    src="http://localhost:5174/src/assets/Slider_3.jpg"
                    alt=""
                    className="w-full h-full rounded-md transition-all hover:scale-110 "
                  />
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <AiOutlineEdit className="text-[18px]" />
                  <FaEye className="text-[18px]" />
                  <FaRegTrashAlt className="text-[18px]" />
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b border-gray-200">
              <td className="px-6 py-4">
                <div className="flex w-60 h-20 min-w-50 items-center gap-4 overflow-y-auto overflow-hidden no-scroll rounded-md cursor-pointer">
                  <img
                    src="http://localhost:5174/src/assets/Slider_2.jpg"
                    alt=""
                    className="w-full h-full rounded-md transition-all hover:scale-110 "
                  />
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <AiOutlineEdit className="text-[18px]" />
                  <FaEye className="text-[18px]" />
                  <FaRegTrashAlt className="text-[18px]" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeBanner;
