import React, { useContext, useState } from 'react'
import { NavLink,Link } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { RiProductHuntLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { AdminContext } from '../context/AdminContext';

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(null);
   const {sidebarOpen,setSidebarOpen} = useContext(AdminContext)
  return sidebarOpen && (
    <div className='w-[60%] md:w-[30%] lg:w-[17%] bg-white fixed z-10 inset-0 top-0 left-0 border-r border-gray-200 shadow-lg p-2 transition-all'>
      <div className='w-full flex justify-end lg:hidden' onClick={()=>setSidebarOpen(!sidebarOpen)}>X</div>
      <div className='md:py-2 w-full'>
        <Link  to={'/'} className='flex gap-3 items-center'> <img src='https://plus.unsplash.com/premium_photo-1668051040456-24c63abd95b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZSUyMGxvZ298ZW58MHx8MHx8fDA%3D' className='w-15 h-15 rounded-full hidden md:block'/> 
        <div>
          <p className='font-bold text-xl text-primary'>Classy Shop</p>
          <p className='tracking-widest text-xs uppercase font-light'>Big Mega Shop</p>
        </div> 
        </Link >
      </div>
      <ul className='md:mt-4'>
        
        <NavLink  to={'/'} className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] nav-link'><RxDashboard className='text-[16px]'/>Dashboard</NavLink>
        
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] nav-link' onClick={()=>setMenuOpen(menuOpen==="Home" ? null:"Home")}><FaRegImage className='text-[16px]'/>Home Slides <FaAngleDown className={`ml-auto transition-all ${menuOpen === "Home" ? "rotate-180":""}`}/></li>
        {
          menuOpen === "Home" && (
        <ul className='p-1'>
          <NavLink  to={'/home'} className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700 nav-link'>Add Home Banner Slide
          </NavLink >
          
          <NavLink  to={'/slide'} className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700 nav-link'>Add Slide List
          </NavLink >
        </ul>

          )
        }
        <NavLink  to={'/user'} className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] nav-link'><LuUsers className='text-[16px]'/>Users
        </NavLink >
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] nav-link' onClick={()=>setMenuOpen(menuOpen==="Product" ? null:"Product")}><RiProductHuntLine className='text-[16px]'/>Products <FaAngleDown className={`ml-auto transition-all ${menuOpen === "Product" ? "rotate-180":""}`}/></li>
        {
          menuOpen === "Product" && (
        <ul className='p-1'>
          
          <NavLink  to={'/product'} className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700 nav-link'>Product List
        </NavLink >
      
          <NavLink  to={'/products/add'} className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700 nav-link'>Product Upload
        </NavLink >
        </ul>

          )
        }
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] nav-link' onClick={()=>setMenuOpen(menuOpen==="Category" ? null:"Category")}><BiCategoryAlt className='text-[16px]'/>Category <FaAngleDown className={`ml-auto transition-all ${menuOpen === "Category" ? "rotate-180":""}`}/></li>
        {
          menuOpen === "Category" && (
        <ul className='p-1'>
          
          <NavLink  to={'/category'} className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700 nav-link'>Category List
        </NavLink >
          <NavLink  to={'/category/add'} className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700 nav-link'>Add A Category
        </NavLink >
          <NavLink  to={'/category/subcategory/list'} className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700 nav-link'>Sub Category List
        </NavLink >
        <NavLink  to={'/category/subcategory/add'}>
          <li className='w-full py-1 pl-7 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] text-gray-700 nav-link'>Add A Sub Category</li>
        </NavLink >
        </ul>
          )
        }
        
        <NavLink  to={'/order'} className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] nav-link'><IoBagHandleOutline className='text-[16px]'/>Orders
        </NavLink >
        <li className='w-full py-3 px-2 font-medium flex items-center gap-3 justify-start text-[14px] cursor-pointer hover:bg-[#eaeaea] nav-link'><MdLogout className='text-[16px]'/>Logout</li>
      </ul>
    </div>
  )
}

export default Sidebar