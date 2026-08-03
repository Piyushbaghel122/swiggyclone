"use client";
import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { useNavigate } from "@tanstack/react-router";


export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigate();

  const submitInLogo = () => {
    setTimeout(() => {
      setLoading(true);
      setError(null);
    }, 0);

    setTimeout(() => {
      setLoading(false);
      navigation({ to: "/" });
    }, 2000);
  }

  

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-[#cf4a27] border-t-transparent rounded-full animate-spin shadow-lg"></div>
          <p className="mt-4 text-[#cf4a27] font-bold text-xl animate-pulse tracking-wide">Loading...</p>
        </div>
      )}
      <nav className="flex items-center justify-between px-8 py-3 border-b border-gray-100 bg-white relative z-50">
        {/* Left Section: Logo & Navigation */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="#cf4a27" fillOpacity="0.1" />
              <circle cx="16" cy="16" r="8" fill="#cf4a27" />
              <path d="M22 10 A 2 2 0 1 1 22 14 A 2 2 0 1 1 22 10" fill="#cf4a27" />
            </svg>
            <Link
              onClick={submitInLogo} href='/' className="text-[20px] font-bold text-[#cf4a27] tracking-tight">Food Cut</Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Discover</a>
            <a href="#" className="text-[#cf4a27] font-bold">Restaurants</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Offers</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Orders</a>
          </div>
        </div>

        {/* Right Section: Search, Location & Profile */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2.5 w-[300px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search for dishes or restaurant..."
              className="bg-transparent border-none outline-none text-[14px] text-gray-700 ml-2 w-full placeholder-gray-400"
            />
          </div>

          {/* Location Dropdown */}
          <div className="flex items-center gap-1.5 cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[14px] font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">New York, NY</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-hover:text-gray-900 transition-colors ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300"></div>

          {/* Profile Avatar & Dropdown */}
          <div className="relative" ref={profileRef}>
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="bg-[#cf4a27] p-1.5 rounded-full cursor-pointer hover:bg-[#b84222] transition-colors shadow-sm flex items-center justify-center h-9 w-9"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col pt-4">
                {/* User Header */}
                <div className="px-5 pb-4 border-b border-gray-100">
                  <h3 className="text-[16px] font-bold text-[#1e293b]">Piyush Baghel</h3>
                  <p className="text-[13px] text-gray-400 mt-0.5">piyush@example.com</p>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col py-2">
                  <Link href="/myprofile" className="flex items-center px-5 py-3 text-[14.5px] text-[#334155] hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </Link>

                  <Link href="/orders" className="flex items-center px-5 py-3 text-[14.5px] text-[#334155] hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Orders
                  </Link>

                  <Link href="/reastaurantcreate" className="flex items-center justify-between px-5 py-3 text-[14.5px] text-[#334155] hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <svg className="h-[18px] w-[18px] mr-3 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      restaurant create
                    </div>
                    <span className="text-[10px] font-bold bg-[#f97316] text-white px-1.5 py-0.5 rounded-sm tracking-wide">PRO</span>
                  </Link>

                  <Link href="/ordercreate" className="flex items-center justify-between px-5 py-3 text-[14.5px] text-[#334155] hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <svg className="h-[18px] w-[18px] mr-3 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                      order create
                    </div>
                    <span className="text-[10px] font-bold bg-[#3b82f6] text-white px-1.5 py-0.5 rounded-sm tracking-wide">NEW</span>
                  </Link>

                  <Link href="/addresses" className="flex items-center px-5 py-3 text-[14.5px] text-[#334155] hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Addresses
                  </Link>
                  <Link href="/history" className="flex items-center px-5 py-3 text-[14.5px] text-[#334155] hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Order History
                  </Link>
                </div>




                {/* Logout Option */}
                <div className="border-t border-gray-100">
                  <a href="#" className="flex items-center px-5 py-4 text-[14.5px] font-medium text-red-500 hover:bg-red-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </a>
                </div>

              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
