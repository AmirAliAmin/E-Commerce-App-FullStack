import React, { useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { fetchData, postData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

function AddSubCategory() {
  const [productCat, setProductCat] = useState("");
  // const [categoryData, setCategoryData] = useState([]);
  const [subCatName, setSubCatName] = useState("");

  const { alertBox,categoryData,setCategoryData } = useContext(AdminContext);

  // useEffect(() => {
  //   fetchData(API_PATH.CATEGORY.GET_CATEGORIES).then((res) => {
  //     setCategoryData(res?.data || []);
  //   });
  // }, []);


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!productCat || !subCatName) {
    alertBox("All fields required","error");
    return;
  }

  const payload = {
    name: subCatName,
    parentCatId: productCat,
    parentCatName: categoryData.find(cat => cat._id === productCat)?.name,
    images: [],
  };

  const res =  await postData(API_PATH.CATEGORY.CREATE_CATEGORY, payload);
   if (res?.success) {
      alertBox("Sub Category created", "success");
       setCategoryData(prev => 
      prev.map(cat => 
        cat._id === productCat 
          ? { ...cat, children: [...(cat.children || []), res.category] } 
          : cat
      )
    );
     setSubCatName("");
    setProductCat("");
    }
};

  return (
    <section className="p-5">
      <h1 className=" font-bold text-[20px]">Add Sub Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="max-h-100 no-scroll overflow-y-auto">
          <div className="bg-white py-3 px-5 m-2 rounded-xl shadow border border-gray-200">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Product Category</h3>
                <Select
                  size="small"
                  className="w-full"
                  value={productCat}
                  onChange={(e) => setProductCat(e.target.value)}
                >
                  {categoryData.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Sub Category Name</h3>
                <input
                  type="text"
                  value={subCatName}
                  onChange={(e) => setSubCatName(e.target.value)}
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
  );
}

export default AddSubCategory;
