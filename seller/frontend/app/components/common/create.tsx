export default function Create() {
    return (
        <div className="min-h-screen bg-yellow-700/10 flex flex-col items-center py-20 pb-100 p-4">
            <div className="bg-[#EFEBE4] p-10 rounded-2xl shadow-lg w-full max-w-[700px] text-[#2A1F1D]">
                <h1 className="text-3xl font-bold mb-2">List your Restaurant</h1>
                <p className="text-base mb-8 text-gray-700">Tell us about your kitchen to get started.</p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-lg font-semibold mb-2">Restaurant Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. The Sizzling Spoon" 
                            className="w-full px-5 py-4 bg-[#FAF6EE] rounded-xl border-none focus:ring-2 focus:ring-[#A43900] outline-none text-lg placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Cuisine Type</label>
                        <div className="relative">
                            <select className="w-full px-5 py-4 bg-[#FAF6EE] rounded-xl border-none focus:ring-2 focus:ring-[#A43900] outline-none text-lg appearance-none text-gray-700">
                                <option>Select a cuisine...</option>
                                <option>Italian</option>
                                <option>Chinese</option>
                                <option>Indian</option>
                                <option>Mexican</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Restaurant Owner Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Sarah Jenkins" 
                            className="w-full px-5 py-4 bg-[#FAF6EE] rounded-xl border-none focus:ring-2 focus:ring-[#A43900] outline-none text-lg placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Contact Info</label>
                        <input 
                            type="email" 
                            placeholder="owner@restaurant.com" 
                            className="w-full px-5 py-4 bg-[#FAF6EE] rounded-xl border-none focus:ring-2 focus:ring-[#A43900] outline-none text-lg placeholder-gray-500"
                        />
                    </div>

                    <div className="pt-4">
                        <button 
                            type="button" 
                            className="w-full bg-[#A43900] hover:bg-[#8B3000] text-white text-xl font-bold py-4 px-6 rounded-full flex items-center justify-center gap-3 transition-colors"
                        >
                            Start Your Partnership 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            {/* Step Indicators */}
            <div className="flex gap-3 mt-8">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C69A7E]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#E6D4C9]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#E6D4C9]"></div>
            </div>
        </div>
    )
}