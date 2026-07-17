"use client"
import React from "react";
import { AuthInput } from "./AuthInput";
import FancyButton from "./button";
import { Mail, Lock, User, Building2 } from "lucide-react";

export const SignupForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Signup logic would go here
    console.log("Signup submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <AuthInput 
          label="Full Name" 
          type="text" 
          required 
          icon={<User size={22} />} 
        />
        <AuthInput 
          label="Pharmacy Name" 
          type="text" 
          required 
          icon={<Building2 size={22} />} 
        />
      </div>
      
      <AuthInput 
        label="Work Email" 
        type="email" 
        required 
        icon={<Mail size={22} />} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <AuthInput 
          label="Password" 
          type="password" 
          required 
          icon={<Lock size={22} />} 
        />
        <AuthInput 
          label="Confirm Password" 
          type="password" 
          required 
          icon={<Lock size={22} />} 
        />
      </div>

      <div className="mb-10 px-1">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            required
            className="mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-[#0d9488] focus:ring-[#0d9488]/20 focus:ring-offset-0 transition-all"
          />
          <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors leading-relaxed">
            I agree to the <a href="#" className="text-[#0d9488] hover:underline">Terms of Service</a> and <a href="#" className="text-[#0d9488] hover:underline">Privacy Policy</a>
          </span>
        </label>
      </div>

      <FancyButton
        type="submit"
        label="Create Your Account"
        variant="primary"
        extraClasses="w-full py-3.5 text-base uppercase tracking-widest"
      />
    </form>
  );
};
