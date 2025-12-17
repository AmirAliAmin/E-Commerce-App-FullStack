import React from 'react'
import { Link } from "react-router-dom";

function ForgetPassword() {
 
  return (
    <section className=" flex  justify-center">
      <header className="w-full fixed top-0 left-0 px-4 py-2 flex flex-wrap items-center justify-between z-100 bg-transparent">
        <Link to={"/"} className="flex gap-3 items-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1668051040456-24c63abd95b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZSUyMGxvZ298ZW58MHx8MHx8fDA%3D"
            className="w-15 h-15 rounded-full hidden md:block"
          />
          <div>
            <p className="font-bold text-xl text-primary">Classy Shop</p>
            <p className="tracking-widest text-xs uppercase font-light">
              Big Mega Shop
            </p>
          </div>
        </Link>
       
      </header>
      <img
        src="https://images.unsplash.com/photo-1603484477859-abe6a73f9366?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFja2dyb3VuZCUyMHRleHR1cmV8ZW58MHx8MHx8fDA%3D"
        alt=""
        className="w-full fixed top-0 left-0 opacity-25"
      />

      <div className="flex flex-col w-full px-7 md:w-[40%]   items-center justify-center mx-auto mt-30 md:mt-15">
        <img
          src="https://plus.unsplash.com/premium_photo-1668051040456-24c63abd95b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZSUyMGxvZ298ZW58MHx8MHx8fDA%3D"
          className="w-15 h-15 rounded-full hidden md:block"
        />
        <h1 className="text-center md:text-[18px] lg:text-[23px] xl:text-[34px] md:leading-10 font-bold">
          Having trouble to sign in? <br /> Reset your Password.
        </h1>
        <div>
        
            
            <div className="relative z-20 mt-5">
                <form>
                    <label htmlFor="email" className="flex flex-col mb-3">
                        Email
                        <input type="email" id="email" className="border py-0.5 outline-none pl-2" />
                    </label>
                    <button className="bg-primary w-full mt-3 py-2 text-white rounded cursor-pointer">Reset Password</button>
                </form>
                <br />
            <div className="w-full flex items-center justify-center gap-3">
                <span className="md:flex hidden items-center  w-25 h-px bg-gray-300/50"></span>
                <span className="text-[15px] font-medium">Don't want to reset? Sign In</span>
                <span className="md:flex hidden items-center  w-25 h-px bg-gray-300/50"></span>
            </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default ForgetPassword