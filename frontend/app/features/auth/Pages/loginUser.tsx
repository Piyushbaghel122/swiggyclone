import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import useAuth from "../hook/useAuth";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import authImage from "../image/image2.png";

export default function LoginUser() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { handleLoginUser } = useAuth();
   
    const handleEmail = () => {
        const inputEmail = email.trim();
        if (!inputEmail) {
            throw new Error("Email or Mobile Number is required");
        }
    };

    const handlePassword = () => {
        if (!password) {
            throw new Error("Password is required");
        }
    };

    const handleBlurValidation = (validator: () => void) => {
        try {
            validator();
            setError("");
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            
            handleEmail();
            handlePassword();

            const data = await handleLoginUser({
                email: email, 
                password,
            });

            if (data?.status === 201 || data?.status === 200 || data?.user) {
                navigate({
                    to: "/dashboard",
                });
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-center font-sans">
            <div className="w-full max-w-[900px] bg-white shadow-xl flex overflow-hidden min-h-[600px] rounded-lg">
                
                {/* Left Side - Image & Hero Text */}
                <div className="hidden md:block w-1/2 relative">
                    <Image 
                        src={authImage} 
                        alt="Delicious food" 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover" 
                    />
                    
                    {/* Bottom Content */}
                    <div className="absolute bottom-10 left-0 w-full p-10 text-white">
                        <p className="text-white text-xl font-bold max-w-sm drop-shadow-md">
                            Quick delivery, fresh meals, and a seamless login experience to get you eating faster.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white relative">
                    
                    <div className="flex items-baseline justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 inline-block relative pb-2">
                                Login
                                <span className="absolute bottom-0 left-0 w-10 h-1 bg-black"></span>
                            </h2>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">or </span>
                            <Link to="/register" className="text-orange-500 font-semibold hover:underline cursor-pointer">
                                create an account
                            </Link>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 text-sm mb-6 border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        <div>
                            <input
                                id="email"
                                type="text"
                                placeholder="Email or Mobile Number"
                                className="w-full border border-gray-300 px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => handleBlurValidation(handleEmail)}
                            />
                        </div>

                        <div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full border border-gray-300 px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => handleBlurValidation(handlePassword)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link to="/sendlink" className="text-xs text-gray-500 hover:text-gray-800 hover:underline cursor-pointer">
                                Forgot Password?
                            </Link>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-orange-500 text-white font-bold py-4 hover:bg-orange-600 transition-colors mt-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? "LOADING..." : "LOGIN"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-4 text-xs text-gray-400 font-medium">OR</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* Google Button */}
                    <button type="button" className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3.5 flex justify-center items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                        Login with Google
                    </button>

                    {/* Footer Links */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            By clicking on Login, I accept the <a href="#" className="text-black font-semibold hover:underline cursor-pointer">Terms & Conditions</a> & <a href="#" className="text-black font-semibold hover:underline cursor-pointer">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}