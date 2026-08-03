/* eslint-disable @next/next/no-img-element */

"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, ShoppingBag, Heart, MapPin, LogOut, Award } from "lucide-react";
import { useTranslation } from "@/node_modules/react-i18next";

export default function ProfileHero() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Pill Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2.5 py-1 px-2.5 rounded-full hover:bg-gray-100/80 active:scale-95 transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-200"
            >
                {/* Avatar Image */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-gray-100 flex items-center justify-center shrink-0">

                </div>

                {/* Username & Arrow */}
                <span className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-orange-500 transition-colors">

                </span>
                <ChevronDown
                    size={16}
                    className={`text-gray-500 group-hover:text-orange-500 transition-all duration-200 ${isOpen ? "rotate-180 text-orange-500" : ""
                        }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Header in Dropdown */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-extrabold text-gray-900 text-base">Piyush Baghel</p>
                        <p className="text-xs text-gray-400 truncate">piyush@example.com</p>
                    </div>

                    {/* Dropdown Items */}
                    <div className="py-1">
                        <a href="#profile" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                            <User size={16} className="mr-3 text-gray-400 group-hover:text-orange-500" />
                            {t("my_profile", "My Profile")}
                        </a>
                        <a href="#orders" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                            <ShoppingBag size={16} className="mr-3 text-gray-400 group-hover:text-orange-500" />
                            {t("orders", "Orders")}
                        </a>
                        <a href="#swiggy-one" className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                            <div className="flex items-center">
                                <Award size={16} className="mr-3 text-orange-500" />
                                <span>{t("swiggy_one", "Swiggy One")}</span>
                            </div>
                            <span className="text-[10px] bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-1.5 py-0.5 rounded-full uppercase">
                                PRO
                            </span>
                        </a>
                        <a href="#favourites" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                            <Heart size={16} className="mr-3 text-gray-400 group-hover:text-orange-500" />
                            {t("favourites", "Favourites")}
                        </a>
                        <a href="#addresses" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                            <MapPin size={16} className="mr-3 text-gray-400 group-hover:text-orange-500" />
                            {t("addresses", "Addresses")}
                        </a>
                    </div>

                    <div className="border-t border-gray-100 pt-1 mt-1">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                            <LogOut size={16} className="mr-3 text-red-500" />
                            {t("logout", "Logout")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}