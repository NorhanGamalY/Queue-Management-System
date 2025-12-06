"use client";

import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function AnimatedInput({ label, name, type = "text", error, value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative">
      <label 
        className={`absolute left-3 transition-all duration-300 pointer-events-none ${
          isFocused || value 
            ? '-top-2.5 text-xs bg-white dark:bg-[#1E1D1A] px-2 text-[#359487] dark:text-[#C6FE02]' 
            : 'top-3 text-gray-500 dark:text-gray-400'
        }`}
      >
        {label} *
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full rounded-lg p-3 pt-4
          border-2 transition-all duration-300
          ${ error 
            ? 'border-red-500 dark:border-red-500' 
            : isFocused 
              ? 'border-[#359487] dark:border-[#C6FE02]' 
              : 'border-gray-300 dark:border-[#4A4744]'
          }
          dark:bg-[#1E1D1A] dark:text-white
          focus:outline-none focus:ring-2 
          ${error 
            ? 'focus:ring-red-500/30' 
            : 'focus:ring-[#359487]/30 dark:focus:ring-[#C6FE02]/30'
          }
          hover:border-[#359487] dark:hover:border-[#C6FE02]
        `}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1 flex items-center gap-1 animate-shake">
          <AlertCircle size={14} />
          {error}
        </span>
      )}
    </div>
  );
}
