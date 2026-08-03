

import React from "react";

interface FormConfirmProps {
  value: any;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
  label?: string;
  icon?: React.ReactNode;
  required?: boolean;
  error?: string;
  className?: string;
}

export const FormConfirm = ({
  value,
  placeholder,
  onChange,
  type,
  label,
  icon,
  required = false,
  error,
  className = "",
}: FormConfirmProps) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-inner shadow-black/20">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-slate-900/90 border ${
            error ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-700/80 focus:border-orange-500 focus:ring-orange-500/20"
          } rounded-xl ${icon ? "pl-11" : "px-4"} py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-4 transition duration-200`}
        />
      </div>
      {error && <p className="text-xs font-medium text-rose-400 mt-1">{error}</p>}
    </div>
  );
};