import NavbarDashboard from "@/app/components/navbar/NavbarDashboard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import Filter from "@/app/features/reastaurant/components/filter/filter";
import { useState } from "react";
import  Sort_By from "@/app/features/reastaurant/components/sort_by/sort_by";
import Rating from "@/app/features/reastaurant/components/Rating/Rating";
import Cost from "@/app/features/reastaurant/components/costfortwo/Cost";
import DeliveryTime from "@/app/features/reastaurant/components/DeliveyTime/DeliveryTime";
import { Link } from "@tanstack/react-router";
import VegAndNonVeg from "@/app/features/reastaurant/components/VegAndNonVeg/VegAndNonVeg";


export default function PizzaPage(){
    const [showFilter, setShowFilter] = useState(false);
    const [showSort_by , setShowSort_by] = useState(false);
    const [showRating , setShowRating] = useState(false);
    const [showCost , setShowCost] = useState(false);
    const [showDeliveryTime , setShowDeliveryTime] = useState(false);
    const [showVegAndNonVeg , setShowVegAndNonVeg] = useState(false);

    const submitSort_By = () => {
        setShowSort_by(true);
    }

    const submitfilter = () =>{
        setShowFilter(true);
    }
    
   const submitRating = () =>{
       setShowRating(true);
      }

    const submitDeliveryTime = () =>{
        setShowDeliveryTime(true);
    }

    const submitCost = () =>{
        setShowCost(true);
    }

    const  VegAndNonVegSubmit = () => {
       setShowVegAndNonVeg(true)
    }

    return (
        <>
            <div className="min-h-screen bg-white"> 
                <div className="">
                    <NavbarDashboard />
                </div> 
                
                {/* Main Content Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">Burger page</h1>
                        <p className="text-gray-600 text-lg">burger </p>
                    </div>
                    
                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center gap-3 mb-8 cursor-pointer">
                        {/* Filter Button */}
                        <button 
                            onClick={submitfilter}
                            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow transition-all duration-200"
                        > 
                          filter
                            <SlidersHorizontal size={16} />
                        </button>
                        
                        {/* Sort By */}
                        <button 
                            onClick={submitSort_By}
                            className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow transition-all duration-200"
                        >
                            Sort By
                            <ChevronDown size={16} className="text-gray-500" />
                        </button>

                        {/* 10 Mins Delivery with NEW Badge */}
                        <Link to="/fastDelivery" className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow transition-all duration-200">
                            <span className="bg-[#ff5200] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">New</span>
                            10 Mins Delivery
                        </Link>

                        {/* Veg/Non-Veg */}
                        <button 
                     onClick={VegAndNonVegSubmit}
                      className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow transition-all duration-200">
                            Veg/Non-Veg
                            <ChevronDown size={16} className="text-gray-500" />
                        </button>

                        {/* Ratings */}
                        <button 
                     onClick={submitRating}
                        className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow transition-all duration-200">
                            Ratings
                            <ChevronDown size={16} className="text-gray-500" />
                        </button>

                        {/* Delivery Time */}
                    <button 

                        onClick={submitDeliveryTime} 
                        className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow transition-all duration-200">
                            Delivery Time
                            <ChevronDown size={16} className="text-gray-500" />
                        </button>

                        {/* Cost For Two */}
                        <button
                        onClick={submitCost} className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow transition-all duration-200">
                            Cost For Two
                            <ChevronDown size={16} className="text-gray-500" />
                        </button>
                    </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Restaurants to explore</h2>
                    
                </div>

                {/* Filter Modal */}
                {showFilter && (
                    <Filter onClose={() => setShowFilter(false)} />
                )}
            </div>
            
            {/* Sort Modal */}
            <div>
                {showSort_by && (
                    <Sort_By onClose={() => setShowSort_by(false)} />
                )}
            </div>

            <div>
                {showRating && (
                    <Rating onClose={() => setShowRating(false)} />
                )}
            </div>

            <div>
                {showDeliveryTime && (
                    <DeliveryTime onClose={() => setShowDeliveryTime(false)} />
                )}
            </div>

            <div>
                {showCost && (
                    <Cost onClose={() => setShowCost(false)} />
                )}
            </div>
            
            <div>
                {showVegAndNonVeg && (
                    <VegAndNonVeg onClose={() => setShowVegAndNonVeg(false)} />
                )}
            </div>
        </>
    );
}
