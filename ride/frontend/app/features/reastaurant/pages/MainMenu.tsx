"use client";

import { useState } from "react";
import { Search, Bell, CircleHelp } from "lucide-react";
import MapMenu from "./mapMenu";


export const MainMenu = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const list = [
    {
        item: "dashboard", 
        logout: "logout"
    },
    {
        item: "shop"
    },
    {
        item: "partneer in shop"
    }, 
    {
        item: "order"
    },
    {
        item: "notifiction request in ride"
    },
    {
        item: "ride history"
    },
    {
        item: "report"
    }, 
    
  ]
 
  return (
    <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="flex flex-col ml-4">
            <div className="shadow-lg border-2 border-gray-300 bg-white rounded-2xl min-h-[95vh] w-[320px] my-4 flex flex-col justify-between py-6">
                <ul className="px-5 flex flex-col gap-2 items-center justify-center">
                    {list.map((i) => (
                        <li 
                            key={i.item}
                            onClick={() => setActiveItem(i.item)}
                            className={`w-full text-xl capitalize cursor-pointer px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3
                                ${activeItem === i.item 
                                    ? "bg-yellow-400 text-gray-900 font-medium shadow-sm" 
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {i.item}
                        </li>
                    ))}
                </ul>
                <div className="px-5 mt-auto border-t pt-5 mx-5 border-gray-100">
                    {list.map((i) => (
                        i.logout ? (
                            <div 
                                className="flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 cursor-pointer px-4 py-3 rounded-xl transition-all duration-200 font-medium text-xl capitalize" 
                                key={i.logout}
                            >
                                {i.logout}
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-5 rounded-2xl  flex flex-col min-w-0">
            {/* Top Header Bar */}
            <div className="h-[72px] bg-white  border-b border-gray-300 flex items-center justify-between px-8">
                {/* Search Bar */}
                <div className="flex items-center gap-3 text-gray-400 w-[450px]">
                    <Search className="w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search restaurants, transactions..." 
                        className="bg-transparent border-none outline-none w-full text-[15px] text-gray-700 placeholder-gray-400"
                    />
                </div>
                
                {/* Right Side Icons */}
                <div className="flex items-center gap-6 text-gray-500">
                    <div className="relative cursor-pointer hover:text-gray-800 transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>
                    <CircleHelp className="w-6 h-6 cursor-pointer hover:text-gray-800 transition-colors" />
                </div>
            </div>

            {/* Page Content */}
            <div className="p-8 flex-1 flex flex-col gap-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 capitalize">{activeItem}</h2>
                    <p className="text-gray-500 mt-2">Welcome to your {activeItem} area.</p>
                </div>
                
                {/* Conditionally Render Map Component */}
                {activeItem === 'dashboard' && (
                    <div className="flex-1 min-h-[500px]">
                        <MapMenu />
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

