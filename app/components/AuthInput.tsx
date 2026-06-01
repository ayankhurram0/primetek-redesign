"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const AuthInput: React.FC<AuthInputProps> = ({ label, icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative mb-8">
      <div 
        className={`relative flex items-center bg-white/5 rounded-2xl border transition-all duration-300 ${
          isFocused ? "border-[#2dd4bf] ring-1 ring-[#2dd4bf]/20 shadow-[0_0_20px_rgba(45,212,191,0.1)]" : "border-white/10"
        }`}
      >
        {icon && (
          <div className={`pl-5 transition-colors duration-300 ${isFocused ? "text-[#2dd4bf]" : "text-white/40"}`}>
            {icon}
          </div>
        )}
        
        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
          }}
          className="w-full bg-transparent border-0 focus:ring-0 text-white px-5 py-5 placeholder-transparent text-base outline-none focus:outline-none focus:border-transparent"
          placeholder={label}
        />

        <label
          className={`absolute left-5 transition-all duration-300 pointer-events-none ${
            (isFocused || hasValue) 
              ? "text-xs -top-2.5 left-4 px-2 bg-[#020617] rounded-md text-[#2dd4bf] font-bold uppercase tracking-widest" 
              : `text-base text-white/40 ${icon ? "ml-7" : ""}`
          }`}
        >
          {label}
        </label>

        {/* Focus Gradient Line at bottom */}
        <AnimatePresence>
          {isFocused && (
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#2dd4bf] to-transparent"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
