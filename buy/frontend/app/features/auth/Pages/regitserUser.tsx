/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { FormGroup } from "../components/FormGroup";
import { User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import  useAuth  from "../hook/useAuth";
import authImage from "../image/image.png";
import Image from "next/image";

export default function RegisterUser() {
    const [username, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading , setLoading] = useState<boolean>(false)

    const navigate = useNavigate();
    const { handleRegisterUser  } = useAuth();

    const handleEmail = () => {
        const inputEmail = email;

        if (!email) {
            throw new Error("Email is required");
        }
        const formattedEmail = inputEmail.trim();

        if (!formattedEmail.includes('@')) {
            throw new Error("Invalid email");
        }
        if (formattedEmail === '') {
            throw new Error("Email cannot be empty");
        }
        if (formattedEmail.length >= 50) {
            throw new Error("Email is too long please enter real email");
        }
        if (!formattedEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            throw new Error("Invalid email");
        }
    }

    const handleFullName = () => {
        const inputFullName = username.trim();
        if (!inputFullName) {
            throw new Error("Full name is required");
        }
        if (inputFullName.length >= 50) {
            throw new Error("Full name is too long please enter real name");
        }
        if (!inputFullName.match(/^[a-zA-Z ]+$/)) {
            throw new Error("Invalid full name");
        }
    }

    const handleMobileNumber = () => {
        const inputMobile = mobileNumber.trim();
        if (!inputMobile) {
            throw new Error("Mobile number is required");
        }
        if (!/^\d{10}$/.test(inputMobile)) {
            throw new Error("Invalid mobile number. Must be 10 digits.");
        }
    }

    const handlePassword = () => {
        if (!password) {
            throw new Error("Password is required");
        }

        const trimmedPassword = password.trim();

        if (trimmedPassword.length < 8) {
            throw new Error("Password must be at least 8 characters");
        }

        if (trimmedPassword.length > 128) {
            throw new Error("Password cannot exceed 128 characters");
        }

        // First letter must be uppercase
        if (!/^[A-Z]/.test(trimmedPassword)) {
            throw new Error("Password must start with an uppercase letter");
        }

        // At least one lowercase letter
        if (!/[a-z]/.test(trimmedPassword)) {
            throw new Error("Password must contain at least one lowercase letter");
        }

        // At least one number
        if (!/\d/.test(trimmedPassword)) {
            throw new Error("Password must contain at least one number");
        }

        // At least one special character
        if (!/[@#$%^&*()!]/.test(trimmedPassword)) {
            throw new Error(
                "Password must contain at least one special character (@#$%^&*()!)"
            );
        }

        // Only allow valid characters
        if (!/^[A-Za-z0-9@#$%^&*()!]+$/.test(trimmedPassword)) {
            throw new Error("Password contains invalid characters");
        }
    };

    const handleBlurValidation = (validator: () => void) => {
        try {
            validator();
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            handleFullName();
            handleEmail();
            handleMobileNumber();
            handlePassword();

            const data = await handleRegisterUser({
                username,
                email, 
                password,
                mobile: mobileNumber,
            });

            if (data?.status === 201 || data?.status === 200 || data?.user_id || data?.message || data?.user) {
                window.location.href = "/dashboard";
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-center font-sans">
            <div className="w-full max-w-[1000px] bg-white shadow-xl rounded-2xl flex overflow-hidden min-h-[650px]">
                {/* Left Side - Image & Hero Text */}
                <div className="hidden md:block w-1/2 relative bg-orange-50">
                    <Image 
                        src={authImage} 
                        alt="Delicious food" 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                    
                    {/* Floating Pill */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                        <span>⭐</span> 550+ New Restaurants Added
                    </div>

                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 w-full p-10 text-white">
                        <h2 className="text-4xl font-bold mb-3 tracking-tight">Taste the extraordinary.</h2>
                        <p className="text-gray-200 text-lg max-w-sm">Join the thousands of food lovers getting their favorites delivered in minutes.</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 lg:p-14 flex flex-col justify-center">
                    <h1 className="text-orange-500 font-bold text-lg uppercase tracking-wider mb-8">SWIGGY CLONE</h1>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-sm text-gray-500 mb-8">Sign up to get started on your culinary journey</p>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormGroup
                            id="fullName"
                            label="Full Name"
                            placeholder="Enter your name"
                            icon={<User size={18} />}
                            onBlur={() => handleBlurValidation(handleFullName)}
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <FormGroup
                            id="email"
                            type="text"
                            label="Email Address"
                            placeholder="example@email.com"
                            icon={<Mail size={18} />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => handleBlurValidation(handleEmail)}
                        />
                        <FormGroup
                            id="mobileNumber"
                            type="tel"
                            label="Mobile Number"
                            placeholder="98765 43210"
                            prefix="+91"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            onBlur={() => handleBlurValidation(handleMobileNumber)}
                        />
                        <FormGroup
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            icon={<Lock size={18} />}
                            onBlur={() => handleBlurValidation(handlePassword)}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button 
                            onClick={handleSubmit}
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-lg hover:bg-orange-600 transition-colors mt-8 flex justify-center items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? "Loading..." : "Continue ➔"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-8 flex items-center">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-4 text-xs text-gray-400 font-medium">Or register with</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* Google Button */}
                    <button className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 rounded-lg flex justify-center items-center gap-3 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                        Continue with Google
                    </button>

                    {/* Footer Links */}
                    <div className="mt-8 text-center space-y-3">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-orange-500 font-semibold hover:underline cursor-pointer">SignIn</Link>
                        </p>
                        <p className="text-xs text-gray-400">
                            By continuing, you agree to our{" "}
                            <a href="#" className="underline hover:text-gray-600 cursor-pointer">Terms</a> &{" "}
                            <a href="#" className="underline hover:text-gray-600 cursor-pointer">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}