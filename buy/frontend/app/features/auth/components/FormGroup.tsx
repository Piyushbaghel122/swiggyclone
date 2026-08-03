"use client";
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormGroupProps {
  id?: string;
  value?: string;
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  icon?: React.ReactNode;
  type?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  error?: string;
}

export const FormGroup = ({ id, value, label, placeholder, onChange, onBlur, icon, type = "text", prefix, suffix, className, error }: FormGroupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col mb-4 ${className || ''}`}>
      <label htmlFor={id} className={`text-xs font-bold mb-1.5 uppercase tracking-wide ${error ? 'text-red-500' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className={`flex items-center bg-gray-50 border rounded-lg px-4 py-3 focus-within:ring-1 transition-all ${
        error 
          ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' 
          : 'border-gray-200 focus-within:border-blue-400 focus-within:ring-blue-400'
      }`}>
        {icon && <span className="text-gray-500 mr-2 flex-shrink-0">{icon}</span>}
        {prefix && (
          <>
            <span className="text-gray-800 font-semibold mr-2">{prefix}</span>
            <div className="h-5 w-px bg-gray-300 mr-2"></div>
          </>
        )}
        <input
          id={id}
          type={inputType}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm font-medium"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {suffix && (
          <>
            <div className="h-5 w-px bg-gray-300 mx-2"></div>
            <span className="text-gray-500 font-medium">{suffix}</span>
          </>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-700 ml-2 focus:outline-none flex-shrink-0"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="text-red-500 text-xs mt-1.5 font-medium">{error}</span>}
    </div>
  );
}