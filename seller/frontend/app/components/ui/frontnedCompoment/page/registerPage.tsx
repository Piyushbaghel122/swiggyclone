/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { 
    Rocket, 
    Check, 
    Zap, 
    User, 
    Mail, 
    Phone, 
    Lock, 
    EyeOff, 
    Eye, 
    ArrowRight,
    Building2
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "@tanstack/react-router";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Link } from "@tanstack/react-router";


const api = axios.create({
    baseURL : "http://localhost:8001/api/v1/auth",
    withCredentials : true
});



export default function RegisterPage() {
    const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
    const [showPassword, setShowPassword] = useState(false);
    
    // Form States
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [countryCode, setCountryCode] = useState<string>("");
    const [detectedCountryCode, setDetectedCountryCode] = useState<string | null>(null);
    const [password, setPassword] = useState("");

    const getFlagEmoji = (countryCode: string) => {
        return countryCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
    };

    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<Record<string, string> | string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  
    const navigate = useNavigate();

    const validateForm = () => {
    const newErrors: Record<string, string> = {};    let isValid = true;

    // --- Full Name Validation ---
    if (!fullName.trim()) {
        newErrors.fullName = "Full name is required.";
        isValid = false;
    } else if (fullName.trim().length < 3) {
        newErrors.fullName = "Full name must be at least 3 characters long.";
        isValid = false;
    }

    // --- Email Validation ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        newErrors.email = "Email is required.";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address.";
        isValid = false;
    }

    // --- Phone Validation ---
    if (!mobile.trim()) {
        newErrors.mobile = "Phone number is required.";
        isValid = false;
    } else {
        const parseInput = mobile.startsWith('+') ? mobile : '+' + mobile.replace(/\D/g, '');
        const phone = parsePhoneNumberFromString(parseInput);
        if (!phone || !phone.isValid()) {
            newErrors.mobile = "Please enter a valid phone number.";
            isValid = false;
        }
    }

    // --- Password Validation ---
    // Requires at least 8 characters, 1 letter, and 1 number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
        newErrors.password = "Password is required.";
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        newErrors.password = "Password must be at least 8 characters with 1 letter and 1 number.";
        isValid = false;
    }

    // --- Confirm Password Validation ---
    if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
        isValid = false;
    } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
        isValid = false;
    }

    // Update the error state with any errors found
    setError(newErrors);
    
    // Returns true if no errors were found, false if there are errors
    return isValid;
};

