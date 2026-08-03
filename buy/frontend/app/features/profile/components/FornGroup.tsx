import React from 'react';

interface FormGroupProps {
  label: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export default function FormGroup({ label, type = "text", value, onChange, children }: FormGroupProps) {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            {children}
        </div>
    );
}