import React from "react";
import { cartSlider } from "../../assets/assets";

function CartSlider() {
  return (
    <div className="container py-7">
      <div className="flex items-center justify-between gap-3 overflow-scroll no-scroll">
        {cartSlider.map((item, index) => (
          <div
            className="flex border flex-col border-gray-200 w-[90px] min-w-[90px] md:w-[130px] md:min-w-[130px] h-[120px] justify-center items-center "
            key={index}
          >
            <img
              src={item.image}
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
