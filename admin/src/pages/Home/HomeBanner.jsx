import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function HomeBanner() {
  return (
    <div>
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
                <div className="flex items-center gap-4 w-60 overflow-y-auto">
                  <img
                    src="http://localhost:5174/src/assets/Ads1.webp"
                    alt=""
                    className="w-40 h-20 min-w-15 rounded-md"
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
                <div className="flex items-center gap-4 w-60 overflow-y-auto">
                  <img
                    src="http://localhost:5174/src/assets/Ads2.webp"
                    alt=""
                    className="w-40 h-20 min-w-15 rounded-md"
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
