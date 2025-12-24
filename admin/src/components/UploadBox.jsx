import React, { useState, useContext } from "react";
import { FaImages } from "react-icons/fa6";
import { AdminContext } from "../context/AdminContext";
import { uploadImage } from "../utils/api";
import { API_PATH } from "../utils/apiPath";

function UploadBox({ multiple = false, setImages,url }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState([]);
  const { alertBox } = useContext(AdminContext);

  const onChangeFile = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    for (let file of files) {
      if (
        !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        )
      ) {
        alertBox("Only JPG, PNG, WEBP allowed", "error");
        return;
      }
    }

    try {
      setUploading(true);

      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const res = await uploadImage(
        url,
        formData
      );

      if (res?.success) {
        setPreview(res.images);
        setImages(res.images); // send to parent (category form)
        alertBox("Images uploaded successfully", "success");
      }
    } catch (err) {
      console.log(err);
      alertBox("Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="p-3 my-5 rounded-md border-2 border-dashed border-gray-400 bg-gray-100 hover:bg-gray-200 cursor-pointer h-37.5 w-full flex flex-col items-center justify-center relative">
        {
          uploading === true ? <>
           <div className=" animate-spin w-15 h-15 border-3 border-primary border-solid rounded-full border-t-transparent"></div>
          <h4 className="text-[14px] opacity-35">Uploading</h4>
          </>:
          <>
          <FaImages className="text-[50px] opacity-35" />
          <h4 className="text-[14px] opacity-35">Image Upload</h4>
          <input
            type="file"
            multiple={multiple}
            accept="image/*"
            onChange={onChangeFile}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          </>
        }
      </div>
    </>
  );
}

export default UploadBox;
