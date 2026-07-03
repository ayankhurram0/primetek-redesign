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
            className="h-5 w-5 rounded border-ink/20 bg-white text-accent focus:ring-accent/20 focus:ring-offset-0"
          />
          <span className="text-sm text-ink-muted transition-colors group-hover:text-ink">
            Remember me
          </span>
        </label>
        <a href="#" className="text-sm text-accent hover:underline">
          Forgot password?
        </a>
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
