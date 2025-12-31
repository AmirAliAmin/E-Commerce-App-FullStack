import React, { useContext, useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { products } from "../../assets/assets";
import ProductCard from "../../components/products/ProductCard";
import SliderRange from "../../components/SliderRange";
import { MdOutlineMenu } from "react-icons/md";
import { IoGridOutline } from "react-icons/io5";
import ListProductCard from "../../components/products/ListProductCard";
import { API_PATH } from "../../utils/apiPath";
import { fetchData, postData } from "../../utils/api";
import { AppContext } from "../../context/AppContext";
import Pagination from "@mui/material/Pagination";
import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";

function Product() {
  const { categoryData } = useContext(AppContext);

  const [openCategory, setOpenCategory] = useState(true);
  const [openRating, setOpenRating] = useState(true);
  const [openSize, setOpenSize] = useState(true);
  const [productStyle, setProductStyle] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [selectSortVal, setSelectSortVal] = useState("Name: A To Z");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    catId: [],
    subcatId: [],
    minPrice: "",
    maxPrice: "",
    rating: "",
    page: 1,
    limit: 15,
  });

  const [price, setPrice] = useState([0, 600000]);
  const location = useLocation();

  const handleCheckboxChange = (field, value) => {
    const currentValues = filter[field] || [];
    const updatedValues = currentValues?.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setFilter((prev) => ({
      ...prev,
      [field]: updatedValues,
    }));
    if (field === "catId") {
      setFilter((prev) => ({
        ...prev,
        subcatId: [],
      }));
    }
  };
  useEffect(() => {
    const url = window.location.href;
    const queryParameters = new URLSearchParams(location.search);
    if (url.includes("catId")) {
      const categoryId = queryParameters.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filter.catId = catArr;
      filter.subcatId = [];
      filter.rating = "";
    }
    if (url.includes("subcatId")) {
      const subCategoryId = queryParameters.get("subcatId");
      const subcatArr = [];
      subcatArr.push(subCategoryId);
      filter.subcatId = subcatArr;
      filter.catId = [];
      filter.rating = "";
    }
    filter.page = 1;
    setTimeout(() => {
      filterData();
    }, 200);
  }, [location]);
  const filterData = () => {
    setIsLoading(true);
    postData(API_PATH.PRODUCTS.PRODUCTS_FILTER, filter).then((res) => {
      if (res?.error === false) {
        setProductData(res.data);
        setIsLoading(false);
        setTotalPages(res?.totalPages);
        window.scrollTo(0, 0);
      }
    });
  };
  const handleSortBy = async (e) => {
  const value = e.target.value;
  setSelectSortVal(value);

  let sortBy = "";
  let order = "";

  if (value === "Name: A To Z") {
    sortBy = "name";
    order = "asc";
  } else if (value === "Name: Z To A") {
    sortBy = "name";
    order = "desc";
  } else if (value === "Price: Low To High") {
    sortBy = "price";
    order = "asc";
  } else if (value === "Price: High To Low") {
    sortBy = "price";
    order = "desc";
  }

  const res = await postData(API_PATH.PRODUCTS.PRODUCTS_SORTBY, {
    products:productData,
    sortBy,
    order,
  });

  setProductData(res.products);
};

  useEffect(() => {
    filter.page = page;
    filterData();
  }, [filter, page]);
  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
    }));
  }, [price]);
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchData(API_PATH.PRODUCTS.GET_ALL_PRODUCT).then((res) => {
  //     if (res?.error === false) {
  //       setProductData(res.data);
  //       console.log(res.data);
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  return (
    <div className="container">
      <div className="flex w-full">
        <div className="w-[20%] border border-gray-200 hidden lg:block">
          <div className="p-4">
            <div
              className="flex items-center cursor-pointer  text-gray-700"
              onClick={() => setOpenCategory(!openCategory)}
            >
              <h1 className="font-bold text-lg">Shop by Category</h1>
              {openCategory ? (
                <RiArrowDropUpLine className="text-4xl group-transition-all duration-200" />
              ) : (
                <RiArrowDropDownLine className="text-4xl group-transition-all duration-500" />
              )}
            </div>
            {openCategory && (
              <div className="flex group flex-col gap-2 overflow-auto h-47 py-2 cursor-pointer text-gray-600">
                {categoryData?.map((item) => (
                  <label key={item._id} htmlFor={item._id} className="text-lg">
                    <input
                      type="checkbox"
                      name={item.name}
                      id={item._id}
                      value={item._id}
                      checked={filter?.catId?.includes(item._id)}
                      onChange={() => handleCheckboxChange("catId", item?._id)}
                      className="w-4 h-4 cursor-pointer mr-2"
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* <div className="p-4">
            <div
              className="flex items-center cursor-pointer  text-gray-700"
              onClick={() => setOpenSize(!openSize)}
            >
              <h1 className="font-bold text-lg">Size</h1>
              {openSize ? (
                <RiArrowDropUpLine className="text-4xl group-transition-all duration-200" />
              ) : (
                <RiArrowDropDownLine className="text-4xl group-transition-all duration-500" />
              )}
            </div>
            {openSize && (
              <div className="flex group flex-col gap-2 overflow-auto h-47 py-2 cursor-pointer text-gray-600">
                <label htmlFor="Small" className="text-lg">
                  <input
                    type="checkbox"
                    name="Small"
                    id="Small"
                    className="w-4 h-4 cursor-pointer mr-2"
                  />{" "}
                  Small
                </label>
                <label htmlFor="Medium" className="text-lg">
                  <input
                    type="checkbox"
                    name="Medium"
                    id="Medium"
                    className="w-4 h-4 cursor-pointer mr-2"
                  />{" "}
                  Medium
                </label>
                <label htmlFor="Large" className="text-lg">
                  <input
                    type="checkbox"
                    name="Large"
                    id="Large"
                    className="w-4 h-4 cursor-pointer mr-2"
                  />{" "}
                  Large
                </label>
                <label htmlFor="XL" className="text-lg">
                  <input
                    type="checkbox"
                    name="XL"
                    id="XL"
                    className="w-4 h-4 cursor-pointer mr-2"
                  />{" "}
                  XL
                </label>
                <label htmlFor="XXL" className="text-lg">
                  <input
                    type="checkbox"
                    name="XXL"
                    id="XXL"
                    className="w-4 h-4 cursor-pointer mr-2"
                  />{" "}
                  XXL
                </label>
              </div>
            )}
          </div> */}
          <div className="p-2">
            <SliderRange price={price} setPrice={setPrice} />
          </div>
          <div className="p-4">
            <div
              className="flex items-center cursor-pointer  text-gray-700"
              onClick={() => setOpenRating(!openRating)}
            >
              <h1 className="font-bold text-lg">Filter By Rating</h1>
              {openRating ? (
                <RiArrowDropUpLine className="text-4xl group-transition-all duration-200" />
              ) : (
                <RiArrowDropDownLine className="text-4xl group-transition-all duration-500" />
              )}
            </div>
            {openRating && (
              <div className="flex group flex-col gap-2 overflow-auto h-40 py-2 cursor-pointer text-gray-600">
                <label htmlFor={5} className="text-lg">
                  <input
                    type="checkbox"
                    id={5}
                    value={5}
                    checked={filter?.rating?.includes(5)}
                    onChange={() => handleCheckboxChange("rating", 5)}
                    className="w-4 h-4 cursor-pointer mr-2"
                  />
                  <Rating
                    name="size-small"
                    size="small"
                    defaultValue={5}
                    readOnly
                  />
                </label>
                <label htmlFor={4} className="text-lg">
                  <input
                    type="checkbox"
                    id={4}
                    value={4}
                    checked={filter?.rating?.includes(4)}
                    onChange={() => handleCheckboxChange("rating", 4)}
                    className="w-4 h-4 cursor-pointer mr-2"
                  />
                  <Rating
                    name="size-small"
                    size="small"
                    defaultValue={4}
                    readOnly
                  />
                </label>
                <label htmlFor={3} className="text-lg">
                  <input
                    type="checkbox"
                    id={3}
                    value={3}
                    checked={filter?.rating?.includes(3)}
                    onChange={() => handleCheckboxChange("rating", 3)}
                    className="w-4 h-4 cursor-pointer mr-2"
                  />
                  <Rating
                    name="size-small"
                    size="small"
                    defaultValue={3}
                    readOnly
                  />
                </label>
                <label htmlFor={2} className="text-lg">
                  <input
                    type="checkbox"
                    id={2}
                    value={2}
                    checked={filter?.rating?.includes(2)}
                    onChange={() => handleCheckboxChange("rating", 2)}
                    className="w-4 h-4 cursor-pointer mr-2"
                  />
                  <Rating
                    name="size-small"
                    size="small"
                    defaultValue={2}
                    readOnly
                  />
                </label>
                <label htmlFor={1} className="text-lg">
                  <input
                    type="checkbox"
                    id={1}
                    value={1}
                    checked={filter?.rating?.includes(1)}
                    onChange={() => handleCheckboxChange("rating", 1)}
                    className="w-4 h-4 cursor-pointer mr-2"
                  />
                  <Rating
                    name="size-small"
                    size="small"
                    defaultValue={1}
                    readOnly
                  />
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-[80%]">
          <div className="flex md:justify-between flex-wrap gap-2 items-center px-4 py-2">
            <div className="flex items-center gap-2">
              <div
                className={` w-7 h-7 flex items-center justify-center ${
                  productStyle === "list"
                    ? "bg-primary rounded-full text-white cursor-pointer"
                    : ""
                }`}
                onClick={() => setProductStyle("list")}
              >
                <MdOutlineMenu className="text-xl cursor-pointer" />
              </div>
              <div
                className={` w-7 h-7 flex items-center justify-center ${
                  productStyle === "grid"
                    ? "bg-primary rounded-full text-white cursor-pointer"
                    : ""
                }`}
                onClick={() => setProductStyle("grid")}
              >
                <IoGridOutline className="text-xl cursor-pointer" />
              </div>
              <p className="tracking-wider text-md text-gray-700 hidden md:block">
                There are {productData.length} products
              </p>
            </div>
            <div>
              <label htmlFor="sort">
                Sorted By:
                <select
                  name="sort"
                  id="sort"
                  value={selectSortVal}
                  onChange={handleSortBy}
                  className="outline-none border text-gray-700 ml-2 w-20 md:w-auto"
                >
                  <option value={"Name: A To Z"}>Name: A To Z</option>
                  <option value={"Name: Z To A"}>Name: Z To A</option>
                  <option value={"Price: Low To High"}>
                    Price: Low to High
                  </option>
                  <option value={"Price: High To Low"}>
                    Price: High To Low
                  </option>
                </select>
              </label>
            </div>
          </div>
          {productStyle === "grid" && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 gap-4 mx-2 py-6">
                {productData.map((item) => (
                  <ProductCard
                    key={item._id}
                    id={item._id}
                    images={item.images}
                    name={item.name}
                    brand={item.brand}
                    price={item.price}
                    original={item.oldprice}
                    discount={item.discount}
                    rating={item.rating}
                    item={item}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center">
                <Pagination
                  color="secondary"
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              </div>
            </div>
          )}
          {productStyle === "list" && (
            <div>
              <div className="flex flex-col  gap-4 mx-2 py-6">
                {productData.map((item, index) => (
                  <ListProductCard
                    key={index}
                    id={item.id}
                    images={item.images}
                    name={item.name}
                    brand={item.brand}
                    price={item.price}
                    original={item.original}
                    discount={item.discount}
                    rating={item.rating}
                    item={item}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center">
                <Pagination
                  color="secondary"
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
