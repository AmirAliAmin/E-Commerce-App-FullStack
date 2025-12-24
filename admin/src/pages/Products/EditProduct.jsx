import React, { useContext, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { AdminContext } from "../../context/AdminContext";
import { API_PATH } from "../../utils/apiPath";
import { deleteImage, fetchData, postData, putData } from "../../utils/api";
import { useEffect } from "react";

const ITEM_HEIGH = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGH * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function EditProduct() {
  const {
    categoryData,
    alertBox,
    setOpenFullScreenPanel,
    openFullScreenPanel,
    navigate,
    setProductData,
  } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldprice: "",
    catName: "",
    catId: "",
    subcatName: "",
    subcatId: "",
    thirdsubcat: "",
    thirdsubcatId: "",
    category: "",
    countInStock: "",
    rating: "",
    isFeatured: true,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
  });

  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeature, setProductFeature] = useState("");
  const [productRAMS, setProductRAMS] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productSize, setProductSize] = useState([]);

  useEffect(() => {
    const id = openFullScreenPanel?.id;
    fetchData(API_PATH.PRODUCTS.GET_PRODUCT_BY_ID(id)).then((res) => {
      if (res?.success) {
        console.log(res);
        setFormField({
          name: res.product.name || "",
          images: res.product.images || [],
          description: res?.product.description || "",
          brand: res.product?.brand || "",
          price: res.product?.price || "",
          oldprice: res.product?.oldprice || "",
          catName: res.product?.catName || "",
          subcatName: res.product?.subcatName || "",
          countInStock: res.product?.countInStock || "",
          rating: res.product?.rating,
          isFeatured: res.product?.isFeatured || "",
          discount: res.product?.discount || "",
          productRam: res.product?.productRam || [],
          size: res.product?.size || [],
          productWeight: res.product?.productWeight || [],
        });
        setProductCat(res.product?.catId);
        setProductSubCat(res.product?.subcatId);
        setProductFeature(res.product.isFeatured);
        setProductRAMS(res.product.productRam);
        setProductSize(res.product.size);
        setProductWeight(res.product.productWeight);
      }
    });
  }, []);
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formField.catId = event.target.value;
    formField.category = event.target.value;
  };
  const selectCatByName = (name) => {
    formField.catName = name;
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };

  const selectSubCatByName = (name) => {
    formField.subcatName = name;
  };
  const handleChangeProductFeature = (event) => {
    setProductFeature(event.target.value);
    formField.isFeatured = event.target.value;
  };

  const handleChangeProductRAMS = (event) => {
    const {
      target: { value },
    } = event;
    setProductRAMS(typeof value === "string" ? value.split(",") : value);
    formField.productRam = event.target.value;
  };
  const handleChangeProductWeight = (event) => {
    const {
      target: { value },
    } = event;
    setProductWeight(typeof value === "string" ? value.split(",") : value);
    formField.productWeight = event.target.value;
  };
  const handleChangeProductSize = (event) => {
    const {
      target: { value },
    } = event;
    setProductSize(typeof value === "string" ? value.split(",") : value);
    formField.size = event.target.value;
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField(() => {
      return {
        ...formField,
        [name]: value,
      };
    });
  };

  const onChangeRating = (e) => {
    setFormField((prev) => ({
      ...prev,
      rating: e.target.value,
    }));
  };

  const handleDeleteImage = async (img) => {
    const res = await deleteImage(
      `${API_PATH.PRODUCTS.DELETE_IMAGES}?img=${encodeURIComponent(img)}`
    );

    if (res) {
      alertBox("Image Deleted successfully", "success");
      setFormField({
        images: [],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = openFullScreenPanel?.id;
    putData(API_PATH.PRODUCTS.UPDATE_PRODUCT(id), formField).then((res) => {
      // console.log(res);
      if (res?.error === false) {
        alertBox(res?.message || "Product is Updated", "success");
        setIsLoading(false);
        setOpenFullScreenPanel({
          open: false,
        });
        setFormField({
          name: res.product?.name || "",
          images: res.product?.images || [],
          description: res?.product?.description || "",
          brand: res.product?.brand || "",
          price: res.product?.price || "",
          oldprice: res.product?.oldprice || "",
          catName: res.product?.catName || "",
          subcatName: res.product?.subcatName || "",
          countInStock: res.product?.countInStock || "",
          rating: res.product?.rating,
          isFeatured: res.product?.isFeatured || "",
          discount: res.product?.discount || "",
          productRam: res.product?.productRam || [],
          size: res.product?.size || [],
          productWeight: res.product?.productWeight || [],
        });
        setProductCat(res.product?.catId);
        setProductSubCat(res.product?.subcatId);
        setProductFeature(res.product?.isFeatured);
        setProductRAMS(res.product?.productRam);
        setProductSize(res.product?.size);
        setProductWeight(res.product?.productWeight);
        setProductData((prev) =>
          prev.map((item) => (item._id === res.data._id ? res.data : item))
        );

        navigate("/product/list");
      } else {
        alertBox(res?.message, "error");
        setIsLoading(false);
      }
    });
  };
  return (
    <section className="p-5">
      <h1 className=" font-bold text-[20px]">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="max-h-88 no-scroll overflow-y-auto">
          <div className="bg-white py-3 px-5 m-2 rounded-xl shadow border border-gray-200">
            <div className="grid grid-cols-1 mt-6 mb-3 ">
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Product Name</h3>
                <input
                  type="text"
                  name="name"
                  value={formField.name}
                  onChange={onChangeInput}
                  className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 mt-6 mb-3">
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">
                  Product Description
                </h3>
                <textarea
                  rows={5}
                  type="text"
                  name="description"
                  value={formField.description}
                  onChange={onChangeInput}
                  className="w-full outline-none p-5 border border-gray-400 rounded-md text-sm"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-4 mt-6 mb-3 gap-4">
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Product Category</h3>
                {categoryData?.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    size="small"
                    className="w-full"
                    value={productCat}
                    label="Category"
                    onChange={handleChangeProductCat}
                  >
                    {categoryData?.map((parent) => (
                      <MenuItem
                        key={parent._id}
                        value={parent._id}
                        onClick={() => selectCatByName(parent?.name)}
                      >
                        {parent.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </div>
              {productCat && (
                <div className="space-y-2">
                  <h3 className="text-[14px] font-medium ">
                    Product Sub Category
                  </h3>
                  <Select
                    labelId="demo-simple-select-label"
                    id="productSubCatDrop"
                    size="small"
                    className="w-full"
                    value={productSubCat}
                    label="SubCategory"
                    onChange={handleChangeProductSubCat}
                  >
                    {categoryData
                      .find((parent) => parent._id === productCat)
                      ?.children?.map((child) => (
                        <MenuItem
                          key={child._id}
                          value={child._id}
                          onClick={() => selectSubCatByName(child.name)}
                        >
                          {child.name}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Product Price</h3>
                <input
                  type="number"
                  name="price"
                  value={formField.price}
                  onChange={onChangeInput}
                  className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Product Old Price</h3>
                <input
                  type="number"
                  name="oldprice"
                  value={formField.oldprice}
                  onChange={onChangeInput}
                  className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  "
                />
              </div>
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
                  name="countInStock"
                  value={formField.countInStock}
                  onChange={onChangeInput}
                  className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  "
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Product Brand</h3>
                <input
                  type="text"
                  name="brand"
                  value={formField.brand}
                  onChange={onChangeInput}
                  className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Product Discount</h3>
                <input
                  type="number"
                  name="discount"
                  value={formField.discount}
                  onChange={onChangeInput}
                  className="w-full outline-none py-2 px-2 border border-gray-400 rounded-md text-sm
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  "
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Product RAMS</h3>
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productRAMS"
                  size="small"
                  className="w-full"
                  value={productRAMS}
                  label="RAMS"
                  onChange={handleChangeProductRAMS}
                  MenuProps={MenuProps}
                >
                  <MenuItem value={""}>None</MenuItem>
                  <MenuItem value={"4Gb"}>4GB</MenuItem>
                  <MenuItem value={"6Gb"}>6GB</MenuItem>
                  <MenuItem value={"8Gb"}>8GB</MenuItem>
                </Select>
              </div>
              <div className="space-y-2">
                <h3 className="text-[14px] font-medium ">Product Weight</h3>
                <Select
                  multiple
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
                  multiple
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
                <Rating
                  name="rating"
                  value={formField.rating}
                  onChange={onChangeRating}
                />
              </div>
            </div>
          </div>
          <div className="bg-white py-3 px-5 m-2 mt-6 rounded-xl shadow border border-gray-200">
            <h3 className="font-bold text-[18px]">Media & Image</h3>

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
                multiple={true}
                setImages={(images) => {
                  setFormField((prev) => ({
                    ...prev,
                    images,
                  }));
                }}
                url={API_PATH.PRODUCTS.UPLOAD_IMAGES}
              />
            </div>
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
      </form>
    </section>
  );
}

export default EditProduct;
