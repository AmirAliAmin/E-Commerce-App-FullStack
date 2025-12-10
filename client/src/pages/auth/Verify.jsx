import React, { useState, useRef } from "react";
import Security from "../../assets/security.png";

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
    <div className="container">
      <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-6">
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
  );
}

export default Verify;
