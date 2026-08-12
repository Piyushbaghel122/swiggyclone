import React, { useState, useRef } from "react";
import { UploadCloud, X } from "lucide-react";

interface ImageUploadProps {
  label?: string;
  error?: string;
  className?: string;
  onImageChange?: (file: File | null) => void;
  defaultImage?: string;
}

export const ImageUpload = ({
  label,
  error,
  className = "",
  onImageChange,
  defaultImage
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange?.(file);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageChange?.(null);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          {label}
        </label>
      )}
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-full h-full min-h-[300px] flex-1 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-200 ${
          error ? "border-rose-500 bg-rose-50" : "border-slate-300 bg-slate-50 hover:border-orange-500 hover:bg-orange-50/30"
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm">Change Image</span>
            </div>
            <button 
              onClick={clearImage}
              className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-rose-500 rounded-full shadow-md transition-colors backdrop-blur-sm"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-slate-400 gap-3 group">
            <div className="p-4 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
              <UploadCloud size={32} className="text-orange-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">Click to upload an image</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="text-xs font-medium text-rose-500 mt-1">{error}</p>}
    </div>
  );
};
