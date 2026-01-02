import React, { useState, useRef, useEffect, useContext } from "react";
import Security from "../../assets/security.png";
import { postData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Verify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const { alertBox } = useContext(AppContext);

  // Auto focus first input
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Handle input
  const handleChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  // Handle paste OTP
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pasted.every((d) => /^\d$/.test(d))) {
      setOtp(pasted);
      inputsRef.current[5]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      alertBox("Please enter complete OTP", "error");
      return;
    }

    const actionType = localStorage.getItem("actionType");
    if (actionType !== "forget-password") {
      postData(API_PATH.AUTH.VERIFY_EMAIL, {
        email: localStorage.getItem("userEmail"),
        otp: otpValue,
      }).then((res) => {
        if (res?.error !== true) {
          alertBox(res?.message, "success");
          localStorage.removeItem("userEmail")
          navigate("/login");
        } else {
          alertBox(res?.message, "error");
        }
      });
    }else{
       postData(API_PATH.AUTH.VERIFY_FORGET_PASSWORD, {
        email: localStorage.getItem("userEmail"),
        otp:otpValue
      }).then((res) => {
        if (res?.error !== true) {
          alertBox(res?.message, "success");
          navigate("/forgetPassword");
        } else {
          alertBox(res?.message, "error");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="card shadow-md lg:w-[400px] m-auto rounded-md bg-white p-6">
        <div className="flex justify-center">
          <img src={Security} alt="security" className="w-20" />
        </div>

        <h1 className="text-center text-[18px] font-bold mt-4">
          Verify OTP
        </h1>

        <p className="text-center mt-2 mb-4">
          OTP sent to
          <span className="text-primary font-bold">
            {localStorage.getItem("userEmail")}
          </span>
        </p>

        {/* OTP inputs */}
        <div className="flex justify-center gap-3 mt-5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 border rounded-md text-center text-xl focus:border-primary focus:outline-none"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 mt-6 rounded-md hover:bg-red-500 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default Verify;
