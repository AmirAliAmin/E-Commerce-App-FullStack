import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { AppContext } from "../../context/AppContext";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import { Link, useNavigate } from "react-router-dom";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchData, setSearchData } = useContext(AppContext);
  const navigate = useNavigate()

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value !== "") {
      fetchData(
        `${API_PATH.PRODUCTS.PRODUCTS_SEARCH}?q=${e.target.value}`
      ).then((res) => {
        if (res.success === true) {
          setSearchData(res.products);
        }else{
          setSearchData([])
        }
      });
    } else {
      setSearchData([]);
    }
  };
  const productDetail = (id)=>{
    navigate(`/product/${id}`),
    setSearchData([]),
    setSearchQuery('')
  }
  return (
    <div className="searchBox w-full h-[50px] bg-[#e5e5e5] rounded-md relative p-2">
      <input
        type="text"
        value={searchQuery}
        onChange={onChangeInput}
        placeholder="Search for products..."
        className="w-full h-9 focus:outline-none bg-transparent text-[#6a6868] p-2 text-[17px] placeholder:text-[17px] "
      />
      <button className="absolute text-[20px] font-bold  top-[5px] right-[5px] z-50  w-[37px] min-w-[37px] h-[37px] cursor-pointer rounded-full hover:bg-gray-300 flex justify-center items-center">
        <IoSearch className="text-[#6a6868]" />
      </button>
      {searchData.length !== 0 && (
        <div className="w-full bg-white absolute! right-0 left-0 py-2 z-100 h-100 overflow-y-scroll!">
          {searchData.map((item) => (
            <div key={item._id} className="flex gap-2 p-3 cursor-pointer" onClick={()=>productDetail(item._id)}>
              <div className="w-[10%]">
                <img src={item.images[0]} alt="" className="" />
              </div>
              <div>
                <h1>{item.name}</h1>
                <h2>{item.price}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
