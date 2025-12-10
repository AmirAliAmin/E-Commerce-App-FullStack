import React from 'react'
import { IoSearch } from "react-icons/io5";

function Search() {
  return (
    <div className='searchBox w-full h-[50px] bg-[#e5e5e5] rounded-md relative p-2'>
        <input type="text" placeholder='Search for products...' className='w-full h-9 focus:outline-none bg-transparent text-[#6a6868] p-2 text-[17px] placeholder:text-[17px] ' />
        <button className='absolute text-[20px] font-bold  top-[5px] right-[5px] z-50  w-[37px] min-w-[37px] h-[37px] cursor-pointer rounded-full hover:bg-gray-300 flex justify-center items-center'><IoSearch className='text-[#6a6868]' /></button>
    </div>
  )
}

export default Search