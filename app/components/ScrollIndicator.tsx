"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[9998]">
      <div 
        className="h-full bg-[#71c6a4] transition-all duration-150 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Small yellow accent line */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-yellow-400" />
      </div>
    </div>
  );
}
