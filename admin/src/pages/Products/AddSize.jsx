import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { IoCloudUploadSharp } from "react-icons/io5";
import { deleteData, fetchData, postData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import { AdminContext } from "../../context/AdminContext";

function AddSize() {
  const [formField, setFormField] = useState();
  const [productRAMSData, setProductRAMSData] = useState([]);
  const { alertBox } = useContext(AdminContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formField === "") {
      alertBox("Please Enter RAMS", "error");
      return;
    }
    postData(API_PATH.PRODUCTS.CREATE_PRODUCT_SIZE, {
      name: formField,
    }).then((res) => {
      // console.log(res);
      if (res?.error === false) {
        alertBox(res?.message || "Product Size is Added", "success");
        setProductRAMSData((prev) => [...prev, res.data]);
      } else {
        alertBox(res?.message, "error");
      }
    });
  };
  useEffect(() => {
    fetchData(API_PATH.PRODUCTS.GET_ALL_PRODUCT_SIZE).then((res) => {
      if (res?.error === false) {
        setProductRAMSData(res.data);
      }
    });
  }, []);
  const deleteProductRAMS = async (_id) => {
    try {
      const res = await deleteData(API_PATH.PRODUCTS.DELETE_PRODUCT_SIZE(_id));

      if (res?.success) {
        alertBox("Product Size Deleted", "success");
        setProductRAMSData((prev) => prev.filter((rams) => rams._id !== _id));
      } else {
        alertBox("Product Size not Deleted", "error");
      }
    } catch (error) {
      alertBox("Server Error", "error");
      console.log(error);
    }
  };
  return (
    <section className="p-5">
      <h1 className=" font-bold text-[20px]">Add Product Size</h1>
      <form onSubmit={handleSubmit}>
        <div className="max-h-88 no-scroll overflow-y-auto">
          <div className="bg-white py-3 px-5 m-2 rounded-xl shadow border border-gray-200">
            <div className="grid grid-cols-1 mt-6 mb-3 ">
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Product Size</h3>
                <input
                  type="text"
                  name="name"
                  value={formField}
                  onChange={(e)=>setFormField(e.target.value)}
                  className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-6 py-2 bg-primary text-white rounded-md hover:text-primary hover:bg-white hover:border hover:border-primary cursor-pointer flex items-center gap-2 justify-center"
              >
                <IoCloudUploadSharp />
                Publish and View
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="relative h-50 w-150  overflow-x-auto mt-2 no-scroll">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Product Size
              </th>

              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {productRAMSData?.map((item) => (
              <tr key={item._id} className="bg-white border-b  border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FaRegTrashAlt
                      className="text-[18px] link"
                      onClick={() => deleteProductRAMS(item?._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AddSize;
