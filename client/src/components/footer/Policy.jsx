import React from 'react'
import { CiDeliveryTruck } from "react-icons/ci";
import { PiKeyReturnThin } from "react-icons/pi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { CiGift } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { IoWalletOutline } from "react-icons/io5";

function Policy() {
  return (
    <div className='flex items-center flex-wrap justify-center gap-5 py-6'>
        <div className='border border-gray-200 p-5 text-center space-y-2 group'>
            <CiDeliveryTruck className='translate-x-15 transition-all duration-500 group-hover:-translate-y-2 text-4xl font-bold group-hover:text-primary ' />
            <h1 className='font-medium text-lg'>Free Shipping</h1>
            <p className='text-gray-500 text-sm'>For all Orders Over $100</p>
        </div>
        <div className='border border-gray-200 p-5 text-center space-y-2 group'>
             <PiKeyReturnThin  className='translate-x-15 transition-all duration-500 group-hover:-translate-y-2 text-4xl font-bold group-hover:text-primary ' />
            <h1 className='font-medium text-lg'>30 Days Returns</h1>
            <p className='text-gray-500 text-sm'>For all Orders Over $100</p>
            
        </div>
        <div className='border border-gray-200 p-5 text-center space-y-2 group'>
             <IoWalletOutline className='translate-x-15 transition-all duration-500 group-hover:-translate-y-2 text-4xl font-bold group-hover:text-primary ' />
            <h1 className='font-medium text-lg'>Secured Payment</h1>
            <p className='text-gray-500 text-sm'>For all Orders Over $100</p>
            
        </div>
        <div className='border border-gray-200 p-5 text-center space-y-2 group'>
             <CiGift className='translate-x-15 transition-all duration-500 group-hover:-translate-y-2 text-4xl font-bold group-hover:text-primary ' />
            <h1 className='font-medium text-lg'>Special Gifts</h1>
            <p className='text-gray-500 text-sm'>For all Orders Over $100</p>
            
        </div>
        <div className='border border-gray-200 p-5 text-center space-y-2 group'>
             <BiSupport className='translate-x-15 transition-all duration-500 group-hover:-translate-y-2 text-4xl font-bold group-hover:text-primary ' />
            <h1 className='font-medium text-lg'>Support 24/7</h1>
            <p className='text-gray-500 text-sm'>For all Orders Over $100</p>
           
        </div>
    </div>
  )
}

export default Policy