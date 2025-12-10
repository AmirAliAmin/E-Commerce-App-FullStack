import React, { useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa6';
import { IoMdEye } from 'react-icons/io';

function ForgetPassword() {
     const [showPassword, setShowPassword] = useState(false);
        const [formField, setFormField] = useState({
            password: "",
            confirmPass: "",
        })
  return (
     <section className='py-10'>
            <div className='container'>
                <div className='card shadow-md w-[300px] m-auto rounded-md bg-white p-4'>
                    <h1 className='text-center text-[20px] font-medium'>Forget Password</h1>
                    <div className='my-5 space-y-3'>
                        <input type="password" name='password' value={formField.password} onChange={(e)=>setFormField(e.target.name)} className=' w-full py-3 border border-gray-500 outline-none px-3 rounded-md' placeholder='Password' />
                        <div className='relative'>
                        <input type="password" name='confirmPass' value={formField.confirmPass} onChange={(e)=>setFormField(e.target.name)} className=' w-full py-3 border border-gray-500 outline-none px-3 rounded-md' placeholder='Confirm Password' />
                        </div>
                    </div>
                   
                    <button className='w-full bg-primary py-2 rounded-lg text-white my-2'>Change Passord</button>
                </div>
    
            </div>
    
        </section>
  )
}

export default ForgetPassword