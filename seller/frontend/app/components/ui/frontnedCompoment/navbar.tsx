"use client";
import { useState , useEffect  } from "react";
import { Link } from "@tanstack/react-router";
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';


export default function Navbar() {
    const [loading , setLoading  ] = useState<boolean>(false);
    const [error , setError ]  = useState<string | null>(null);


    const submitLoading = () => {
        setLoading(true); 
        setError(null);
        
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }
     

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center transition-all">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center shadow-2xl">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-bold text-gray-800 text-lg">Loading...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <header className="shadow-lg bg-white py-4 px-6 md:px-12 w-full">
        <nav className="flex items-center justify-between w-full gap-6">
          {/* Logo and Location */}
          <div className="flex items-center gap-8">
            <Link to="/frontend" onClick={submitLoading} className="cursor-pointer text-black font-extrabold text-2xl hover:text-orange-500 transition-colors">
              Food Cut
            </Link>

            <button className="hidden md:flex items-center gap-2 text-gray-700 hover:text-orange-500 font-bold transition-colors whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Set Location
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search for restaurants, dishes..." 
              className="w-full bg-gray-100 px-4 py-2.5 pl-10 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 transition-all font-medium"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Auth Links */}
          <div className="flex items-center justify-end gap-4 whitespace-nowrap ml-4">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-black font-bold text-sm hover:text-orange-500 transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-purple-700 hover:bg-purple-800 text-white rounded-full font-medium text-sm h-10 px-5 cursor-pointer transition-colors shadow-sm">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </nav>
      </header>
    </>
  );
}
