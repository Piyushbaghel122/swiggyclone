"use client";

import axios from "axios";
import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { KeyRound, ArrowRight, RefreshCw } from "lucide-react";
import { FormGroup } from "../components/FormGroup";

const api = axios.create({
  baseURL: "http://localhost:8001/api/v1/auth",
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
});

function VerifyOtpContent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const [otp, setOtp] = useState("");
  const router = useRouter();
  
  // Get the mobile number from the URL search parameters or localStorage
  const searchParams = useSearchParams();
  const [mobile, setMobile] = useState<string | null>(null);

  useEffect(() => {
    // 1. Try to get it from the URL first
    const urlMobile = searchParams.get("mobile");
    if (urlMobile) {
      setMobile(urlMobile);
    } else {
      // 2. If it's not in the URL, try localStorage (in case they refreshed or navigated manually)
      const storedMobile = localStorage.getItem("registeredMobile");
      if (storedMobile) {
        setMobile(storedMobile);
      }
    }
  }, [searchParams]);
  // Function to request/resend OTP
  const optRecive = async () => {
    try {
      setResendLoading(true);
      setError(null);
      setSuccessMsg(null);
      
      if (!mobile) {
        throw new Error("Mobile number not found. Please try registering again.");
      }

      // Read mobile state and POST it to resend OTP
      const response = await api.post("/sendOtp", { mobile });
      console.log(response.data);
      setSuccessMsg("OTP has been resent successfully!");
    } catch (error: any) {
      console.log(error, "error not found");
      setError(error.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  // Function to submit and verify OTP
  const submitVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccessMsg(null);
      
      if (!otp || otp.length < 4) {
        throw new Error("Please enter a valid OTP.");
      }
      
      setLoading(true);
      
      // Verify OTP
      const response = await api.post("/verifyotp", { otp });
      
      if (response.data?.success || response.status === 200) {
        // After successful verification, call the /mobile endpoint as requested
        try {
          const mobileResponse = await api.get("/mobile", { params: { mobile } });
          console.log(mobileResponse.data);
          
          if (mobileResponse.data?.success || mobileResponse.status === 200) {
            router.push("/document");
            return;
          }
        } catch (mobileErr) {
          console.log(mobileErr, "Error fetching mobile info");
          // If the mobile check fails but OTP succeeded, you might still want to proceed
          // router.push("/document"); 
        }

        router.push("/dashboard"); // Fallback route if /mobile check isn't strictly enforced
      }
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      
      {/* Left Column - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595858882583-9b9366e67616?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20"></div>
        
        <div className="relative w-full flex flex-col justify-end p-12 lg:p-16 text-white z-10">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium w-max">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Security Verification
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Secure your <span className="text-blue-400">Foodcut</span> Account
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            We use two-factor authentication to keep your partner earnings and data safe.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          
          <div className="mb-8">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <KeyRound className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Verify Identity</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              We've sent a secure code to 
              {mobile ? (
                <span className="font-semibold text-gray-900 dark:text-white block mt-1 text-base">
                   {mobile}
                </span>
              ) : (
                " your registered mobile number."
              )}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-600 dark:text-green-400">
              {successMsg}
            </div>
          )}

          <form onSubmit={submitVerify} className="space-y-5">
            <FormGroup
              id="otp"
              type="text"
              label="One-Time Password (OTP)"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              icon={<KeyRound className="w-5 h-5" />}
              maxLength={6}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Didn't receive the code?
            </p>
            <button
              type="button"
              onClick={optRecive}
              disabled={resendLoading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {resendLoading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Resend OTP
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function VerifyOtp() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}