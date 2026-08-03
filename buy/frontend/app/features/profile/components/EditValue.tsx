

import React, { useState } from "react";
import { User, MapPin, X, Check, Edit3, Camera } from "lucide-react";

interface EditValueProps {
    onClose?: () => void;
    onSave?: (data: { username: string; profileImage: string; address: string }) => void;
    initialData?: {
        username?: string;
        profileImage?: string;
        address?: string;
    };
}

export default function EditValue({ onClose, onSave, initialData }: EditValueProps) {
    const [formData, setFormData] = useState({
        username: initialData?.username || "Alex Thompson",
        profileImage: initialData?.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        address: initialData?.address || "123 Swiggy Street, Bangalore"
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, profileImage: URL.createObjectURL(file) }));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSave) onSave(formData);
        if (onClose) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
           <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-orange-50/30">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        <Edit3 className="w-5 h-5 text-orange-500" /> Edit Profile Details
                    </h3>
                    {onClose && (
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Form Body */}
                <form onSubmit={handleSave} className="p-6 space-y-5">
                    {/* User Image Picker */}
                    <div className="flex flex-col items-center justify-center py-2">
                        <div className="relative group">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-orange-100 shadow-md">
                                <img 
                                    src={formData.profileImage} 
                                    alt="User Avatar" 
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <label className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-110 flex items-center justify-center">
                                <Camera className="w-4 h-4" />
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                    className="hidden" 
                                />
                            </label>
                        </div>
                        <span className="text-xs font-semibold text-gray-400 mt-2">Tap icon to change photo</span>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-orange-500" /> Full Name / Username
                        </label>
                        <input 
                            type="text" 
                            value={formData.username}
                            onChange={(e) => handleChange("username", e.target.value)}
                            placeholder="Enter username" 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50/50"
                        /> 
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-orange-500" /> Primary Address
                        </label>
                        <input 
                            type="text" 
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            placeholder="Enter primary address" 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50/50"
                        /> 
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100 mt-4">
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer text-sm"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-sm flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            <Check className="w-4 h-4" /> Save Changes
                        </button>
                    </div>
                </form>
           </div>
        </div>
    );
}