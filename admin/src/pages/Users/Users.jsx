import React, { forwardRef, useContext, useState } from "react";
import Pagination from "@mui/material/Pagination";
import SearchBox from "../../components/SearchBox";
import { AdminContext } from "../../context/AdminContext";
import { MdEmail } from "react-icons/md";

function Users() {
  return (
    <>
      <div className="card">
        <div className="">
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="py-5 px-3 font-bold text-[20px]">Users List</h1>
          </div>
          <div className="shadow-md rounded-lg bg-white py-2">
            <div className="col w-full md:w-[40%] lg:w-[30%] px-5">
              <SearchBox />
            </div>
            <div className="relative overflow-x-auto mt-5 no-scroll h-60">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="cursor-pointer" />
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      User Image
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      User Name
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      User Email
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      User Phone No.
                    </th>
                     <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="cursor-pointer" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4  overflow-y-auto">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU5rtOcSD42xjPX4g4m3AIKwzJeCpLCf5Abw&s"
                          alt=""
                          className="w-12 h-12 min-w-12 rounded-full border object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Amir Ali Amin
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      aliaminamir77@gmail.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">03261971792</td>
                    <td className="px-6 py-4 whitespace-nowrap">10-12-2025</td>
                  </tr>
                   <tr className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="cursor-pointer" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4  overflow-y-auto">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU5rtOcSD42xjPX4g4m3AIKwzJeCpLCf5Abw&s"
                          alt=""
                          className="w-12 h-12 min-w-12 rounded-full border object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Amir Ali Amin
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      aliaminamir77@gmail.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">03261971792</td>
                    <td className="px-6 py-4 whitespace-nowrap">10-12-2025</td>
                  </tr>
                   <tr className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="cursor-pointer" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4  overflow-y-auto">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU5rtOcSD42xjPX4g4m3AIKwzJeCpLCf5Abw&s"
                          alt=""
                          className="w-12 h-12 min-w-12 rounded-full border object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Amir Ali Amin
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      aliaminamir77@gmail.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">03261971792</td>
                    <td className="px-6 py-4 whitespace-nowrap">10-12-2025</td>
                  </tr>
                   <tr className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="cursor-pointer" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4  overflow-y-auto">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU5rtOcSD42xjPX4g4m3AIKwzJeCpLCf5Abw&s"
                          alt=""
                          className="w-12 h-12 min-w-12 rounded-full border object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Amir Ali Amin
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      aliaminamir77@gmail.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">03261971792</td>
                    <td className="px-6 py-4 whitespace-nowrap">10-12-2025</td>
                  </tr>
                   <tr className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="cursor-pointer" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4  overflow-y-auto">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU5rtOcSD42xjPX4g4m3AIKwzJeCpLCf5Abw&s"
                          alt=""
                          className="w-12 h-12 min-w-12 rounded-full border object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Amir Ali Amin
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      aliaminamir77@gmail.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">03261971792</td>
                    <td className="px-6 py-4 whitespace-nowrap">10-12-2025</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-end mt-4 mb-5 py-5">
              <Pagination count={10} color="secondary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
