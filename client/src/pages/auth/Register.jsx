import React, { useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoMdEye } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
  return (
    <section className='py-10'>
            <div className='container'>
                <div className='card shadow-md w-[500px] m-auto rounded-md bg-white p-4'>
                    <h1 className='text-center text-[20px] font-medium'>Register with a new account</h1>
                    <div className='my-5 space-y-3'>
                        <input type="text" className=' w-full py-3 border border-gray-500 outline-none px-3 rounded-md' placeholder='Full Name' />
                        <input type="email" className=' w-full py-3 border border-gray-500 outline-none px-3 rounded-md' placeholder='Email Id' />
                        <div className='relative'>
                        <input type={showPassword? "text" : "password"} className=' w-full py-3 border border-gray-500 outline-none px-3 rounded-md ' placeholder='Password' />
                        <div className='absolute top-4 right-2 text-[20px]'>
                            {showPassword ?<FaRegEyeSlash onClick={()=>setShowPassword(false)}/>:<IoMdEye onClick={()=>setShowPassword(true)}/>}
                        </div>
                        </div>
                    </div>
                    <button className='w-full bg-primary py-2 rounded-lg text-white my-2'>LOGIN</button>
                    <p className='text-center font-light py-1'>Already have an account?  <span className='font-bold text-primary cursor-pointer'  onClick={()=>navigate("/login")}>Login</span></p>
                    <p className='py-1 font-light text-[14px] text-center'>Or continue with social account</p>
                    <button className='w-full py-2 bg-[#e4e2e2] my-1 rounded-lg flex items-center justify-center gap-2 font-medium cursor-pointer hover:bg-[#dbdbdb]'><FcGoogle/>SIGN UP WITH GOOGLE</button>
                </div>
    
            </div>
    
        </section>
  )
}

export default Register