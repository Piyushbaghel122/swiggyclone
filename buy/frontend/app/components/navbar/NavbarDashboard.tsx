"use client";
import "./style.css";

import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/node_modules/react-i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import ProfileHero from "../common/profileHero";
import {
  Search,
  HelpCircle,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  MapPin,
  Crosshair,
  Plus,
  Clock,
  X
} from "lucide-react";


export default function NavbarDashboard() {
    const [error , setError] = useState<string | null>(null);
    const [loading , setLoading] = useState<boolean>(false);
    const [isLocationMenuOpen, setIsLocationMenuOpen] = useState<boolean>(false);
    const [currentLocation, setCurrentLocation] = useState<string>("Ahmedabad, Gujarat, India");
    const [isTracking, setIsTracking] = useState<boolean>(false);
    const watchIdRef = useRef<number | null>(null);

    const stopTracking = () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
        setIsTracking(false);
      }
    };

    const detectLocation = () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
      }
      
      if (isTracking) {
        stopTracking();
        return;
      }

      setCurrentLocation("Detecting...");
      setIsTracking(true);
      
      watchIdRef.current = navigator.geolocation.watchPosition(
        async (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          try {
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${newPos.lat}&longitude=${newPos.lng}&localityLanguage=en`);
            const data = await res.json();
            
            if (data) {
              const area = data.locality || data.city;
              const region = data.principalSubdivision;
              const locParts = [area, region, data.countryName].filter(Boolean);
              
              setCurrentLocation(locParts.length > 0 ? locParts.join(", ") : `Lat: ${newPos.lat.toFixed(2)}, Lng: ${newPos.lng.toFixed(2)}`);
            } else {
              setCurrentLocation(`Lat: ${newPos.lat.toFixed(2)}, Lng: ${newPos.lng.toFixed(2)}`);
            }
          } catch (err) {
            console.error("Geocoding error:", err);
            setCurrentLocation(`Lat: ${newPos.lat.toFixed(2)}, Lng: ${newPos.lng.toFixed(2)}`);
          }
        },
        (error) => {
          setCurrentLocation("Failed to get location");
          console.error(error);
          stopTracking();
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000
        }
      );
    };

    useEffect(() => {
      return () => {
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
        }
      };
    }, []);

  const { t } = useTranslation();

  const fetchSwiggy = () => {
     setLoading(true);
     setError(null);
 
     setTimeout(() =>  {
      setLoading(false);
      // if (close) close();
     }, 2000)

  }


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
          <Link 
          onClick={fetchSwiggy} to='/dashboard' className="logo cursor-pointer text-4xl font-extrabold tracking-tight text-amber-400 hover:opacity-90 transition-opacity">
            {loading ? 'Loading...' : 'Food Cut'}
          </Link>

          <div className="relative flex items-center">
            <div 
              className="flex items-center space-x-2 text-sm cursor-pointer group"
              onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
            >
              <MapPin size={22} className="text-red-400 shrink-0" />
              <span className="text-gray-800 font-medium truncate max-w-[200px] sm:max-w-[250px] group-hover:text-orange-500 transition-colors">
                {currentLocation}
              </span>
              {isLocationMenuOpen ? (
                <ChevronUp size={18} className="text-gray-800 group-hover:text-orange-500 transition-colors" />
              ) : (
                <ChevronDown size={18} className="text-gray-800 group-hover:text-orange-500 transition-colors" />
              )}
            </div>

            {/* Location Dropdown */}
            {isLocationMenuOpen && (
              <>
                {/* Backdrop for closing when clicking outside */}
                <div className="fixed inset-0 z-40" onClick={() => setIsLocationMenuOpen(false)}></div>
                <div className="absolute top-full left-0 mt-4 w-[350px] bg-white z-50 shadow-xl border border-gray-100 rounded-md flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="flex flex-col">
                    {/* Detect GPS Option */}
                    <div 
                      className="flex items-start space-x-4 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group"
                      onClick={detectLocation}
                    >
                      <Crosshair size={22} className={`mt-1 group-hover:scale-110 transition-transform ${isTracking ? 'text-green-500 animate-pulse' : 'text-red-500'}`} />
                      <div>
                        <h3 className={`font-medium text-base ${isTracking ? 'text-green-500' : 'text-red-500'}`}>
                          {isTracking ? "Stop live tracking" : "Detect current location"}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">{isTracking ? "Live tracking active" : "Using GPS"}</p>
                      </div>
                    </div>

                    {/* Add Address Option */}
                    <div className="flex items-center space-x-4 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group">
                      <Plus size={22} className="text-red-500 group-hover:scale-110 transition-transform" />
                      <h3 className="font-medium text-red-500 text-base">Add address</h3>
                    </div>

                  </div>
                </div>
              </>
            )}
          </div>

          <LanguageSwitcher />
        </div>

        {/* Right Section: Navigation Links & Profile */}
        <div className="flex items-center space-x-6 sm:space-x-8 text-gray-700 font-medium text-base">
          <button className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer transition-colors duration-200 group">
            <Search size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <input type='text' placeholder={t("search")} className="rounded-md border border-gray-200 px-2 py-1 text-sm outline-none focus:border-orange-500 hidden md:inline-block w-28 lg:w-40 focus:w-48 lg:focus:w-64 transition-all duration-300 cursor-pointer" />
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

