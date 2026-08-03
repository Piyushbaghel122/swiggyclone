import Navbar from "../navbar/navbar";
import ImageItem from "../image/imageItem.png";
import Image from "next/image";
import { Link, useNavigate } from "@tanstack/react-router";

export default function CreateReastauarantDocumnet() {
    const navigate = useNavigate();
    return (
     <>
     <Navbar />
     <div className="w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row justify-center items-center gap-12 bg-[#fdfbf9] py-12 px-6 lg:px-20">
          {/* Left Side: Image */}
          <div className="relative group rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] flex-shrink-0">
               <Image 
                    src={ImageItem} 
                    alt="Chefs cooking in restaurant" 
                    width={800} 
                    height={1000} 
                    className="h-[500px] w-[350px] md:h-[600px] md:w-[420px] lg:h-[700px] lg:w-[480px] object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />
               <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-1 leading-tight">Grow your business</h2>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">with us</h2>
                    <p className="text-gray-200 text-sm md:text-base opacity-90">Turn your culinary passion into a thriving business.</p>
               </div>
          </div>

          {/* Right Side: Features List */}
          <div className="flex flex-col gap-20 cursor-pointer max-w-lg">
               {/* Feature 1 */}
               <div className="flex items-start gap-5 p-6 bg-[#f9f5f0] rounded-2xl transition-colors hover:bg-[#f3ece4]">
                    <div className="w-14 h-14 rounded-full bg-[#efded5] flex items-center justify-center flex-shrink-0">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a03f16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                              <circle cx="12" cy="12" r="3"/>
                         </svg>
                    </div>
                    <div>
                         <h3 className="text-[19px] font-semibold text-[#0f2137] mb-1.5 tracking-tight">Increased Visibility</h3>
                         <p className="text-[#596677] text-[15px] leading-relaxed">Reach thousands of local foodies actively looking for their next favorite meal.</p>
                    </div>
               </div>

               {/* Feature 2 */}
               <div className="flex items-start gap-5 p-6 bg-[#f9f5f0] rounded-2xl transition-colors hover:bg-[#f3ece4]">
                    <div className="w-14 h-14 rounded-full bg-[#efded5] flex items-center justify-center flex-shrink-0">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a03f16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="16" height="13" x="2" y="6" rx="2" ry="2"/>
                              <path d="M18 6h3a1 1 0 0 1 1 1v7"/>
                              <circle cx="7" cy="19" r="2"/>
                              <circle cx="17" cy="19" r="2"/>
                              <path d="M12 19h3"/><path d="M19 19h1a1 1 0 0 0 1-1v-2"/>
                         </svg>
                    </div>
                    <div>
                         <h3 className="text-[19px] font-semibold text-[#0f2137] mb-1.5 tracking-tight">Integrated Logistics</h3>
                         <p className="text-[#596677] text-[15px] leading-relaxed">Focus on the cooking while our fleet handles the complex last-mile delivery.</p>
                    </div>
               </div>

               {/* Feature 3 */}
               <div className="flex items-start gap-5 p-6 bg-[#f9f5f0] rounded-2xl transition-colors hover:bg-[#f3ece4]">
                    <div className="w-14 h-14 rounded-full bg-[#efded5] flex items-center justify-center flex-shrink-0">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a03f16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m3 16 4-4 4 4 8-8"/>
                              <path d="m15 8 4-4 4 4"/>
                              <path d="M11 6h.01M6 5h.01M5 10h.01"/>
                         </svg>
                    </div>
                    <div>
                         <h3 className="text-[19px] font-semibold text-[#0f2137] mb-1.5 tracking-tight">Expert Analytics</h3>
                         <p className="text-[#596677] text-[15px] leading-relaxed">Deep-dive into customer preferences and sales trends with our pro dashboard.</p>
                    </div>
               </div>
               <div className="">
                <h1>List your Reastaurant</h1>
                <Link to="/create">Tell us about your kitchen to get started</Link>
               </div>
          </div>
     </div>

     </>
    )
}
