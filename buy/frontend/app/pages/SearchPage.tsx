import NavbarDashboard from "@/app/components/navbar/NavbarDashboard";
import { Link, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

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

const mockRestaurants: RestaurantCard[] = [
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
        name: "McDonald's",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
        rating: 4.5,
        time: "15-20 mins",
        cuisines: "Burgers, Beverages, Cafe, Desserts",
        location: "CG Road, Ahmedabad",
        offer: "ITEMS AT ₹149"
    },
    {
        id: 4,
        name: "The Burger Club",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
        rating: 4.2,
        time: "25-30 mins",
        cuisines: "American, Fast Food, Beverages",
        location: "Vastrapur, Ahmedabad",
        offer: "₹125 OFF ABOVE ₹249"
    },
];

export default function SearchResultsPage() {
    const searchParams = useSearch({ strict: false });
    const query = (searchParams as any).q || "";

    const filteredRestaurants = useMemo(() => {
        if (!query) return mockRestaurants;
        const lowerQuery = query.toLowerCase();
        return mockRestaurants.filter(r => 
            r.name.toLowerCase().includes(lowerQuery) || 
            r.cuisines.toLowerCase().includes(lowerQuery)
        );
    }, [query]);

    return (
        <div className="min-h-screen bg-white"> 
            <NavbarDashboard />
            <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
                    <p className="text-gray-600 text-lg">
                        {query ? `Showing results for "${query}"` : "Showing all popular restaurants"}
                    </p>
                </div>
                
                {filteredRestaurants.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-gray-500 text-xl">No results found for "{query}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10 pb-10 mt-6">
                        {filteredRestaurants.map((restaurant) => (
                            <Link
                                key={restaurant.id}
                                to={`/restaurants/${restaurant.id}-${restaurant.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                                className="group flex flex-col cursor-pointer bg-white rounded-2xl transition-all duration-300 hover:scale-[0.98]"
                            >
                                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 bg-gray-100">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-3 sm:p-4 transition-colors duration-300 group-hover:bg-black/50">
                                        <span className="font-extrabold text-white text-xl sm:text-2xl tracking-wide uppercase drop-shadow-lg text-center">
                                            {restaurant.offer}
                                        </span>
                                    </div>
                                </div>

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
                )}
            </div>
        </div>
    );
}
