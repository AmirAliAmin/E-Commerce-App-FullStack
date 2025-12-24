import React from 'react'
import 'react-inner-image-zoom/lib/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';


function ProductZoom({image}) {
    if (!image) return null;
  return (
    <InnerImageZoom src={image} zoomType='hover'  zoomScale={1} className='w-full h-full' />
  )
}

export default ProductZoom