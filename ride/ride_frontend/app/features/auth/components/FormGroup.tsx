import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FormGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  icon?: React.ReactNode;
}

export const FormGroup = React.forwardRef<HTMLInputElement, FormGroupProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={twMerge(
              clsx(
                "w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-900",
                "text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200",
                icon ? "pl-10" : "",
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700"
              ),
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);
FormGroup.displayName = "FormGroup";