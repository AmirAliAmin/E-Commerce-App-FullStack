import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { RiProductHuntLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(null);
  return (
    <div className=' w-[17%] bg-white fixed inset-0 top-0 left-0 border-r border-gray-200 shadow-lg p-2'>
      <div className='py-2 w-full'>
        <Link to={'/'} className='flex gap-3 items-center'> <img src='https://plus.unsplash.com/premium_photo-1668051040456-24c63abd95b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZSUyMGxvZ298ZW58MHx8MHx8fDA%3D' className='w-15 h-15 rounded-full'/> 
        <div>
          <p className='font-bold text-xl text-primary'>Classy Shop</p>
          <p className='tracking-widest text-xs uppercase font-light'>Big Mega Shop</p>
        </div> 
        </Link>
      </div>
      <ul className='mt-4'>
        <Link to={'/'}>
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea]'><RxDashboard className='text-[16px]'/>Dashboard</li>
        </Link>
        
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea]' onClick={()=>setMenuOpen(menuOpen==="Home" ? null:"Home")}><FaRegImage className='text-[16px]'/>Home Slides <FaAngleDown className={`ml-auto transition-all ${menuOpen === "Home" ? "rotate-180":""}`}/></li>
        {
          menuOpen === "Home" && (
        <ul className='p-1'>
          <Link to={'/home'}>
          <li className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700'>Add Home Banner Slide</li>
          </Link>
          <Link to={'/slide'}>
          <li className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700'>Add Slide List</li>
          </Link>
        </ul>

          )
        }
        <Link to={'/user'}>
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea]'><LuUsers className='text-[16px]'/>Users</li>
        </Link>
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea]' onClick={()=>setMenuOpen(menuOpen==="Product" ? null:"Product")}><RiProductHuntLine className='text-[16px]'/>Products <FaAngleDown className={`ml-auto transition-all ${menuOpen === "Product" ? "rotate-180":""}`}/></li>
        {
          menuOpen === "Product" && (
        <ul className='p-1'>
          <Link to={'/product'}>
          <li className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700'>Product List</li>
        </Link>
        <Link to={'/product/add'}>
          <li className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700'>Product Upload</li>
        </Link>
        </ul>

          )
        }
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea]' onClick={()=>setMenuOpen(menuOpen==="Category" ? null:"Category")}><BiCategoryAlt className='text-[16px]'/>Category <FaAngleDown className={`ml-auto transition-all ${menuOpen === "Category" ? "rotate-180":""}`}/></li>
        {
          menuOpen === "Category" && (
        <ul className='p-1'>
          <Link to={'/category'}>
          <li className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700'>Category List</li>
        </Link>
        <Link to={'/category/add'}>
          <li className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700'>Add A Category</li>
        </Link>
        <Link to={'/category/subcategory/list'}>
          <li className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700'>Sub Category List</li>
        </Link>
        <Link to={'/category/subcategory/add'}>
          <li className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700'>Add A Sub Category</li>
        </Link>
        </ul>
          )
        }
        <Link to={'/order'}>
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea]'><IoBagHandleOutline className='text-[16px]'/>Orders</li>
        </Link>
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea]'><MdLogout className='text-[16px]'/>Logout</li>
      </ul>
    </div>
  )
}

export default Sidebar