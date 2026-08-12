/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { User, Mail, Phone, MapPin, Edit3 } from "lucide-react";
import axios from "axios";



export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading , setLoading] = useState<boolean>(false);
    const [error , setError] = useState<string | null>(null);


    const [formData, setFormData] = useState({
      username: "",
      mobile: "",
      PanCard: "",
      AadhaarNumber: "",
      IFSC_CODE: "",
      GST_NUMBER: "",
      bankName: "",
      bankAccountNumber: "",
      bankAccountHolderName: ""
    });

    const onsumbit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            setLoading(true);
            setError(null);
            const response = await fetch("http://localhost:8001/api/v1/Document/getprofile", {
                method: "Get",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || "Failed to update profile");
            }
            console.log(data);
            setIsEditing(false);
        }catch(error: any){
            console.error(error);
            setError(error.message || "Failed to update profile");
        }finally{
            setLoading(false);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    return (
        <div className="max-w-4xl mx-auto p-6 mt-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Banner */}
                <div className="h-32 bg-gradient-to-r from-orange-400 to-orange-500"></div>
                
                {/* Profile Content */}
                <div className="px-8 pb-8 relative">
                    {/* Avatar */}
                    <div className="absolute -top-16 border-4 border-white rounded-full bg-white">
                        <div className="h-28 w-28 bg-gradient-to-tr from-orange-100 to-orange-200 text-orange-600 rounded-full flex items-center justify-center shadow-inner">
                            <User size={48} strokeWidth={2} />
                        </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="flex justify-end pt-4">
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 hover:bg-orange-100 font-medium rounded-xl transition-colors text-sm"
                        >
                            <Edit3 size={16} />
                            {isEditing ? "Save Profile" : "Edit Profile"}
                        </button>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-2xl font-bold text-gray-900">Seller Name</h1>
                        <p className="text-gray-500 text-sm mt-1">Joined August 2026</p>
                    </div>

                    {/* Details Grid */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                            <div className="p-3 bg-white rounded-lg text-gray-500 shadow-sm">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</p>
                                <p className="text-gray-900 font-medium mt-0.5">seller@example.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                            <div className="p-3 bg-white rounded-lg text-gray-500 shadow-sm">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</p>
                                <p className="text-gray-900 font-medium mt-0.5">+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 md:col-span-2">
                            <div className="p-3 bg-white rounded-lg text-gray-500 shadow-sm">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Business Address</p>
                                <p className="text-gray-900 font-medium mt-0.5">123 Market Street, New Delhi, India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}