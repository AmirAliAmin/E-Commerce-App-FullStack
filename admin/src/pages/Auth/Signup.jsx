import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiLogin } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import LoadingButton from "@mui/lab/LoadingButton";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

function Signup() {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [showPass, setShowPass] = useState(false);
  function handleClickGoogle() {
    setLoadingGoogle(false);
  }
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
        <div className="flex items-center gap-5 whitespace-nowrap">
          <button className="border py-1 px-3 border-primary text-primary rounded cursor-pointer">
             <Link to={"/"} className="flex items-center gap-2 ">
            <HiLogin className="rotate-180" />
            login
             </Link>
          </button>
          <button className="border py-1 px-3 border-primary text-primary rounded cursor-pointer">
          <Link to={"/Signup"} className="flex items-center gap-2 ">
            <FaRegUserCircle />
            Sign up
          </Link>

          </button>
        </div>
      </header>
      <img
        src="https://images.unsplash.com/photo-1603484477859-abe6a73f9366?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFja2dyb3VuZCUyMHRleHR1cmV8ZW58MHx8MHx8fDA%3D"
        alt=""
        className="w-full fixed top-0 left-0 opacity-15"
      />

      <div className="flex flex-col w-full px-7 md:w-[40%]   items-center justify-center mx-auto my-30 md:my-15">
        <img
          src="https://plus.unsplash.com/premium_photo-1668051040456-24c63abd95b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZSUyMGxvZ298ZW58MHx8MHx8fDA%3D"
          className="w-15 h-15 rounded-full hidden md:block"
        />
        <h1 className="text-center md:text-[18px] lg:text-[23px] xl:text-[32px] md:leading-10 font-bold">
          Join us today! Get special <br /> benefits and Stay up-to-date.
        </h1>
        <div>
          <div className="flex items-center justify-center w-full mt-5">
            <LoadingButton
              size="small"
              onClick={handleClickGoogle}
              endIcon={<FcGoogle />}
              loading={loadingGoogle}
              loadingPosition="end"
              variant="contained"
            >
              Signin with google
            </LoadingButton>
          </div>
          <br />
          <div className="w-full flex items-center justify-center gap-3">
            <span className="md:flex items-center  w-25 h-px bg-gray-300/50 hidden"></span>
            <span className="text-[15px] font-medium">
              Or, Create an account with your email
            </span>
            <span className="md:flex hidden items-center  w-25 h-px bg-gray-300/50"></span>
          </div>
          <div className="relative z-20 mt-5">
            <form>
              <label htmlFor="name" className="flex flex-col mb-3">
                Full Name
                <input
                  type="text"
                  id="name"
                  className="border py-0.5 outline-none pl-2"
                />
              </label>
              <label htmlFor="email" className="flex flex-col mb-3">
                Email
                <input
                  type="email"
                  id="email"
                  className="border py-0.5 outline-none pl-2"
                />
              </label>
              <label htmlFor="password" className="flex flex-col mb-3 relative">
                Password
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  className="border py-0.5 outline-none pl-2"
                />
                <div
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <IoMdEye /> : <IoMdEyeOff />}
                </div>
              </label>
              <div className="flex items-center justify-between text-[14px]">
                <label htmlFor="remember" className="flex items-center gap-1">
                  <input type="checkbox" id="remember" />
                  Remember Me
                </label>
              </div>
              <button className="bg-primary w-full mt-3 py-2 text-white rounded cursor-pointer">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
