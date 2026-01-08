import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TiStar } from "react-icons/ti";
import { GoStar } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { GoGitCompare } from "react-icons/go";
import ProductZoom from "../../components/ProductZoom";
import { AdminContext } from "../../context/AdminContext";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import Rating from "@mui/material/Rating";

function ProductDetails() {
  const { id } = useParams();
  const [ productData, setProductData ] = useState(null)
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!id) return;

    fetchData(API_PATH.PRODUCTS.GET_PRODUCT_BY_ID(id)).then((res) => {
      if (res?.error === false) {
        setProductData(res?.product);
        console.log(res);
        setImage(res?.product.images?.[0] ?? null);
      }
    });
  }, [id]);

  return productData ? (
    <section className="pt-5 transition-opacity ease-in duration-500 opacity-100 mx-10 sm:mx-2">
      <div className="container flex gap-12 sm:gap-12 flex-col lg:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-10 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll no-scroll justify-start sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images?.map((item, index) => (
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
          <div className="w-full h-full sm:w-[80%] ">
            <ProductZoom image={image} />
          </div>
        </div>
        <div className="flex-1 lg:py-3 space-y-2">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <h5 className="text-gray-500">
              Brands:{" "}
              <span className="text-black ml-2 font-medium">
                {productData.brand}
              </span>
            </h5>
            <div className="flex items-center">
              <TiStar className="text-[#FAAF00]" />
              <TiStar className="text-[#FAAF00]" />
              <TiStar className="text-[#FAAF00]" />
              <TiStar className="text-[#FAAF00]" />
              <GoStar className="text-gray-400 text-xs" />
            </div>
            <p>Review(19)</p>
          </div>
          <div className="flex flex-wrap text-lg font-semibold items-center gap-2 lg:gap-6 mt-2">
            <h1 className="line-through text-gray-400">
              ₹{productData.original}
            </h1>
            <h1 className="text-primary">₹{productData.price}</h1>
            <p className="font-light text-sm">
              Available In Stock:{" "}
              <span className="text-lg font-bold text-green-700">
                -31 Items
              </span>
            </p>
          </div>
          <p className="py-3 font-light lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            minima consequuntur eveniet atque nulla, voluptatem nobis autem
            fuga, rem praesentium quasi itaque porro. Repellendus, tempora
            eveniet aperiam eius numquam et.
          </p>
        </div>
      </div>
      <div className="container py-7 border-t border-gray-300">
        <div>
          <ul className="flex items-center gap-5 text-xl">
            <li className={`cursor-pointer link text-primary`}>Reviews (1)</li>
          </ul>

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
                        elit. Cupiditate ipsa maxime, rerum praesentium molesti.
                      </p>
                    </div>
                  </div>
                  <Rating
                    name="half-rating"
                    defaultValue={1}
                    precision={0.5}
                    
                  />
                </div>
                <div className="flex flex-wrap justify-between px-5 py-2 my-3 items-center border border-gray-300 rounded-lg w-full">
                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 w-full lg:w-[60%]">
                    <div className="w-15 h-15 rounded-full bg-gray-600"></div>
                    <div className="w-full  lg:w-[90%] ">
                      <h1 className=" font-bold">Samyo Ghosh</h1>
                      <p className="text-gray-600 font-medium">2025-05-06</p>
                      <p className="text-xs w-full  overflow-auto ">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Cupiditate ipsa maxime, rerum praesentium molesti.
                      </p>
                    </div>
                  </div>
                  <Rating
                  name="half-rating"
                  defaultValue={1}
                  precision={0.5}
                />
                </div>
              </div>
            </div>
            <div></div>
          </div>
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
