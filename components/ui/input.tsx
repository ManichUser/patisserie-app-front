// src/components/ui/Input.tsx

import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label className="text-sm font-medium text-gray-700 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          className={clsx(
            'w-full px-4 py-3 border-2 border-gray-200 rounded-xl',
            'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
            'transition-all duration-200',
            'placeholder:text-gray-400',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
            icon && 'pl-12',
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-500 ml-1 animate-slide-up">
          {error}
        </p>
      )}
    </div>
  );
};