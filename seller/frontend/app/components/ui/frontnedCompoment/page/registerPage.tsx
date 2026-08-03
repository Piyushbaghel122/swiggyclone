import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Lock, Eye, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import {faGithub } from "r"

export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");

    const validateEmailOrPhone = () => {
        if (!email) {
            setEmailError("Email or Phone is required");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        
        if (!emailRegex.test(email) && !phoneRegex.test(email)) {
            setEmailError("Please enter a valid email or 10-digit phone number.");
            return false;
        }
        setEmailError("");
        return true;
    };

    const submitregister = () => {
        if (!validateEmailOrPhone()) return;
        if (password.length < 8) {
            console.log("Password too short");
            return;
        }
        const isEmail = email.includes("@");
        const submissionData = {
            [isEmail ? 'email' : 'mobile']: email,
            password
        };
        console.log("Submitting:", submissionData);
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-sans">
            {/* Mobile Container */}
            <div className="bg-[#FDFBF7] w-full max-w-[480px] h-full sm:h-auto sm:min-h-[600px] sm:shadow-xl sm:rounded-[40px] overflow-hidden flex flex-col relative sm:border border-[#E8E4D9]">
                

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center px-6 pt-2 pb-8">
                    
                    {/* Big Logo Area */}
                    <div className="w-24 h-24 bg-white shadow-sm border border-[#EFEBE4] rounded-2xl flex flex-col items-center justify-center mb-4">
                         <div className="flex items-center gap-1">
                             <div className="w-6 h-6 bg-[#FF6B00] rounded-full flex items-center justify-center text-white text-[10px]">🍴</div>
                             <span className="text-black font-bold text-xs">Vibrant</span>
                         </div>
                         <span className="text-black font-bold text-xs">Cravings</span>
                    </div>
                    <h1 className="text-[#B94F18] text-xl font-medium mb-1">Vibrant Cravings</h1>
                    <p className="text-[#8C7A6B] text-[13px] mb-8 text-center">Fueling your culinary adventures</p>

                    {/* Form Card */}
                    <div className="w-full bg-[#F6F2EB] rounded-[28px] p-6 shadow-sm">
                        <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); submitregister(); }}>
                            
                            {/* Email or Phone */}
                            <div>
                                <label className="block text-[#4A3F35] text-sm font-medium mb-2">Email or Phone</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-[18px] h-[18px] text-[#8C7A6B]" />
                                    </div>
                                    <input 
                                        type="text"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError("");
                                        }}
                                        onBlur={validateEmailOrPhone}
                                        placeholder="chef@vibrantcravings.com" 
                                        className={`w-full bg-[#FDFBF7] text-[#4A3F35] text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all placeholder:text-[#AFA195] border ${
                                            emailError
                                              ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                              : "border-transparent focus:ring-1 focus:ring-[#B94F18]"
                                        }`}
                                    />
                                </div>
                                {emailError && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-[#4A3F35] text-sm font-medium">Password</label>
                                    <a href="#" className="text-[#9E300B] text-[13px] font-medium hover:underline">Forgot Password?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-[18px] h-[18px] text-[#8C7A6B]" />
                                    </div>
                                    <input 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••" 
                                        className="w-full bg-[#FDFBF7] text-[#4A3F35] text-sm rounded-xl py-3.5 pl-11 pr-12 focus:outline-none focus:ring-1 focus:ring-[#B94F18] transition-all placeholder:text-[#AFA195] tracking-[0.2em]"
                                    />
                                    <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#8C7A6B] hover:text-[#4A3F35]">
                                        <Eye className="w-[18px] h-[18px]" />
                                    </button>
                                </div>
                            </div>

                            {/* Sign In Button */}
                            <button type="submit" className="w-full bg-[#9E300B] hover:bg-[#862709] text-white rounded-xl py-3.5 mt-1 text-[15px] font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
                                Sign In
                                <ArrowRight className="w-[18px] h-[18px]" />
                            </button>

                            {/* Divider */}
                            <div className="flex items-center my-3 opacity-70">
                                <div className="flex-1 border-t border-[#D5C9B8]"></div>
                                <span className="px-4 text-[11px] font-medium text-[#8C7A6B] tracking-wider uppercase">OR CONTINUE WITH</span>
                                <div className="flex-1 border-t border-[#D5C9B8]"></div>
                            </div>

                            {/* Social Buttons */}
                            <div className="flex gap-4">
                                <button type="button" className="flex-1 bg-[#FDFBF7] hover:bg-white border border-[#E8E4D9] rounded-xl py-3 flex items-center justify-center gap-2 transition-all">
                                    <FcGoogle className="w-[18px] h-[18px]" />
                                    <span className="text-[#4A3F35] text-[13px] font-medium">Google</span>
                                </button>
                                <button type="button" className="flex-1 bg-[#FDFBF7] hover:bg-white border border-[#E8E4D9] rounded-xl py-3 flex items-center justify-center gap-2 transition-all">
                                    <FaApple className="w-[18px] h-[18px] text-black" />
                                    <span className="text-[#4A3F35] text-[13px] font-medium">Apple</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-[14px]">
                        <span className="text-[#8C7A6B]">New here? </span>
                        <Link to="/register" className="text-[#9E300B] font-medium hover:underline">Create account</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
