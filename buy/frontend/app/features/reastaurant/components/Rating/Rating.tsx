

import { X } from "lucide-react";
import { useState } from "react";

interface VegAndNonVegProps {
    onClose?: () => void;
}

export default function VegAndNonVeg({ onClose }: VegAndNonVegProps) {
     const [loading , setLoading] = useState(false);
     const [error , setError] = useState<string | null>(null);

    const list = [
        { item: "Non Veg" },
        { item: "Pure Veg" }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] backdrop-blur-sm px-4">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-[600px] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex justify-between items-center p-6 pb-4">
                    <h1 className="text-xl font-bold text-gray-900">Veg/Non-Veg</h1>
                    <button 
                        onClick={onClose} 
                        className="p-1.5 border border-gray-200 rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-sm bg-white cursor-pointer"
                    >
                        <X size={18} className="text-gray-500" strokeWidth={2.5} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-5 px-6 py-4 min-h-[300px]">
                    {list.map((i) => (
                        <label key={i.item} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                className="w-5 h-5 rounded border-gray-400 text-[#ff5200] focus:ring-[#ff5200] accent-[#ff5200] cursor-pointer" 
                            />
                            <span className="text-gray-600 group-hover:text-gray-800 font-medium">
                                {i.item}
                            </span>
                        </label>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-white rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">

                    <button className="text-gray-400 font-bold hover:text-gray-600 transition-colors cursor-pointer text-[15px]">
                        Rating 
                    </button>
                    <button className="text-gray-400 font-bold hover:text-gray-600 transition-colors cursor-pointer text-[15px]">
                        Rating 4.0 +
                    </button>
                    <button 
                        onClick={onClose}
                        className="bg-[#ff5200] text-white px-10 py-3 rounded-xl font-bold hover:bg-[#e04800] transition-colors shadow-md text-[15px]"
                    >
                        Rating 4.5 +
                    </button>
                </div>
            </div>
        </div>
    );
}