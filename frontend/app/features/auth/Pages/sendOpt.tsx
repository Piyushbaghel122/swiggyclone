import { useState, useRef, KeyboardEvent, ChangeEvent, ClipboardEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Smartphone, ShieldCheck, Lock } from "lucide-react";
import { verifyOtp } from "../services/api";

export default function SendOtp() {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        // Only take the last character in case they type multiple fast
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if value exists
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            // Move to previous input on backspace if current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
        
        // Ensure pasted data is only numbers
        if (!/^\d+$/.test(pastedData.join(""))) return;

        const newOtp = [...otp];
        pastedData.forEach((char, index) => {
            if (index < 6) {
                newOtp[index] = char;
            }
        });
        setOtp(newOtp);

        // Focus the next empty input or the last one
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleVerify = async () => {
        const otpString = otp.join("");
        if (otpString.length < 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            // Mock or use real API here
            await verifyOtp();
            
            // Assuming successful verification
            setTimeout(() => {
                navigate({ to: "/" });
            }, 1000);
        } catch (err) {
            setError("Invalid OTP. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm py-4 px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
                <button onClick={() => window.history.back()} className="text-orange-500 hover:bg-orange-50 p-2 rounded-full transition-colors cursor-pointer">
                    <ArrowLeft size={24} />
                </button>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="text-xl md:text-2xl font-extrabold text-orange-500 tracking-tight">
                        SWIGGY CLONE
                    </h1>
                </div>
                <div className="w-10"></div> {/* Spacer for centering */}
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-8 md:p-10 mb-8">
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                        <Smartphone size={28} strokeWidth={2.2} />
                        <div className="absolute -right-1 top-2 bg-orange-500 w-2.5 h-2.5 rounded-full border-2 border-white"></div>
                    </div>

                    {/* Headings */}
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                        Verify OTP
                    </h2>
                    <p className="text-center text-gray-500 text-sm mb-1">
                        We've sent a 6-digit code to your mobile number
                    </p>
                    <p className="text-center text-sm font-bold text-gray-900 mb-8">
                        +91 98765 43210 <Link to="/register" className="text-orange-500 font-semibold ml-1 cursor-pointer hover:underline">Edit</Link>
                    </p>

                    {error && (
                        <p className="text-red-500 text-xs font-semibold text-center mb-4">{error}</p>
                    )}

                    {/* OTP Inputs */}
                    <div className="flex justify-between items-center mb-8 gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-14 md:w-14 md:h-14 border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-800 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        className="w-full bg-orange-500 text-white font-bold text-sm py-4 rounded-lg hover:bg-orange-600 transition-colors uppercase tracking-wide shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mb-6"
                    >
                        {loading ? "Verifying..." : "Verify & Proceed"}
                    </button>

                    {/* Resend Link */}
                    <div className="text-center mb-8">
                        <button className="text-xs font-bold text-orange-500 uppercase tracking-wide hover:underline cursor-pointer">
                            Resend OTP
                        </button>
                    </div>

                    <div className="border-t border-gray-100 my-4"></div>

                    {/* Footer Badges */}
                    <div className="flex justify-center items-center space-x-6 text-gray-400 mt-6">
                        <div className="flex items-center text-[10px] font-bold tracking-wider uppercase">
                            <ShieldCheck size={14} className="mr-1.5" />
                            Secure
                        </div>
                        <div className="flex items-center text-[10px] font-bold tracking-wider uppercase">
                            <Lock size={14} className="mr-1.5" />
                            Encrypted
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-400 font-medium pb-4">
                    © 2024 Swiggy Clone. All rights reserved.
                </p>
            </main>
        </div>
    );
}
