

import React, { useState } from "react";
import { Camera, Upload, X, Check } from "lucide-react";

interface EditImageProps {
    currentImage?: string;
    onClose?: () => void;
    onSave?: (newImageUrl: string, file?: File) => void;
}

const AVATAR_PRESETS = [
    "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
    "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
];

export default function EditImage({ currentImage, onClose, onSave }: EditImageProps) {
    const [previewUrl, setPreviewUrl] = useState<string>(
        currentImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handlePresetSelect = (url: string) => {
        setSelectedFile(null);
        setPreviewUrl(url);
    };

    const handleSave = () => {
        if (onSave) {
            onSave(previewUrl, selectedFile || undefined);
        }
        if (onClose) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        <Camera className="w-5 h-5 text-orange-500" /> Change Profile Photo
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

                {/* Content */}
                <div className="p-6 flex flex-col items-center space-y-6">
                    {/* Active Preview */}
                    <div className="relative group">
                        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-orange-100 shadow-md">
                            <img 
                                src={previewUrl} 
                                alt="Profile Preview" 
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <label className="absolute bottom-1 right-1 bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-110 flex items-center justify-center">
                            <Upload className="w-4 h-4" />
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                className="hidden" 
                            />
                        </label>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                        Click the upload button above to choose a photo from your computer, or pick from our presets below.
                    </p>

                    {/* Presets Grid */}
                    <div className="w-full">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5 block">
                            Choose an Avatar Preset
                        </label>
                        <div className="grid grid-cols-6 gap-2.5">
                            {AVATAR_PRESETS.map((preset, index) => {
                                const isSelected = previewUrl === preset;
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handlePresetSelect(preset)}
                                        className={`relative aspect-square rounded-xl overflow-hidden border-2 p-1 transition-all cursor-pointer ${
                                            isSelected 
                                                ? "border-orange-500 bg-orange-50/50 scale-105 shadow-sm" 
                                                : "border-gray-150 hover:border-gray-300 bg-gray-50"
                                        }`}
                                    >
                                        <img src={preset} alt={`Avatar ${index + 1}`} className="w-full h-full object-contain" />
                                        {isSelected && (
                                            <div className="absolute top-0.5 right-0.5 bg-orange-500 text-white rounded-full p-0.5">
                                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl font-semibold text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer text-sm"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-sm flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        <Check className="w-4 h-4" /> Save Photo
                    </button>
                </div>
            </div>
        </div>
    );
}