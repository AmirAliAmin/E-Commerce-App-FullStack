import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiLogin } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import LoadingButton from "@mui/lab/LoadingButton";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { AdminContext } from "../../context/AdminContext";
import { postData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";

function Login() {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();
  const { alertBox, setIsLogin } = useContext(AdminContext);
  function handleClickGoogle() {
    setLoadingGoogle(false);
  }
  const forgetPassword = () => {
    if (formField.email !== "") {
      localStorage.setItem("userEmail", formField.email);
      localStorage.setItem("actionType", "forget-password");
      postData(API_PATH.AUTH.FORGET_PASSWORD, {
        email: localStorage.getItem("userEmail"),
      }).then((res) => {
        if (res?.error !== true) {
          alertBox(res?.message, "success");
          history("/verify");
        } else {
          alertBox(res?.message, "error");
        }
      });
      alertBox(`OTP is Sended at ${formField.email}`, "success");
      history("/verifyAccount");
    } else {
      alertBox("Add Email", "error");
      // return false;
    }
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField(() => {
      return {
        ...formField,
        [name]: value,
      };
    });
  };
  const valideValue = Object.values(formField).every((el) => el.trim() !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postData(API_PATH.AUTH.LOGIN, formField).then((res) => {
      if (res?.error !== true) {
        alertBox(res?.message, "success");
        setIsLoading(false);
        setFormField({
          email: "",
          password: "",
        });
        localStorage.setItem("accessToken", res?.data.accessToken);
        localStorage.setItem("refreshToken", res?.data.refreshToken);
        setIsLogin(true);

        history("/");
      } else {
        alertBox(res?.message, "error");
        setIsLoading(false);
      }
    });
  };

  return (
    <section className=" flex  justify-center">
      <header className="w-full fixed top-0 left-0 px-4 py-2 flex flex-wrap items-center justify-between z-100 bg-transparent">
        <Link to={"/"} className="flex gap-3 items-center">
          {" "}
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
          <button className="flex items-center gap-2 border py-1 px-3 border-primary text-primary rounded cursor-pointer">
            <HiLogin className="rotate-180" />
            login
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
        className="w-full fixed top-0 left-0 opacity-25"
      />

      <div className="flex flex-col w-full px-7 md:w-[40%]   items-center justify-center mx-auto mt-30 md:mt-15">
        <img
          src="https://plus.unsplash.com/premium_photo-1668051040456-24c63abd95b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZSUyMGxvZ298ZW58MHx8MHx8fDA%3D"
          className="w-15 h-15 rounded-full hidden md:block"
        />
        <h1 className="text-center md:text-[18px] lg:text-[23px] xl:text-[34px] md:leading-10 font-bold">
          Welcome Back! <br /> Sign in with your credentials.
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
            <span className="md:flex hidden items-center  w-25 h-px bg-gray-300/50"></span>
            <span className="text-[15px] font-medium">
              Or, Sign in with your email
            </span>
            <span className="md:flex hidden items-center  w-25 h-px bg-gray-300/50"></span>
          </div>
          <div className="relative z-20 mt-5">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="flex flex-col mb-3">
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formField.email}
                  onChange={onChangeInput}
                  className="border py-0.5 outline-none pl-2"
                />
              </label>
              <label htmlFor="password" className="flex flex-col mb-3 relative">
                Password
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formField.password}
                  onChange={onChangeInput}
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
                <div
                  onClick={forgetPassword}
                  className="underline cursor-pointer hover:text-primary"
                >
                  Forget Password?
                </div>
              </div>
             <button
              type="submit"
              disabled={!valideValue}
              className={`w-full py-2 rounded-lg my-2 text-primary border transition flex items-center justify-center gap-3 ${
                valideValue
                  ? "bg-primary text-white hover:bg-white hover:text-primary cursor-pointer"
                  : "bg-white text-black cursor-not-allowed"
              }`}
            >
              {isLoading === true ? (
                <div className=" animate-spin w-5 h-5 border-3 border-primary border-solid rounded-full border-t-transparent"></div>
              ) : (
                "Login"
              )}
            </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
