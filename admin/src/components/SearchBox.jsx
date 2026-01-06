import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { fetchData } from "../utils/api";
import { API_PATH } from "../utils/apiPath";
import { AdminContext } from "../context/AdminContext";

function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setProductData } = useContext(AdminContext);

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value === "") {
      fetchData(API_PATH.PRODUCTS.GET_ALL_PRODUCT).then((res) => {
        if (res?.error === false) {
          setProductData(res.data);
        }
      });
    } else {
      fetchData(
        `${API_PATH.PRODUCTS.PRODUCTS_SEARCH}?q=${e.target.value}`
      ).then((res) => {
        if (res?.error === false) {
          setProductData(res?.products);
        }
      });
    }
  };
  return (
    <div className="w-full h-auto border border-gray-400 rounded-lg  relative flex items-center gap-1 bg-[#f1f1f1] overflow-hidden">
      <CiSearch className="text-[25px] pl-2 pointer-events-none text-gray-600" />
      <input
        type="text"
        className="w-full h-10 outline-none pl-2  rounded-lg"
        placeholder="Search here..."
        value={searchQuery}
        onChange={onChangeInput}
      />
    </div>
  );
}

export default SearchBox;