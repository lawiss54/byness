'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface RadioGroupProps {
  label?: string;
  error?: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  options,
  value,
  onChange,
  name,
  className
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <label className="block text-sm font-semibold text-brand-darkGreen-500">
          {label}
        </label>
      )}
      
      <div className="space-y-3">
        {options.map((option) => (
          <motion.label
            key={option.value}
            className={cn(
              'flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300',
              value === option.value
                ? 'border-brand-camel-500 bg-brand-camel-50'
                : 'border-brand-sage-200 hover:border-brand-camel-300 bg-white'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            
            {option.icon && (
              <div className="mr-4 text-brand-camel-500">
                {option.icon}
              </div>
            )}
            
            <div className="flex-1">
              <div className="font-semibold text-brand-darkGreen-500">
                {option.label}
              </div>
              {option.description && (
                <div className="text-sm text-brand-darkGreen-400 mt-1">
                  {option.description}
                </div>
              )}
            </div>
            
            <div className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
              value === option.value
                ? 'border-brand-camel-500 bg-brand-camel-500'
                : 'border-brand-sage-300'
            )}>
              {value === option.value && (
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>
          </motion.label>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default RadioGroup;