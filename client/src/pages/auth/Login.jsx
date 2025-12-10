import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formField, setFormField] = useState({
        email:"",
        password: "",
    })
    const history = useNavigate()
    const forgetPassword = ()=>{
        if (formField.email !== "") {
            toast.success("OTP is Sended")
            history("/verifyAccount")
        }else{
            toast.error("Add Email")
        }
    }
  return (
    <section className='py-10'>
        <div className='container'>
            <div className='card shadow-md w-[500px] m-auto rounded-md bg-white p-4'>
                <h1 className='text-center text-[20px] font-medium'>Login To Your Account</h1>
                <div className='my-5 space-y-3'>
                    <input type="email" name='email' value={formField.email} onChange={(e)=>setFormField(e.target.name)} className=' w-full py-3 border border-gray-500 outline-none px-3 rounded-md' placeholder='Email Id' />
                    <div className='relative'>
                    <input type={showPassword? "text" : "password"} name='password' className=' w-full py-3 border border-gray-500 outline-none px-3 rounded-md' placeholder='Password' />
                    <div className='absolute top-4 right-2 text-[20px]'>
                        {showPassword ?<FaRegEyeSlash onClick={()=>setShowPassword(false)}/>:<IoMdEye onClick={()=>setShowPassword(true)}/>}
                    </div>
                    </div>
                </div>
                <h1 className='font-medium text-[14px]' onClick={forgetPassword}>Forgot Password?</h1>
                <button className='w-full bg-primary py-2 rounded-lg text-white my-2'>LOGIN</button>
                <p className='text-center font-light py-1'>Not Registered? <span className='font-bold text-primary cursor-pointer' onClick={()=>navigate("/register")}>Sign Up</span></p>
                <p className='py-1 font-light text-[14px] text-center'>Or continue with social account</p>
                <button className='w-full py-2 bg-[#e4e2e2] my-1 rounded-lg flex items-center justify-center gap-2 font-medium cursor-pointer hover:bg-[#dbdbdb]'><FcGoogle/>LOGIN WITH GOOGLE</button>
            </div>

        </div>

    </section>
  )
}

export default Login