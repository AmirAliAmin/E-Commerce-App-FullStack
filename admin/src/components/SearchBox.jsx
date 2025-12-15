import React from 'react'
import { CiSearch } from "react-icons/ci";

function SearchBox() {
  return (
    <div className='w-full h-auto border border-gray-400 rounded-lg  relative flex items-center gap-1 bg-[#f1f1f1] overflow-hidden'>
        <CiSearch className='text-[25px] pl-2 pointer-events-none text-gray-600'/>
        <input type="text" className='w-full h-10 outline-none pl-2  rounded-lg' placeholder='Search here...' />
    </div>
  )
}

export default SearchBox