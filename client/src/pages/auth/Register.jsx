import React, { useContext, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { data, useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import { AppContext } from "../../context/AppContext";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formField, setFormField] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { alertBox } = useContext(AppContext);

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
    setIsLoading(true)
    if (formField.name.trim() === "") {
      alertBox("Please enter your Name", "error");
      return;
    }
    if (formField.email.trim() === "") {
      alertBox("Please enter your Email", "error");
      return;
    }
    if (formField.password.trim() === "") {
      alertBox("Please enter your Password", "error");
      return;
    }
    postData(API_PATH.AUTH.REGISTER, formField).then((res) => {
        if (res?.error !== true) {
            alertBox(res?.message,"success")
            setIsLoading(false)
            localStorage.setItem("userEmail",formField.email)
            localStorage.setItem("token", res?.token)
            setFormField({
              name:"",
              email:"",
              password:"",
            })
           
            navigate('/verifyAccount')
        }else{
            alertBox(res?.message,"error")
            setIsLoading(false)
        }
    });
  };
  return (
    <section className="py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-4">
          <h1 className="text-center text-[20px] font-medium">
            Register with a new account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="my-5 space-y-3">
              <input
                type="text"
                className=" w-full py-3 border border-gray-500 outline-none px-3 rounded-md"
                name="name"
                value={formField.name}
                disabled={isLoading === true ? true :false}
                onChange={onChangeInput}
                placeholder="Full Name"
              />
              <input
                type="email"
                className=" w-full py-3 border border-gray-500 outline-none px-3 rounded-md"
                name="email"
                onChange={onChangeInput}
                value={formField.email}
                disabled={isLoading === true ? true :false}
                placeholder="Email Id"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={onChangeInput}
                  value={formField.password}
                  className=" w-full py-3 border border-gray-500 outline-none px-3 rounded-md "
                  disabled={isLoading === true ? true :false}
                  placeholder="Password"
                />
                <div className="absolute top-4 right-2 text-[20px]">
                  {showPassword ? (
                    <FaRegEyeSlash onClick={() => setShowPassword(false)} />
                  ) : (
                    <IoMdEye onClick={() => setShowPassword(true)} />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={!valideValue}
              className={`w-full py-2 rounded-lg my-2 text-primary border transition flex items-center justify-center gap-3 ${valideValue? "bg-primary text-white hover:bg-white hover:text-primary cursor-pointer": "bg-white text-black cursor-not-allowed"}`}
            >
                {
                    isLoading === true ?
                    <div className=' animate-spin w-5 h-5 border-3 border-primary border-solid rounded-full border-t-transparent'></div> : "Register"
                }
             
            </button>
          </form>
          <p className="text-center font-light py-1">
            Already have an account?{" "}
            <span
              className="font-bold text-primary cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
          <p className="py-1 font-light text-[14px] text-center">
            Or continue with social account
          </p>
          <button className="w-full py-2 bg-[#e4e2e2] my-1 rounded-lg flex items-center justify-center gap-2 font-medium cursor-pointer hover:bg-[#dbdbdb]">
            <FcGoogle />
            SIGN UP WITH GOOGLE
          </button>
        </div>
      </div>
    </section>
  );
}

export default Register;
