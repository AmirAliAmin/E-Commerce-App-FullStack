import React, { useState } from "react";
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

function Dashboard() {
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleChangeCatFilter = (event) => {
    setCategoryFilter(event.target.value);
  };
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
          <button className=" py-2 px-4 bg-primary rounded-lg mt-6 text-white flex items-center">
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

          <div className="w-full md:w-[40%] lg:w-[25%] ml-auto flex items-center flex-wrap gap-3">
            <button className="bg-primary hover:bg-white hover:text-primary hover:border hover:border-primary cursor-pointer text-white py-2 px-5 rounded text-[13px] flex items-center gap-1"><BiExport/>Export</button>
            <button className="border border-primary hover:bg-primary hover:text-white cursor-pointer text-[13px] text-primary py-2 px-5 rounded whitespace-nowrap">Add Product</button>
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
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end mt-4 mb-5 py-5">
          <Pagination count={10} color="secondary" />
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
        <h1 className="py-5 px-3 font-bold text-[20px]">Total Users and Sales</h1>
        <div className="flex items-center gap-5 px-5 py-5">
          <span className="flex items-center gap-1 text-[14px]"><span className="block w-2.5 h-2.5 rounded-full bg-[#82CA9D]"></span>Total User</span>
           <span className="flex items-center gap-1 text-[14px]"><span className="block w-2.5 h-2.5 rounded-full bg-[#8884D8]"></span>Total Sale</span>
        </div>
        <div className="relative overflow-x-hidden mt-5 no-scroll px-5">
        <Chast1/>
        </div>
        </div>
    </div>
  );
}

export default Dashboard;
