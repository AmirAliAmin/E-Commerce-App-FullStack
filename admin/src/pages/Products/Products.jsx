import React, { forwardRef, useContext, useEffect, useState } from "react";
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
import { deleteData, fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import Rating from "@mui/material/Rating";

function Products() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setOpenFullScreenPanel,
    productData,
    setProductData,
    alertBox,
    categoryData,
    navigate,
  } = useContext(AdminContext);

  const handleChangeCatFilter = (event) => {
    setCategoryFilter(event.target.value);
    setIsLoading(true);
    if (event.target.value === "") {
      fetchData(API_PATH.PRODUCTS.GET_ALL_PRODUCT).then((res) => {
        if (res?.error === false) {
          setProductData(res.data);
          console.log(res.data);
          setIsLoading(false);
        }
      });
    } else {
      fetchData(
        API_PATH.PRODUCTS.GET_PRODUCT_BY_CAT_ID(event.target.value)
      ).then((res) => {
        if (res?.error === false) {
          setProductData(res.data);
          setIsLoading(false);
          console.log(res);
        }
      });
    }
  };
  const rowsPerPage = 10;
  const sortedProducts = [...(productData || [])].reverse();
  const paginatedProducts = sortedProducts?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const totalPages = Math.ceil((productData?.length || 0) / rowsPerPage);

  const deleteProduct = async (_id) => {
    try {
      const res = await deleteData(API_PATH.PRODUCTS.DELETE_PRODUCT(_id));

      if (res?.success) {
        alertBox("Product Deleted", "success");
        setProductData((prev) => prev.filter((cat) => cat._id !== _id));
      } else {
        alertBox("Product not Deleted", "error");
      }
    } catch (error) {
      alertBox("Server Error", "error");
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_PATH.PRODUCTS.GET_ALL_PRODUCT).then((res) => {
      if (res?.error === false) {
        setProductData(res.data);
        console.log(res.data);
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <>
      <div className="card">
        <div className="my-2">
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="py-2 px-3 font-bold text-[20px]">Products</h1>
            <div className="w-full md:w-[40%] lg:w-[25%] ml-auto flex justify-end items-center flex-wrap gap-3 px-2">
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
                    model: "Add Product",
                  })
                }
              >
                <GoPlus />
                Add Product
              </button>
            </div>
          </div>
          <div className="shadow-md rounded-lg bg-white py-2">
            <div className="flex items-center justify-start md:justify-between flex-wrap px-5 gap-1">
              <div className="col w-full md:w-[40%] lg:w-[30%] flex">
                <h4 className="font-semibold text-[12px] mb-1 whitespace-nowrap mr-2">
                  Category By:
                </h4>
                {categoryData?.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    size="small"
                    className="w-full"
                    value={categoryFilter}
                    label="Category"
                    onChange={handleChangeCatFilter}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categoryData?.map((parent) => (
                      <MenuItem
                        key={parent._id}
                        value={parent._id}
                        // onClick={() => selectCatByName(parent?.name)}
                      >
                        {parent.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </div>
              <div className="col w-full md:w-[40%] lg:w-[30%] ml-auto">
                <SearchBox />
              </div>
            </div>
            <div className="relative h-80  overflow-x-auto mt-2 no-scroll">
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
                      sale
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {isLoading === false ? (
                    productData?.length !== 0 &&
                    paginatedProducts?.map((item) => (
                      <tr
                        className="bg-white border-b  border-gray-200"
                        key={item?._id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="checkbox" className="cursor-pointer" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4 w-60 overflow-y-auto">
                            <Link to={`/productDetails/${item?._id}`}>
                              <img
                                src={item?.images[0]}
                                alt=""
                                className="w-16.25 h-16.25 min-w-15"
                              />
                            </Link>
                            <div className="w-[70%]">
                              <Link to={`/productDetails/${item?._id}`}>
                                <h3 className="font-bold text-black text-[12px] hover:text-primary leading-4">
                                  {item?.name}
                                </h3>
                              </Link>
                              <p className="text-[12px]">{item?.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.catName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.subcatName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.brand}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="  text-primary">₹{item?.price}.00</p>
                          <p className="line-through text-gray-500 ">
                            {item?.oldprice}.00
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">{item?.sale}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">
                            <Rating name="rating" value={item?.rating} />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <AiOutlineEdit
                              className="text-[18px] link"
                              onClick={() =>
                                setOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Product",
                                  id: item?._id,
                                })
                              }
                            />
                            <FaEye
                              className="text-[18px] link"
                              onClick={() =>
                                navigate(`/productDetails/${item?._id}`)
                              }
                            />
                            <FaRegTrashAlt
                              className="text-[18px] link"
                              onClick={() => deleteProduct(item?._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="pt-30">
                        <div className=" animate-spin w-10 h-10 border-2 border-primary border-solid rounded-full border-t-transparent"></div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-end mt-2 mb-2 ">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
