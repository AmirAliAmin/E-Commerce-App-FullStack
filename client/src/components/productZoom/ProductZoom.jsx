import React from 'react'
import 'react-inner-image-zoom/lib/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { products } from '../../assets/assets';

function ProductZoom({image}) {
  return (
    <InnerImageZoom src={image} zoomType='hover'  zoomScale={1} />
  )
}

export default ProductZoom