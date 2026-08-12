import React from 'react';

const restaurants = [
  {
    id: 1,
    name: "Meghana Foods",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    offer: "50% OFF UPTO ₹100",
    rating: "4.4",
    time: "30-35 mins",
    cost: "₹300 for two",
    cuisines: "Biryani, Andhra, South Indian",
    offerType: "discount"
  },
  {
    id: 2,
    name: "Truffles",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    offer: "₹125 OFF ABOVE ₹249",
    rating: "4.6",
    time: "40-45 mins",
    cost: "₹400 for two",
    cuisines: "American, Burgers, Desserts",
    offerType: "discount"
  },
  {
    id: 3,
    name: "Brik Oven",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    offer: "Opens at 12 PM",
    rating: "4.2",
    time: "Opens soon",
    cost: "₹500 for two",
    cuisines: "Pizzas, Italian, Desserts",
    offerType: "closed",
    ratingColor: "bg-gray-400"
  }
];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Top restaurant chains in your area</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-gray-100 group">
                            {/* Image Container */}
                            <div className="relative h-56 w-full">
                                <img 
                                    src={restaurant.image} 
                                    alt={restaurant.name} 
                                    className="w-full h-full object-cover"
                                />
                                {/* Heart Icon */}
                                <button className="absolute top-3 right-3 p-2 bg-white/70 backdrop-blur-md rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                                
                                {/* Offer Badge overlay */}
                                {restaurant.offerType === 'discount' && (
                                    <div className="absolute bottom-0 left-0 right-0 pt-16 pb-3 px-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                        <p className="text-white font-extrabold text-[22px] uppercase tracking-tight shadow-sm leading-tight">{restaurant.offer}</p>
                                    </div>
                                )}
                                {restaurant.offerType === 'closed' && (
                                    <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] flex items-center justify-center">
                                        <div className="bg-white px-5 py-2.5 rounded-full shadow-lg font-bold text-gray-800 text-sm tracking-wide">
                                            {restaurant.offer}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-gray-800 truncate pr-2 group-hover:text-orange-600 transition-colors">{restaurant.name}</h3>
                                    <div className={`flex items-center gap-1 ${restaurant.ratingColor || 'bg-green-700'} text-white px-1.5 py-0.5 rounded text-xs font-bold shadow-sm`}>
                                        <span>{restaurant.rating}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="mt-2 flex items-center text-gray-700 text-[15px] font-semibold tracking-tight">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{restaurant.time} {restaurant.time && restaurant.cost && '•'} {restaurant.cost}</span>
                                </div>

                                <p className="mt-1.5 text-gray-500 text-[15px] truncate">{restaurant.cuisines}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}