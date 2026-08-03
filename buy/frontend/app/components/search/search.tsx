"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "@/node_modules/react-i18next";
import { Link } from "@tanstack/react-router";

export default function SearchPage() {
    const { t } = useTranslation();
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {  
        e.preventDefault();
        if (query.trim()) {
            console.log("Searching for:", query);
        }
    };

    return (
        <>
            <section className="py-12 sm:py-16 px-4 max-w-4xl mx-auto text-center ">
                <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#02060c] tracking-tight mb-8">
                    {t("order_food_from_favourite", "Order food from favourite restaurants near you.")}
                </h1>

                <form
                    onSubmit={handleSearch}
                    className="w-full max-w-[680px] mx-auto flex items-center justify-between bg-white border border-gray-200 rounded-xl p-1.5 sm:p-2 shadow-sm hover:shadow-md focus-within:border-[#ff5200] focus-within:shadow-md transition-all duration-200"
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t("search_placeholder", "Search for restaurants, cuisines...")}
                        className="w-full px-4 py-2 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none text-sm sm:text-base font-medium truncate"
                    />

                    <Link
                        to={query.trim() ? `/search?q=${encodeURIComponent(query)}` : "/search"}
                        className="flex items-center justify-center gap-2 bg-amber-300 hover:bg-amber-500 active:scale-[0.98] text-white font-bold px-5 sm:px-6 py-3 rounded-lg text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all duration-200 shrink-0 cursor-pointer"
                    >
                        <Search size={18} className="stroke-[2.5]" />
                        <span>{t("find_food", "FIND FOOD")}</span>
                    </Link>
                </form>
            </section>
            <hr className="border-gray-300" />
        </>
    );
}
