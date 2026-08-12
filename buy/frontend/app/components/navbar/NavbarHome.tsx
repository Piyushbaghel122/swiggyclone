"use client";

import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/node_modules/react-i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import {
  Search,
  Percent,
  HelpCircle,
  User,
  ShoppingCart,
  ChevronDown
} from "lucide-react";

export default function NavbarHome() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between h-20">
        {/* Left Section: Logo & Location */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-orange-500 hover:opacity-90 transition-opacity">
             Food Cut
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Right Section: Navigation Links */}
        <div className="flex items-center space-x-8 text-gray-700 font-medium text-base">
          <Link to="/search" className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer transition-colors duration-200 group">
            <Search size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <input type='text' placeholder={t("search")} className="rounded-md border border-gray-200 px-2 py-1 text-sm outline-none focus:border-orange-500 w-28 lg:w-40 focus:w-48 lg:focus:w-64 transition-all duration-300 cursor-pointer" />
            <span>{t("search")}</span>
          </Link>

          <Link to="/offers" className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer transition-colors duration-200 group">
            <Percent size={20} className="text-orange-500 group-hover:scale-110 transition-transform duration-200" />
            <span>{t("offers")}</span>
          </Link>

          <Link to="/help" className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer transition-colors duration-200 group">
            <HelpCircle size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <span>{t("help")}</span>
          </Link>

          <Link to="/auth/register" className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer transition-colors duration-200 group">
            <User size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <span>{t("signin")}</span>
          </Link>

          <Link to="/auth/login" className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer transition-colors duration-200 group">
            <User size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <span>{t("login")}</span>
          </Link>

          <Link to="/cart" className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer transition-colors duration-200 group">
            <div className="relative">
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                0
              </span>
            </div>
            <span>{t("cart")}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}