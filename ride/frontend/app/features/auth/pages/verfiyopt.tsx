"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function VerifyOtp() {
    const [otp, setOtp] = useState<string>("");
    const [timer, setTimer] = useState(45);
    const { handleVerifyUser } = useAuth();
    // Assuming mobile is stored or passed via router/context. Hardcoding for UI demo:
    const mobile = "+1 (000) 000-0000"; 

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleKeyPress = (key: string) => {
        if (otp.length < 4) {
            setOtp(prev => prev + key);
        }
    };

    const handleDelete = () => {
        setOtp(prev => prev.slice(0, -1));
    };

    const handleVerify = () => {
        if (otp.length === 4) {
            // Ideally pass actual mobile number from state here
            handleVerifyUser({ mobile: 0, otp: parseInt(otp, 10) });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 items-center">
            <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-md">
                
                {/* Header */}
                <div className="p-4 flex items-center">
                    <button className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex-1 text-center font-semibold text-blue-500">Logo</div>
                </div>

                {/* Content */}
                <div className="px-8 pt-4 flex-1 flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-gray-800 self-start mb-4">Verify Phone</h1>
                    <p className="text-gray-500 text-left w-full mb-8">
                        Enter the 4-digit code sent to<br/>
                        <span className="font-semibold text-gray-700">{mobile}</span>
                    </p>

                    {/* OTP Display */}
                    <div className="flex space-x-6 mb-12">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="w-4 h-4 flex items-center justify-center">
                                {otp[index] ? (
                                    <span className="text-2xl font-bold text-gray-800">{otp[index]}</span>
                                ) : (
                                    <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Timer and Resend */}
                    <div className="flex items-center text-gray-400 text-sm w-full justify-center mb-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Resend code in 00:{timer < 10 ? `0${timer}` : timer}</span>
                    </div>
                    <button 
                        disabled={timer > 0} 
                        className={`text-sm font-semibold mb-8 ${timer === 0 ? 'text-blue-500 hover:text-blue-700' : 'text-blue-300'}`}
                        onClick={() => setTimer(45)}
                    >
                        Resend SMS
                    </button>

                    {/* Verify Button */}
                    <button 
                        onClick={handleVerify}
                        disabled={otp.length < 4}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-colors mb-8 ${
                            otp.length === 4 ? "bg-gray-800 text-white hover:bg-gray-900" : "bg-gray-100 text-gray-400"
                        }`}
                    >
                        Verify & Proceed
                    </button>

                    {/* Spacer to push keypad down */}
                    <div className="flex-1"></div>
                </div>

                {/* Keypad */}
                <div className="bg-gray-50 pb-8 pt-4 px-6 grid grid-cols-3 gap-y-6 text-2xl font-medium text-gray-800">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button key={num} onClick={() => handleKeyPress(num.toString())} className="flex items-center justify-center py-3 hover:bg-gray-200 rounded-xl active:bg-gray-300 transition-colors">
                            {num}
                        </button>
                    ))}
                    <div className="col-start-2">
                        <button onClick={() => handleKeyPress("0")} className="w-full flex items-center justify-center py-3 hover:bg-gray-200 rounded-xl active:bg-gray-300 transition-colors">
                            0
                        </button>
                    </div>
                    <div className="col-start-3 flex items-center justify-center">
                        <button onClick={handleDelete} className="p-3 hover:bg-gray-200 rounded-xl active:bg-gray-300 transition-colors">
                            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
