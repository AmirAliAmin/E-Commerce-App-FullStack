import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { AdminContext } from "../../context/AdminContext";
import { putData } from "../../../../client/src/utils/api";
import { API_PATH } from "../../../../client/src/utils/apiPath";

function ChangePassword() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState({
    password: "",
    confirmPass: "",
  });
  const history = useNavigate();
  const { alertBox, setIsLogin } = useContext(AdminContext);
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

 const handleSubmit = async (e) => {
  e.preventDefault();

  const { password, confirmPass } = formField;
  const email = localStorage.getItem("userEmail");

  if (!password.trim()) {
    alertBox("Please enter your password", "error");
    return;
  }

  if (!confirmPass.trim()) {
    alertBox("Please enter confirm password", "error");
    return;
  }

  if (password.trim() !== confirmPass.trim()) {
    alertBox("Password and Confirm Password must be same", "error");
    return;
  }

  if (!email) {
    alertBox("User email not found. Please retry forgot password.", "error");
    return;
  }

  setIsLoading(true);

  try {
    const res = await putData(API_PATH.AUTH.RESET_PASSWORD, {
      password:formField.password,
      confirmPassword:formField.confirmPass,
      email,
    });

    if (!res?.error) {
      alertBox(res.message, "success");
      setFormField({ password: "", confirmPass: "" });
      localStorage.removeItem("userEmail");
      localStorage.removeItem("actionType");
      history("/login");
    } else {
      alertBox(res.message, "error");
    }
  } catch (error) {
    alertBox("Something went wrong", "error");
  } finally {
    setIsLoading(false);
  }
};

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

      <div className="flex flex-col w-full px-7 md:w-[50%]   items-center justify-center mx-auto mt-30 md:mt-15">
        <img
          src="https://plus.unsplash.com/premium_photo-1668051040456-24c63abd95b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZSUyMGxvZ298ZW58MHx8MHx8fDA%3D"
          className="w-15 h-15 rounded-full hidden md:block"
        />
        <h1 className="text-center md:text-[18px] lg:text-[20px] xl:text-[30px] md:leading-10 font-bold">
          Welcome Back! <br /> You can Change your Password from here.
        </h1>
        <div>
          <div className="relative z-20 mt-5">
            <form onSubmit={handleSubmit}>
              <label htmlFor="password" className="flex flex-col mb-3 relative">
                New Password
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
              <label htmlFor="confirmpassword" className="flex flex-col mb-3 relative">
                Confirm Password
                <input
                  type={showPass ? "text" : "password"}
                  id="confirmpassword"
                   name="confirmPass"
                  value={formField.confirmPass}
                  onChange={onChangeInput}
                  className="border py-0.5 outline-none pl-2"
                />
                <div
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setShowPass2(!showPass2)}
                >
                  {showPass2 ? <IoMdEye /> : <IoMdEyeOff />}
                </div>
              </label>
              <button type="submit" className="bg-primary w-full mt-3 py-2 text-white rounded cursor-pointer">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
