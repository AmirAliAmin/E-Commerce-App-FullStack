import React, { useContext, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { postData, putData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";

function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [formField, setFormField] = useState({
    password: "",
    confirmPass: "",
  });
  const history = useNavigate();
  const { alertBox, setIsLogin } = useContext(AppContext);
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
    <section className="py-10">
      <div className="container">
        <div className="card shadow-md lg:w-[300px] m-auto rounded-md bg-white p-4">
          <h1 className="text-center text-[20px] font-medium">
            Forget Password
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="my-5 space-y-3">
                <div className="relative">
              <input
                type={showPass?"text":"password"}
                name="password"
                value={formField.password}
                onChange={onChangeInput}
                className=" w-full py-3 border border-gray-500 outline-none px-3 rounded-md"
                placeholder="Password"
              />
 <div className="absolute right-2 top-4 cursor-pointer" onClick={()=>setShowPass(!showPass)}>
                        {
                            showPass ?<IoMdEye/>:<IoMdEyeOff/>
                        }
                    </div>
                </div>
              <div className="relative">
                <input
                  type={showPass2?"text":"password"}
                  name="confirmPass"
                  value={formField.confirmPass}
                  onChange={onChangeInput}
                  className=" w-full py-3 border border-gray-500 outline-none px-3 rounded-md"
                  placeholder="Confirm Password"
                />
                <div className="absolute right-2 top-4 cursor-pointer" onClick={()=>setShowPass2(!showPass2)}>
                        {
                            showPass2 ?<IoMdEye/>:<IoMdEyeOff/>
                        }
                    </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary py-2 rounded-lg text-white my-2"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgetPassword;
