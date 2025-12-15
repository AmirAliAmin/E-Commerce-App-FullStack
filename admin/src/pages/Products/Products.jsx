import React, { forwardRef, useContext, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import { AiOutlineEdit } from "react-icons/ai";
import { BiExport } from "react-icons/bi";
import { FaEye, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import { AdminContext } from "../../context/AdminContext";


function Products() {
     const [categoryFilter, setCategoryFilter] = useState("");
      const { handleClickOpenFullScreenPanel} = useContext(AdminContext)

      const handleChangeCatFilter = (event) => {
        setCategoryFilter(event.target.value);
      };
  return (
    <>
      <div className="card">
        <div className="my-4">
            <div className="flex items-center justify-between flex-wrap">
        <h1 className="py-5 px-3 font-bold text-[20px]">Products</h1>
        <div className="w-full md:w-[40%] lg:w-[25%] ml-auto flex justify-end items-center flex-wrap gap-3 px-2">
            <button className="bg-primary hover:bg-white hover:text-primary hover:border hover:border-primary cursor-pointer text-white py-2 px-5 rounded text-[13px] flex items-center gap-1"><BiExport/>Export</button>
            <button className="border border-primary hover:bg-primary hover:text-white cursor-pointer text-[13px] text-primary py-2 px-5 rounded whitespace-nowrap flex  items-center" variant="outlined" onClick={handleClickOpenFullScreenPanel}><GoPlus />Add Product</button>
                 
          </div>

            </div>
        <div className="shadow-md rounded-lg bg-white py-2">
        <div className="flex items-center justify-start md:justify-between flex-wrap px-5 gap-1">
          <div className="col w-full md:w-[40%] lg:w-[30%] flex">
            <h4 className="font-semibold text-[12px] mb-1 whitespace-nowrap mr-2">Category By:</h4>
            <Select
            className="w-full"
            size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryFilter}
              label=""
              onChange={handleChangeCatFilter}
            >
              <MenuItem value={"Men"}>Men</MenuItem>
              <MenuItem value={"Women"}>Women</MenuItem>
              <MenuItem value={"Kids"}>Kids</MenuItem>
            </Select>
          </div>
          <div className="col w-full md:w-[40%] lg:w-[30%] ml-auto">
            <SearchBox/>
          </div>
        </div>
        <div className="relative overflow-x-auto mt-5 no-scroll">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 flex items-center justify-center"
                >
                  <p className="w-8.75 h-8.75 min-w-8.75 rounded-full text-center flex items-center justify-center cursor-pointer">
                    <input type="checkbox" name="" id="" />
                  </p>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Sub Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 w-60 overflow-y-auto">
                    <Link to={"/product/4547"}>
                      <img
                        src="http://localhost:5174/src/assets/FashionImage41.webp"
                        alt=""
                        className="w-16.25 h-16.25 min-w-15"
                      />
                    </Link>
                    <div className="w-[75%]">
                      <Link to={"/product/4547"}>
                        <h3 className="font-bold text-black text-[12px] hover:text-primary leading-4">
                          Men Slim Fit Shirt
                        </h3>
                      </Link>
                      <p className="text-[12px]">Books</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Fashion</td>
                <td className="px-6 py-4 whitespace-nowrap">Men</td>
                <td className="px-6 py-4 whitespace-nowrap">Kashees</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="  text-primary">₹4500.00</p>
                  <p className="line-through text-gray-500 ">₹2000.00</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar />
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 w-60 overflow-y-auto">
                    <Link to={"/product/4547"}>
                      <img
                        src="http://localhost:5174/src/assets/FashionImage41.webp"
                        alt=""
                        className="w-16.25 h-16.25 min-w-15"
                      />
                    </Link>
                    <div className="w-[75%]">
                      <Link to={"/product/4547"}>
                        <h3 className="font-bold text-black text-[12px] hover:text-primary leading-4">
                          Men Slim Fit Shirt
                        </h3>
                      </Link>
                      <p className="text-[12px]">Books</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Fashion</td>
                <td className="px-6 py-4 whitespace-nowrap">Men</td>
                <td className="px-6 py-4 whitespace-nowrap">Kashees</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="  text-primary">₹4500.00</p>
                  <p className="line-through text-gray-500 ">₹2000.00</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar />
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 w-60 overflow-y-auto">
                    <Link to={"/product/4547"}>
                      <img
                        src="http://localhost:5174/src/assets/FashionImage41.webp"
                        alt=""
                        className="w-16.25 h-16.25 min-w-15"
                      />
                    </Link>
                    <div className="w-[75%]">
                      <Link to={"/product/4547"}>
                        <h3 className="font-bold text-black text-[12px] hover:text-primary leading-4">
                          Men Slim Fit Shirt
                        </h3>
                      </Link>
                      <p className="text-[12px]">Books</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Fashion</td>
                <td className="px-6 py-4 whitespace-nowrap">Men</td>
                <td className="px-6 py-4 whitespace-nowrap">Kashees</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="  text-primary">₹4500.00</p>
                  <p className="line-through text-gray-500 ">₹2000.00</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar />
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 w-60 overflow-y-auto">
                    <Link to={"/product/4547"}>
                      <img
                        src="http://localhost:5174/src/assets/FashionImage41.webp"
                        alt=""
                        className="w-16.25 h-16.25 min-w-15"
                      />
                    </Link>
                    <div className="w-[75%]">
                      <Link to={"/product/4547"}>
                        <h3 className="font-bold text-black text-[12px] hover:text-primary leading-4">
                          Men Slim Fit Shirt
                        </h3>
                      </Link>
                      <p className="text-[12px]">Books</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Fashion</td>
                <td className="px-6 py-4 whitespace-nowrap">Men</td>
                <td className="px-6 py-4 whitespace-nowrap">Kashees</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="  text-primary">₹4500.00</p>
                  <p className="line-through text-gray-500 ">₹2000.00</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar />
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 w-60 overflow-y-auto">
                    <Link to={"/product/4547"}>
                      <img
                        src="http://localhost:5174/src/assets/FashionImage41.webp"
                        alt=""
                        className="w-16.25 h-16.25 min-w-15"
                      />
                    </Link>
                    <div className="w-[75%]">
                      <Link to={"/product/4547"}>
                        <h3 className="font-bold text-black text-[12px] hover:text-primary leading-4">
                          Men Slim Fit Shirt
                        </h3>
                      </Link>
                      <p className="text-[12px]">Books</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Fashion</td>
                <td className="px-6 py-4 whitespace-nowrap">Men</td>
                <td className="px-6 py-4 whitespace-nowrap">Kashees</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="  text-primary">₹4500.00</p>
                  <p className="line-through text-gray-500 ">₹2000.00</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar className="text-orange-500" />
                    <FaStar />
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
        <div className="flex items-center justify-end mt-4 mb-5 py-5">
          <Pagination count={10} color="secondary" />
        </div>

        </div>
      </div>
      </div>
    </>
  );
}

export default Products;
