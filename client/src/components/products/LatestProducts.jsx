import React, { useEffect, useState } from "react";
import { products } from "../../assets/assets";
import ProductCard from "./ProductCard";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";

function LatestProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_PATH.PRODUCTS.GET_ALL_PRODUCT).then((res) => {
      if (res?.error === false) {
        setProductData(res.data);
        // console.log(res.data);
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <div className="container py-7">
      <div className="flex flex-wrap justify-between">
        <div className="lg:w-[50%] mb-4 lg:mb-0">
          <h1 className="text-2xl font-medium">Latest Products</h1>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex w-full items-center gap-4 overflow-auto no-scroll py-7">
        {productData.reverse().slice(0, 20).map((item, index) => (
          <div
            key={index}
            className="flex shrink-0 w-46 min-w-46 h-90 min-h-90"
          >
            <ProductCard
              id={item._id}
              name={item.name}
              images={item.images}
              brand={item.brand}
              original={item.original}
              price={item.price}
              discount={item.discount}
              rating={item.rating}
              item={item}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestProducts;
