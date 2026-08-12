"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";

const api = axios.create({
     baseURL: "http://localhost:8001/api/v1/reastaurant/",
     withCredentials: true
});

interface CreateMenuProps {
    onSuccess?: () => void;
}

export default function CreateMenu({ onSuccess }: CreateMenuProps = {}){
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [FoodImage, setFoodImage] = useState<string | null>(null);
    const [FoodName, setFoodName] = useState<string>("");
    const [FoodCategory , setFoodCategory] = useState<string>("");
    const [FoodPrice, setFoodPrice] = useState<number | "">("");
    const [FoodDiscription, setFoodDiscription] = useState<string>("");
    const [FoodType, setFoodType] = useState<string>("veg");
    const [FoodTime, setFoodTime] = useState<string>("");
    const [FoodIsAvailable, setFoodIsAvailable] = useState<boolean>(true);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFoodImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateMenu = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await api.post("/menu", {
                user_id: 1, // Providing the dummy user ID we created!
                FoodImage,
                FoodName,
                FoodPirce: Number(FoodPrice),
                FoodDiscription,
                FoodType,
                FoodTime: FoodTime || "All Day",
                FoodCategory,
            });
            console.log(response.data);
            alert("Menu created successfully!");
            if (onSuccess) onSuccess();
            // Reset form fields
            setFoodImage(null);
            setFoodName("");
            setFoodPrice("");
            setFoodDiscription("");
            setFoodType("veg");
            setFoodTime("");
            setFoodCategory("");
            setFoodIsAvailable(true);
        } catch (error: any) {
            console.error("Error creating menu:", error);
            let errorMessage = "Failed to create menu item.";
            if (error.response?.data?.detail) {
                if (Array.isArray(error.response.data.detail)) {
                    errorMessage = error.response.data.detail[0].msg;
                } else {
                    errorMessage = typeof error.response.data.detail === 'string' 
                        ? error.response.data.detail 
                        : JSON.stringify(error.response.data.detail);
                }
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="mb-8 border-b border-gray-100 pb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Menu Item</h2>
                    <p className="text-gray-500 text-sm mt-1 font-medium">Fill in the details below to add a new dish to your restaurant&apos;s menu.</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </div>
            </div>
            
            {error && (
                <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl font-medium flex items-center gap-3">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {error}
                </div>
            )}
            
            <form onSubmit={handleCreateMenu}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
                    
                    {/* Left Column: Image Upload */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <label className="block text-sm font-bold text-gray-900 mb-3">Item Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-2xl hover:bg-orange-50/50 hover:border-orange-300 transition-all group h-[280px] items-center relative overflow-hidden bg-gray-50">
                            {FoodImage ? (
                                <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={FoodImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <label htmlFor="file-upload" className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-gray-50 transition-colors text-sm">
                                            Change Image
                                        </label>
                                    </div>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                                </>
                            ) : (
                                <div className="space-y-4 text-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                        <svg className="h-8 w-8 text-gray-400 group-hover:text-orange-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col text-sm text-gray-600 justify-center">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-orange-600 hover:text-orange-500 focus-within:outline-none">
                                            <span>Click to upload</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                        <p className="pl-1 mt-1 text-gray-500 font-medium">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-400 font-bold tracking-wide">PNG, JPG, WEBP up to 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="md:col-span-7 lg:col-span-8 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Food Name</label>
                                <input type="text" required value={FoodName} onChange={(e) => setFoodName(e.target.value)} className="block w-full border border-gray-200 bg-gray-50/50 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white text-gray-900 sm:text-sm transition-all font-medium placeholder:font-normal" placeholder="e.g. Margherita Pizza" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Price</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-gray-500 font-bold sm:text-sm">₹</span>
                                    </div>
                                    <input type="number" required value={FoodPrice} onChange={(e) => setFoodPrice(e.target.value === "" ? "" : Number(e.target.value))} className="block w-full pl-9 border border-gray-200 bg-gray-50/50 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white text-gray-900 sm:text-sm transition-all font-medium placeholder:font-normal" placeholder="299" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
                            <textarea required value={FoodDiscription} onChange={(e) => setFoodDiscription(e.target.value)} rows={3} className="block w-full border border-gray-200 bg-gray-50/50 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white text-gray-900 sm:text-sm transition-all resize-none font-medium placeholder:font-normal" placeholder="Briefly describe this dish, ingredients, and preparation method..."></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Food Type</label>
                                <div className="relative">
                                    <select value={FoodType} onChange={(e) => setFoodType(e.target.value)} className="block w-full appearance-none border border-gray-200 bg-gray-50/50 rounded-xl py-3.5 px-4 pr-8 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white text-gray-900 sm:text-sm transition-all cursor-pointer font-bold">
                                        <option value="veg">🟢 Vegetarian</option>
                                        <option value="non-veg">🔴 Non-Vegetarian</option>
                                        <option value="vegan">🌱 Vegan</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <label className="block text-sm font-bold text-gray-900 mb-2">Delivery Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={FoodTime}
                                        onChange={(e) => setFoodTime(e.target.value)}
                                        className="block w-full border border-gray-200 bg-gray-50/50 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white text-gray-900 sm:text-sm transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Food Category</label>
                                <div className="relative">
                                    <select value={FoodCategory} onChange={(e) => setFoodCategory(e.target.value)} className="block w-full appearance-none border border-gray-200 bg-gray-50/50 rounded-xl py-3.5 px-4 pr-8 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white text-gray-900 sm:text-sm transition-all cursor-pointer font-bold">
                                        <option value="">Select Category</option>
                                        <option value="pizza">🍕 Pizza</option>
                                        <option value="burger">🍔 Burger</option>
                                        <option value="north-indian">🍛 North Indian</option>
                                        <option value="biryani">🥘 Biryani</option>
                                        <option value="chinese">🥡 Chinese</option>
                                        <option value="cakes">🎂 Cakes</option>
                                        <option value="shakes">🥤 Shakes</option>
                                        <option value="dosa">🥞 Dosa</option>
                                        <option value="rolls">🌯 Rolls</option>
                                        <option value="noodles">🍜 Noodles</option>
                                        <option value="salad">🥗 Salad</option>
                                        <option value="pasta">🍝 Pasta</option>
                                        <option value="ice-cream">🍦 Ice Cream</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Availability</label>
                                <label className="flex items-center p-3 border border-gray-200 bg-gray-50/50 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors h-[50px]">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" checked={FoodIsAvailable} onChange={(e) => setFoodIsAvailable(e.target.checked)} className="peer sr-only" />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 transition-colors"></div>
                                        <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                                    </div>
                                    <span className="ml-3 text-sm font-bold text-gray-700">Currently in Stock</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-6 mt-2">
                            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 px-8 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-500/30 disabled:opacity-70 transition-all active:scale-[0.98]">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Saving Menu Item...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                        Add to Menu
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}