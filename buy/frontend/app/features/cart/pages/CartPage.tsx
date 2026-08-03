"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MapPin, Plus, Check, Home, CreditCard, ArrowRight } from "lucide-react";
import Navbar from "./Navbar";

// Default coordinates: Bengaluru
const DEFAULT_CENTER = {
    lat: 12.9716,
    lng: 77.5946,
};

const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "280px",
    borderRadius: "0.5rem",
};

interface AddressItem {
    id: number;
    tag: "Home" | "Work" | "Other";
    street: string;
    city: string;
    pincode: string;
    time: string;
    isDefault?: boolean;
}

// 1. Real Google Map Component
function RealGoogleMapSection({
    apiKey,
    markerPosition,
    setMarkerPosition,
    handleMapClick,
}: {
    apiKey: string;
    markerPosition: { lat: number; lng: number };
    setMarkerPosition: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
    handleMapClick: (e: google.maps.MapMouseEvent) => void;
}) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
    });

    if (loadError) {
        return (
            <div className="h-[280px] flex flex-col items-center justify-center text-red-500 p-6 text-center bg-red-50 rounded-lg border border-red-200">
                <MapPin className="w-10 h-10 mb-2 text-red-400" />
                <p className="font-bold text-sm">Google Maps API Key Error</p>
                <p className="text-xs text-gray-600 mt-1 max-w-md">
                    Please enable Maps JavaScript API in Google Cloud Console.
                </p>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="h-[280px] flex flex-col items-center justify-center text-gray-500 p-6 text-center bg-gray-100 rounded-lg">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3" />
                <p className="font-semibold text-xs">Loading Google Maps...</p>
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={MAP_CONTAINER_STYLE}
            center={markerPosition}
            zoom={14}
            onClick={handleMapClick}
            options={{
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
            }}
        >
            <Marker
                position={markerPosition}
                draggable={true}
                onDragEnd={(e) => {
                    if (e.latLng) {
                        setMarkerPosition({
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                        });
                    }
                }}
            />
        </GoogleMap>
    );
}

// 2. Interactive Simulated Map Component (Used offline when API key is not set to prevent console errors)
function SimulatedMapSection({
    markerPosition,
    setMarkerPosition,
    onLocationSelect,
}: {
    markerPosition: { lat: number; lng: number };
    setMarkerPosition: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
    onLocationSelect: (lat: number, lng: number) => void;
}) {
    const handleSimulatedClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Calculate simulated coordinate movement
        const newLat = 12.9716 + (0.5 - y) * 0.04;
        const newLng = 77.5946 + (x - 0.5) * 0.04;
        setMarkerPosition({ lat: newLat, lng: newLng });
        onLocationSelect(newLat, newLng);
    };

    return (
        <div
            onClick={handleSimulatedClick}
            className="relative h-[280px] w-full rounded-lg overflow-hidden border border-gray-200 shadow-inner cursor-crosshair bg-[#e5e3df] select-none flex items-center justify-center"
            style={{
                backgroundImage: `
                    radial-gradient(circle at 50% 50%, rgba(252, 128, 25, 0.12) 0%, transparent 70%),
                    linear-gradient(to right, #dcd8d0 1px, transparent 1px),
                    linear-gradient(to bottom, #dcd8d0 1px, transparent 1px)
                `,
                backgroundSize: "100% 100%, 36px 36px, 36px 36px",
            }}
        >
            {/* Map Roads Simulation */}
            <div className="absolute inset-0 opacity-50 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-3.5 bg-[#ffffff] -translate-y-1/2 transform -rotate-3 shadow-sm" />
                <div className="absolute top-0 bottom-0 left-1/3 w-3.5 bg-[#ffffff] transform rotate-12 shadow-sm" />
                <div className="absolute top-1/4 left-0 right-0 h-2 bg-[#f2efe9]" />
                <div className="absolute top-0 bottom-0 right-1/4 w-2.5 bg-[#f2efe9]" />
            </div>

            {/* City Label Simulation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 pointer-events-none text-center opacity-70">
                <p className="font-extrabold text-gray-800 text-lg tracking-tight">Bengaluru</p>
                <p className="font-bold text-gray-600 text-sm">ಬೆಂಗಳೂರು</p>
            </div>

            {/* Simulated Location Marker Pin */}
            <div
                className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-full pointer-events-none z-10"
                style={{
                    left: `${((markerPosition.lng - 77.5946) / 0.04 + 0.5) * 100}%`,
                    top: `${((0.5 - (markerPosition.lat - 12.9716) / 0.04)) * 100}%`,
                }}
            >
                <div className="relative flex flex-col items-center animate-bounce">
                    <div className="w-9 h-9 bg-[#FC8019] rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white">
                        <MapPin className="w-5 h-5 fill-current" />
                    </div>
                    <div className="w-2 h-1 bg-black/40 rounded-full blur-[1px] mt-0.5" />
                </div>
            </div>

            {/* Offline Notice Badge */}
            <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md border border-gray-200 shadow-sm z-10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[11px] font-bold text-gray-700">Interactive Simulation Mode (Click anywhere to move pin)</span>
            </div>
            
            <div className="absolute bottom-2.5 right-2.5 bg-gray-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded">
                Live GPS Active
            </div>
        </div>
    );
}

