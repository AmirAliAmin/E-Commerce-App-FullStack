import React from 'react'
import { products } from '../../assets/assets'
import ProductCard from './ProductCard'

function LatestProducts() {
  return (
    <div className='container py-7'>
            <div className='flex flex-wrap justify-between'>
                <div className='lg:w-[50%] mb-4 lg:mb-0'>
                    <h1 className='text-2xl font-medium'>Latest Products</h1>
                </div>
            </div>
            
            {/* Products Grid */}
            <div className='flex w-full items-center gap-4 overflow-auto no-scroll py-7'>
                    {products.slice(0,20).map((item, index) => (
                        <div key={index} className='flex shrink-0 w-46 min-w-46 h-90 min-h-90'>
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
                    ))}
            </div>
        </div>
  )
}

export default LatestProducts