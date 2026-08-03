import { Link } from "@tanstack/react-router";


export default function RidePartneer() {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="relative bg-[#1A1918] rounded-2xl p-6 w-[350px] overflow-hidden font-sans border border-gray-800">
                {/* Background Fork and Knife Icon */}
                <div className="absolute -right-4 ml-12 mr-12 -top-2 text-[#2D2A27] z-0" style={{ transform: 'scale(3) rotate(15deg)' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 2V9C11 11.2091 9.20914 13 7 13V22H5V13C2.79086 13 1 11.2091 1 9V2H2.5V8H3.5V2H5V8H6V2H7.5V8H8.5V2H11ZM22 2C22 7 21 9 17 10.5V22H15V2C15 2 17 2 22 2Z" />
                    </svg>
                </div>
                
                <div className="relative z-10 flex flex-col gap-3">
                    <h3 className="text-white text-2xl font-bold tracking-tight">Restaurant as a Partneer</h3>
                    <p className="text-[#9DB2CE] text-sm leading-snug pr-8 font-medium">
                        Boost your sales by reaching thousands of local foodies today.
                    </p>
                    <Link to="/reastaurantINPartneer" className="text-[#F15700] cursor-pointer font-bold text-sm flex items-center gap-1.5 mt-3 hover:opacity-80 transition-opacity w-fit group">
                        Get Started 
                        <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
