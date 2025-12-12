import React from 'react'
import { IoIosGift } from "react-icons/io";
import { IoStatsChartSharp } from "react-icons/io5";

function DashboardBox({title,price,icon,color}) {
  return (
    <div className='shadow-lg w-80 h-30 max-w-80 cursor-pointer rounded-lg flex flex-col items-center justify-center bg-white'>
        <div className='flex gap-3 items-center p-2'>
            <div className={`text-[30px] ${color} `}>
            {icon}
            </div>
            <div className='w-30'>
                <h1 className=' text-md'>{title}</h1>
                <p className='font-bold'>{price}</p>
            </div>
            <IoStatsChartSharp className={`text-[50px] ${color}`}/>
        </div>
    </div>
  )
}

export default DashboardBox