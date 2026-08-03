import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { User, WifiOff } from "lucide-react";
import LoadingPage from "../components/loadingComponent/LoadingPage";
import { useTranslation } from "@/node_modules/react-i18next";
import LanguageSwitcher from "../../../components/ui/LanguageSwitcher";

export default function Navbar() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleReloading = () => {
        setLoading(true);
        setError(null);

        setTimeout(() => {
            setLoading(false);
        }, 2500);
    };

    // Listen for offline/online network changes to simulate app reopening online
    useEffect(() => {
        const handleOffline = () => {
            setError("You are currently offline. Please check your internet connection.");
        };

        const handleOnline = () => {
            setError(null);
            // Show loading page for 2.5 seconds when internet connection restores
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2500);
        };

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    return (
        <header className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 relative">
            {/* Full screen wide container */}
            <nav className="w-full max-w-[1500px] mx-auto px-6 lg:px-16 flex items-center justify-between py-5">

                {/* Left side: Brand Name */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={handleReloading}
                        className="text-[#FC8019] font-black tracking-tight text-xl sm:text-2xl cursor-pointer uppercase hover:opacity-90 transition-opacity focus:outline-none"
                    >
                        SWIGGY CLONE
                    </button>
                    <LanguageSwitcher />
                </div>

                {/* Right side: Links and User Icon at far right */}
                <div className="flex items-center gap-6 sm:gap-8 text-gray-600 font-semibold text-base">

                    <Link
                        to="/offers"
                        className="hover:text-gray-900 transition-colors cursor-pointer"
                    >
                        {t("offers", "Offers")}
                    </Link>

                    <Link
                        to="/help"
                        className="hover:text-gray-900 transition-colors cursor-pointer"
                    >
                        {t("help", "Help")}
                    </Link>

                    <Link
                        to="/user/myprofile"
                        className="hover:text-gray-900 transition-colors cursor-pointer"
                    >
                        {t("signin", "Sign In")}
                    </Link>

                    {/* Active Cart Link with underline */}
                    <Link
                        to="/cart"
                        className="text-amber-900 font-bold border-b-2 border-amber-800 pb-0.5 hover:text-amber-950 transition-all cursor-pointer"
                    >
                        {t("cart", "Cart")}
                    </Link>

                    {/* User Outline Circle Icon at far right */}
                    <div className="w-9 h-9 rounded-full border-2 border-amber-700 text-amber-700 flex items-center justify-center cursor-pointer hover:bg-amber-50 transition-colors shadow-sm ml-2">
                        <User className="w-5 h-5 stroke-[2.5]" />
                    </div>

                </div>
            </nav>

            {/* Full-screen LoadingPage Overlay when loading (e.g. clicking SWIGGY CLONE or internet online reconnect) */}
            {loading && (
                <div className="fixed inset-0 z-[99999] bg-[#0b0c10] overflow-y-auto animate-fadeIn">
                    <LoadingPage />
                </div>
            )}
            {error && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-xs text-center py-1.5 font-bold z-50 flex items-center justify-center gap-1.5 shadow-md">
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>{error}</span>
                </div>
            )}
        </header>
    );
}