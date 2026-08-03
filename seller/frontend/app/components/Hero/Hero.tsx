

export default function Hero() {
  return (
    <div className="w-full px-12 py-10 bg-white flex flex-col md:flex-row md:items-end justify-between gap-6">
      {/* Left Content */}
      <div>
        <h2 className="text-[12px] font-bold tracking-[0.15em] text-[#d96631] uppercase mb-2">
          Search Results
        </h2>
        <div className="text-[52px] leading-tight font-black text-[#1e293b]">
          Cravings for <span className="text-[#c14316] italic font-serif tracking-tight">"Pizza & Tacos"</span>
        </div>
        <p className="text-gray-500 text-[15px] mt-1">
          Found 128 top-rated restaurants delivering to your area.
        </p>
      </div>

      {/* Right Content */}
      <button className="flex items-center gap-2 bg-[#f4f4f5] hover:bg-gray-200 transition-colors px-6 py-3 rounded-full text-[14.5px] font-bold text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] text-[#006b5b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span>Sort by: <span className="text-[#006b5b]">Recommended</span></span>
      </button>
    </div>
  );
}