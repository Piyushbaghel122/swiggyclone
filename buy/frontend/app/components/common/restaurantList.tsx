/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { Star, Filter, ChevronDown } from "lucide-react";
import { useTranslation } from "@/node_modules/react-i18next";
import { Link } from "@tanstack/react-router";

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

const restaurants: RestaurantCard[] = [
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
        name: "McDonald's",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
        rating: 4.5,
        time: "15-20 mins",
        cuisines: "Burgers, Beverages, Cafe, Desserts",
        location: "CG Road, Ahmedabad",
        offer: "ITEMS AT ₹149"
    },
    {
        id: 3,
        name: "The Burger Club",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
        rating: 4.2,
        time: "25-30 mins",
        cuisines: "American, Fast Food, Beverages",
        location: "Vastrapur, Ahmedabad",
        offer: "₹125 OFF ABOVE ₹249"
    },
    {
        id: 4,
        name: "Bikanervala",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80",
        rating: 4.6,
        time: "30-35 mins",
        cuisines: "North Indian, Sweets, South Indian",
        location: "Satellite, Ahmedabad",
        offer: "FREE DELIVERY"
    },
    {
        id: 5,
        name: "Belgian Waffle Co.",
        image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80",
        rating: 4.7,
        time: "15-20 mins",
        cuisines: "Waffles, Desserts, Ice Cream, Beverages",
        location: "Bodakdev, Ahmedabad",
        offer: "20% OFF UPTO ₹50"
    },
    {
        id: 6,
        name: "Subway",
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80",
        rating: 4.1,
        time: "20-25 mins",
        cuisines: "Healthy Food, Salads, Snacks",
        location: "Prahlad Nagar, Ahmedabad",
        offer: "ITEMS AT ₹179"
    },
    {
        id: 7,
        name: "Behrouz Biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
        rating: 4.4,
        time: "35-40 mins",
        cuisines: "Biryani, Mughlai, North Indian",
        location: "Thaltej, Ahmedabad",
        offer: "₹150 OFF ABOVE ₹399"
    },
    {
        id: 8,
        name: "KFC",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80",
        rating: 4.2,
        time: "20-25 mins",
        cuisines: "Fried Chicken, Burgers, Fast Food",
        location: "SG Highway, Ahmedabad",
        offer: "FREE CHICKEN ROLL"
    }
];

const filters = [
    "Filter",
    "Sort By",
    "Fast Delivery",
    "New on Swiggy",
    "Ratings 4.0+",
    "Pure Veg",
    "Offers",
    "Rs. 300-Rs. 600",
    "Less than Rs. 300"
];

const filterKeyMap: Record<string, string> = {
    "Filter": "filter",
    "Sort By": "sort_by",
    "Fast Delivery": "fast_delivery",
    "New on Swiggy": "new_on_swiggy",
    "Ratings 4.0+": "ratings_4",
    "Pure Veg": "pure_veg",
    "Offers": "offers_filter",
    "Rs. 300-Rs. 600": "rs_300_600",
    "Less than Rs. 300": "less_than_300"
};

export default function RestaurantList() {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState("Ratings 4.0+");

    return (
        <section className="w-full py-8 sm:py-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#02060c] tracking-tight mb-6">
                {t("restaurants_delivery", "Restaurants with online food delivery in Ahmedabad")}
            </h2>

            {/* Filter Pills */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {filters.map((filter) => {
                    const isActive = activeFilter === filter;
                    const translatedFilter = t(filterKeyMap[filter] || filter, filter);
                    return (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer border ${isActive
                                    ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 bg-opacity-80"
                                }`}
                        >
                            {filter === "Filter" && <Filter size={14} />}
                            <span>{translatedFilter}</span>
                            {filter === "Sort By" && <ChevronDown size={14} />}
                        </button>
                    );
                })}
            </div>

            {/* Restaurant Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {restaurants.map((restaurant) => (
                    <Link
                        key={restaurant.id}
                        to={`/restaurants/${restaurant.id}-${restaurant.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                        className="group flex flex-col cursor-pointer bg-white rounded-2xl transition-all duration-300 hover:scale-[0.98]"
                    >
                        {/* Image Container with Offer Overlay */}
                        <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 bg-gray-100">
                            <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                            {/* Dark Gradient Overlay for Offer Text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3 sm:p-4">
                                <span className="font-extrabold text-white text-base sm:text-lg tracking-wide uppercase drop-shadow-md">
                                    {t("offer_" + restaurant.id, restaurant.offer)}
                                </span>
                            </div>
                        </div>

                        {/* Card Details */}
                        <div className="pt-3 px-1 flex flex-col">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#ff5200] transition-colors truncate">
                                {t("rest_name_" + restaurant.id, restaurant.name)}
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
                                {t("rest_cuisines_" + restaurant.id, restaurant.cuisines)}
                            </p>
                            <p className="text-gray-400 text-xs mt-0.5 truncate font-normal">
                                {t("rest_loc_" + restaurant.id, restaurant.location)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
