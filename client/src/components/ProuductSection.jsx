import React, { useState } from 'react'
import { products } from '../assets/assets'
import ProductCard from './products/ProductCard'

function ProuductSection() {

    const jewelleryFilter = products.filter(item=> item.category === "Jewellery")
    const groceriesFilter = products.filter(item=> item.category === "Groceries")

    
  return (
    <div className='container'>
         <div className='flex flex-wrap justify-between'>
                <div className='lg:w-[50%] mb-4 lg:mb-0'>
                    <h1 className='text-2xl font-medium'>Jewellery</h1>
                </div>
            </div>
        <div className='flex w-full items-center gap-4 overflow-auto no-scroll py-7'>
                {jewelleryFilter.length > 0 ? (
                    jewelleryFilter.map((item, index) => (
                        <div key={item.id} className='flex shrink-0 w-46 min-w-46 h-90 min-h-90'>
                            <ProductCard
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                brand={item.brand}
                                original={item.original}
                                price={item.price}
                                discount={item.discount}
                            />
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center py-8">
                        <p className="text-gray-500 text-lg">No products found in this category.</p>
                    </div>
                )}
            </div>
             <div className='flex flex-wrap justify-between mt-9'>
                <div className='lg:w-[50%] mb-4 lg:mb-0'>
                    <h1 className='text-2xl font-medium'>Groceries</h1>
                </div>
            </div>
        <div className='flex w-full items-center gap-4 overflow-auto no-scroll py-7'>
                {groceriesFilter.length > 0 ? (
                    groceriesFilter.map((item, index) => (
                        <div key={item.id} className='flex shrink-0 w-46 min-w-46 h-90 min-h-90'>
                            <ProductCard
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                brand={item.brand}
                                original={item.original}
                                price={item.price}
                                discount={item.discount}
                            />
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center py-8">
                        <p className="text-gray-500 text-lg">No products found in this category.</p>
                    </div>
                )}
            </div>
    </div>
  )
}

export default ProuductSection