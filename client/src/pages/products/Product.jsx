import React, { useContext, useEffect, useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { products } from '../../assets/assets';
import ProductCard from '../../components/products/ProductCard';
import SliderRange from '../../components/SliderRange';
import { MdOutlineMenu } from "react-icons/md";
import { IoGridOutline } from "react-icons/io5";
import ListProductCard from '../../components/products/ListProductCard';
import { API_PATH } from '../../utils/apiPath';
import { fetchData } from '../../utils/api';
import { AppContext } from '../../context/AppContext';


function Product() {
    const { categoryData } = useContext(AppContext);

    const [openCategory, setOpenCategory] = useState(true);
    const [openAvailable, setOpenAvailable] = useState(true);
    const [openSize, setOpenSize] = useState(true);
    const [productStyle,setProductStyle] = useState("grid");
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState([]);

     const productFilter = productData.filter(
    (item) => item.catName ===  "Jewellery"
  );

    useEffect(() => {
    setIsLoading(true);
    fetchData(API_PATH.PRODUCTS.GET_ALL_PRODUCT).then((res) => {
      if (res?.error === false) {
        setProductData(res.data);
        console.log(res.data)
        setIsLoading(false);
      }
    });
  }, []);


  return (
    <div className='container'>
        <div className='flex w-full'>
            <div className='w-[20%] border border-gray-200 hidden lg:block'>
                <div className='p-4'>
                    <div className='flex items-center cursor-pointer  text-gray-700' onClick={()=>setOpenCategory(!openCategory)}>
                        <h1 className='font-bold text-lg'>Shop by Category</h1>
                        {
                            openCategory ? <RiArrowDropUpLine className='text-4xl group-transition-all duration-200'/> :
                        <RiArrowDropDownLine className='text-4xl group-transition-all duration-500'/>
                        }
                    </div>
                    {
                        openCategory && (
                    <div className='flex group flex-col gap-2 overflow-auto h-47 py-2 cursor-pointer text-gray-600'>
                        {
                            categoryData?.map((item)=>(
                        <label key={item._id} htmlFor={item._id} className='text-lg'>
                            <input type="checkbox" name={item.name} id={item._id} className='w-4 h-4 cursor-pointer mr-2' /> {item.name}
                        </label>

                            ))
                        }

                    </div>

                        )
                    }
                </div>
                <div className='p-4'>
                    <div className='flex items-center cursor-pointer  text-gray-700' onClick={()=>setOpenAvailable(!openAvailable)}>
                        <h1 className='font-bold text-lg'>Availablity</h1>
                        {
                            openAvailable ? <RiArrowDropUpLine className='text-4xl group-transition-all duration-200'/> :
                        <RiArrowDropDownLine className='text-4xl group-transition-all duration-500'/>
                        }
                    </div>
                    {
                        openAvailable && (
                    <div className='flex group flex-col gap-2 overflow-auto h-30 py-2 cursor-pointer text-gray-600'>
                        <label htmlFor="available" className='text-lg'>
                            <input type="checkbox" name="available" id="available" className='w-4 h-4 cursor-pointer mr-2' /> Available(17)
                        </label>
                         <label htmlFor="stock" className='text-lg'>
                            <input type="checkbox" name="stock" id="stock" className='w-4 h-4 cursor-pointer mr-2' /> In Stock(10)
                        </label>
                         <label htmlFor="notavailable" className='text-lg'>
                            <input type="checkbox" name="notavailable" id="notavailable" className='w-4 h-4 cursor-pointer mr-2'/> Not Available
                        </label>
                        
                    </div>

                        )
                    }
                </div>
                <div className='p-4'>
                    <div className='flex items-center cursor-pointer  text-gray-700' onClick={()=>setOpenSize(!openSize)}>
                        <h1 className='font-bold text-lg'>Size</h1>
                        {
                            openSize ? <RiArrowDropUpLine className='text-4xl group-transition-all duration-200'/> :
                        <RiArrowDropDownLine className='text-4xl group-transition-all duration-500'/>
                        }
                    </div>
                    {
                        openSize && (
                    <div className='flex group flex-col gap-2 overflow-auto h-47 py-2 cursor-pointer text-gray-600'>
                        <label htmlFor="Small" className='text-lg'>
                            <input type="checkbox" name="Small" id="Small" className='w-4 h-4 cursor-pointer mr-2' /> Small
                        </label>
                         <label htmlFor="Medium" className='text-lg'>
                            <input type="checkbox" name="Medium" id="Medium" className='w-4 h-4 cursor-pointer mr-2' /> Medium
                        </label>
                         <label htmlFor="Large" className='text-lg'>
                            <input type="checkbox" name="Large" id="Large" className='w-4 h-4 cursor-pointer mr-2'/> Large
                        </label>
                         <label htmlFor="XL" className='text-lg'>
                            <input type="checkbox" name="XL" id="XL" className='w-4 h-4 cursor-pointer mr-2' /> XL
                        </label>
                         <label htmlFor="XXL" className='text-lg'>
                            <input type="checkbox" name="XXL" id="XXL" className='w-4 h-4 cursor-pointer mr-2'/> XXL
                        </label>
                    </div>

                        )
                    }
                </div>
                <div className='p-2'>
                    <SliderRange/>
                </div>
            </div>
            <div className='lg:w-[80%]'>
                <div className='flex md:justify-between flex-wrap gap-2 items-center px-4 py-2'>
                    <div className='flex items-center gap-2'>
                        <div className={` w-7 h-7 flex items-center justify-center ${productStyle === "list" ? "bg-primary rounded-full text-white cursor-pointer":""}`} onClick={()=>setProductStyle("list")}>
                        <MdOutlineMenu className='text-xl cursor-pointer' />
                        </div>
                        <div className={` w-7 h-7 flex items-center justify-center ${productStyle === "grid" ? "bg-primary rounded-full text-white cursor-pointer":""}`} onClick={()=>setProductStyle("grid")}>
                        <IoGridOutline className='text-xl cursor-pointer' />
                        </div>
                        <p className='tracking-wider text-md text-gray-700 hidden md:block'>There are {productData.length} products</p>
                    </div>
                    <div>
                        <label htmlFor="sort">
                            Sorted By:
                            <select name="sort" id="sort" className='outline-none border text-gray-700 ml-2 w-20 md:w-auto'>
                                <option value="">Name: A To Z</option>
                                <option value="">Name: Z To A</option>
                                <option value="">Price: Low to High</option>
                                <option value="">Price: High To Low</option>
                            </select>
                        </label>
                    </div>
                </div>
                {
                    productStyle === "grid" && (
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 gap-4 mx-2 py-6'>

                    {
                        productData.map((item)=>(
                            
                                <ProductCard 
                                key={item._id}
                                id={item._id} 
                                images={item.images}
                                name={item.name}
                                brand={item.brand}
                                price={item.price}
                                original={item.oldprice}
                                discount={item.discount}
                                rating={item.rating}
                                />
                            
                        ))
                    }
                </div>

                    )
                }
                {
                    productStyle === "list" && (
                        <div className='flex flex-col  gap-4 mx-2 py-6'>
                            {
                        productData.map((item, index)=>(
                            
                                <ListProductCard
                                key={index} 
                                id={item.id} 
                                images={item.images}
                                name={item.name}
                                brand={item.brand}
                                price={item.price}
                                original={item.original}
                                discount={item.discount}
                                rating={item.rating}
                                />
                            
                        ))
                    }
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Product