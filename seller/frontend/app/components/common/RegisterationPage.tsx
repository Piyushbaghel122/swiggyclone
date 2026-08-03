import { Utensils } from "lucide-react";

export default function RegisterationPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center pt-24 px-4 font-sans text-center">
            {/* Logo */}
            <div className="w-16 h-16 bg-[#B04313] rounded-full flex items-center justify-center shadow-md mb-8">
                <Utensils size={32} color="white" strokeWidth={2.5} />
            </div>

            {/* Typography */}
            <h1 className="text-[#0B2C4E] text-3xl md:text-4xl font-bold tracking-tight mb-3 max-w-md">
                Where&apos;s the magic happening?
            </h1>
            
            <p className="text-[#59697A] text-[15px] md:text-base max-w-sm mb-10 leading-relaxed">
                Set your location and define how far you&apos;ll travel to satisfy cravings.
            </p>

            {/* Input / Action Area (Bottom part from the screenshot) */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex items-center">
                <div className="w-full h-12 bg-[#F5F3ED] rounded-lg"></div>
            </div>
        </div>
    );
}