"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Store, LayoutDashboard, Settings, Bell, LogIn, UserPlus, Menu, X, PlusCircle, User, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

const api = axios.create({
    baseURL: "http://localhost:8001/api/v1/auth",
    headers: {
        "content-type": "application/json"
    }, 
    withCredentials: true
});

export function NavbarDashboard({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [loading , setLoading] = useState<boolean>(false);
    const [error , setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.post("/logout");
            if (response.data) { 
                navigate({ to: "/" });
            }
        } catch (err: unknown) {
            console.log("error", err);
            setError("Something went wrong!");
        } finally {
            setLoading(false);
            setIsProfileOpen(false);
        }
    };

    const [isLogoLoading, setIsLogoLoading] = useState(false);

    const submitLogo = () => {
        setIsLogoLoading(true);
        setError(null);

       setTimeout(() => {
        setIsLogoLoading(false)
      // 300 ms means 0.3 seconds
      
       } , 3000)
    }


    return (
        <>
            {isLogoLoading && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl flex flex-col items-center shadow-2xl">
                        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-800 dark:text-gray-200 font-semibold text-lg tracking-wide">Loading Food Cut...</p>
                    </div>
                </div>
            )}
        <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
            {/* Removed max-w-7xl and mx-auto to make it completely full width */}
            <div className="w-full px-4 sm:px-6 lg:px-8">
                {/* Added items-center back so everything aligns vertically */}
                <div className="flex justify-between items-center h-16">
                    
                    {/* Left: Logo & Brand */}
                    <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={submitLogo}
                    >
                        <motion.div 
                            whileHover={{ scale: 1.05, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-orange-500 p-2 rounded-xl text-white shadow-lg shadow-orange-500/30 flex items-center justify-center"
                        >
                            <Store size={22} strokeWidth={2.5} />
                        </motion.div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600 tracking-tight">
                          Food Cut
                        </span>
                    </div>

                    {/* Middle: Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="" active={activeTab === "Dashboard"} onClick={(e) => { e.preventDefault(); setActiveTab("Dashboard"); }} />
                        <NavItem icon={<Store size={18} />} label="My Restaurant" to="/ijznjs" active={activeTab === "My Restaurant"} onClick={(e) => { e.preventDefault(); setActiveTab("My Restaurant"); }} />

                        <NavItem icon={<Settings size={18} />} label="Settings" to="" active={activeTab === "Settings"} onClick={(e) => { e.preventDefault(); setActiveTab("Settings"); }} />
                    </div>

                    {/* Right: Actions (Login & Sign Up) */}
                    <div className="hidden md:flex items-center gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-gray-900 rounded-full transition-colors relative"
                        >
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-950"></span>
                        </motion.button>
                        
                        <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <motion.button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 p-1 pr-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-full hover:border-orange-200 hover:bg-orange-50 dark:hover:bg-gray-900 transition-all shadow-sm"
                            >
                                <div className="rounded-full h-8 w-8 bg-gradient-to-tr from-orange-400 to-orange-600 text-white flex items-center justify-center shadow-inner">
                                    <User size={16} strokeWidth={2.5} />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">My Profile</span>
                            </motion.button>
                            
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-lg py-2 z-50 overflow-hidden transform origin-top-right transition-all">
                                    <button 
                                        onClick={(e) => { e.preventDefault(); setActiveTab("Settings"); setIsProfileOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                    >
                                        <Settings size={16} />
                                        Settings
                                    </button>
                                    <button 
                                        onClick={handleLogout}
                                        disabled={loading}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <span className="w-4 h-4 rounded-full border-2 border-red-600 border-t-transparent animate-spin"></span>
                                        ) : (
                                            <LogOut size={16} />
                                        )}
                                        {loading ? "Logging out..." : "Logout"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 space-y-2 shadow-xl absolute w-full"
                >
                    <div className="flex flex-col gap-2">
                        <MobileNavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="" active={activeTab === "Dashboard"} onClick={(e) => { e.preventDefault(); setActiveTab("Dashboard"); setMobileMenuOpen(false); }} />
                        <MobileNavItem icon={<Store size={18} />}  label="My Restaurant" href="#Piyushkuamr" active={activeTab === "My Restaurant"} onClick={(e) => { e.preventDefault(); setActiveTab("My Restaurant"); setMobileMenuOpen(false); }} />

                        <MobileNavItem icon={<Settings size={18} />} label="Settings" to="" active={activeTab === "Settings"} onClick={(e) => { e.preventDefault(); setActiveTab("Settings"); setMobileMenuOpen(false); }} />
                    </div>
                    <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                        <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="rounded-full h-10 w-10 bg-gradient-to-tr from-orange-400 to-orange-600 text-white flex items-center justify-center shadow-inner">
                                    <User size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">My Profile</span>
                                    <span className="text-xs text-gray-500">Manage account settings</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                </motion.div>
            )}
        </nav>
        </>
    );
}

// Subcomponents for cleaner code
function NavItem({ icon, label, to, href, active = false, onClick }: { icon: React.ReactNode, label: string, to?: string, href?: string, active?: boolean, onClick?: (e: React.MouseEvent) => void }) {
    const className = `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active ?
            "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500" 
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-200"
    }`;

    if (href) {
        return (
            <a href={href} onClick={onClick} className={className}>
                {icon}
                {label}
            </a>
        );
    }

    return (
        <Link to={to || ""} onClick={onClick} className={className}>
            {icon}
            {label}
        </Link>
    );
}

function MobileNavItem({ icon, label, to, href, active = false, onClick }: { icon: React.ReactNode, label: string, to?: string, href?: string, active?: boolean, onClick?: (e: React.MouseEvent) => void }) {
    const className = `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
        active 
            ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500" 
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-200"
    }`;

    if (href) {
        return (
            <a href={href} onClick={onClick} className={className}>
                {icon}
                {label}
            </a>
        );
    }

    return (
        <Link to={to || ""} onClick={onClick} className={className}>
            {icon}
            {label}
        </Link>
    );
}