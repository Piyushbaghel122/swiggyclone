import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001/api/v1/auth/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export default function Mobile() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [maskedNumber, setMaskedNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(59);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Fetch the user's mobile number on mount
  useEffect(() => {
    const fetchMobileData = async () => {
      try {
        const response = await api.get("/getMe");
        const num = response.data?.data?.mobilenumber || "";
        setMobileNumber(num);
        if (num && num.length >= 10) {
          const countryCode = "+91"; 
          const lastThree = num.slice(-3);
          setMaskedNumber(`${countryCode} **** **${lastThree}`);
        } else {
          setMaskedNumber(num);
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setError("Could not load your phone number. Please try again.");
      }
    };
    fetchMobileData();
  }, []);

  // Timer logic for resend OTP
  useEffect(() => {
    if (timeLeft <= 0 || success) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, success]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    try {
      setError(null);
      await api.post("/resend-otp", { mobile_number: mobileNumber });
      setTimeLeft(59);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to resend OTP");
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await api.post("/verify-otp", { 
        mobile_number: mobileNumber,
        otp: otpCode 
      });
      setSuccess(true);
      // Automatically redirect after 1.5 seconds so they can see the success checkmark
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center max-w-md w-full relative">
        
        {/* Top Icon and Headers */}
        <div className="flex flex-col items-center text-center mb-6 w-full">
          <div className="w-12 h-12 bg-[#f47f20] rounded-full flex items-center justify-center mb-4 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Verify your Identity</h2>
          <p className="text-sm text-gray-500 mb-2">Enter the 6-digit code sent to your registered number</p>
          <p className="text-sm font-bold text-gray-900 tracking-wider">
            {maskedNumber || "Loading number..."}
          </p>
        </div>

        {error && <div className="w-full p-3 mb-6 bg-red-50 text-red-600 text-sm rounded-md text-center">{error}</div>}

        {success ? (
          /* Success View */
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <div className="w-20 h-20 rounded-full border-[3px] border-[#994d00] flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-[#994d00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Verification Successful!</h3>
            <p className="text-center text-gray-500 mb-8 text-sm">
              Your identity has been securely verified. Preparing your dashboard...
            </p>
            <button 
              onClick={() => navigate("/dashboard")}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          /* OTP Input View */
          <div className="w-full flex flex-col items-center mt-2">
            <div className="flex justify-between gap-2 w-full mb-6 px-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 bg-gray-50 border border-gray-200 rounded-lg text-center text-xl font-bold text-gray-800 focus:bg-white focus:border-[#994d00] focus:ring-1 focus:ring-[#994d00] outline-none transition-all"
                />
              ))}
            </div>

            <div className="flex justify-between items-center w-full px-4 mb-8">
              <span className="text-sm font-medium text-gray-500">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
              <button 
                onClick={handleResend}
                disabled={timeLeft > 0}
                className={`text-sm font-bold transition-colors ${timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-[#994d00] hover:text-[#804000]"}`}
              >
                Resend OTP
              </button>
            </div>

            <button 
              onClick={handleVerify}
              disabled={loading || otp.join("").length !== 6}
              className="w-full bg-[#cda989] hover:bg-[#b88f6c] text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}