import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../assets/assets';
import ProductCard from './ProductCard';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function PopularProducts() {
    const {categoryData} = useContext(AppContext)
    const [openMenu, setOpenMenu] = useState("Fashion");
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const menuRefs = useRef({});

   

    const updateIndicatorPosition = () => {
        const activeElement = menuRefs.current[openMenu];
        if (activeElement) {
            const { offsetLeft, offsetWidth } = activeElement;
            setIndicatorStyle({
                left: offsetLeft,
                width: offsetWidth,
                transition: 'all 0.3s ease-in-out'
            });
        }
    };

    const filterProductsByCategory = (category) => {
        const categoryMap = {
            "Fashion": "Fashion",
            "Electronic": "Electronics", 
            "Bags": "Bags",
            "Footwear": "Footwear",
            "Groceries": "Groceries",
            "Beauty": "Beauty",
            "Wellness": "Wellness",
            "Jewellery": "Jewellery"
        };

        const mappedCategory = categoryMap[category];
        const filtered = products.filter(product => 
            product.category === mappedCategory
        );
        setFilteredProducts(filtered);
    };

    const handleMenuClick = (menuName) => {
        setOpenMenu(menuName);
    };

     useEffect(() => {
        updateIndicatorPosition();
        filterProductsByCategory("Fashion");
    }, []);

    useEffect(() => {
        updateIndicatorPosition();
        filterProductsByCategory(openMenu);
    }, [openMenu]);

    return (
        <div className='container py-7'>
            <div className='flex flex-wrap justify-between'>
                <div className='lg:w-[50%] mb-4 lg:mb-0'>
                    <h1 className='text-2xl font-medium'>Popular Products</h1>
                    <p className='text-sm tracking-wider text-gray-700'>Do not miss the current offers until the end of March.</p>
                </div>
                <div className='lg:w-[50%] overflow-auto no-scroll relative'>
                    <ul className='flex items-center justify-between gap-6 md:gap-10 uppercase relative'>
                        <div 
                            className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
                            style={indicatorStyle}
                        />
                        
                        {categoryData?.map((item) => (
                            <li 
                                key={item._id}
                                ref={el => menuRefs.current[item.name] = el}
                                onClick={() => handleMenuClick(item.name)}
                                className="shrink-0"
                            >
                                <Link 
                                    className={`link text-[14px] md:text-[16px] py-2 block transition-all duration-200 cursor-pointer ${
                                        openMenu === item.name 
                                            ? "text-primary font-medium" 
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Products Grid */}
            <div className='flex w-full items-center gap-4 overflow-auto no-scroll py-7'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
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

export default PopularProducts