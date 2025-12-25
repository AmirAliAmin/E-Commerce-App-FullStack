import React, { forwardRef, useContext, useState } from "react";
import Pagination from "@mui/material/Pagination";
import SearchBox from "../../components/SearchBox";
import { AdminContext } from "../../context/AdminContext";
import { MdEmail } from "react-icons/md";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import { useEffect } from "react";

function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [ userData, setUserData ] = useState([])

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_PATH.AUTH.GET_ALL_USERS).then((res) => {
      if (res?.error === false) {
        setUserData(res.data);
        console.log(res.data);
        setIsLoading(false);
      }
    });
  }, []);
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
                  {isLoading === false ? (
                    userData?.map((item) => (
                      <tr key={item._id} className="bg-white border-b border-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="checkbox" className="cursor-pointer" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4  overflow-y-auto">
                            <img
                              src={item?.avatar}
                              alt=""
                              className="w-12 h-12 min-w-12 rounded-full border object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          03{item?.mobile}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           {new Date(item?.createdAt).toLocaleDateString()}
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
              <Pagination count={10} color="secondary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
