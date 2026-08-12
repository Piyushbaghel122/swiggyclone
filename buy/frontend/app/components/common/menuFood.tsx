/* eslint-disable @next/next/no-img-element */

"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "@/node_modules/react-i18next";
import { Link } from "@tanstack/react-router";

interface FoodCategory {
    id: number;
    name: string;
    image: string;
}

const foodCategories: FoodCategory[] = [
    {
        id: 1,
        name: "Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 2,
        name: "Burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 3,
        name: "North Indian",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 4,
        name: "Biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 5,
        name: "Chinese",
        image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 6,
        name: "Cakes",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 7,
        name: "Shakes",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 8,
        name: "Dosa",
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 9,
        name: "Rolls",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 10,
        name: "Noodles",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 11,
        name: "Salad",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 12,
        name: "Pasta",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&auto=format&fit=crop&q=80",
    },
    {
        id: 13,
        name: "Ice Cream",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&auto=format&fit=crop&q=80",
    },
];

export default function MenuFood() {
    const { t } = useTranslation();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = direction === "left" ? -400 : 400;
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <>
            <section className="w-full py-8 sm:py-12 border-b border-gray-100">
                <div className="w-full flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#02060c] tracking-tight">
                        {t("whats_on_your_mind", "What's on your mind?")}
                    </h2>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200/70 hover:bg-gray-300/80 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-gray-800 transition-all duration-200 cursor-pointer"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200/70 hover:bg-gray-300/80 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-gray-800 transition-all duration-200 cursor-pointer"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="w-full flex items-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto scroll-smooth py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {foodCategories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                            className="flex flex-col items-center justify-center shrink-0 cursor-pointer group w-24 sm:w-28 md:w-32"
                        >
                            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 bg-gray-100 border border-gray-100/50">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                            <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-[#ff5200] transition-colors mt-3 text-center truncate w-full">
                                {t("cat_" + category.name.toLowerCase().replace(/\s+/g, "_"), category.name)}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <hr className="border-gray-200" />
        </>
    );
}
