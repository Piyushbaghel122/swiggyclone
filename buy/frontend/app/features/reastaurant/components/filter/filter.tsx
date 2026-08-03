import { useState } from "react";
import { X } from "lucide-react";

interface FilterProps {
    onClose?: () => void;
}

export default function Filter({ onClose }: FilterProps) {
    const [activeTab, setActiveTab] = useState("Sort");
    

    const list = [
        { item: "Sort" },
        { item: "10 Mins Delivery" },
        { item: "Veg/Non-Veg" },
        { item: "Ratings" },
        { item: "Delivery Time" },
        { item: "Cost For Two" }
    ];

    const renderOptions = () => {
        if (activeTab === "Sort") {
            return (
                <div className="flex flex-col gap-5 mt-2">
                    <p className="text-gray-500 text-xs font-semibold tracking-wider">SORT BY</p>
                    <div className="flex flex-col gap-4 mt-2">
                        {["Relevance (Default)", "Delivery Time", "Rating", "Cost: Low to High", "Cost: High to Low"].map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <input 
                                    type="radio" 
                                    name="sort" 
                                    className="w-[18px] h-[18px] text-[#ff5200] accent-[#ff5200] cursor-pointer" 
                                    defaultChecked={opt === "Relevance (Default)"} 
                                />
                                <span className={`text-base ${opt === "Relevance (Default)" ? "font-semibold text-gray-800" : "text-gray-600 group-hover:text-gray-800"}`}>
                                    {opt}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            );
        } else if (activeTab === "10 Mins Delivery") {
            return (
                <div className="flex flex-col gap-5 mt-2">
                    <p className="text-gray-500 text-xs font-semibold tracking-wider">FILTER BY</p>
                    <div className="flex flex-col gap-4 mt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input 
                                type="radio" 
                                name="10mins" 
                                className="w-[18px] h-[18px] text-[#ff5200] border-gray-400 accent-[#ff5200] cursor-pointer" 
                            />
                            <span className="text-base text-gray-600 group-hover:text-gray-800">10 Mins Delivery</span>
                        </label>
                    </div>
                </div>
            );
        } else if (activeTab === "Veg/Non-Veg") {
            return (
                <div className="flex flex-col gap-5 mt-2">
                    <p className="text-gray-500 text-xs font-semibold tracking-wider">FILTER BY</p>
                    <div className="flex flex-col gap-4 mt-2">
                        {["Non Veg", "Pure Veg"].map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="w-[18px] h-[18px] rounded border-gray-400 text-[#ff5200] accent-[#ff5200] cursor-pointer" 
                                />
                                <span className="text-base text-gray-600 group-hover:text-gray-800">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );
        } else if (activeTab === "Ratings") {
            return (
                <div className="flex flex-col gap-5 mt-2">
                    <p className="text-gray-500 text-xs font-semibold tracking-wider">FILTER BY</p>
                    <div className="flex flex-col gap-4 mt-2">
                        {["Ratings", "Ratings 4.0+", "Ratings 4.5+"].map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="w-[18px] h-[18px] rounded border-gray-400 text-[#ff5200] accent-[#ff5200] cursor-pointer" 
                                />
                                <span className="text-base text-gray-600 group-hover:text-gray-800">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );
        } else if (activeTab === "Delivery Time") {
            return (
                <div className="flex flex-col gap-5 mt-2">
                    <p className="text-gray-500 text-xs font-semibold tracking-wider">FILTER BY</p>
                    <div className="flex flex-col gap-4 mt-2">
                        {["Less than 30 mins", "Less than 45 mins"].map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="w-[18px] h-[18px] rounded border-gray-400 text-[#ff5200] accent-[#ff5200] cursor-pointer" 
                                />
                                <span className="text-base text-gray-600 group-hover:text-gray-800">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );
        } else if (activeTab === "Cost For Two") {
            return (
                <div className="flex flex-col gap-5 mt-2">
                    <p className="text-gray-500 text-xs font-semibold tracking-wider">FILTER BY</p>
                    <div className="flex flex-col gap-4 mt-2">
                        {["Less than Rs. 300", "Rs.300 - Rs.600", "Greater than Rs. 600"].map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="w-[18px] h-[18px] rounded border-gray-400 text-[#ff5200] accent-[#ff5200] cursor-pointer" 
                                />
                                <span className="text-base text-gray-600 group-hover:text-gray-800">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[100] backdrop-blur-sm">
            <div className="bg-white shadow-2xl rounded-2xl w-[90%] max-w-[700px] flex flex-col h-[65vh] max-h-[600px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200/80">
                    <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Filter</h1>
                    <button 
                        onClick={onClose} 
                        className="p-1.5 border border-gray-200 rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-sm bg-white cursor-pointer"
                    >
                        <X size={18} className="text-gray-500" strokeWidth={2.5} />
                    </button>
                </div>
                
                {/* Content area */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left Sidebar */}
                    <div className="w-[35%] border-r border-gray-200/80 overflow-y-auto py-2 bg-white">
                        {list.map((i) => {
                            const isActive = activeTab === i.item;
                            return (
                                <div 
                                    key={i.item}
                                    onClick={() => setActiveTab(i.item)}
                                    className={`px-6 py-4 cursor-pointer text-[17px] transition-all relative
                                        ${isActive ? "font-bold text-gray-900" : "text-gray-600 font-medium hover:bg-gray-50"}
                                    `}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 bg-[#ff5200] rounded-r-md"></div>
                                    )}
                                    {i.item}
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Right Options */}
                    <div className="w-[65%] px-8 py-6 overflow-y-auto bg-white">
                        {renderOptions()}
                    </div>
                </div>
            </div>
        </div>
    );
}