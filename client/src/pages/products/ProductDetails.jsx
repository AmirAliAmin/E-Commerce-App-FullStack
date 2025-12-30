import React, { useEffect, useState } from "react";
import ProductZoom from "../../components/productZoom/ProductZoom";
import { useParams } from "react-router-dom";
import { products } from "../../assets/assets";
import { TiStar } from "react-icons/ti";
import { GoStar } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { GoGitCompare } from "react-icons/go";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import Rating from "@mui/material/Rating";

function ProductDetails() {
  const { id } = useParams();
  const [productData, setProductData] = useState([]);
  const [image, setImage] = useState([]);
  const [currState, setCurrState] = useState("Description");
  const [sizes, setSizes] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async () => {
    const productId = parseInt(id);
    products.map((item) => {
      if (item.id === productId) {
        setProductData(item);

        return null;
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_PATH.PRODUCTS.GET_PRODUCT_BY_ID(id)).then((res) => {
      if (res?.error === false) {
        setProductData(res.product);
        setImage(res.product.images[0]);
        setSizes(res.product.size[0])
        setIsLoading(false);
      }
    });
  }, []);

  return productData ? (
    <section className="pt-5 transition-opacity ease-in duration-500 opacity-100 mx-10 sm:mx-2">
      <div className="container flex gap-12 sm:gap-12 flex-col lg:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-10 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll no-scroll justify-start sm:justify-normal sm:w-[18.7%] w-full">
            {productData?.images?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 border shrink-0 cursor-pointer ${
                  item === image
                    ? "  border-primary"
                    : "border-transparent opacity-50"
                }`}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[70%]">
            <ProductZoom image={image} />
          </div>
        </div>
        <div className="flex-1 lg:py-3 space-y-2">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <h5 className="text-gray-500">
              Brands:
              <span className="text-black ml-2 font-medium">
                {productData.brand}
              </span>
            </h5>
            <div className="flex items-center">
              <Rating name="rating" size="small" value={Number(productData?.rating) || 0} readOnly />
            </div>
            <p>Review(19)</p>
          </div>
          <div className="flex flex-wrap text-lg font-semibold items-center gap-2 lg:gap-6 mt-2">
            <h1 className="line-through text-gray-400">
              ₹{productData.oldprice}
            </h1>
            <h1 className="text-primary">₹{productData.price}</h1>
            <p className="font-light text-sm">
              Available In Stock:{" "}
              <span className="text-lg font-bold text-green-700">
                {productData.countInStock} Items
              </span>
            </p>
          </div>
          <p className="py-3 font-light lg:text-lg">
            {productData.description}
          </p>
          {
            productData?.size?.length !== 0 &&
          <div className="flex gap-2">
          <div className="uppercase ">Size:</div>
          { 
            productData?.size?.map((size,index)=>(
              <div key={index} className={`text-center border w-20 cursor-pointer ${sizes === size ? "text-primary":"text-black"}`} onClick={()=>setSizes(size)}>
                {size}
              </div>
            ))
          }
          </div>
          }
          <p className="py-2">Free Shipping (Est. Delivery Time 2-3 Days)</p>
          <div className="space-x-3 flex">
            <input
              type="number"
              className="border w-15 pl-2 outline-none"
              placeholder="1"
            />
            <button className="bg-primary px-2 py-1 rounded text-white flex items-center">
              <IoCartOutline /> ADD TO CART
            </button>
          </div>
          <div className="flex gap-10 mt-6 text-lg">
            <p className="flex items-center link gap-2">
              <FaRegHeart /> Add to Wishlist
            </p>
            <p className="flex items-center link gap-2">
              <GoGitCompare /> Add to Compare
            </p>
          </div>
        </div>
      </div>
      <div className="container py-7 border-t border-gray-300">
        <div>
          <ul className="flex items-center gap-5 text-xl">
            <li
              className={`cursor-pointer link ${
                currState === "Description" ? "text-primary" : ""
              }`}
              onClick={() => setCurrState("Description")}
            >
              Description
            </li>
            <li
              className={`cursor-pointer link ${
                currState === "Review" ? "text-primary" : ""
              }`}
              onClick={() => setCurrState("Review")}
            >
              Reviews (1)
            </li>
          </ul>
          {currState === "Description" && (
            <div className="p-4 m-4 border border-gray-300 rounded-lg shadow-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </div>
          )}
          {currState === "Review" && (
            <div className="p-4 m-4  shadow-lg">
              <div>
                <p className="text-xl">Customer questions & answers</p>
                <div className=" h-56 no-scroll overflow-auto">
                  <div className="flex flex-wrap justify-between px-5 py-2 my-3 items-center border border-gray-300 rounded-lg w-full">
                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-5 w-full lg:w-[60%]">
                      <div className="w-15 h-15 rounded-full bg-gray-600"></div>
                      <div className="w-full lg:w-[90%] ">
                        <h1 className=" font-bold">Samyo Ghosh</h1>
                        <p className="text-gray-600 font-medium">2025-05-06</p>
                        <p className="text-xs w-full  overflow-auto ">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Cupiditate ipsa maxime, rerum praesentium
                          molesti.
                        </p>
                      </div>
                    </div>
                    <Rating name="rating" size="small" value={productData?.rating} readOnly />
                  </div>
                  <div className="flex flex-wrap justify-between px-5 py-2 my-3 items-center border border-gray-300 rounded-lg w-full">
                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 w-full lg:w-[60%]">
                      <div className="w-15 h-15 rounded-full bg-gray-600"></div>
                      <div className="w-full  lg:w-[90%] ">
                        <h1 className=" font-bold">Samyo Ghosh</h1>
                        <p className="text-gray-600 font-medium">2025-05-06</p>
                        <p className="text-xs w-full  overflow-auto ">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Cupiditate ipsa maxime, rerum praesentium
                          molesti.
                        </p>
                      </div>
                    </div>
                    <Rating name="rating" size="small" value={productData?.rating} readOnly />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="py-3 text-xl font-bold">Add a review</h1>
                <div className="relative">
                  <textarea
                    name=""
                    id=""
                    className="w-full border border-gray-500 outline-none p-2"
                    rows={5}
                  ></textarea>
                  <div className="absolute -top-2 left-3 bg-white px-2 text-primary text-xs">
                    write a Review
                  </div>
                </div>
                <p><Rating name="rating" size="small" value={productData?.rating} /></p>
                <button className="uppercase bg-primary px-2 py-2 rounded-lg text-white">
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  ) : (
    <div>
      <div className="opacity-0"></div>
    </div>
  );
}

export default ProductDetails;
