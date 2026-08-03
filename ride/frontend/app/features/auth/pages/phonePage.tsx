import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Formgroup from "../components/FormGraup";
import { useNavigate } from "@tanstack/react-router";

const PhonePage: React.FC = () => {
    const [mobile, setMobile] = useState("");

    const { handleregisterUser, handleSendUser  } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!mobile || mobile.length < 10) {
            alert("Please enter a valid mobile number");
            return;
        }
        
        const mobileNumber = parseInt(mobile);
        
        // Register the user
        await handleregisterUser({ mobile: mobileNumber });
        
        // Send OTP
        await handleSendUser({ mobile: mobileNumber }); 

        // Navigate to OTP page (wrapped in setTimeout to avoid Next.js / React 18 useInsertionEffect conflicts)
        setTimeout(() => {
            navigate({ to: "/auth/otp" }); 
        }, 0);
   };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-xl shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h1>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                    </label>
                    <Formgroup 
                        type="tel" 
                        value={mobile} 
                        placeholder="Enter your number" 
                        onChange={(e) => setMobile(e.target.value)} 
                    />
                </div>

                <button 
                    type="submit" 
                    className="cursor-pointer w-full mt-4 bg-orange-500 text-white font-bold py-3 px-4 rounded hover:bg-orange-600 transition-colors"
                >
                    Continue
                </button>
            </form>
        </div>
    )
}

export default PhonePage;