"use client";

import { Star, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { FaInstagram, FaFacebook, FaPinterest, FaXTwitter } from "react-icons/fa6";
import { useState, useLayoutEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DarkMenu() {
   const { t } = useTranslation();
   const [isHovered, setIsHovered] = useState(false);
   const sectionRef = useRef<HTMLElement>(null);

   useLayoutEffect(() => {
      const ctx = gsap.context(() => {
         gsap.fromTo(sectionRef.current,
            { y: 50, opacity: 0 },
            {
               y: 0,
               opacity: 1,
               duration: 1,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
               }
            }
         );
      }, sectionRef);

      return () => ctx.revert();
   }, []);

   return (
      <section ref={sectionRef} className="w-full bg-gradient-to-b from-[#F0F2F6] via-[#E8ECEF] to-[#E3E8EC] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center border-t border-gray-200/60 transition-all duration-300">
         {/* Main Badge & Title Container */}
         <Link
            to={"/swiggy-one" as any}
            className="group flex flex-col items-center justify-center max-w-4xl mx-auto text-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            {/* Circular Peach Badge with Bronze Star matching screenshot exactly */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#FFDFCA] flex items-center justify-center shadow-[0_8px_25px_rgba(140,70,8,0.12)] group-hover:shadow-[0_12px_35px_rgba(140,70,8,0.22)] group-hover:scale-105 transition-all duration-300 mb-6 sm:mb-8 border border-[#FEE1CF]">
               <Star
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#8C4608] fill-[#8C4608] transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110"
               />
            </div>

            {/* Serif Title Text matching the screenshot typography & text */}
            <h2
               className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-[#141414] font-normal tracking-wide leading-snug sm:leading-relaxed max-w-2xl transition-colors duration-300 group-hover:text-black"
               style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}
            >
               {t("dark_title", "Ready to join the club? Join 5 million+ members saving every day.")}
            </h2>
         </Link>

         {/* Interactive Membership Perks & CTA Buttons */}
         <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link to={"/swiggy-one" as any} className="px-8 py-3.5 sm:py-4 rounded-full bg-[#ff5200] hover:bg-[#e64a00] active:scale-95 text-white font-semibold text-sm sm:text-base shadow-[0_4px_16px_rgba(255,82,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,82,0,0.4)] transition-all duration-200 flex items-center gap-2 group/btn cursor-pointer">
               <span>{t("dark_btn1", "Explore Swiggy One")}</span>
               <ArrowRight size={18} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
            <Link to={"/swiggy-one-benefits" as any} className="px-6 py-3.5 sm:py-4 rounded-full bg-white/80 hover:bg-white active:scale-95 text-gray-800 font-medium text-sm sm:text-base border border-gray-200/80 shadow-sm hover:shadow transition-all duration-200 cursor-pointer">
               {t("dark_btn2", "View Benefits")}
            </Link>
         </div>

         {/* Subtle membership perks list */}
         <div className="mt-10 pt-8 border-t border-gray-300/50 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-600 font-medium">
            <Link to={"/swiggy-one-benefits" as any} className="flex items-center gap-2 cursor-pointer hover:text-[#141414] transition-colors group">
               <CheckCircle2 size={16} className="text-[#ff5200] group-hover:scale-110 transition-transform" />
               <span>{t("dark_perk1", "Unlimited Free Delivery")}</span>
            </Link>
            <Link to={"/swiggy-one-benefits" as any} className="flex items-center gap-2 cursor-pointer hover:text-[#141414] transition-colors group">
               <CheckCircle2 size={16} className="text-[#ff5200] group-hover:scale-110 transition-transform" />
               <span>{t("dark_perk2", "Up to 30% Extra Discounts")}</span>
            </Link>
            <Link to={"/swiggy-one-benefits" as any} className="flex items-center gap-2 cursor-pointer hover:text-[#141414] transition-colors group">
               <CheckCircle2 size={16} className="text-[#ff5200] group-hover:scale-110 transition-transform" />
               <span>{t("dark_perk3", "No Maximum Discount Limit")}</span>
            </Link>
         </div>

         {/* Footer / Services / Legal / Secure Checkout Section matching screenshot exactly */}
         <div className="w-full max-w-7xl mx-auto mt-16 pt-12 border-t border-gray-300/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-left items-start">
            {/* Column 1: Swiggy One description */}
            <Link to={"/swiggy-one-benefits" as any} className="flex flex-col items-start pr-4 group cursor-pointer">
               <div className="w-12 h-10 rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#ff5200]">
                  <span className="font-serif font-bold text-gray-800 group-hover:text-[#ff5200] text-sm tracking-tighter transition-colors">{t("footer_one", "One")}</span>
               </div>
               <p
                  className="text-sm sm:text-base text-gray-700 group-hover:text-black leading-relaxed font-normal transition-colors"
                  style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}
               >
                  {t("footer_one_desc", "Unlock a world of zero delivery fees and exclusive benefits across food, groceries, and dining.")}
               </p>
            </Link>

            {/* Column 2: SERVICES */}
            <div className="flex flex-col items-start">
               <h3
                  className="font-bold text-[#141414] text-sm tracking-wider uppercase mb-4 sm:mb-6"
                  style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}
               >
                  {t("footer_services", "SERVICES")}
               </h3>
               <ul className="space-y-3">
                  <li>
                     <Link to={"/food-delivery" as any} className="text-sm sm:text-base text-gray-700 hover:text-[#ff5200] transition-colors duration-200 block font-normal cursor-pointer" style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}>
                        {t("footer_service_1", "Food Delivery")}
                     </Link>
                  </li>
                  <li>
                     <Link to={"/instamart" as any} className="text-sm sm:text-base text-gray-700 hover:text-[#ff5200] transition-colors duration-200 block font-normal cursor-pointer" style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}>
                        {t("footer_service_2", "Instamart")}
                     </Link>
                  </li>
                  <li>
                     <Link to={"/dineout" as any} className="text-sm sm:text-base text-gray-700 hover:text-[#ff5200] transition-colors duration-200 block font-normal cursor-pointer" style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}>
                        {t("footer_service_3", "Dineout")}
                     </Link>
                  </li>
                  <li>
                     <Link to={"/genie" as any} className="text-sm sm:text-base text-gray-700 hover:text-[#ff5200] transition-colors duration-200 block font-normal cursor-pointer" style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}>
                        {t("footer_service_4", "Genie")}
                     </Link>
                  </li>
               </ul>
            </div>

            {/* Column 3: LEGAL */}
            <div className="flex flex-col items-start">
               <h3
                  className="font-bold text-[#141414] text-sm tracking-wider uppercase mb-4 sm:mb-6"
                  style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}
               >
                  {t("footer_legal", "LEGAL")}
               </h3>
               <ul className="space-y-3">
                  <li>
                     <Link to={"/terms-and-conditions" as any} className="text-sm sm:text-base text-gray-700 hover:text-[#ff5200] transition-colors duration-200 block font-normal cursor-pointer" style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}>
                        {t("footer_legal_1", "Terms & Conditions")}
                     </Link>
                  </li>
                  <li>
                     <Link to={"/privacy-policy" as any} className="text-sm sm:text-base text-gray-700 hover:text-[#ff5200] transition-colors duration-200 block font-normal cursor-pointer" style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}>
                        {t("footer_legal_2", "Privacy Policy")}
                     </Link>
                  </li>
                  <li>
                     <Link to={"/cookie-policy" as any} className="text-sm sm:text-base text-gray-700 hover:text-[#ff5200] transition-colors duration-200 block font-normal cursor-pointer" style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}>
                        {t("footer_legal_3", "Cookie Policy")}
                     </Link>
                  </li>
                  <li>
                     <Link to={"/offer-terms" as any} className="text-sm sm:text-base text-gray-700 hover:text-[#ff5200] transition-colors duration-200 block font-normal cursor-pointer" style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}>
                        {t("footer_legal_4", "Offer Terms")}
                     </Link>
                  </li>
               </ul>
            </div>

            {/* Column 4: SECURE CHECKOUT */}
            <div className="flex flex-col items-start lg:items-end w-full">
               <Link to={"/checkout" as any} className="bg-[#DFE3EC] border border-[#D0D6E2] rounded-xl px-5 py-3.5 inline-flex items-center gap-3 shadow-sm hover:shadow transition-all duration-200 cursor-pointer group whitespace-nowrap">
                  <div className="p-1 rounded-full bg-white/40 group-hover:scale-110 transition-transform duration-200 shrink-0">
                     <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-[#b75204] fill-[#fce7d2] shrink-0" />
                  </div>
                  <div className="flex flex-col text-left whitespace-nowrap">
                     <span
                        className="font-bold text-[#141414] text-xs sm:text-sm tracking-wide leading-tight uppercase whitespace-nowrap"
                        style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}
                     >
                        {t("footer_secure", "SECURE")}
                     </span>
                     <span
                        className="font-bold text-[#141414] text-xs sm:text-sm tracking-wide leading-tight uppercase whitespace-nowrap"
                        style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}
                     >
                        {t("footer_checkout", "CHECKOUT")}
                     </span>
                  </div>
               </Link>
               <Link to={"/help" as any} className="mt-3 bg-[#DFE3EC] border border-[#D0D6E2] rounded-xl px-5 py-3.5 mt-20 border border-gray-300 inline-flex items-center gap-3 shadow-sm hover:shadow transition-all duration-200 cursor-pointer group whitespace-nowrap">
                  <div className="flex flex-col text-left whitespace-nowrap">
                     <span
                        className="font-bold text-[#141414] text-xs sm:text-sm tracking-wide leading-tight uppercase whitespace-nowrap"
                        style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}
                     >
                        HELP CARE
                     </span>
                  </div>
               </Link>
            </div>
            <div className="flex flex-col items-start lg:mt-0">
               <h3 
                  className="font-bold text-[#141414] text-sm tracking-wider uppercase mb-4 sm:mb-6" 
                  style={{ fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif" }}>
                  Social Links
               </h3>
               <div className="flex gap-6">
                  <a href="https://www.instagram.com/piyush.dev12/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#ff5200] transition-colors">
                     <FaInstagram size={24} />
                  </a>
                  <a href="https://www.pinterest.com/piyushbaghel909023/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#ff5200] transition-colors">
                     <FaPinterest size={24} />
                  </a>
                  <a href="https://x.com/PiyushKuma65485" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#ff5200] transition-colors">
                     <FaXTwitter size={24} />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590608137207&sk=about" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#ff5200] transition-colors">
                     <FaFacebook size={24} />
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
}