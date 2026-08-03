

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

interface ThemeContextType {
   theme: Theme;
   toggleTheme: () => void;
   setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
   }
   return context;
}

export default function ThemeProvider({
   children,
   defaultTheme = "light",
   showFloatingToggle = true,
}: {
   children: React.ReactNode;
   defaultTheme?: Theme;
   showFloatingToggle?: boolean;
}) {
   const [theme, setThemeState] = useState<Theme>(defaultTheme);
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
      const savedTheme = localStorage.getItem("swiggy_theme") as Theme | null;
      if (savedTheme === "dark" || savedTheme === "light") {
         setThemeState(savedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
         setThemeState("dark");
      }
   }, []);

   useEffect(() => {
      if (!mounted) return;
      localStorage.setItem("swiggy_theme", theme);

      const root = document.documentElement;
      const body = document.body;

      if (theme === "dark") {
         root.classList.add("dark");
         body.classList.add("dark");
         root.style.setProperty("--background", "#0f172a");
         root.style.setProperty("--foreground", "#f8fafc");
      } else {
         root.classList.remove("dark");
         body.classList.remove("dark");
         root.style.setProperty("--background", "#ffffff");
         root.style.setProperty("--foreground", "#171717");
      }
   }, [theme, mounted]);

   const toggleTheme = () => {
      setThemeState((prev) => (prev === "light" ? "dark" : "light"));
   };

   const setTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
   };

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
         {/* Global Dark Mode CSS Overrides to guarantee FULL SCREEN turns dark/light across all components */}
         <style dangerouslySetInnerHTML={{ __html: `
            html.dark, html.dark body {
               background-color: #0f172a !important;
               color: #f8fafc !important;
               transition: background-color 0.3s ease, color 0.3s ease;
            }
            html.dark .bg-white {
               background-color: #1e293b !important;
               color: #f8fafc !important;
               border-color: #334155 !important;
            }
            html.dark .bg-gray-50, html.dark .bg-gray-100, html.dark .bg-gray-200 {
               background-color: #0f172a !important;
               color: #e2e8f0 !important;
               border-color: #334155 !important;
            }
            html.dark .bg-gradient-to-b {
               background-image: linear-gradient(to bottom, #0f172a, #1e293b) !important;
            }
            html.dark .text-gray-700, html.dark .text-gray-800, html.dark .text-gray-900, html.dark .text-[#02060c], html.dark .text-[#141414] {
               color: #f1f5f9 !important;
            }
            html.dark .border-gray-100, html.dark .border-gray-200, html.dark .border-gray-300 {
               border-color: #334155 !important;
            }
            html.dark .shadow-sm, html.dark .shadow, html.dark .shadow-md {
               box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
            }
         `}} />
         <div className={`min-h-screen w-full transition-colors duration-300 ${theme === "dark" ? "dark bg-[#0f172a] text-white" : "bg-white text-[#171717]"}`}>
            {children}
         </div>
         {showFloatingToggle && <ThemeToggle />}
      </ThemeContext.Provider>
   );
}

export function ThemeToggle() {
   const { theme, toggleTheme } = useTheme();

   return (
      <button
         onClick={toggleTheme}
         aria-label="Toggle Dark and Light Mode"
         className={`fixed bottom-6 right-6 z-[9999] px-5 py-3.5 rounded-full shadow-2xl font-semibold text-sm transition-all duration-300 flex items-center gap-2.5 cursor-pointer border active:scale-95 ${
            theme === "light"
               ? "bg-[#0f172a] text-white border-gray-700 hover:bg-[#1e293b] hover:scale-105 shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
               : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:scale-105 shadow-[0_10px_25px_rgba(255,255,255,0.25)]"
         }`}
      >
         {theme === "light" ? (
            <>
               <Moon size={18} className="text-yellow-400 fill-yellow-400 animate-pulse" />
               <span>Dark Mode</span>
            </>
         ) : (
            <>
               <Sun size={18} className="text-amber-500 fill-amber-500 animate-spin" />
               <span>Light Mode</span>
            </>
         )}
      </button>
   );
}