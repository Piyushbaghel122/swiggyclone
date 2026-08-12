"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Bell } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Food<span className="text-blue-500">cut</span>
            </span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/rides" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Rides
            </Link>
            <Link href="/earnings" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Earnings
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          {user ? (
            <button className="flex items-center gap-2 p-1.5 pl-3 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user}</span>
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Log in
              </Link>
              <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors">
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <Link href="/dashboard" onClick={toggleMenu} className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              Dashboard
            </Link>
            <Link href="/rides" onClick={toggleMenu} className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              Rides
            </Link>
            <Link href="/earnings" onClick={toggleMenu} className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              Earnings
            </Link>
            <div className="h-px bg-gray-200 dark:bg-gray-800 my-2"></div>
            {user ? (
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                {user}
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Link href="/login" onClick={toggleMenu} className="w-full py-2.5 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  Log in
                </Link>
                <Link href="/register" onClick={toggleMenu} className="w-full py-2.5 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};