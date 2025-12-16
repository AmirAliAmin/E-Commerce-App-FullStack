import React, { useState } from 'react'
import { IoCloudUploadSharp } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function AddSubCategory() {
  const [productCat, setProductCat] = useState("");

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };
  return (
     <section className="p-5">
      <h1 className=" font-bold text-[20px]">Add Sub Category</h1>
      <form action="">
        <div className="max-h-100 no-scroll overflow-y-auto">
          <div className="bg-white py-3 px-5 m-2 rounded-xl shadow border border-gray-200">
            <div className='grid grid-cols-2 gap-5'>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product Category</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Fashion</MenuItem>
                <MenuItem value={20}>Beauty</MenuItem>
                <MenuItem value={30}>Wellness</MenuItem>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Sub Category Name</h3>
              <input
                type="text"
                className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm"
              />
            </div>

            </div>
            <br />
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-md hover:text-primary hover:bg-white hover:border hover:border-primary cursor-pointer flex items-center gap-2 justify-center"
            >
              <IoCloudUploadSharp />
              Publish and View
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default AddSubCategory