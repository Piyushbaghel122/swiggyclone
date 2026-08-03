"use client";
import React, { useState, useEffect } from "react";
import "../style/loadingstyle.css";
import image from "../../../auth/image/image.png";
import Image from "next/image";
import image3 from "../../../auth/image/image2.png";

export default function LoadingPage() {
    const [progress, setProgress] = useState(60);
    const [statusText, setStatusText] = useState("Delivering happiness...");

    // Smooth simulated progress animation to make the interface feel dynamic and alive
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 0;
                }
                const next = prev + Math.floor(Math.random() * 4) + 1;
                return next > 100 ? 100 : next;
            });
        }, 350);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress < 30) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStatusText("Finding nearby restaurants...");
        } else if (progress < 65) {
            setStatusText("Delivering happiness...");
        } else if (progress < 90) {
            setStatusText("Preparing your delicious order...");
        } else {
            setStatusText("Arriving at your doorstep!");
        }
    }, [progress]);

    return (
        <div className="loading-container relative flex items-center justify-center min-h-screen p-4 md:p-8 overflow-hidden bg-gradient-to-br from-[#0b0c10] via-[#12141d] to-[#07080b] text-white font-sans">
            {/* Subtle background glow effect */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fc8019]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff9f43]/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1.5s" }}></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-6xl w-full my-8">
                
                {/* Left Panel: Brand Showcase & App Logo */}
                <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left flex-1 max-w-lg">
                    <div className="w-full flex justify-center lg:justify-start mb-6">
                        <div className="relative group cursor-pointer transition-all duration-500 hover:scale-105">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#fc8019] to-[#ff9f43] rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                            <div className="relative bg-[#151720]/90 border border-white/10 p-6 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col items-center">
                                <Image 
                                    src={image} 
                                    alt="SwiggyClone Brand Logo" 
                                    width={320} 
                                    height={320} 
                                    className="w-48 sm:w-64 h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" 
                                    priority 
                                />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 font-serif sm:font-sans">
                        Swiggy<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fc8019] to-[#ff9f43]">Clone</span>
                    </h1>
                    <p className="text-[#fc8019] font-bold text-sm tracking-[0.3em] uppercase mb-8 ml-1">
                        Food Delivery
                    </p>

                    {/* App Logo & Icon Pill Badge */}
                    <div className="flex items-center gap-4 bg-[#181a24]/80 border border-white/10 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 hover:border-[#fc8019]/50 hover:bg-[#181a24]">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fc8019] to-[#e55f05] flex items-center justify-center shadow-lg shadow-[#fc8019]/30">
                            <span className="text-white font-extrabold text-xl font-serif">S</span>
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Official App</p>
                            <p className="text-sm font-semibold text-gray-200">App Logo &amp; Icon</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Interactive Phone Screen Mockup */}
                <div className="flex items-center justify-center flex-1 w-full max-w-[380px] sm:max-w-[400px]">
                    <div className="relative w-full h-[720px] bg-white text-gray-900 rounded-[50px] shadow-[0_25px_70px_rgba(0,0,0,0.7),0_0_0_12px_#1c1e26] border-4 border-[#2a2d3a] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-[0_30px_90px_rgba(252,128,25,0.25),0_0_0_12px_#1c1e26] hover:-translate-y-1">
                        
                        {/* Phone Top Notch / Speaker & Status Bar */}
                        <div className="pt-4 px-6 bg-white z-20">
                            {/* Speaker Notch */}
                            <div className="w-24 h-4 bg-[#1c1e26] rounded-full mx-auto mb-3 absolute top-3 left-1/2 -translate-x-1/2"></div>
                            
                            {/* Status Bar */}
                            <div className="flex justify-between items-center text-xs font-semibold text-gray-800 pt-1">
                                <span>9:41</span>
                                <div className="flex items-center gap-1.5">
                                    {/* Cellular Signal Icon */}
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M2 22h20V2z" />
                                    </svg>
                                    {/* Wifi Icon */}
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/>
                                    </svg>
                                    {/* Battery Icon */}
                                    <div className="w-5 h-2.5 border border-gray-800 rounded-sm p-0.5 flex items-center">
                                        <div className="h-full bg-gray-800 rounded-2xs w-3/4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phone Header: Logo & Title inside screen */}
                        <div className="flex flex-col items-center justify-center pt-6 px-4 text-center z-10">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fc8019] to-[#e55f05] flex items-center justify-center shadow-md shadow-[#fc8019]/30 mb-2 animate-pulse">
                                <span className="text-white font-extrabold text-2xl font-serif">S</span>
                            </div>
                            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                                Swiggy<span className="text-[#fc8019]">Clone</span>
                            </h2>
                            <p className="text-[#fc8019] text-[10px] font-bold tracking-[0.25em] uppercase mt-0.5">
                                Food Delivery
                            </p>
                        </div>

                        {/* Center Graphic: Delivery Scooter Animation */}
                        <div className="relative flex-1 flex items-center justify-center px-6 my-2">
                            {/* Background decorative circle inside screen */}
                            <div className="absolute w-48 h-48 bg-orange-50 rounded-full -z-0"></div>
                            <div className="relative z-10 w-full flex justify-center transition-transform duration-700 hover:scale-105">
                                <Image 
                                    src={image3} 
                                    alt="Swiggy Delivery Partner" 
                                    width={350} 
                                    height={350} 
                                    className="w-full max-h-[260px] object-contain drop-shadow-xl" 
                                    priority 
                                />
                            </div>
                        </div>

                        {/* Bottom Loading Progress Section */}
                        <div className="pb-8 px-8 flex flex-col items-center justify-center z-10 bg-gradient-to-t from-white via-white to-transparent pt-4">
                            <p className="text-base font-bold text-gray-800 mb-4 tracking-wide text-center min-h-[24px]">
                                {statusText}
                            </p>
                            
                            {/* Animated Loading Bar Track */}
                            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner mb-2 border border-gray-200/60">
                                <div 
                                    className="bg-gradient-to-r from-[#fc8019] via-[#ff9f43] to-[#fc8019] h-full rounded-full transition-all duration-300 shadow-sm relative overflow-hidden"
                                    style={{ width: `${progress}%` }}
                                >
                                    {/* Shimmer animation inside progress bar */}
                                    <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite] -skew-x-12"></div>
                                </div>
                            </div>

                            {/* Percentage Indicator */}
                            <span className="text-xs font-extrabold text-[#fc8019] tracking-widest font-mono">
                                {progress}%
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}