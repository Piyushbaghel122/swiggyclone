import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router"; 
import { Key } from "lucide-react";

const api = axios.create({
    baseURL : "http://localhost:8001/api/v1/auth",
    headers: {
      "content-type": "application/json"
    },
    withCredentials : true
})

export default function OptVerify() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [mobile, setMobile] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the registered mobile number from localStorage
        const storedMobile = localStorage.getItem("registeredMobile");
        if (storedMobile) {
            setMobile(storedMobile);
        }
    }, []);

    const handleVerify = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            setError("Please enter the complete 6-digit code.");
            return;
        }

        try { 
            setLoading(true);
            setError(null);
            
            const response = await api.get("/mobile", { params: { mobile, otp: otpValue } });
            console.log(response.data);
            
            // Redirect to dashboard on success
            setTimeout(() => {
                navigate({ to: "/seller" });
            }, 0);
            
        } catch(err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.detail || "Incorrect code. Please try again.");
            } else {
                setError("Incorrect code. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(-1);
        }
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };
    
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };
     
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
            {/* Dot Pattern Background */}
            <div 
                className="absolute inset-0 z-0 opacity-40" 
                style={{ 
                    backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)', 
                    backgroundSize: '24px 24px' 
                }}
            ></div>
            
            {/* Subtle Gradient overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-indigo-100/40 via-transparent to-purple-50/30"></div>

            <div className="w-full max-w-[400px] bg-white/90 backdrop-blur-sm border-[2.5px] border-[#8C9AD6] rounded-xl shadow-2xl relative z-10 overflow-hidden flex flex-col items-center pt-10 pb-12 px-8">
                
                {/* Top Icon */}
                <div className="w-14 h-14 rounded-full bg-[#E5E9F5] flex items-center justify-center mb-6">
                    <Key className="w-5 h-5 text-[#42526E]" />
                </div>

                {/* Text Content */}
                <h1 className="text-lg font-bold text-[#2C3345] mb-4">Verify Your Identity</h1>
                <p className="text-center text-[13px] text-[#6B799E] leading-relaxed mb-8 px-2 font-medium">
                    We have sent a bespoke 6-digit access code to<br/>
                    <span className="font-bold text-gray-800 tracking-wider">
                        {mobile ? `*** *** ${mobile.slice(-4)}` : "your mobile number"}
                    </span>
                </p>

                {/* OTP Inputs */}
                <div className="flex gap-2 justify-center mb-6 w-full">
                {
                    otp.map((digit, i) => (
                        <input
                            key={i}
                            id={`otp-input-${i}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className="w-12 h-12 text-center text-xl font-bold bg-white border-2 border-[#E5E9F5] rounded-lg focus:border-[#8C9AD6] focus:outline-none transition-colors text-[#2C3345] shadow-sm"
                        />
                    ))     
                }
                </div>

                {/* Error Message */}
                <div className="h-6 mb-4 flex items-center justify-center w-full">
                    {error && (
                        <p className="text-[#E04B5A] text-[11px] font-bold">{error}</p>
                    )}
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    className="w-full h-12 bg-[#8C9AD6] hover:bg-[#7a88c4] active:bg-[#6876b0] text-white font-bold text-[13px] tracking-wider rounded disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm"
                    disabled={loading}
                >
                    {loading ? "VERIFYING..." : "VERIFY"}
                </button>
            </div>
        </div>
    );
}
