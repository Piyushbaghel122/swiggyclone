/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios from "axios";
import  FormGroup  from '../components/FormGroup';
import CustomPhoneInput from '../components/CustomPhoneInput';
import { useNavigate } from 'react-router-dom';
// import api from './api'; // Uncomment when ready to connect to your backend

const api = axios.create({
    baseURL:"http://localhost:8001/api/v1/auth",
    headers:{
        "Content-Type": "application/json"
    }, 
    withCredentials:true
})

const RegisterPage = () => {
  // --- Form State ---
  const [accountType, setAccountType] = useState<'candidate' | 'recruiter'>('candidate');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  // Country code is now handled inside CustomPhoneInput
  // and the final E.164 string is stored in phoneNumber

  // --- UI State ---
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);

  // mobile 

const navigate = useNavigate();


  // --- Validation Logic ---
  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Username is required.";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Username must be at least 3 characters long.";
    } else if (!/^[a-zA-Z\s]*$/.test(fullName)) {
      newErrors.fullName = "Username can only contain letters and spaces.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone number validation using libphonenumber-js
    // Basic phone number validation, since react-phone-number-input formats it
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the Terms & Conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handled by CustomPhoneInput
  // const handlePhoneChange = ...

  // --- Submit Handler ---
  const registerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/register", {
        accountType,
        user_name: fullName,
        email,
        mobile_number: phoneNumber,
        password,
        confirm_password: confirmPassword,
        countryCode: "+91",
      });
      console.log(response.data);
      setSuccess("Account created successfully! Redirecting...");
      setErrors({});
      if(response.data){
      navigate("/mobile");
     }

    } catch (err: any) {
      let errorMessage = "Registration failed.";
      if (err.response?.data?.detail) {
        if (typeof err.response.data.detail === 'string') {
          errorMessage = err.response.data.detail;
        } else if (Array.isArray(err.response.data.detail)) {
          // Extract validation error message from FastAPI
          errorMessage = err.response.data.detail.map((e: any) => e.msg).join(", ");
        }
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setErrors({ form: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex min-h-screen bg-white font-sans text-gray-800">
      
      {/* LEFT PANEL - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col w-1/2 bg-[#f4ece1] p-12 relative overflow-hidden">
        <div className="z-10 max-w-md mt-10">
          <div className="bg-[#b35900] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 leading-tight text-gray-900">Accelerate<br/>Your Career.</h1>
          <p className="text-gray-600 mb-10">Join thousands of professionals finding their next big opportunity.</p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Verified Employers</h3>
                <p className="text-sm text-gray-500">Connect with top-tier companies actively hiring.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Instant Matches</h3>
                <p className="text-sm text-gray-500">Our algorithm suggests roles that fit your profile perfectly.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Placeholder for the bottom left image */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gray-300 rounded-tr-3xl opacity-50" style={{backgroundImage: 'url(https://source.unsplash.com/random/800x600/?office,people)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
      </div>

      {/* RIGHT PANEL - Form */}
      <div className="flex flex-col w-full lg:w-1/2 p-8 sm:p-16 xl:p-24 justify-center">
        
        {/* Back button placeholder */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center text-sm font-semibold cursor-pointer">
           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Order Tracking
        </div>

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create Account</h2>
          <p className="text-sm text-gray-500 mb-8">Already have an account? <a href="#" className="text-[#a65c19] font-bold hover:underline">Log In</a></p>

          <form onSubmit={registerSubmit} className="space-y-4">
            
            {/* Account Type Toggle */}
            <div className="mb-6">
              <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">I am a...</span>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setAccountType('candidate')}
                  className={`flex-1 flex items-center justify-center py-3 rounded-lg border-2 transition-all relative ${accountType === 'candidate' ? 'bg-[#f47f20] border-[#f47f20] text-white shadow-md' : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  Candidate
                  {accountType === 'candidate' && <div className="absolute top-1.5 right-1.5 bg-black rounded-full p-0.5"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>}
                </button>
                <button 
                  type="button"
                  onClick={() => setAccountType('recruiter')}
                  className={`flex-1 flex items-center justify-center py-3 rounded-lg border-2 transition-all relative ${accountType === 'recruiter' ? 'bg-[#f47f20] border-[#f47f20] text-white shadow-md' : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  Recruiter
                  {accountType === 'recruiter' && <div className="absolute top-1.5 right-1.5 bg-black rounded-full p-0.5"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>}
                </button>
              </div>
            </div>

            {/* General Form Error / Success */}
            {errors.form && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">{errors.form}</div>}
            {success && <div className="p-3 bg-green-50 text-green-600 text-sm rounded-md">{success}</div>}

            {/* Inputs */}
            <div>
              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 focus-within:border-gray-300 focus-within:bg-white transition-all">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                <FormGroup type="text" placeholder="Username" className="bg-transparent border-none outline-none w-full text-sm" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 focus-within:border-gray-300 focus-within:bg-white transition-all">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <FormGroup type="email" placeholder="Email Address" className="bg-transparent border-none outline-none w-full text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 focus-within:border-gray-300 focus-within:bg-white transition-all">
                <CustomPhoneInput value={phoneNumber} setValue={setPhoneNumber} className="w-full" />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>

            <div>
              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 focus-within:border-gray-300 focus-within:bg-white transition-all">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <FormGroup type={showPassword ? "text" : "password"} placeholder="Password" className="bg-transparent border-none outline-none w-full text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 focus-within:border-gray-300 focus-within:bg-white transition-all">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                <FormGroup type={showPassword ? "text" : "password"} placeholder="Confirm Password" className="bg-transparent border-none outline-none w-full text-sm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <FormGroup type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#a65c19] focus:ring-[#a65c19]" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
                <span className="text-xs text-gray-500">I agree to the <a href="#" className="text-[#a65c19] hover:underline">Terms & Conditions</a> and <a href="#" className="text-[#a65c19] hover:underline">Privacy Policy</a>.</span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="w-full bg-[#994d00] hover:bg-[#804000] text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center gap-2 transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? "Processing..." : "Register Now"}
              {!loading && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
            </button>

          </form>

          {/* Social Logins */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400 uppercase tracking-wider">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              <button className="flex items-center justify-center py-2.5 bg-[#0a66c2] text-white rounded-lg hover:bg-[#004182] transition-colors">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span className="text-sm font-medium">LinkedIn</span>
              </button>
            </div>
          </div>
          

        </div>
      </div>
    </div>
    </>
  );
};

export default RegisterPage;