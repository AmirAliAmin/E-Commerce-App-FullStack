import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "../../components/Badge";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import { useState } from "react";

function Orders() {
  const [orderData, setOrderData] = useState(null);
  useEffect(() => {
    fetchData(API_PATH.ORDER.GET_ALL_ORDER).then((res) => {
      if (res?.error === false) {
        setOrderData(res?.data);
      }
    });
  }, []);
  return (
    <div className="my-4 shadow-md sm:rounded-lg bg-white">
      <h1 className="py-5 px-3 font-bold text-[20px]">Orders</h1>
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
            {orderData?.map((item, index) => (
              <tr key={item._id} className="bg-white border-b border-gray-200">
                <td className="px-3 py-4 text-center">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.paymentId}
                </td>
                <td className="px-6 py-4  overflow-auto whitespace-nowrap flex w-80 max-w-80 no-scroll">
                  {item.product.map((p) => (
                    <div key={p._id} className="text-sm">
                      {p.productTitle} × {p.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.userId?.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.delivery_address?.mobile}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.delivery_address?.address_line},{" "}
                  {item.delivery_address?.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.delivery_address?.pincode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-bold">
                  Rs. {item.totalAmt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.userId?.email || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {typeof item.userId === "object"
                    ? item.userId._id
                    : item.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge status={item.order_Status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
