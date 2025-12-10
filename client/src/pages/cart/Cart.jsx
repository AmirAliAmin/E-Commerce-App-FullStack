import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { IoClose } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { IoBagHandleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [sizeState, setSizeState] = useState(null);
    const [selectedSize, setSelectedSize] = useState("S")
    const handleSizeState = ()=>{
        setSizeState(true);
    }
    const handleCloseSizeState = (value)=>{
        if (value === "S") {
            setSelectedSize("S")
        }else if (value === "L") {
            setSelectedSize("L")
        }else if (value === "XL") {
            setSelectedSize("XL")
        }
        setSizeState(null)
    }
    const [qytState, setQytState] = useState(null);
    const [selectedQyt, setSelectedQyt] = useState(1)
    const handleQytState = ()=>{
        setQytState(true);
    }
    const handleCloseQytState = (value)=>{
        if (value === 1) {
            setSelectedQyt(1)
        }else if (value === 2) {
            setSelectedQyt(2)
        }else if (value === 3) {
            setSelectedQyt(3)
        }else if (value === 4) {
            setSelectedQyt(4)
        }else if (value === 5) {
            setSelectedQyt(5)
        }else if (value === 6) {
            setSelectedQyt(6)
        }else if (value === 7) {
            setSelectedQyt(7)
        }else if (value === 8) {
            setSelectedQyt(8)
        }else if (value === 9) {
            setSelectedQyt(9)
        }else if (value === 10) {
            setSelectedQyt(10)
        }
        setQytState(null)
    }
    const navigate = useNavigate()
  return (
    <section className='py-10 pb-10'>
        <div className='container w-[80%] max-w-[80%] flex gap-5 '>
            <div className='w-[70%]'>
                <div className='shadow-md rounded-md p-5 bg-white'>
               <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
                 <h2>Your Cart</h2>
                <p className='mt-0'>There are <span className='font-bold text-primary'>2</span> Product in your cart</p>
               </div>
                    <div className='w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
                        <div className='w-[15%] rounded-md overflow-hidden'>
                            <img src={assets.FashionImage1} alt="" />
                        </div>
                        <div className='w-[85%] relative'>
                            <IoClose className='cursor-pointer absolute top-0 right-0 link text-[22px]'/>
                            <span className='text-[13px]'>Flying Machine</span>
                            <h3 className='text-[15px] link'>Women Wide Jeans</h3>

                            <div className='flex items-center gap-4 mt-2'>
                                <div className='relative'>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer' onClick={handleSizeState}>Size: {selectedSize} <GoTriangleDown/></span>
                                {
                                    sizeState && (
                                <div className='absolute bg-white w-full h-auto left-2 shadow-lg border border-gray-200 text-center'>
                                    <ul>
                                        <li onClick={()=>handleCloseSizeState('S') } className='border-b border-gray-300 cursor-pointer'>S</li>
                                        <li onClick={()=>handleCloseSizeState("L")} className='border-b border-gray-300 cursor-pointer'>L</li>
                                        <li onClick={()=>handleCloseSizeState("XL")} className='border-b border-gray-300 cursor-pointer'>XL</li>
                                    </ul>
                                </div>

                                    )
                                }
                                </div>
                                <div className='relative'>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer' onClick={handleQytState}>Qyt: {selectedQyt} <GoTriangleDown/></span>
                                {
                                    qytState && (
                                <div className='absolute z-10 bg-white w-full h-auto left-2 shadow-lg border border-gray-200 text-center'>
                                    <ul>
                                        <li onClick={()=>handleCloseQytState(1) } className='border-b border-gray-300 cursor-pointer'>1</li>
                                        <li onClick={()=>handleCloseQytState(2)} className='border-b border-gray-300 cursor-pointer'>2</li>
                                        <li onClick={()=>handleCloseQytState(3)} className='border-b border-gray-300 cursor-pointer'>3</li>
                                         <li onClick={()=>handleCloseQytState(4) } className='border-b border-gray-300 cursor-pointer'>4</li>
                                        <li onClick={()=>handleCloseQytState(5)} className='border-b border-gray-300 cursor-pointer'>5</li>
                                        <li onClick={()=>handleCloseQytState(6)} className='border-b border-gray-300 cursor-pointer'>6</li>
                                         <li onClick={()=>handleCloseQytState(7) } className='border-b border-gray-300 cursor-pointer'>7</li>
                                        <li onClick={()=>handleCloseQytState(8)} className='border-b border-gray-300 cursor-pointer'>8</li>
                                        <li onClick={()=>handleCloseQytState(9)} className='border-b border-gray-300 cursor-pointer'>9</li>
                                        <li onClick={()=>handleCloseQytState(10)} className='border-b border-gray-300 cursor-pointer'>10</li>
                                    </ul>
                                </div>

                                    )
                                }
                                </div>
                            </div>

                            <div className='flex items-center gap-4 mt-2'>
                                <span className='text-black text-[14px] font-semibold'>$30</span>
                                <span className='line-through text-gray-500 text-[14px] font-medium'>$85</span>
                                <span className='text-primary text-[14px] font-semibold'>55% OFF</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
                        <div className='w-[15%] rounded-md overflow-hidden'>
                            <img src={assets.FashionImage1} alt="" />
                        </div>
                        <div className='w-[85%] relative'>
                            <IoClose className='cursor-pointer absolute top-0 right-0 link text-[22px]'/>
                            <span className='text-[13px]'>Flying Machine</span>
                            <h3 className='text-[15px] link'>Women Wide Jeans</h3>

                            <div className='flex items-center gap-4 mt-2'>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer'>Size: S <GoTriangleDown/></span>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer'>Qyt: 1 <GoTriangleDown/></span>
                            </div>

                            <div className='flex items-center gap-4 mt-2'>
                                <span className='text-black text-[14px] font-semibold'>$30</span>
                                <span className='line-through text-gray-500 text-[14px] font-medium'>$85</span>
                                <span className='text-primary text-[14px] font-semibold'>55% OFF</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
                        <div className='w-[15%] rounded-md overflow-hidden'>
                            <img src={assets.FashionImage1} alt="" />
                        </div>
                        <div className='w-[85%] relative'>
                            <IoClose className='cursor-pointer absolute top-0 right-0 link text-[22px]'/>
                            <span className='text-[13px]'>Flying Machine</span>
                            <h3 className='text-[15px] link'>Women Wide Jeans</h3>

                            <div className='flex items-center gap-4 mt-2'>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer'>Size: S <GoTriangleDown/></span>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer'>Qyt: 1 <GoTriangleDown/></span>
                            </div>

                            <div className='flex items-center gap-4 mt-2'>
                                <span className='text-black text-[14px] font-semibold'>$30</span>
                                <span className='line-through text-gray-500 text-[14px] font-medium'>$85</span>
                                <span className='text-primary text-[14px] font-semibold'>55% OFF</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
                        <div className='w-[15%] rounded-md overflow-hidden'>
                            <img src={assets.FashionImage1} alt="" />
                        </div>
                        <div className='w-[85%] relative'>
                            <IoClose className='cursor-pointer absolute top-0 right-0 link text-[22px]'/>
                            <span className='text-[13px]'>Flying Machine</span>
                            <h3 className='text-[15px] link'>Women Wide Jeans</h3>

                            <div className='flex items-center gap-4 mt-2'>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer'>Size: S <GoTriangleDown/></span>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer'>Qyt: 1 <GoTriangleDown/></span>
                            </div>

                            <div className='flex items-center gap-4 mt-2'>
                                <span className='text-black text-[14px] font-semibold'>$30</span>
                                <span className='line-through text-gray-500 text-[14px] font-medium'>$85</span>
                                <span className='text-primary text-[14px] font-semibold'>55% OFF</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-[30%]'>
                <div className='shadow-md rounded-md p-5 bg-white'>
                    <h3 className='pb-3'>Cart Total</h3>
                    <hr />
                    <p className='flex items-center justify-between mt-2'>
                        <span className='text-[14px] font-medium'>SubTotal</span>
                        <span className='text-primary font-bold'>$1,300.00</span>
                    </p>
                    <p className='flex items-center justify-between mt-2'>
                        <span className='text-[14px] font-medium'>Shipping</span>
                        <span className='font-bold'>Free</span>
                    </p>
                    <p className='flex items-center justify-between mt-2'>
                        <span className='text-[14px] font-medium'>Estimate for</span>
                        <span className=' font-bold'>UK</span>
                    </p>
                    <p className='flex items-center justify-between mt-2'>
                        <span className='text-[14px] font-medium'>Total</span>
                        <span className='text-primary font-bold'>$1,300.00</span>
                    </p>
                    <button className='mt-2 w-full py-2 flex items-center justify-center gap-1 bg-primary rounded-md text-white' onClick={()=>navigate("/checkout")}><IoBagHandleSharp className=''/>CHECKOUT</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Cart