import React, { useContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import ProductCard from "./products/ProductCard";
import { fetchData } from "../utils/api";
import { API_PATH } from "../utils/apiPath";
import { AppContext } from "../context/AppContext";

function ProuductSection() {
    const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const {categoryData} = useContext(AppContext)
  const jewelleryFilter = productData.filter(
    (item) => item.catName ===  "Jewellery"
  );
  const groceriesFilter = productData.filter(
    (item) => item.catName === "Groceries"
  );

  

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
    <div className="container">
      <div className="flex flex-wrap justify-between">
        <div className="lg:w-[50%] mb-4 lg:mb-0">
          <h1 className="text-2xl font-medium">Jewellery</h1>
        </div>
      </div>
      <div className="flex w-full items-center gap-4 overflow-auto no-scroll py-7">
        {jewelleryFilter.length > 0 ? (
          jewelleryFilter.map((item, index) => (
            <div
              key={item._id}
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
              />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-8">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-between mt-9">
        <div className="lg:w-[50%] mb-4 lg:mb-0">
          <h1 className="text-2xl font-medium">Groceries</h1>
        </div>
      </div>
      <div className="flex w-full items-center gap-4 overflow-auto no-scroll py-7">
        {groceriesFilter.length > 0 ? (
          groceriesFilter.map((item, index) => (
            <div
              key={item._id}
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
              />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-8">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProuductSection;
