import { FormGroup } from "../components/FormGroup";
import { useState } from "react";
import { Phone, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";

export default function EditPhoneNumber() {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleBlurValidation = () => {
        if (phoneNumber.length > 0 && phoneNumber.length < 10) {
            setError("Please enter a valid 10-digit phone number");
        } else {
            setError("");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (phoneNumber.length !== 10) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }

        setLoading(true);
        // Mock API Call to update phone number
        setTimeout(() => {
            setLoading(false);
            // Redirect to OTP verification page
            navigate({ to: "/sendOtp" });
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm py-4 px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
                <button onClick={() => window.history.back()} className="text-orange-500 hover:bg-orange-50 p-2 rounded-full transition-colors cursor-pointer focus:outline-none">
                    <ArrowLeft size={24} />
                </button>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="text-xl md:text-2xl font-extrabold text-orange-500 tracking-tight">
                        SWIGGY CLONE
                    </h1>
                </div>
                <div className="w-10"></div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-8 md:p-10 mb-8">
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Phone size={28} strokeWidth={2.2} />
                    </div>

                    {/* Headings */}
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                        Edit Phone Number
                    </h2>
                    <p className="text-center text-gray-500 text-sm mb-8 leading-relaxed px-2">
                        Enter your new mobile number to receive an OTP for verification.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <FormGroup
                                id="phoneNumber"
                                label="Mobile Number"
                                placeholder="10 digit mobile number"
                                type="tel"
                                prefix="+91"
                                value={phoneNumber}
                                onChange={(e) => {
                                    // Allow only numbers, max 10 length
                                    const val = e.target.value.replace(/\D/g, '').substring(0, 10);
                                    setPhoneNumber(val);
                                    if (error) setError("");
                                }}
                                onBlur={handleBlurValidation}
                                error={error}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || phoneNumber.length !== 10}
                            className="w-full bg-orange-500 text-white font-bold text-sm py-4 rounded-lg hover:bg-orange-600 transition-colors uppercase tracking-wide shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mb-6"
                        >
                            {loading ? "UPDATING..." : "UPDATE & VERIFY"}
                        </button>
                    </form>

                    {/* Cancel Link */}
                    <div className="text-center">
                        <Link to="/sendOtp" className="text-xs font-bold text-gray-500 uppercase tracking-wide hover:text-gray-800 hover:underline cursor-pointer">
                            CANCEL
                        </Link>
                    </div>
                </div>
                
                <p className="text-xs text-gray-400 font-medium pb-4">
                    © 2024 Swiggy Clone. All rights reserved.
                </p>
            </main>
        </div>
    );
}