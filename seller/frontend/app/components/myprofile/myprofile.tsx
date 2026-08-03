import { useState, useRef, useEffect } from "react";
import { FormConfirm } from "../../features/auth/components/FormConfirm";
import Navbar from "../navbar/navbar";
import Image from "next/image";
import dynamic from "next/dynamic";

const InteractiveMap = dynamic(() => import("../location/InteractiveMap"), {
    ssr: false,
});

export default function MyProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState("Piyush");
    const [lastName, setLastName] = useState("Kumar");
    const [email, setEmail] = useState("piyush@gmail.com");
    const [phone, setPhone] = useState("+91 98765 43210");
    const [dob, setDob] = useState("08/15/1995");
    const [gender, setGender] = useState("Male");
    const [profileImage, setProfileImage] = useState<string | null>("https://randomuser.me/api/portraits/men/44.jpg");
    const [activeTab, setActiveTab] = useState("Settings");
    
    useEffect(() => {
        const pathname = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        
        if (pathname === '/orders' || pathname.endsWith('/orders')) {
            setActiveTab('Orders');
        } else if (pathname === '/addresses' || pathname.endsWith('/addresses')) {
            setActiveTab('Addresses');
        } else if (pathname === '/history' || pathname.endsWith('/history')) {
            setActiveTab('History');
        } else if (tab) {
            // Capitalize the first letter for activeTab state to match rendering logic
            const formattedTab = tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase();
            setActiveTab(formattedTab);
        }
    }, []);
    
    // Address state for map interactions
    const [address, setAddress] = useState("Sector 45, Huda City Center, Gurgaon, Haryana, 122003");
    const [mapLat, setMapLat] = useState(28.4595);
    const [mapLng, setMapLng] = useState(77.0266);
    
    // Search states
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.length >= 3) {
            setIsSearching(true);
            try {
                // In a real app, you'd use the locationService.getSuggestions here.
                // For demo, we'll fake a response if the service is down.
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setSuggestions(data.slice(0, 5));
            } catch (err) {
                console.error("Failed to fetch suggestions", err);
            } finally {
                setIsSearching(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion: any) => {
        setMapLat(parseFloat(suggestion.lat));
        setMapLng(parseFloat(suggestion.lon));
        setAddress(suggestion.display_name);
        setSearchQuery(suggestion.display_name.split(',')[0]);
        setSuggestions([]);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-800 flex flex-col">
            <Navbar />

            {/* Top Header / Breadcrumb Area */}
            <div className="bg-white border-b border-slate-200 py-4 px-8 flex justify-between items-center z-10">
                <div>
                    <h1 className="text-xs font-bold text-orange-500 tracking-wider uppercase mb-1">Account Settings</h1>
                    <h2 className="text-xl font-medium text-slate-800">Profile Overview</h2>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-green-700">Profile 85% Complete</span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden h-[calc(100vh-140px)]">
                {/* Left Sidebar */}
                <div className="w-64 bg-slate-50 border-r border-slate-200 overflow-y-auto py-8">
                    <nav className="flex flex-col gap-2 px-4">
                        <a href="/orders" onClick={(e) => { e.preventDefault(); setActiveTab('Orders'); window.history.pushState(null, '', '/orders'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'Orders' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                            Orders
                        </a>
                        <a href="/history" onClick={(e) => { e.preventDefault(); setActiveTab('History'); window.history.pushState(null, '', '/history'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'History' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Order History
                        </a>
                        <a href="?tab=payments" onClick={(e) => { e.preventDefault(); setActiveTab('Payments'); window.history.pushState(null, '', '?tab=payments'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'Payments' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            Payments
                        </a>
                        <a href="/addresses" onClick={(e) => { e.preventDefault(); setActiveTab('Addresses'); window.history.pushState(null, '', '/addresses'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'Addresses' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Addresses
                        </a>
                        <a href="?tab=settings" onClick={(e) => { e.preventDefault(); setActiveTab('Settings'); window.history.pushState(null, '', '?tab=settings'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'Settings' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Settings
                        </a>
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-8 flex flex-col xl:flex-row gap-8 bg-slate-50/50">
                    {activeTab === 'Settings' ? (
                        <>
                            {/* Center Column: Forms & Addresses */}
                    <div className="flex-1 flex flex-col gap-8">
                        {/* Profile Info Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                            </div>
                            
                            <div className="flex items-center gap-6 mb-8 relative z-10">
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="w-24 h-24 rounded-2xl bg-slate-100 border-4 border-white shadow-md relative overflow-hidden cursor-pointer" onClick={handleEditClick}>
                                        {profileImage ? (
                                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                                    </div>
                                    <button onClick={handleEditClick} className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full border-2 border-white hover:bg-orange-600 transition-colors shadow-md z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.379-8.379-2.828-2.828z" /></svg>
                                    </button>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">{firstName} {lastName}</h2>
                                    <p className="text-slate-500 text-sm mt-1">Manage your public information and privacy settings.</p>
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <FormConfirm label="First Name" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <FormConfirm label="Last Name" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <FormConfirm label="Email Address" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <FormConfirm label="Phone Number" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <FormConfirm label="Date of Birth" type="text" placeholder="MM/DD/YYYY" value={dob} onChange={(e) => setDob(e.target.value)} />
                                <FormConfirm label="Gender" type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                            </div>
                        </div>

                        {/* Saved Addresses */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-semibold text-slate-700">Saved Addresses</h3>
                                <button className="text-orange-500 text-sm font-medium flex items-center gap-1 hover:text-orange-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                    Add New
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Home Card */}
                                <div className="bg-white p-5 rounded-2xl border-l-4 border-orange-500 shadow-sm relative hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-orange-50 p-2 rounded-lg text-orange-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">DEFAULT</span>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm mb-1">Home</h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">Sector 45, Huda City Center, Gurgaon, Haryana, 122003</p>
                                </div>
                                
                                {/* Work Card */}
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-indigo-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-indigo-50 p-2 rounded-lg text-indigo-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" /></svg>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm mb-1">Work</h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">Cyber Hub, Building 10C, 4th Floor, DLF Phase 2, Gurgaon</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Map Widget & Security */}
                    <div className="w-full xl:w-[320px] flex flex-col gap-6 shrink-0">
                        {/* Live Location Widget */}
                        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col">
                            <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                Live Location
                            </h3>
                            
                            <div className="relative mb-4 z-20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search area, landmark..." 
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/50" 
                                />
                                {isSearching && (
                                    <div className="absolute right-3 top-2.5">
                                        <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                                {suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-30">
                                        {suggestions.map((item, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => handleSelectSuggestion(item)}
                                                className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-orange-600 border-b border-slate-100 last:border-0 truncate"
                                            >
                                                {item.display_name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-full h-[220px] rounded-2xl overflow-hidden mb-4 border border-slate-200 relative z-10">
                                <InteractiveMap 
                                    initialLat={mapLat} 
                                    initialLng={mapLng} 
                                    onLocationChange={(lat, lng, addr) => {
                                        setMapLat(lat);
                                        setMapLng(lng);
                                        setAddress(addr);
                                    }} 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-5">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Latitude</p>
                                    <p className="text-xs font-bold text-slate-800">{mapLat.toFixed(4)}° N</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Longitude</p>
                                    <p className="text-xs font-bold text-slate-800">{mapLng.toFixed(4)}° E</p>
                                </div>
                            </div>

                            <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex flex-col gap-3 text-orange-800">
                                <div className="flex gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                    <p className="text-[11px] leading-relaxed font-medium">Live my location</p>
                                </div>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="select your location" 
                                        className="w-full pl-3 pr-8 py-2 bg-white border border-orange-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-orange-400"
                                        value={address || ""}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <button className="absolute right-2 top-2 text-orange-500 hover:text-orange-700" title="Edit location">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Secure Account Box */}
                        <div className="bg-gradient-to-br from-orange-600 to-orange-500 rounded-3xl p-6 shadow-md text-white relative overflow-hidden mt-auto">
                            <div className="absolute -right-4 -bottom-4 opacity-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            </div>
                            <h3 className="font-bold text-sm mb-2">Secure Account</h3>
                            <p className="text-xs text-orange-100 leading-relaxed relative z-10">Your data is protected with 256-bit encryption and multi-factor authentication.</p>
                        </div>
                    </div>
                    </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-white rounded-3xl shadow-sm border border-slate-100 p-8 h-full min-h-[400px]">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">{activeTab}</h2>
                                <p className="text-slate-500">This section is currently under construction.</p>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Bottom Action Bar */}
                <div className="absolute bottom-0 right-0 left-64 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 px-8 flex justify-end items-center gap-4 z-20">
                    <button className="text-slate-500 text-sm font-medium hover:text-slate-700 transition-colors">Discard Changes</button>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-orange-500/30 flex items-center gap-2 transition-transform transform hover:-translate-y-0.5">
                        Save Changes
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}