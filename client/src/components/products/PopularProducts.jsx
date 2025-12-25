import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../../assets/assets";
import ProductCard from "./ProductCard";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";

function PopularProducts() {
  const { categoryData } = useContext(AppContext);

  const [openMenu, setOpenMenu] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const menuRefs = useRef({});

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_PATH.PRODUCTS.GET_ALL_PRODUCT).then((res) => {
      if (res?.error === false) {
        setAllProducts(res.data);
        setFilteredProducts(res.data);
        setIsLoading(false);
      }
    });
  }, []);

  const updateIndicatorPosition = (categoryName) => {
    const activeElement = menuRefs.current[categoryName];
    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
        transition: "all 0.3s ease-in-out",
      });
    }
  };

  const filterProductsByCategory = (categoryName) => {
    if (!categoryName) return;

    const filtered = allProducts.filter(
      (product) => product.catName === categoryName
    );

    setFilteredProducts(filtered);
  };
  const handleMenuClick = (categoryName) => {
    setOpenMenu(categoryName);
    updateIndicatorPosition(categoryName);
    filterProductsByCategory(categoryName);
  };

  useEffect(() => {
    if (categoryData?.length > 0) {
      const defaultCategory = categoryData[0].name;
      setOpenMenu(defaultCategory);
      updateIndicatorPosition(defaultCategory);
      filterProductsByCategory(defaultCategory);
    }
  }, [categoryData, allProducts]);

  return (
    <div className="container py-7">
      <div className="flex flex-wrap justify-between">
        <div className="lg:w-[50%] mb-4 lg:mb-0">
          <h1 className="text-2xl font-medium">Popular Products</h1>
          <p className="text-sm tracking-wider text-gray-700">
            Do not miss the current offers until the end of March.
          </p>
        </div>
        <div className="lg:w-[50%] overflow-auto no-scroll relative">
          <ul className="flex items-center justify-between gap-6 md:gap-10 uppercase relative">
            <div
              className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
              style={indicatorStyle}
            />

            {categoryData?.map((item) => (
              <li
                key={item._id}
                ref={(el) => (menuRefs.current[item.name] = el)}
                onClick={() => handleMenuClick(item.name)}
                className="shrink-0"
              >
                <Link
                  className={`link text-[14px] md:text-[16px] py-2 block transition-all duration-200 cursor-pointer ${
                    openMenu === item.name
                      ? "text-primary font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex w-full items-center gap-4 overflow-auto no-scroll py-7">
        {isLoading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              key={item._id}
              className="flex shrink-0 w-46 min-w-46 h-90 min-h-90"
            >
              <ProductCard
                id={item._id}
                name={item.name}
                images={item.images}
                brand={item.brand}
                price={item.price}
                discount={item.discount}
                original={item.oldprice}
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

export default PopularProducts;
