import React from 'react';

export default function RestaurantPartnerCard() {
    return (
        <div className="relative bg-[#242220] rounded-2xl p-6 w-[350px] overflow-hidden font-sans">
            {/* Background Fork and Knife Icon */}
            <div className="absolute right-1 top-2 text-[#322f2c] z-0" style={{ transform: 'scale(4.5) rotate(10deg)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 2V9C11 11.2091 9.20914 13 7 13V22H5V13C2.79086 13 1 11.2091 1 9V2H2.5V8H3.5V2H5V8H6V2H7.5V8H8.5V2H11ZM22 2C22 7 21 9 17 10.5V22H15V2C15 2 17 2 22 2Z" />
                </svg>
            </div>
            
            <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-white text-xl font-bold tracking-tight">Partner as a Restaurant</h3>
                <p className="text-blue-100/70 text-sm leading-snug pr-8 font-medium">
                    Boost your sales by reaching thousands of local foodies today.
                </p>
                <button className="text-[#F15700] font-semibold text-sm flex items-center gap-1.5 mt-2 hover:opacity-80 transition-opacity w-fit">
                    Get Started 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
