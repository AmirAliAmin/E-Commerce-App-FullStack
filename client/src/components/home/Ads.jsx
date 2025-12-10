import React from 'react'
import { assets } from '../../assets/assets'

function Ads() {
  return (
    <div className='container py-7'>
        <div className=' flex justify-between gap-2 overflow-auto no-scroll'>
            <div className='w-70 min-w-70 overflow-hidden rounded-lg'>
            <img src={assets.ads1} alt="" className=' hover:transition-all hover:duration-700 hover:rotate-2 hover:scale-105 rounded-lg' />
            </div>
            <div className='w-70 min-w-70 overflow-hidden rounded-lg'>
            <img src={assets.ads2} alt="" className=' hover:transition-all hover:duration-700 hover:rotate-2 hover:scale-105 rounded-lg' />
            </div>
            <div className='w-70 min-w-70 overflow-hidden rounded-lg'>
            <img src={assets.ads3} alt="" className='hover:transition-all hover:duration-700 hover:rotate-2 hover:scale-105 rounded-lg' />
            </div>
            <div className='w-70 min-w-70 overflow-hidden rounded-lg'>
            <img src={assets.ads4} alt="" className='hover:transition-all hover:duration-700 hover:rotate-2 hover:scale-105 rounded-lg ' />
            </div>
        </div>
    </div>
  )
}

export default Ads