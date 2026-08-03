"use client";
"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function CreateReastuarant() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const list = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=80",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80",

        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80",

        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80",

        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
        },
        {
            id: 8,
            name: "KFC",
            image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80",

        }
    ]

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl m-4">
            <motion.div 
                className="flex h-full"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            >
                {list.map((i) => (
                    <div key={i.id} className="min-w-full h-full relative group">
                        <Image src={i.image} alt="" fill className="object-cover" />
                        
                        {/* Dark Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        
                        {/* Text Content */}
                        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col items-start z-10">
                            <span className="bg-[#ffb900] text-black font-semibold px-4 py-1.5 rounded-full text-sm mb-3">
                                Chef&apos;s Choice
                            </span>
                            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-2">
                                {i.name || "The Artisanal Crust"}
                            </h2>
                            <p className="text-gray-200 text-lg md:text-xl mb-6">
                                Best Neapolitan in the city
                            </p>
                            
                            {/* Create Restaurant Button */}
                            <Link to="/create-reastaurant" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
                                Create Restaurant
                            </Link>
                        </div>
                    </div>
                ))}
            </motion.div>
            
            {/* Navigation Buttons grouped at bottom right */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex space-x-3 z-20">
                <button 
                    onClick={handlePrev}
                    className="bg-[#4a3f35]/80 hover:bg-[#4a3f35] backdrop-blur-md text-white rounded-full h-12 w-12 flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={handleNext}
                    className="bg-[#4a3f35]/80 hover:bg-[#4a3f35] backdrop-blur-md text-white rounded-full h-12 w-12 flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    )
}