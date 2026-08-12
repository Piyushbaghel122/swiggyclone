import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function MainContent(){
    return (
        <div className="flex justify-center mt-5 items-start">
        <div className="p-4 w-[700px]  font-sans">
            {/* Search Bar */}
            <div className="flex items-center h-[74px] bg-gray-100 rounded-xl px-5 py-6 mb-6 shadow-sm border border-transparent hover:bg-white hover:border-gray-200 hover:shadow-md transition-all duration-200">
                <Search size={20} className="text-gray-500 mr-3" />
                <input 
                    type="text" 
                    placeholder="Search for restaurants or dishes" 
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm font-medium"
                />
            </div>
        </div>
        </div>
    )
}
