/* eslint-disable react-hooks/rules-of-hooks */
"use client";


import { useState} from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/node_modules/react-i18next";
import { useNavigate } from "@tanstack/react-router";

import ProfileHero from "../common/profileHero";
import {
  Search,
  HelpCircle,
  ShoppingCart
} from "lucide-react";


export default function NavbarDashboard() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error , setError] = useState<string | null>(null);
    const [loading , setLoading] = useState<boolean>(false);
       
        const navigate = useNavigate();


const swiggyFetch = () => {
     setLoading(true);
     setError(null);
    setTimeout(() => {
     setLoading(false);
    },2000);
  
   const data = () =>{
     window.location.href = "/dashboard"
   }
   data();





}

  const { t } = useTranslation();



  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
           <div className="w-12 h-12 border-4 border-black-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between h-20">
        {/* Left Section: Logo & Location */}
        <div className="flex items-center space-x-6">
          <button 
          onClick={swiggyFetch} className="logo cursor-pointer text-4xl font-extrabold tracking-tight text-amber-400 hover:opacity-90 transition-opacity">
            {loading ? 'Loading...' : 'Food Cut'}
          </button>


        </div>

        {/* Right Section: Navigation Links & Profile */}
        <div className="flex items-center space-x-6 sm:space-x-8 text-gray-700 font-medium text-base">
          <button className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer transition-colors duration-200 group">
            <Search size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <input type='text' placeholder={t("search")} className="rounded-md border border-gray-200 px-2 py-1 text-sm outline-none focus:border-orange-500 hidden md:inline-block w-28 lg:w-40 cursor-pointer" />
            <span className="hidden sm:inline">{t("search")}</span>
          </button>

          <Link to="/help" className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer transition-colors duration-200 group">
            <HelpCircle size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <span className="hidden sm:inline">{t("help")}</span>
          </Link>

          <Link to="/cart" className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer transition-colors duration-200 group">
            <div className="relative">
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                0
              </span>
            </div>
            <span className="hidden sm:inline">{t("cart")}</span>
          </Link>

          {/* Profile Hero Dropdown Pill */}
          <div className="pl-2 border-l border-gray-200">
            <ProfileHero />
          </div>
        </div>
      </nav>
    </header>
    {/* Sidebar removed per user request */}
    </>
  );
}

