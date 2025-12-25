import React, { useContext, useState } from "react";
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { AdminContext } from "../../context/AdminContext";
import { deleteImage, postData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";

function AddHomeBanner() {
  const [formField, setFormField] = useState({
    images: [],
  });
  const [banner, setBanner] = useState([]);
  const { alertBox, setOpenFullScreenPanel } = useContext(AdminContext);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField(() => {
      return {
        ...formField,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formField.images.length) {
      alertBox("image required", "error");
      return;
    }

    const res = await postData(API_PATH.HOME.CREATE_HOME_BANNER, formField);

    if (res?.success) {
      alertBox("Banner uploaded", "success");
      setOpenFullScreenPanel({
        open: false,
      });
      setBanner((prev) => [...prev, res.data]);
      setFormField({
        images: [],
      });
    }
  };
  const handleDeleteImage = async (img) => {
    const res = await deleteImage(
      `${API_PATH.HOME.DELETE_IMAGES}?img=${encodeURIComponent(img)}`
    );
    console.log(res);
    if (res) {
      alertBox("Image Deleted successfully", "success");
      setFormField({
        images: [],
      });
    } else {
      alertBox("Category Image is Not Deleted", "error");
    }
  };
  return (
    <section className="p-5">
      <h1 className=" font-bold text-[20px]">Add Home Banner Slide</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="max-h-88 no-scroll overflow-y-auto">
          <div className="bg-white py-3 px-5 m-2 rounded-xl shadow border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {formField.images.map((img, index) => (
                <div className="relative" key={index}>
                  <div className="my-5 rounded-md overflow-hidden border-2 border-dashed border-gray-400 h-37.5 w-full  cursor-pointer flex flex-col items-center justify-center relative">
                    <LazyLoadImage
                      alt={"image"}
                      effect="blur"
                      wrapperProps={{ style: { transitionDelay: "1s" } }}
                      src={img}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute top-3 z-100 -right-2 cursor-pointer"
                    onClick={() => handleDeleteImage(img)}
                  >
                    <MdCancel className="text-primary text-xl" />
                  </div>
                </div>
              ))}
              <UploadBox
                multiple={false}
                setImages={(images) => {
                  setFormField((prev) => ({
                    ...prev,
                    images,
                  }));
                }}
                url={API_PATH.HOME.UPLOAD_IMAGES}
              />
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

export default AddHomeBanner;
