/* eslint-disable @next/next/no-img-element */

"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "@/node_modules/react-i18next";
import { Link } from "@tanstack/react-router";

interface Brand {
    id: number;
    name: string;
    image: string;
    fallback: string;
}

const topBrands: Brand[] = [
    {
        id: 1,
        name: "McDonald's",
        image: "https://www.google.com/s2/favicons?domain=mcdonalds.com&sz=256",
        fallback: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 2,
        name: "Domino's Pizza",
        image: "https://www.google.com/s2/favicons?domain=dominos.co.in&sz=256",
        fallback: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 3,
        name: "Starbucks",
        image: "https://www.google.com/s2/favicons?domain=starbucks.in&sz=256",
        fallback: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 4,
        name: "KFC",
        image: "https://www.google.com/s2/favicons?domain=onlinekfc.co.in&sz=256",
        fallback: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 5,
        name: "Subway",
        image: "https://www.google.com/s2/favicons?domain=subway.com&sz=256",
        fallback: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 6,
        name: "Bikanervala",
        image: "https://www.google.com/s2/favicons?domain=bikanervala.com&sz=256",
        fallback: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 7,
        name: "Pizza Hut",
        image: "https://www.google.com/s2/favicons?domain=pizzahut.co.in&sz=256",
        fallback: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 8,
        name: "Burger King",
        image: "https://www.google.com/s2/favicons?domain=burgerking.in&sz=256",
        fallback: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 9,
        name: "Haldiram's",
        image: "https://www.google.com/s2/favicons?domain=haldirams.com&sz=256",
        fallback: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 10,
        name: "Taco Bell",
        image: "https://www.google.com/s2/favicons?domain=tacobell.co.in&sz=256",
        fallback: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 11,
        name: "Dunkin' Donuts",
        image: "https://www.google.com/s2/favicons?domain=dunkindonuts.com&sz=256",
        fallback: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&auto=format&fit=crop&q=80"
    },
    {
        id: 12,
        name: "Baskin Robbins",
        image: "https://www.google.com/s2/favicons?domain=baskinrobbinsindia.com&sz=256",
        fallback: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&auto=format&fit=crop&q=80"
    },
];

export default function CompanyMenu() {
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
            <section className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 border-b border-gray-100">
                {/* Header with Title and Scroll Arrows */}
                <div className="w-full flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#02060c] tracking-tight">
                        {t("top_brands", "Top brands for you")}
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

                {/* Horizontal Scrollable Carousel */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="w-full flex items-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto scroll-smooth py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {topBrands.map((brand) => (
                        <Link
                            key={brand.id}
                            to={`/brand/${brand.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                            className="flex flex-col items-center justify-center shrink-0 cursor-pointer group w-24 sm:w-28 md:w-32"
                        >
                            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:-translate-y-1 bg-white border border-gray-100 p-2 sm:p-3 md:p-4 flex items-center justify-center">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        if (target.src !== brand.fallback) {
                                            target.src = brand.fallback;
                                        }
                                    }}
                                />
                            </div>
                            <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-[#ff5200] transition-colors mt-3 text-center truncate w-full">
                                {t("brand_" + brand.name.toLowerCase().replace(/[^a-z0-9]/g, "_"), brand.name)}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <hr className="border-gray-200" />
        </>
    );
}