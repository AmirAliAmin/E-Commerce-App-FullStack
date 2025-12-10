import React from 'react'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

function SliderRange() {
  return (
    <div>
        <div className='flex items-center cursor-pointer  text-gray-700 pb-6'>
            <h1 className='font-bold text-lg'>Filter By Price</h1>
        </div>
        <RangeSlider/>
        <div className='flex pt-5 pb-2 text-sm font-light'>
            <span>
                From: <strong>RS: 100</strong>
            </span>
            <span className='ml-auto'>
                To: <strong>RS: 10000</strong>
            </span>
        </div>

    </div>
  )
}

export default SliderRange