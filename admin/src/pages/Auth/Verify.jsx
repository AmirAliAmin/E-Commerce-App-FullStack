import React, { useState, useRef } from "react";
import Security from '../../assets/security.png';
import { Link } from "react-router-dom";

function Verify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  // Handle input
  const handleChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    alert("OTP Entered: " + otp.join(""));
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
    

     <div className=" mt-30">
      <div className="card shadow-md w-100 m-auto rounded-md bg-white p-6">
        <div className="text-center flex items-center justify-center">
          <img src={Security} alt="security" className="w-20" />
        </div>

        <h1 className="text-center text-[18px] font-bold mt-4 mb-3">Verify OTP</h1>
        <p className="text-center mt-2 mb-4">OTP send to <span className="text-primary font-bold">aliaminamir@gmail.com</span></p>

        {/* OTP Boxes */}
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
              className="w-12 h-12 border rounded-md text-center text-xl focus:border-blue-500 focus:outline-none"
            />
          ))}
        </div>

        {/* Submit Button */}
        
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 mt-6 rounded-md hover:bg-red-500"
        >
          Verify
        </button>
      </div>
    </div>
    </section>
  );
}

export default Verify;