const registerSubmit = async (e: React.FormEvent ) => { 
     e.preventDefault();
     if(!validateForm()){
        return;
     }  

    try{
        setLoading(true);
        setError(null);
       const response = await api.post("/register", { 
        user_name: fullName, 
        email,
        mobile_number: mobile,
        countryCode,
        password, 
        confirm_password: confirmPassword
       }, {
        headers: { "Content-Type": "application/json" }
       });
       console.log(response.data);
       if(response.status >= 200 && response.status < 300){
        localStorage.setItem("registeredMobile", mobile);
        setTimeout(() => {
            navigate({ to: "/mobile" });
        }, 0);
       }
       setLoading(false);
       
        } catch (error) {
            if (axios.isAxiosError(error)) {
                let errorMessage = "An unexpected error occurred";
                const data = error.response?.data;
                if (data?.detail) {
                    if (Array.isArray(data.detail)) {
                        errorMessage = data.detail.map((err: any) => `${err.loc?.join('.')} - ${err.msg}`).join(', ');
                    } else if (typeof data.detail === 'string') {
                        errorMessage = data.detail;
                    }
                } else if (data?.message) {
                    errorMessage = data.message;
                }
                setError(errorMessage);
            } else {
                setError("An unexpected error occurred");
            }
            setLoading(false);
        }
     
}

    return (
        <div className="min-h-screen bg-white flex font-sans text-gray-800">
            
            {/* Left Section - Hero/Information */}
            <div className="hidden lg:flex w-[45%] bg-[#F2F0EB] flex-col justify-between relative p-12 overflow-hidden">
                {/* Content */}
                <div className="relative z-10 max-w-md mt-8">
                    {/* Rocket Icon */}
                    <div className="w-12 h-12 bg-[#B34D15] rounded-xl flex items-center justify-center mb-8 shadow-sm">
                        <Rocket className="text-white w-6 h-6" />
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                        Accelerate<br/>Your Career.
                    </h1>
                    <p className="text-gray-600 text-[15px] mb-12 font-medium">
                        Join thousands of professionals finding their<br/>next big opportunity.
                    </p>

                    {/* Features List */}
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-[15px] mb-0.5">Verified Employers</h3>
                                <p className="text-xs text-gray-500 font-medium">Connect with top-tier companies actively hiring.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-[15px] mb-0.5">Instant Matches</h3>
                                <p className="text-xs text-gray-500 font-medium">Our algorithm suggests roles that fit your profile perfectly.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Image Area */}
                <div className="relative z-10 mt-12 w-full flex-1 min-h-0">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/50 w-full h-full">
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                            alt="Team collaboration" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                            <span className="text-[#F59E0B] text-sm">★</span>
                            <span className="text-xs font-bold text-gray-800">4.9/5 Rating from Users</span>
                        </div>
                    </div>
                </div>
                
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-[80%] h-full bg-[#EBE7DF] rounded-l-full opacity-50 -mr-[40%] translate-x-10 scale-150 origin-right"></div>
            </div>

            {/* Right Section - Registration Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 relative">
                
                <div className="w-full max-w-[420px]">
                    <div className="mb-8">
                        <p className="text-sm text-gray-500 font-medium">
                            Already have an account? <Link to="/login" className="text-[#B34D15] font-bold hover:underline">Log In</Link>
                        </p>
                    </div>

                    <form onSubmit={registerSubmit} className="flex flex-col gap-4">
                        
                        {/* Role Selector */}
                        <div className="mb-2">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">I Am A...</p>
                            <div className="flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setRole("candidate")}
                                    className={`flex-1 relative rounded-xl py-4 flex flex-col items-center justify-center gap-2 transition-all border-2 ${
                                        role === "candidate" 
                                        ? "bg-[#FF7D29] border-[#FF7D29] text-white shadow-md shadow-orange-200" 
                                        : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                                    }`}
                                >
                                    {role === "candidate" && (
                                        <div className="absolute top-2 right-2 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                                            <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                                        </div>
                                    )}
                                    <User className="w-5 h-5" />
                                    <span className="text-xs font-bold">Candidate</span>
                                </button>
                                
                                <button 
                                    type="button"
                                    onClick={() => setRole("recruiter")}
                                    className={`flex-1 relative rounded-xl py-4 flex flex-col items-center justify-center gap-2 transition-all border-2 ${
                                        role === "recruiter" 
                                        ? "bg-[#FF7D29] border-[#FF7D29] text-white shadow-md shadow-orange-200" 
                                        : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                                    }`}
                                >
                                    {role === "recruiter" && (
                                        <div className="absolute top-2 right-2 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                                            <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                                        </div>
                                    )}
                                    <Building2 className="w-5 h-5" />
                                    <span className="text-xs font-bold">Recruiter</span>
                                </button>
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FF7D29]">
                                <User className="w-4 h-4 text-gray-400 group-focus-within:text-[#FF7D29] transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full bg-gray-50/80 text-gray-900 text-[13px] font-semibold rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all placeholder:text-gray-400 placeholder:font-medium border border-gray-200 focus:bg-white focus:border-[#FF7D29] focus:ring-4 focus:ring-[#FF7D29]/10 shadow-sm"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FF7D29]">
                                <Mail className="w-4 h-4 text-gray-400 group-focus-within:text-[#FF7D29] transition-colors" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full bg-gray-50/80 text-gray-900 text-[13px] font-semibold rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all placeholder:text-gray-400 placeholder:font-medium border border-gray-200 focus:bg-white focus:border-[#FF7D29] focus:ring-4 focus:ring-[#FF7D29]/10 shadow-sm"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex gap-[12px]">
                            {/* Country Code */}
                            <div className="relative w-[110px] shrink-0 group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none gap-1">
                                    {detectedCountryCode && (
                                        <span className="text-[16px] leading-none -mt-0.5" title={detectedCountryCode}>
                                            {getFlagEmoji(detectedCountryCode)}
                                        </span>
                                    )}
                                    <span className="text-gray-400 font-bold text-[13px]">+</span>
                                </div>
                                <input
                                    type="text"
                                    value={countryCode.replace('+', '')}
                                    onChange={(e) => {
                                        const val = '+' + e.target.value.replace(/\D/g, '');
                                        setCountryCode(val);
                                        const phone = parsePhoneNumberFromString(val + '0000000000');
                                        setDetectedCountryCode(phone?.country || null);
                                    }}
                                    placeholder="91"
                                    className={`w-full bg-gray-50/80 text-gray-900 text-[13px] font-semibold rounded-xl py-3.5 ${detectedCountryCode ? 'pl-11' : 'pl-7'} pr-3 outline-none transition-all placeholder:text-gray-400 placeholder:font-medium border border-gray-200 focus:bg-white focus:border-[#FF7D29] focus:ring-4 focus:ring-[#FF7D29]/10 shadow-sm text-center`}
                                    required
                                />
                            </div>
                            
                            {/* Mobile Number */}
                            <div className="relative flex-1 group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FF7D29]">
                                    <Phone className="w-4 h-4 text-gray-400 group-focus-within:text-[#FF7D29] transition-colors" />
                                </div>
                                <input
                                    type="tel"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="Phone Number"
                                    className="w-full bg-gray-50/80 text-gray-900 text-[13px] font-semibold rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all placeholder:text-gray-400 placeholder:font-medium border border-gray-200 focus:bg-white focus:border-[#FF7D29] focus:ring-4 focus:ring-[#FF7D29]/10 shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="relative group mb-1">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FF7D29]">
                                <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-[#FF7D29] transition-colors" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full bg-gray-50/80 text-gray-900 text-[13px] font-semibold rounded-xl py-3.5 pl-11 pr-12 outline-none transition-all placeholder:text-gray-400 placeholder:font-medium border border-gray-200 focus:bg-white focus:border-[#FF7D29] focus:ring-4 focus:ring-[#FF7D29]/10 shadow-sm"
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
                            >
                                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                        </div>

                        <div className="relative group mb-2">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FF7D29]">
                                <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-[#FF7D29] transition-colors" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full bg-gray-50/80 text-gray-900 text-[13px] font-semibold rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all placeholder:text-gray-400 placeholder:font-medium border border-gray-200 focus:bg-white focus:border-[#FF7D29] focus:ring-4 focus:ring-[#FF7D29]/10 shadow-sm"
                                required
                            />
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-3 mb-2 px-1">
                            <input 
                                type="checkbox" 
                                id="terms"
                                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#FF7D29] focus:ring-[#FF7D29]/40 cursor-pointer"
                                required 
                            />
                            <label htmlFor="terms" className="text-[12px] text-gray-500 font-medium cursor-pointer leading-tight">
                                I agree to the <a href="#" className="text-[#B34D15] font-bold hover:text-[#FF7D29] transition-colors">Terms & Conditions</a> and <a href="#" className="text-[#B34D15] font-bold hover:text-[#FF7D29] transition-colors">Privacy Policy</a>.
                            </label>
                        </div>
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 text-red-600 text-[13px] font-bold p-3 rounded-xl border border-red-100 flex flex-col gap-1 items-center justify-center text-center">
                                {typeof error === 'string' 
                                    ? <p>{error}</p> 
                                    : Object.values(error).map((err, idx) => <p key={idx}>{err}</p>)
                                }
                            </div>
                        )}

                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-gradient-to-r from-[#FF7D29] to-[#E56209] hover:from-[#E56209] hover:to-[#CC5400] text-white rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Register Now
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center my-4 opacity-70">
                            <div className="flex-1 border-t border-gray-200"></div>
                            <span className="px-4 text-[11px] font-bold text-gray-400 tracking-widest uppercase">Or Continue With</span>
                            <div className="flex-1 border-t border-gray-200"></div>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex gap-4">
                            <button type="button" className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md">
                                <FcGoogle className="w-5 h-5" />
                                <span className="text-gray-700 text-[13px] font-bold">Google</span>
                            </button>
                            <button type="button" className="flex-1 bg-[#0A66C2] hover:bg-[#004182] border border-transparent rounded-xl py-3 flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md">
                                <FaLinkedin className="w-5 h-5 text-white" />
                                <span className="text-white text-[13px] font-bold">LinkedIn</span>
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}
