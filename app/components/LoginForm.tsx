"use client"
import React from "react";
import { AuthInput } from "./AuthInput";
import FancyButton from "./button";
import { Mail, Lock } from "lucide-react";

export const LoginForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic would go here
    console.log("Login submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <AuthInput 
        label="Email Address" 
        type="email" 
        required 
        icon={<Mail size={22} />} 
      />
      <AuthInput 
        label="Password" 
        type="password" 
        required 
        icon={<Lock size={22} />} 
      />

      <div className="flex items-center justify-between mb-10 px-1">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#2dd4bf] focus:ring-[#2dd4bf]/20 focus:ring-offset-0 transition-all"
          />
          <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">Remember me</span>
        </label>
        <a href="#" className="text-sm text-[#2dd4bf] hover:underline">Forgot password?</a>
      </div>

      <FancyButton
        type="submit"
        label="Sign In to Dashboard"
        variant="primary"
        extraClasses="w-full py-5 text-base uppercase tracking-widest"
      />
    </form>
  );
};
