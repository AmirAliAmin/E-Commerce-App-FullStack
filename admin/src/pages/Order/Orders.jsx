import React from 'react'
import { FaAngleDown } from 'react-icons/fa6';
import Badge from '../../components/Badge';
import Pagination from '@mui/material/Pagination';


function Orders() {
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
        <div className="flex items-center justify-end mt-4 mb-5 py-5">
          <Pagination count={10} color="secondary" />
        </div>
      </div>
  )
}

export default Orders