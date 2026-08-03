import Search from "../components/search/search";
import Navbar from "../components/navbar/Navbar";
import { MapPin, ChevronDown } from "lucide-react";


export default function TacoBellPage() {
return (
<div>
    <Navbar />
    <div className="flex items-center justify-center bg-white h-[150px]">
        <div className="flex items-center justify-between border border-gray-300 rounded-lg w-[850px] h-[56px] bg-white overflow-hidden shadow-sm">
            {/* Location Section */}
            <div className="flex items-center space-x-2 px-4 cursor-pointer hover:bg-gray-50 h-full max-w-[300px]">
                <MapPin size={22} className="text-[#ff6d7a] shrink-0 fill-[#ff6d7a]" />
                <span className="text-gray-700 text-[15px] font-medium truncate">Select Location</span>
                <ChevronDown size={18} className="text-gray-600" />
            </div>

            {/* Divider */}
            <div className="w-[1px] h-[30px] bg-gray-300 mx-2"></div>

            {/* Search Section */}
            <div className="flex flex-1 items-center space-x-3 px-4 h-full">
                <Search size={22} className="cursor-pointer text-gray-500" />
                <input className="outline-none bg-transparent w-full text-gray-700 text-[15px] placeholder-gray-500" type="text" placeholder="Search for restaurant, cuisine or a dish" />
            </div>

        </div>
    </div>
</div>
)
}