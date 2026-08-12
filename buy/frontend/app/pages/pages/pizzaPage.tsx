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

interface RestaurantCard {
    id: number;
    name: string;
    image: string;
    rating: number;
    time: string;
    cuisines: string;
    location: string;
    offer: string;
}

const pizzaRestaurants: RestaurantCard[] = [
    {
        id: 1,
        name: "La Pino'z Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=80",
        rating: 4.3,
        time: "20-25 mins",
        cuisines: "Pizzas, Pastas, Italian, Desserts",
        location: "Navrangpura, Ahmedabad",
        offer: "50% OFF UPTO ₹100"
    },
    {
        id: 2,
        name: "Domino's Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
        rating: 4.4,
        time: "30-35 mins",
        cuisines: "Pizzas, Fast Food, Beverages",
        location: "CG Road, Ahmedabad",
        offer: "₹150 OFF ABOVE ₹399"
    },
    {
        id: 3,
        name: "Pizza Hut",
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&auto=format&fit=crop&q=80",
        rating: 4.1,
        time: "25-30 mins",
        cuisines: "Pizzas, American, Italian",
        location: "Vastrapur, Ahmedabad",
        offer: "ITEMS AT ₹199"
    },
    {
        id: 4,
        name: "Oven Story Pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80",
        rating: 4.5,
        time: "20-30 mins",
        cuisines: "Pizzas, Italian, Desserts",
        location: "Satellite, Ahmedabad",
        offer: "FREE GARLIC BREAD"
    }
];


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
            <div className="min-h-screen  bg-white"> 
                <div className="">
                    <NavbarDashboard />
                </div> 
                
                <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
                    
                    {/* Header */}
                    <div className="mb-6">

                        <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">Pizza</h1>
                        <p className="text-gray-600 text-lg">Satisfy your cravings for South Indian breakfast with these crispy & buttery pizza</p>
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
                    
                    {/* Restaurant Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10 pb-10 mt-6">
                        {pizzaRestaurants.map((restaurant) => (
                            <Link
                                key={restaurant.id}
                                to={`/restaurants/${restaurant.id}-${restaurant.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                                className="group flex flex-col cursor-pointer bg-white rounded-2xl transition-all duration-300 hover:scale-[0.98]"
                            >
                                {/* Image Container with Offer Overlay */}
                                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 bg-gray-100">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {/* Dark Gradient Overlay for Offer Text */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-3 sm:p-4 transition-colors duration-300 group-hover:bg-black/50">
                                        <span className="font-extrabold text-white text-xl sm:text-2xl tracking-wide uppercase drop-shadow-lg text-center">
                                            {restaurant.offer}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Details */}
                                <div className="pt-3 px-2 flex flex-col items-center text-center w-full min-w-0">
                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#ff5200] transition-colors truncate">
                                        {restaurant.name}
                                    </h3>

                                    <div className="flex items-center space-x-1 font-semibold text-sm text-gray-800 mt-1">
                                        <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px]">
                                            ★
                                        </div>
                                        <span>{restaurant.rating}</span>
                                        <span className="text-gray-400">•</span>
                                        <span>{restaurant.time}</span>
                                    </div>

                                    <p className="text-gray-500 text-sm mt-1 truncate font-normal">
                                        {restaurant.cuisines}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-0.5 truncate font-normal">
                                        {restaurant.location}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
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
