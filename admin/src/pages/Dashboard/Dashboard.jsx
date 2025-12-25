import React, { useContext, useEffect, useState } from "react";
import DashboardBox from "./DashboardBox";
import { IoIosGift } from "react-icons/io";
import { FiGitlab } from "react-icons/fi";
import { IoPieChartSharp } from "react-icons/io5";
import { RiBankFill } from "react-icons/ri";
import { FaProductHunt } from "react-icons/fa6";
import { MdWavingHand } from "react-icons/md";
import img from "../../assets/card.jpg";
import { GoPlus } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa";
import Badge from "../../components/Badge";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { BiExport } from "react-icons/bi";
import Chast1 from "../../components/charts/Chast1";
import { AdminContext } from "../../context/AdminContext";
import { deleteData, fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import Rating from "@mui/material/Rating";

function Dashboard() {
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
    fetchData(API_PATH.PRODUCTS.GET_PRODUCT_BY_CAT_ID(event.target.value)).then(
      (res) => {
        if (res?.error === false) {
          setProductData(res.product);
          setIsLoading(false);
          console.log(res);
        }
      }
    );
  };
  const rowsPerPage = 3;
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
        setIsLoading(false);
      }
    });
  }, []);
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
    },
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
      status: "confirm",
      date: "2024-10-05",
    },
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
      status: "delivered",
      date: "2024-10-05",
    },
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
    },
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
      status: "delivered",
      date: "2024-10-05",
    },
  ];

  return (
    <div>
      <div className="w-full p-5 border border-gray-200 flex items-center justify-between gap-8 mb-6 ">
        <div className="md:w-[50%]">
          <h1 className="text-[30px] font-bold leading-9 mb-3">
            Good Morning,
            <br /> Amir
          </h1>
          <p>
            Here's What happening on your store today. See the statistics at
            once.
          </p>
          <button
            className=" py-2 px-4 bg-primary rounded-lg mt-6 text-white flex items-center cursor-pointer"
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
        <div className="w-[30%] min-w-[30%] overflow-hidden hidden md:block ">
          <img src={img} alt="" className="object-cover w-full h-full" />
        </div>
      </div>
      <div className=" w-full px-4 py-2 overflow-y-auto flex gap-10 no-scroll">
        <DashboardBox
          title={"New Order"}
          price={"$1,390"}
          icon={<IoIosGift />}
          color={"text-primary"}
        />
        <DashboardBox
          title={"Sale"}
          price={"$57,890"}
          icon={<IoPieChartSharp />}
          color={"text-green-500"}
        />
        <DashboardBox
          title={"Revnenue"}
          price={"$12,590"}
          icon={<RiBankFill />}
          color={"text-purple-500"}
        />
        <DashboardBox
          title={"Products"}
          price={"1,390"}
          icon={<FaProductHunt />}
          color={"text-orange-400"}
        />
        <DashboardBox
          title={"New Order"}
          price={"1,390"}
          icon={<FiGitlab />}
          color={"text-blue-500"}
        />
      </div>
      <div className="my-4 shadow-md sm:rounded-lg bg-white">
        <h1 className="py-5 px-3 font-bold text-[20px]">Products</h1>
        <div className="flex items-center w-full flex-wrap justify-start md:justify-between px-5">
          <div className="col w-[40%] md:w-[20%] fle">
            <h4 className="font-semibold text-[12px] mb-1">Category By</h4>
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

          <div className="w-full md:w-[40%] lg:w-[25%] ml-auto flex items-center flex-wrap gap-3">
            <button className="bg-primary hover:bg-white hover:text-primary hover:border hover:border-primary cursor-pointer text-white py-2 px-5 rounded text-[13px] flex items-center gap-1">
              <BiExport />
              Export
            </button>
            <button
              className="border border-primary hover:bg-primary hover:text-white cursor-pointer text-[13px] text-primary py-2 px-5 rounded whitespace-nowrap"
              onClick={() =>
                setOpenFullScreenPanel({
                  open: true,
                  model: "Add Product",
                })
              }
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="relative h-90  overflow-x-auto mt-2 no-scroll">
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
        <div className="flex items-center justify-end mt-4 mb-5 py-5">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="secondary"
          />
        </div>
      </div>
      <div className="my-4 shadow-md sm:rounded-lg bg-white">
        <h1 className="py-5 px-3 font-bold text-[20px]">Recent Orders</h1>
        <div className="relative overflow-x-auto mt-5 no-scroll">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 flex items-center justify-center"
                >
                  <p className="w-8.75 h-8.75 min-w-8.75 rounded-full text-center flex items-center justify-center">
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
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.pincode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status={item.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="my-4 shadow-md sm:rounded-lg bg-white">
        <h1 className="py-5 px-3 font-bold text-[20px]">Repeat Customer Rate</h1>
        <div className="relative overflow-x-hidden mt-5 no-scroll px-5">
        <Chast1/>
        </div>
        </div> */}
      <div className="my-4 shadow-md sm:rounded-lg bg-white">
        <h1 className="py-5 px-3 font-bold text-[20px]">
          Total Users and Sales
        </h1>
        <div className="flex items-center gap-5 px-5 py-5">
          <span className="flex items-center gap-1 text-[14px]">
            <span className="block w-2.5 h-2.5 rounded-full bg-[#82CA9D]"></span>
            Total User
          </span>
          <span className="flex items-center gap-1 text-[14px]">
            <span className="block w-2.5 h-2.5 rounded-full bg-[#8884D8]"></span>
            Total Sale
          </span>
        </div>
        <div className="relative overflow-x-hidden mt-5 no-scroll px-5">
          <Chast1 />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
