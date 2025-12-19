import React, { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiExport } from "react-icons/bi";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import { GoPlus } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
function SubCategory() {
  const { setOpenFullScreenPanel } = useContext(AdminContext);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    fetchData(API_PATH.CATEGORY.GET_CATEGORIES).then((res) => {
      setCategoryData(res.data);
    });
  }, []);
  return (
    <div className="p-5">
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="py-5 px-3 font-bold text-[20px]">Sub Category</h1>
        <div className="w-full md:w-[40%] lg:w-[50%] ml-auto flex justify-end items-center flex-wrap gap-3 px-2">
          <button className="bg-primary hover:bg-white hover:text-primary hover:border hover:border-primary cursor-pointer text-white py-2 px-5 rounded text-[13px] flex items-center gap-1">
            <BiExport />
            Export
          </button>
          <button
            className="border border-primary hover:bg-primary hover:text-white cursor-pointer text-[13px] text-primary py-2 px-5 rounded whitespace-nowrap flex  items-center"
            variant="outlined"
            onClick={() =>
              setOpenFullScreenPanel({
                open: true,
                model: "Add Sub Category",
              })
            }
          >
            <GoPlus />
            Add Sub Category
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto mt-5 no-scroll">
        <table className="text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Category Image
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Category
              </th>

              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Sub Category
              </th>
            </tr>
          </thead>
          <tbody>
            {categoryData?.map((parent) => (
              <tr
                key={parent._id}
                className="bg-white border-b border-gray-200"
              >
                <td className="px-6 py-4">
                  <div className="flex w-20 h-20 min-w-20 items-center gap-4 overflow-y-auto overflow-hidden no-scroll rounded-md cursor-pointer">
                    <img
                      src={parent.images[0]}
                      alt=""
                      className="w-full h-full rounded-md transition-all hover:scale-110 "
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <h1 className="font-medium text-black">{parent.name}</h1>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap flex gap-3 items-center justify-center">
                  <div className="flex items-center justify-center gap-3">
                  {parent.children?.map((child) => (
                    <div
                      key={child._id}
                      className="bg-primary text-white p-1  gap-3 rounded-md flex items-center justify-center"
                    >
                      {child.name} <IoIosClose />
                    </div>
                  ))}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubCategory;
