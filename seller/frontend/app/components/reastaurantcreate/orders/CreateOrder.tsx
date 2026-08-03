/* eslint-disable @next/next/no-html-link-for-pages */
import { useState, useEffect } from "react";
import MenuOrder from "./menuOrder";
import Navbar from "../../navbar/navbar";


export default function MyProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("Settings");

    useEffect(() => {
        const pathname = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');

        if (tab) {
            // Capitalize the first letter for activeTab state to match rendering logic
            // Handle specific casing if needed
            let formattedTab = tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase();
            if (formattedTab === 'Orderlist') formattedTab = 'Orderslist';
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveTab(formattedTab);
        }
    }, []);

    return (
        <>
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
                            <a href="?tab=orderlist" onClick={(e) => { e.preventDefault(); setActiveTab('Orderslist'); window.history.pushState(null, '', '?tab=orderlist'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'Orderslist' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                Orders list {/* menu , cart , order type , update in order */}
                            </a>
                            <a href="?tab=orderdelivery" onClick={(e) => { e.preventDefault(); setActiveTab('Orderdelivery'); window.history.pushState(null, '', '?tab=orderdelivery'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'Orderdelivery' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                order delivery Servcies { /* order tracking ,  */}
                            </a>
                            <a href="?tab=review" onClick={(e) => { e.preventDefault(); setActiveTab('Review'); window.history.pushState(null, '', '?tab=review'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'Review' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                review service
                            </a>
                            <a href="?tab=payment" onClick={(e) => { e.preventDefault(); setActiveTab('Payment'); window.history.pushState(null, '', '?tab=payment'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'Payment' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                payment services
                            </a>
                            <a href="?tab=settings" onClick={(e) => { e.preventDefault(); setActiveTab('Settings'); window.history.pushState(null, '', '?tab=settings'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'Settings' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                Settings
                            </a>
                        </nav>
                    </div>
                    {/* Main Content Placeholder for CreateOrder */}
                    <div className="flex-1 overflow-y-auto p-8 flex flex-col xl:flex-row gap-8 bg-slate-50/50">
                        <div className="flex-1 flex  bg-white rounded-3xl shadow-sm border border-slate-100 p-8 h-full min-h-[400px]">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">{activeTab}</h2>
                                <p className="text-slate-500">Create Order content goes here.</p>
                                <MenuOrder />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}