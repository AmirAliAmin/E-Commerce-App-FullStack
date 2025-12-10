import React, { useState } from 'react'
import { RiMenu2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoRocketSharp } from "react-icons/io5";

function Navbar({setBoxOpen, boxOpen}) {
   
  return (
    <nav className='py-2 border-b border-gray-200 shadow-lg relative'>
        <div className='container flex items-center justify-between gap-2 xl:gap-5 '>
            <div className='col_1 hidden lg:block lg:w-[30%] xl:w-[20%] '>
                <button className='px-5 py-2 flex items-center gap-1.5 hover:gap-2.5 hover:bg-gray-400 cursor-pointer hover:text-white hover:transition-all duration-700 rounded-lg text-gray-700' onClick={()=>setBoxOpen(!boxOpen)}>
                    <RiMenu2Line className='text-xl'/> Shop by Category <FaAngleDown className='text-lg' />
                </button>
            </div>
          
            <div className='col_2 lg:[70%]  xl:w-[60%] overflow-x-auto overflow-y-scroll lg:overflow-visible no-scroll'>
                <ul className='flex items-center gap-5 text-gray-700 '>
                    <li className='list-none'>
                        <Link to={"/"} className='link text-[16px] font-medium'>Home</Link>
                    </li>
                    <li className='list-none relative group'>
                        <Link to={'/products'} className='link text-[16px] font-medium py-2 block'>Fashion</Link>
                        <div className='absolute top-full left-0 hidden group-hover:block bg-white w-48 pt-2 z-500 shadow-lg rounded-lg'>
                            <ul className='py-2'>
                                <li className='px-4 py-2 text-gray-800  border-b border-gray-100 link'>Men</li>
                                <li className='px-4 py-2  text-gray-800 cursor-pointer border-b border-gray-100 link'>Women</li>
                                <li className='px-4 py-2  text-gray-800 link'>Girls</li>
                            </ul>
                        </div>
                    </li>
                    <li className='list-none relative group'>
                        <Link to={'/products'} className='link text-[16px] font-medium py-2 block'>Electronics</Link>
                        <div className='absolute top-full left-0 hidden group-hover:block bg-white w-48 pt-2 z-50 shadow-lg rounded-lg '>
                            <ul className='py-2'>
                                <li className='px-4 py-2  text-gray-800  border-b border-gray-100 link'>Smart Watch</li>
                                <li className='px-4 py-2  text-gray-800 border-b border-gray-100 link'>Laptops</li>
                                <li className='px-4 py-2  text-gray-800 link'>Mobiles</li>
                            </ul>
                        </div>
                    </li>
                    <li className='list-none relative group'>
                        <Link to={'/products'} className='link text-[16px] font-medium py-2 block'>Bags</Link>
                        <div className='absolute top-full left-0 hidden group-hover:block bg-white w-48 pt-2 z-50 shadow-lg rounded-lg'>
                            <ul className='py-2'>
                                <li className='px-4 py-2  text-gray-800 border-b border-gray-100 link'>Men Bags</li>
                                <li className='px-4 py-2  text-gray-800 border-b border-gray-100 link'>Women Bags</li>
                                <li className='px-4 py-2  text-gray-800 link'>Mango</li>
                            </ul>
                        </div>
                    </li>
                    <li className='list-none relative group'>
                        <Link to={'/products'} className='link text-[16px] font-medium py-2 block'>Footwear</Link>
                        <div className='absolute top-full left-0 hidden group-hover:block bg-white w-48 pt-2 z-10 shadow-lg rounded-lg'>
                            <ul className='py-2'>
                                <li className='px-4 py-2  text-gray-800 border-b border-gray-100 link'>Men Footwear</li>
                                <li className='px-4 py-2  text-gray-800 link'>Women Footwear</li>
                            </ul>
                        </div>
                    </li>
                    <li className='list-none'>
                        <Link to={'/products'} className='link text-[16px] font-medium'>Groceries</Link>
                    </li>
                    <li className='list-none'>
                        <Link to={'/products'} className='link text-[16px] font-medium'>Beauty</Link>
                    </li>
                    <li className='list-none'>
                        <Link to={'/products'} className='link text-[16px] font-medium'>Wellness</Link>
                    </li>
                    <li className='list-none'>
                        <Link to={'/products'} className='link text-[16px] font-medium'>Jewllery</Link>
                    </li>
                </ul>
            </div>
            <div className='col_3 text-gray-700 hidden xl:block '>
                <p className='text-[14px] flex gap-1 items-center'><IoRocketSharp /> Free International Delivery</p>
            </div>
        </div>
    </nav>
  )
}

export default Navbar