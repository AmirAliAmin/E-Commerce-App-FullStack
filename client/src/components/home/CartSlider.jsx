import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function CartSlider() {
  const {categoryData} = useContext(AppContext)
  const navigate = useNavigate("")
  return (
    <div className="container py-7">
      <div className="flex items-center justify-between gap-3 overflow-scroll no-scroll">
        {categoryData?.map((item, index) => (
          <div
            className="flex border flex-col border-gray-200 w-[90px] min-w-[90px] md:w-[130px] md:min-w-[130px] h-[120px] justify-center items-center "
            key={item._id}
            onClick={()=>navigate(`/products?catId=${item._id}`)}
          >
            <img
              src={item.images}
              alt=""
              className="w-[50%] hover:transition-all hover:duration-500 hover:scale-120 cursor-pointer"
            />
            <h1 className="text-xl mt-2">{item.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartSlider;
