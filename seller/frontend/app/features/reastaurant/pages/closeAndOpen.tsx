import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FormConfirm } from "../../auth/components/FormConfirm";

const TIME_OPTIONS = (() => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i === 0 ? 12 : (i > 12 ? i - 12 : i);
      const ampm = i < 12 ? "AM" : "PM";
      const minute = j === 0 ? "00" : "30";
      const label = `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
      const value = `${i.toString().padStart(2, '0')}:${minute}`;
      times.push({ label, value });
    }
  }
  return times;
})();

export default function CloseAndOpen(){
    const [loading , setLoading ] = useState<boolean>(false);
    const [error , setError] = useState<string | null>(null);

    const [openTime, setOpenTime] = useState<string>("");
    const [closeTime, setCloseTime] = useState<string>("");
    const [eveningOpenTime, setEveningOpenTime] = useState<string>("");
    const [eveningCloseTime, setEveningCloseTime] = useState<string>("");

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800">3. Operational Timings</h3>
                <p className="text-gray-500 text-sm mt-1">Set your standard opening and closing times.</p>
            </div>
            
            <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Morning Shift</h4>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Opening Time</label>
                            <select
                                value={openTime}
                                onChange={(e) => setOpenTime(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors outline-none appearance-none bg-white cursor-pointer" 
                            >
                                <option value="" disabled>Select Time</option>
                                {TIME_OPTIONS.map((t, idx) => (
                                    <option key={idx} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Closing Time</label>
                            <select
                                value={closeTime}
                                onChange={(e) => setCloseTime(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors outline-none appearance-none bg-white cursor-pointer" 
                            >
                                <option value="" disabled>Select Time</option>
                                {TIME_OPTIONS.map((t, idx) => (
                                    <option key={idx} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Evening Shift</h4>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Opening Time</label>
                            <select
                                value={eveningOpenTime}
                                onChange={(e) => setEveningOpenTime(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors outline-none appearance-none bg-white cursor-pointer" 
                            >
                                <option value="" disabled>Select Time</option>
                                {TIME_OPTIONS.map((t, idx) => (
                                    <option key={idx} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Closing Time</label>
                            <select
                                value={eveningCloseTime}
                                onChange={(e) => setEveningCloseTime(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors outline-none appearance-none bg-white cursor-pointer" 
                            >
                                <option value="" disabled>Select Time</option>
                                {TIME_OPTIONS.map((t, idx) => (
                                    <option key={idx} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}