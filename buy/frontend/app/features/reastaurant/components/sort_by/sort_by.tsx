import { useState } from "react";
import { Loader2 } from "lucide-react";

interface SortByProps {
    onClose?: () => void;
}

export default function Sort_By({ onClose }: SortByProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const Appleysubmit = () => {
        setLoading(true);
        setError(null);

        setTimeout(() => {
            setLoading(false);
            if (onClose) onClose();
        }, 1500); // Simulate API call and close
    }

    const list = [
        { item: "Relevance (Default)" },
        { item: "Delivery Time" },
        { item: "Rating" },
        { item: "Cost: Low to High" },
        { item: "Cost: High to Low" }
    ];

    return (
        <>
            {/* Full page loading overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[200] flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl flex flex-col items-center gap-3 shadow-2xl">
                        <Loader2 className="w-10 h-10 text-[#ff5200] animate-spin" />
                        <p className="text-gray-700 font-medium">Applying sort...</p>
                    </div>
                </div>
            )}

            {/* Invisible overlay to close when clicking outside */}
            <div className="fixed inset-0 z-[100]" onClick={onClose}>
                {/* Positioned dropdown (approximate position based on screenshot) */}
                <div 
                    className="absolute top-[210px] left-[150px] sm:left-[250px] lg:left-[450px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl w-[220px] flex flex-col animate-in fade-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col py-4 px-5 gap-4">
                        {list.map((i, index) => (
                            <label key={i.item} className="flex justify-between items-center cursor-pointer group">
                                <span className={`text-[15px] font-medium pr-2 ${index === 0 ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'}`}>
                                    {i.item}
                                </span>
                                <input 
                                    type="radio" 
                                    name="sortBy"
                                    defaultChecked={index === 0}
                                    className="w-[18px] h-[18px] text-[#ff5200] border-gray-300 accent-[#ff5200] cursor-pointer" 
                                />
                            </label>
                        ))}
                    </div>
                    
                    <div className="border-t border-gray-200">
                        <button 
                            onClick={Appleysubmit}
                            disabled={loading}
                            className="w-full text-[#ff5200] py-3.5 font-bold hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-[15px] rounded-b-xl"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}