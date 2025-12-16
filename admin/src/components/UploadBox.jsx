import React from 'react'
import { FaImages } from "react-icons/fa6";

function UploadBox(props) {
  return (
    <div className='p-3 my-5 rounded-md overflow-hidden border-2 border-dashed border-gray-400 h-37.5 w-full bg-gray-100 hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center relative'>
        <FaImages className='text-[50px] opacity-35 pointer-events-none'/>
        <h4 className='text-[14px] opacity-35 pointer-events-none'>Image Upload</h4>
        <input type="file" multiple={props.multiple!==undefined ? props.multiple : false}  className='absolute top-0 left-0 w-full h-full opacity-0' />
    </div>
  )
}

export default UploadBox