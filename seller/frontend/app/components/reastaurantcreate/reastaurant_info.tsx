import axios from "axios";
import { useState } from "react";
import { FormConfirm } from "../../features/auth/components/FormConfirm";

const api = axios.create({
  baseURL: "http://localhost:8001/restaurant",
  withCredentials: true,

});

const timeOptions = Array.from({ length: 48 }).map((_, i) => {
  const hour24 = Math.floor(i / 2);
  const min = i % 2 === 0 ? "00" : "30";
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 < 12 ? "AM" : "PM";
  return {
    value: `${hour24.toString().padStart(2, "0")}:${min}`,
    label: `${hour12}:${min} ${ampm}`
  };
});

export default function INFO() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDaySubmitted, setIsDaySubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [username , setUsername] = useState("");
  const [location, setLocation ] = useState("");
  const [workDaily , setWorkDaily] = useState("");
  const [timingPreference, setTimingPreference] = useState<'same' | 'separate'>('same');
  const [globalOpenTime, setGlobalOpenTime] = useState("");
  const [globalCloseTime, setGlobalCloseTime] = useState("");
  const initialList = [
    { 
        
        day: "sunday",
        openTime: "",
        closeTime: "",
        isOpen: false
    },
    {
        day: "monday",
        openTime: "",
        closeTime:"",
        isOpen: false
    },
    {
        day: "tuesday",
        openTime: "",
        closeTime: "",
        isOpen: false
    },
    {
        day: "wednesday",
        openTime: "",
        closeTime: "",
        isOpen: false
    },
    {
        day: "thursday",
        openTime: "",
        closeTime: "",
        isOpen: false
    },
    {
        day: "friday",
        openTime: "",
        closeTime: "",
        isOpen: false
    },
    {
        day: "saturday",
        openTime: "",
        closeTime: "",
        isOpen: false
    }
  ];
  const [list, setList] = useState(initialList);
  


  const handleName = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get("/reastaurantName");
      console.log(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 const handlelocation = async () => {
    try{
      setLoading(true); 
       setError(null);

      const response = await api.get("/reastaurantLocation")
      console.log(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error: any){
      setError(error?.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
 }
 
 const handleSelectAll = () => {
    const allSelected = list.every(item => item.isOpen);
    const newList = list.map(item => ({ ...item, isOpen: !allSelected }));
    setList(newList);
 }
  const submitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
         e.preventDefault();
         
    try {
      setLoading(true);
      setError(null);

      // Submit restaurant info
      const response = await api.post("/info");
      console.log(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleday = async () => {
    try {
      setLoading(true);
      setError(null);
      // Move setIsDaySubmitted before API so UI can be tested even if backend is not ready
      setIsDaySubmitted(true);
      const response = await api.post("/workWeek");
      console.log(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center">Restaurant Information</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Please provide the details to list your restaurant.</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Restaurant Name</label>
              <FormConfirm
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. The Golden Spoon"
                type="text"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Restaurant Location</label>
              <FormConfirm 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. 123 Main St, NY"
                type="text"
              />
            </div>
          </div>

          <div 
            className={`transition-all duration-700 ease-in-out overflow-hidden ${
              isDaySubmitted 
                ? 'max-h-0 opacity-0 py-0 border-t-0 border-transparent' 
                : 'max-h-[800px] opacity-100 border-t border-gray-200 pt-6'
            }`}
          >
            <div className={`transition-opacity duration-300 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Working Days</h3> 
              <p onClick={handleSelectAll} className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer transition-colors text-sm">Select all</p>
            </div>
            
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {list.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => {
                          const newList = [...list];
                          newList[index].isOpen = !newList[index].isOpen;
                          setList(newList);
                        }}
                        className={`flex flex-col items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all gap-3 cursor-pointer ${
                          item.isOpen 
                            ? 'border-orange-500 bg-orange-50 shadow-sm ring-1 ring-orange-500' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                    >                  
                        <div className="flex items-center w-full gap-2 justify-center">
                          <input type="checkbox" checked={item.isOpen} readOnly className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 cursor-pointer" />
                          <p className={`capitalize font-medium text-sm select-none ${item.isOpen ? 'text-orange-800' : 'text-gray-700'}`}>{item.day}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button 
              onClick={handleday} 
              disabled={loading}
              className="flex mx-auto mt-4 text-sm px-5 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed items-center gap-2" 
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : "Submit Working days"}
            </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Opening & Closing time</h3>
              
              <div className="space-y-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="flex items-center h-5 mt-0.5">
                    <input 
                      type="radio" 
                      name="timing" 
                      className="w-5 h-5 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 focus:ring-2 cursor-pointer"
                      checked={timingPreference === 'same'}
                      onChange={() => setTimingPreference('same')}
                    />
                  </div>
                  <span className="text-gray-700 text-sm font-medium leading-relaxed">
                    I open and close my restaurant at the same time on all working days
                  </span>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="flex items-center h-5 mt-0.5">
                    <input 
                      type="radio" 
                      name="timing" 
                      className="w-5 h-5 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 focus:ring-2 cursor-pointer"
                      checked={timingPreference === 'separate'}
                      onChange={() => setTimingPreference('separate')}
                    />
                  </div>
                  <span className="text-gray-700 text-sm font-medium leading-relaxed">
                    I've separate daywise timings
                  </span>
                </label>
              </div>

              {timingPreference === 'same' && (
                <>
                  <div className="border-t border-dashed border-gray-200 pt-6 mb-4 grid grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <select
                        className="block w-full pl-9 pr-8 py-3 border border-orange-400 rounded-xl focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-800 font-semibold bg-white cursor-pointer hover:bg-orange-50 transition-colors appearance-none"
                        value={globalOpenTime}
                        onChange={(e) => setGlobalOpenTime(e.target.value)}
                      >
                        <option value="" disabled>Open time</option>
                        {timeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <select
                        className="block w-full pl-9 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-500 font-semibold bg-white cursor-pointer hover:bg-gray-50 transition-colors appearance-none"
                        value={globalCloseTime}
                        onChange={(e) => setGlobalCloseTime(e.target.value)}
                      >
                        <option value="" disabled>Close time</option>
                        {timeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button className="text-gray-800 font-bold text-sm mb-6 hover:text-black transition-colors">
                    + Add another slot
                  </button>
                </>
              )}

              {timingPreference === 'separate' && (
                <div className="border-t border-dashed border-gray-200 pt-6 mb-6 space-y-4">
                  {list.map((item, originalIndex) => {
                    return (
                      <div key={item.day} className="flex items-center gap-4">
                        <div className="w-24 font-bold text-gray-700 capitalize text-sm">{item.day}</div>
                        
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className="relative">
                            <select
                              className="block w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-800 font-semibold bg-white cursor-pointer hover:bg-gray-50 transition-colors appearance-none"
                              value={item.openTime}
                              onChange={(e) => {
                                const newList = [...list];
                                newList[originalIndex].openTime = e.target.value;
                                setList(newList);
                              }}
                            >
                              <option value="" disabled>Open</option>
                              {timeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </div>
                          
                          <div className="relative">
                            <select
                              className="block w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-500 font-semibold bg-white cursor-pointer hover:bg-gray-50 transition-colors appearance-none"
                              value={item.closeTime}
                              onChange={(e) => {
                                const newList = [...list];
                                newList[originalIndex].closeTime = e.target.value;
                                setList(newList);
                              }}
                            >
                              <option value="" disabled>Close</option>
                              {timeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-600 font-medium leading-relaxed">
                Longer operational timings ensures you get 1.5X more orders and helps you avoid cancellations.
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <button 
            onClick={submitButton} 
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-bold rounded-xl shadow-md transition-all flex justify-center items-center gap-2 ${loading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : "Complete Restaurant Setup"}
          </button>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}