export default function CartPage() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    // State Management
    const [selectedAddressId, setSelectedAddressId] = useState<number>(1);
    const [showNewAddressForm, setShowNewAddressForm] = useState<boolean>(false);
    const [markerPosition, setMarkerPosition] = useState(DEFAULT_CENTER);
    
    // New Address Form State
    const [newAddress, setNewAddress] = useState({
        tag: "Home" as "Home" | "Work" | "Other",
        flatNo: "",
        street: "Koramangala 4th Block, 80ft Road",
        city: "Bengaluru, Karnataka",
        pincode: "560034",
    });

    const [savedAddresses, setSavedAddresses] = useState<AddressItem[]>([
        {
            id: 1,
            tag: "Home",
            street: "24, Royal Enclave, 4th Cross, 80ft Road, Koramangala 4th Block",
            city: "Bengaluru, Karnataka 560034",
            pincode: "560034",
            time: "45 MINS",
            isDefault: true,
        },
    ]);

    const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarkerPosition({ lat, lng });
            setNewAddress((prev) => ({
                ...prev,
                street: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)} (Selected on Map)`,
            }));
        }
    }, []);

    const handleSaveAddress = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = Date.now();
        const createdAddr: AddressItem = {
            id: newId,
            tag: newAddress.tag,
            street: `${newAddress.flatNo ? newAddress.flatNo + ", " : ""}${newAddress.street}`,
            city: newAddress.city,
            pincode: newAddress.pincode,
            time: "35 MINS",
        };
        setSavedAddresses([createdAddr, ...savedAddresses]);
        setSelectedAddressId(newId);
        setShowNewAddressForm(false);
    };

    return (
        <div className="min-h-screen bg-[#e9ecee] flex flex-col font-sans">
            {/* 1. Top Navbar */}
            <Navbar />

            {/* 2. Full-Screen Widescreen Main Content 2-Column Grid */}
            <main className="flex-1 w-full max-w-[1500px] mx-auto px-6 lg:px-16 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    
                    {/* LEFT COLUMN: Checkout Steps (Spans 2 cols) */}
                    <div className="lg:col-span-2 space-y-7">
                        
                        {/* STEP 1: DELIVERY ADDRESS CARD */}
                        <div className="bg-white p-7 sm:p-9 rounded-2xl shadow-sm border border-gray-100">
                            
                            {/* Card Header */}
                            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 bg-gray-900 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <MapPin className="w-5 h-5 text-[#FC8019]" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black text-gray-900 tracking-wide uppercase">
                                            DELIVERY ADDRESS
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Select a delivery location or pin an exact spot on the map
                                        </p>
                                    </div>
                                </div>
                                <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                                    <Check className="w-4 h-4 stroke-[3]" />
                                </div>
                            </div>

                            {/* Saved Address Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
                                
                                {/* Existing Saved Address Card */}
                                {savedAddresses.map((addr) => {
                                    const isSelected = selectedAddressId === addr.id;
                                    return (
                                        <div
                                            key={addr.id}
                                            onClick={() => setSelectedAddressId(addr.id)}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between bg-white ${
                                                isSelected
                                                    ? "border-[#FC8019] shadow-md shadow-orange-500/5"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                                                        <Home className="w-4 h-4 text-gray-700" />
                                                        <span>{addr.tag}</span>
                                                    </div>
                                                    {isSelected && (
                                                        <span className="text-[10px] font-extrabold bg-orange-100 text-[#FC8019] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                                            SELECTED
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-600 leading-relaxed mb-5">
                                                    {addr.street}
                                                </p>
                                            </div>

                                            <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between">
                                                <span className="font-extrabold text-xs text-gray-900 tracking-wider">
                                                    {addr.time}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedAddressId(addr.id);
                                                    }}
                                                    className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                                                        isSelected
                                                            ? "bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                                            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                                    }`}
                                                >
                                                    DELIVER HERE
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Add New Address Box */}
                                <div
                                    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                                    className="p-6 rounded-2xl border-2 border-dashed border-orange-300 hover:border-[#FC8019] cursor-pointer bg-white flex flex-col items-center justify-center text-center min-h-[200px] transition-all group"
                                >
                                    <div className="w-11 h-11 rounded-full bg-orange-50 text-[#FC8019] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6 stroke-[2.5]" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-sm mb-1">Add New Address</h3>
                                    <p className="text-xs text-gray-400 max-w-xs mb-4">
                                        Koramangala, Bengaluru, Karnataka, India
                                    </p>
                                    <button
                                        type="button"
                                        className="px-5 py-2 rounded-lg font-bold text-xs text-[#FC8019] border border-[#FC8019] hover:bg-orange-50 transition-colors uppercase tracking-wider"
                                    >
                                        ADD NEW
                                    </button>
                                </div>

                            </div>

                            {/* Interactive Map Inside Delivery Card */}
                            <div className="mt-7 pt-7 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-3.5">
                                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-[#FC8019]" />
                                        Pin Exact Location on Map
                                    </span>
                                    <span className="text-[11px] font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
                                        Lat: {markerPosition.lat.toFixed(4)}, Lng: {markerPosition.lng.toFixed(4)}
                                    </span>
                                </div>

                                {/* Map Box */}
                                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                    {apiKey ? (
                                        <RealGoogleMapSection
                                            apiKey={apiKey}
                                            markerPosition={markerPosition}
                                            setMarkerPosition={setMarkerPosition}
                                            handleMapClick={handleMapClick}
                                        />
                                    ) : (
                                        <SimulatedMapSection
                                            markerPosition={markerPosition}
                                            setMarkerPosition={setMarkerPosition}
                                            onLocationSelect={(lat, lng) => {
                                                setNewAddress((prev) => ({
                                                    ...prev,
                                                    street: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)} (Selected on Map)`,
                                                }));
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Expandable Add Address Form when 'ADD NEW' is clicked */}
                                {showNewAddressForm && (
                                    <form onSubmit={handleSaveAddress} className="mt-5 p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4 animate-fadeIn">
                                        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Enter Address Details</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Flat / Building / Floor"
                                                    value={newAddress.flatNo}
                                                    onChange={(e) => setNewAddress({ ...newAddress, flatNo: e.target.value })}
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-orange-500"
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <input
                                                    type="text"
                                                    placeholder="Street address / Landmark"
                                                    value={newAddress.street}
                                                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-orange-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2.5 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setShowNewAddressForm(false)}
                                                className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-200 rounded-lg"
                                            >
                                                CANCEL
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-6 py-2 text-xs font-bold text-white bg-[#FC8019] hover:bg-orange-600 rounded-lg shadow-sm uppercase tracking-wider"
                                            >
                                                SAVE & DELIVER HERE
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>

                        </div>

                        {/* STEP 2: PAYMENT CARD (Collapsed/Inactive state as in screenshot) */}
                        <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-11 h-11 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-gray-500 tracking-wide uppercase">
                                    PAYMENT
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Select your payment method
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Cart Summary Sidebar (Spans 1 col) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 sticky top-28 space-y-6">
                            
                            {/* Restaurant Header */}
                            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                                <div className="w-13 h-13 p-2.5 rounded-xl bg-amber-100 flex-shrink-0 flex items-center justify-center text-2xl shadow-inner border border-amber-200/50">
                                    🍔
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-gray-900 text-base leading-tight">
                                        The Burger Club
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Koramangala
                                    </p>
                                </div>
                            </div>

                            {/* Order Items List */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-3.5 h-3.5 border border-green-600 p-[1.5px] flex items-center justify-center rounded-[2px] flex-shrink-0">
                                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                                        </span>
                                        <span className="truncate max-w-[200px]">Classic Cheeseburger x 1</span>
                                    </div>
                                    <span className="font-bold text-gray-900 font-mono">₹249</span>
                                </div>

                                <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-3.5 h-3.5 border border-green-600 p-[1.5px] flex items-center justify-center rounded-[2px] flex-shrink-0">
                                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                                        </span>
                                        <span className="truncate max-w-[200px]">Peri Peri Fries x 1</span>
                                    </div>
                                    <span className="font-bold text-gray-900 font-mono">₹139</span>
                                </div>

                                <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-3.5 h-3.5 border border-green-600 p-[1.5px] flex items-center justify-center rounded-[2px] flex-shrink-0">
                                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                                        </span>
                                        <span className="truncate max-w-[200px]">Coke 500ml x 1</span>
                                    </div>
                                    <span className="font-bold text-gray-900 font-mono">₹60</span>
                                </div>
                            </div>

                            {/* Apply Coupon Box */}
                            <div className="border border-dashed border-gray-300 rounded-xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-orange-50/50 hover:border-orange-300 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FC8019] flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                                        %
                                    </div>
                                    <span className="text-xs font-bold text-gray-800">Apply Coupon</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#FC8019] group-hover:translate-x-0.5 transition-all" />
                            </div>

                            {/* Bill Details */}
                            <div className="space-y-3 pt-2">
                                <h4 className="text-[11px] font-black tracking-wider text-gray-500 uppercase">
                                    BILL DETAILS
                                </h4>
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Item Total</span>
                                    <span className="font-mono">₹448</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Delivery Fee | 3.5 kms</span>
                                    <span className="font-mono">₹35</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600 border-b border-gray-100 pb-4">
                                    <span>Taxes and Charges</span>
                                    <span className="font-mono">₹14.50</span>
                                </div>
                            </div>

                            {/* To Pay Total */}
                            <div className="flex justify-between items-center font-black text-gray-900 text-sm pt-1">
                                <span className="tracking-wide">TO PAY</span>
                                <span className="text-base font-mono">₹497.50</span>
                            </div>

                            {/* PAY NOW Button */}
                            <button
                                type="button"
                                onClick={() => alert("Proceeding to Razorpay / Swiggy Payment Gateway...")}
                                className="w-full bg-[#FC8019] hover:bg-orange-600 text-white font-black text-sm py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] uppercase tracking-wider cursor-pointer"
                            >
                                PAY NOW
                            </button>

                            {/* Footer Terms Note */}
                            <p className="text-[10px] text-center text-gray-400 leading-tight">
                                By clicking pay, you agree to our Terms and Conditions.
                            </p>

                        </div>
                    </div>

                </div>
            </main>

            {/* 3. Widescreen Dark Bottom Footer */}
            <footer className="w-full bg-[#02060C] text-white py-14 px-6 lg:px-16 mt-20 border-t border-gray-800">
                <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-xs text-gray-400">
                    
                    {/* Brand Col */}
                    <div className="md:col-span-1 space-y-3">
                        <span className="text-lg font-black tracking-tight text-white uppercase block">
                            SWIGGY CLONE
                        </span>
                        <p className="text-[11px] leading-relaxed text-gray-500">
                            © 2026 Swiggy Clone. All rights reserved.
                        </p>
                    </div>

                    {/* Company Col */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
                        </ul>
                    </div>

                    {/* Services Col */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider">Services</h4>
                        <ul className="space-y-2">
                            <li><a href="#one" className="hover:text-white transition-colors">Swiggy One</a></li>
                            <li><a href="#instamart" className="hover:text-white transition-colors">Swiggy Instamart</a></li>
                        </ul>
                    </div>

                    {/* Support Col */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Legal Col */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#cookie" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                </div>
            </footer>
        </div>
    );
}