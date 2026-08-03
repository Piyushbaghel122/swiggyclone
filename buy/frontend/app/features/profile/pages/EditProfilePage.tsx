import React, { useState } from "react";
import FormGroup from "../components/FornGroup";

interface EditProfilePageProps {
    onClose?: () => void;
}

export default function EditProfilePage({ onClose }: EditProfilePageProps) {
    const [formData, setFormData] = useState({
        username: "",
        lastname: "",
        email: "",
        gender: "",
        dob: "",
        phonenumber: "", 
        address: ""
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can call API to save profile
        if (onClose) onClose();
    };

    return (
        <div className="flex items-center justify-center py-4">
           <div className="w-full max-w-2xl shadow-lg bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <FormGroup 
                  label="Username"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
                <FormGroup 
                  label="Last Name"
                  value={formData.lastname}
                  onChange={(e) => handleChange("lastname", e.target.value)}
                />
                <FormGroup 
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <FormGroup 
                  label="Gender"
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
                <FormGroup 
                  label="Date of Birth"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                />
                <FormGroup 
                  label="Phone Number"
                  value={formData.phonenumber}
                  onChange={(e) => handleChange("phonenumber", e.target.value)}
                />
                <div className="sm:col-span-2">
                  <FormGroup 
                    label="Address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2 pt-2 flex gap-3">
                  {onClose && (
                    <button 
                      type="button"
                      onClick={onClose}
                      className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Save Profile
                  </button>
                </div>
            </form>      
         </div>
        </div>
    );
}