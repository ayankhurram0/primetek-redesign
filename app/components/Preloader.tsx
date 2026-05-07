"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import logo from "@/src/assets/logo-white.png";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // Hold at 100% for 500ms
          return 100;
        }
        return prev + Math.random() * 15; // Random increment for realistic loading
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-teal-400 to-[#2b4c8c]"
    >
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
          className="mb-16"
        >
          <Image
            src={logo}
            alt="PrimeTek"
            width={500}
            height={500}
            className="drop-shadow-2xl"
          />
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-64 md:w-80 mx-auto">
          {/* Progress Bar Background */}
          <div className="h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Progress Bar Fill */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
              className="h-full bg-gradient-to-r from-white to-white/80 rounded-full relative overflow-hidden"
            >
              {/* Shimmer Effect */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </motion.div>
          </div>

          {/* Progress Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-white/80 text-sm font-medium"
          >
            {Math.round(progress)}%
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
