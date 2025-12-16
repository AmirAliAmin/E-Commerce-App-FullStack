import React from 'react'
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";

function AddCategory() {
  return (
    <section className="p-5">
      <h1 className=" font-bold text-[20px]">Add Category</h1>
      <form action="">
        <div className="max-h-100 no-scroll overflow-y-auto">
          <div className="bg-white py-3 px-5 m-2 rounded-xl shadow border border-gray-200">
            <div className="space-y-2">
              <h3 className="font-bold text-[18px]">Category Name</h3>
              <input
                type="text"
                className="w-100 outline-none py-2 px-2 border border-gray-400 rounded-md text-sm"
              />
            </div>
             <h3 className="font-bold text-[18px] mt-2">Media & Image</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <div className="relative">
                <div className="my-5 rounded-md overflow-hidden border-2 border-dashed border-gray-400 h-37.5 w-full  cursor-pointer flex flex-col items-center justify-center relative">
                  <LazyLoadImage
                    alt={"image"}
                    effect="blur"
                    wrapperProps={{ style: { transitionDelay: "1s" } }}
                    src={"http://localhost:5174/src/assets/Footwear.png"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-3 z-100 -right-2 cursor-pointer">
                  <MdCancel className="text-primary text-xl" />
                </div>
              </div>
              <UploadBox multiple={false} />
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

export default AddCategory