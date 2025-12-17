import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { API_PATH } from "../../utils/apiPath";
import { postData } from "../../utils/api";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();
  const { alertBox, setIsLogin } = useContext(AppContext);

  const forgetPassword = () => {
    if (formField.email !== "") {
      localStorage.setItem("userEmail", formField.email);
      localStorage.setItem("actionType", "forget-password");
      postData(API_PATH.AUTH.FORGET_PASSWORD, {
        email: localStorage.getItem("userEmail"),
      }).then((res) => {
        if (res?.error !== true) {
          alertBox(res?.message, "success");
          history("/forgetPassword");
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
    <section className="py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-4">
          <h1 className="text-center text-[20px] font-medium">
            Login To Your Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="my-5 space-y-3">
              <input
                type="email"
                name="email"
                value={formField.email}
                onChange={onChangeInput}
                className=" w-full py-3 border border-gray-500 outline-none px-3 rounded-md"
                placeholder="Email Id"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className=" w-full py-3 border border-gray-500 outline-none px-3 rounded-md"
                  placeholder="Password"
                  value={formField.password}
                  onChange={onChangeInput}
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
            <h1 className="font-medium text-[14px]" onClick={forgetPassword}>
              Forgot Password?
            </h1>
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
          <p className="text-center font-light py-1">
            Not Registered?{" "}
            <span
              className="font-bold text-primary cursor-pointer"
              onClick={() => history("/register")}
            >
              Sign Up
            </span>
          </p>
          <p className="py-1 font-light text-[14px] text-center">
            Or continue with social account
          </p>
          <button className="w-full py-2 bg-[#e4e2e2] my-1 rounded-lg flex items-center justify-center gap-2 font-medium cursor-pointer hover:bg-[#dbdbdb]">
            <FcGoogle />
            LOGIN WITH GOOGLE
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
