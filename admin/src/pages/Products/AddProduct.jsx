import React, { useContext, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";

function AddProduct() {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeature, setProductFeature] = useState("");
  const [productRAMS, setProductRAMS] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productSize, setProductSize] = useState("");

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };
  const handleChangeProductFeature = (event) => {
    setProductFeature(event.target.value);
  };
  const handleChangeProductRAMS = (event) => {
    setProductRAMS(event.target.value);
  };
  const handleChangeProductWeight = (event) => {
    setProductWeight(event.target.value);
  };
  const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);
  };

  return (
    <section className="p-5">
      <h1 className=" font-bold text-[20px]">Create Product</h1>
      <form action="" >
        <div className="max-h-88 no-scroll overflow-y-auto">
          <div className="bg-white py-3 px-5 m-2 rounded-xl shadow border border-gray-200">
          <div className="grid grid-cols-1 mt-6 mb-3 ">
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product Name</h3>
              <input
                type="text"
                className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mt-6 mb-3">
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product Description</h3>
              <textarea
                rows={5}
                type="text"
                className="w-full outline-none p-5 border border-gray-400 rounded-md text-sm"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-4 mt-6 mb-3 gap-4">
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
              <h3 className="text-[14px] font-medium ">Product Sub Category</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productSubCatDrop"
                size="small"
                className="w-full"
                value={productSubCat}
                label="SubCategory"
                onChange={handleChangeProductSubCat}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"Men"}>Men</MenuItem>
                <MenuItem value={"Women"}>Women</MenuItem>
                <MenuItem value={"Kids"}>Kids</MenuItem>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product Price</h3>
              <input
                type="number"
                className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product Old Price</h3>
              <input
                type="number"
                className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  "
              />
            </div>
          </div>
          <div className="grid md:grid-cols-4 mt-6 mb-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Is Featured</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productFeatured"
                size="small"
                className="w-full"
                value={productFeature}
                label="Featured"
                onChange={handleChangeProductFeature}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product Stock</h3>
              <input
                type="number"
                className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  "
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product Brand</h3>
              <input
                type="text"
                className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product Discount</h3>
              <input
                type="number"
                className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  "
              />
            </div>
          </div>

          <div className="grid  md:grid-cols-4 mt-6 mb-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product RAMS</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productRAMS"
                size="small"
                className="w-full"
                value={productRAMS}
                label="RAMS"
                onChange={handleChangeProductRAMS}
              >
                <MenuItem value={"4Gb"}>4GB</MenuItem>
                <MenuItem value={"6Gb"}>6GB</MenuItem>
                <MenuItem value={"8Gb"}>8GB</MenuItem>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product Weight</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productWeight"
                size="small"
                className="w-full"
                value={productWeight}
                label="Weight"
                onChange={handleChangeProductWeight}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"2KG"}>2KG</MenuItem>
                <MenuItem value={"4KG"}>4KG</MenuItem>
                <MenuItem value={"5KG"}>5KG</MenuItem>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Product Size</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productSize"
                size="small"
                className="w-full"
                value={productSize}
                label="Size"
                onChange={handleChangeProductSize}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"S"}>S</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
                <MenuItem value={"XL"}>XL</MenuItem>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium ">Rating</h3>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </div>
          </div>
        </div>
        <div className="bg-white py-3 px-5 m-2 mt-6 rounded-xl shadow border border-gray-200">
          <h3 className="font-bold text-[18px]">Media & Image</h3>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div className="relative">
            <div className="my-5 rounded-md overflow-hidden border-2 border-dashed border-gray-400 h-37.5 w-full  cursor-pointer flex flex-col items-center justify-center relative">
              <LazyLoadImage
                alt={"image"}
                effect="blur"
                wrapperProps={{style: {transitionDelay: "1s"}}}
                src={"http://localhost:5174/src/assets/FashionImage12.jpg"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-3 z-100 -right-2 cursor-pointer"><MdCancel className="text-primary text-xl"/></div>
            </div>
             <div className="relative">
            <div className="my-5 rounded-md overflow-hidden border-2 border-dashed border-gray-400 h-37.5 w-full  cursor-pointer flex flex-col items-center justify-center relative">
              <LazyLoadImage
                alt={"image"}
                effect="blur"
                wrapperProps={{style: {transitionDelay: "1s"}}}
                src={"http://localhost:5174/src/assets/FashionImage12.jpg"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-3 z-100 -right-2 cursor-pointer"><MdCancel className="text-primary text-xl"/></div>
            </div>
             <div className="relative">
            <div className="my-5 rounded-md overflow-hidden border-2 border-dashed border-gray-400 h-37.5 w-full  cursor-pointer flex flex-col items-center justify-center relative">
              <LazyLoadImage
                alt={"image"}
                effect="blur"
                wrapperProps={{style: {transitionDelay: "1s"}}}
                src={"http://localhost:5174/src/assets/FashionImage12.jpg"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-3 z-100 -right-2 cursor-pointer"><MdCancel className="text-primary text-xl"/></div>
            </div>
            <UploadBox multiple={true} />
          </div>
        </div>
        </div>
        <br />
        <button type="submit" className="w-full py-2 bg-primary text-white rounded-md hover:text-primary hover:bg-white hover:border hover:border-primary cursor-pointer flex items-center gap-2 justify-center"><IoCloudUploadSharp/>Publish and View</button>
      </form>
    </section>
  );
}

export default AddProduct;
