import { useState, ChangeEvent } from "react";
import { FormConfirm } from "../../features/auth/components/FormConfirm";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

export default function Reastaurant_mobile() {
    const [restaurantName, setRestaurantName] = useState<string>(""); 
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    async function submitButton() {
        if (!restaurantName.trim()) {
            setError("Restaurant name is required");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const api = axios.create({
                baseURL: "http://localhost:8001/mobile",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            const response = await api.post("/reastaurantcreate", {
                restaurantName: restaurantName
            });
            
            // navigate({ to: '/next-route' });
            
        } catch(err: any) {
            setError(err.response?.data?.message || "An error occurred while creating the restaurant.");
        } finally {
            setLoading(false);
        }
    }

    return (
     <div className="min-h-screen w-full bg-[#0C0E12] px-4 py-6 flex flex-col sm:hidden font-sans">
        <div className="flex flex-col gap-6 flex-1 justify-center">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 tracking-tight">Create Restaurant</h1>
                <p className="text-slate-400 text-sm">Enter the name of your new restaurant to get started.</p>
            </div>
            
            <FormConfirm className="w-full"
                label="Restaurant Name"
                type="text"
                placeholder="e.g. The Spicy Kitchen"
                value={restaurantName}
                error={error || undefined}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setRestaurantName(e.target.value);
                    if (error) setError(null);
                }}
            />  
            
            <button 
                onClick={submitButton}
                disabled={loading}
                className="w-full flex justify-center items-center py-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-orange-500/50 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {loading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing...
                    </span>
                ) : (
                    "Next Step"
                )}
            </button>
        </div>
    </div> 
    )
}
