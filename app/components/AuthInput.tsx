"use client";
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
        className={`relative flex items-center rounded-2xl border bg-slate-50 transition-all duration-300 ${
          isFocused
            ? "border-accent ring-1 ring-accent/20 shadow-[0_4px_20px_rgba(13,148,136,0.1)]"
            : "border-ink/15"
        }`}
      >
        {icon && (
          <div
            className={`shrink-0 pl-5 pr-4 transition-colors duration-300 ${
              isFocused ? "text-accent" : "text-ink-subtle"
            }`}
          >
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
          className={`w-full border-0 bg-transparent py-5 text-base text-ink outline-none focus:border-transparent focus:ring-0 placeholder-transparent ${
            icon ? "pl-3" : "pl-5"
          } pr-5`}
          placeholder={label}
        />

        <label
          className={`pointer-events-none absolute transition-all duration-300 ${
            isFocused || hasValue
              ? "-top-2.5 left-4 rounded-md bg-white px-2 text-xs font-bold uppercase tracking-widest text-accent"
              : `text-base text-ink-subtle ${icon ? "left-[4.75rem]" : "left-5"}`
          }`}
        >
          {label}
        </label>

        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
