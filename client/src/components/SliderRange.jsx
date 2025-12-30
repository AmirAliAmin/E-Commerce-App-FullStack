import React from 'react'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

function SliderRange({price,setPrice}) {
  return (
    <div>
        <div className='flex items-center cursor-pointer  text-gray-700 pb-6'>
            <h1 className='font-bold text-lg'>Filter By Price</h1>
        </div>
        <RangeSlider value={price} onInput={setPrice} min={100} max={600000} step={5}/>
        <div className='flex pt-5 pb-2 text-sm font-light'>
            <span>
                From: <strong>RS: {price[0]}</strong>
            </span>
            <span className='ml-auto'>
                To: <strong>RS: {price[1]}</strong>
            </span>
        </div>

    </div>
  )
}

export default SliderRange