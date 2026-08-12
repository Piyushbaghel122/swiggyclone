import React from 'react';

interface FormGroupProps {
    label?: string;
    placeholder?: string;
    type?: string;
    value?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
    className?: string;
}

export default function FormGroup({ label, placeholder, type, value, checked, onChange, error, className }: FormGroupProps) {
    return (
        <div>
            {label && <label htmlFor="">{label}</label>}
            <input type={type} placeholder={placeholder} value={value} checked={checked} onChange={onChange} className={className} />
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}