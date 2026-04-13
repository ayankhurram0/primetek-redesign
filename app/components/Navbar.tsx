'use client'
import Image from "next/image";
import logo from "@/src/assets/footer-logo.png";
import Link from "next/link";
import FancyButton from "./button";
import { useState, useEffect } from "react";

import { motion } from "motion/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 font-sans transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <Link href="/" className="flex items-center justify-start w-[20%]">
        <Image
          src={logo}
          alt="PrimeTek Services"
          width={500}
          height={80}
          priority
          className="h-18 w-auto"
        />
      </Link>

      <div className={`hidden lg:flex items-center justify-center space-x-8 text-md font-bold tracking-wide uppercase w-[60%] transition-colors duration-300 ${
        scrolled ? 'text-black' : 'text-white'
      }`}>
        <Link href="/" className="cursor-pointer hover:text-[#71c6a4] transition-colors">Home</Link>
        <Link href="/about" className="cursor-pointer hover:text-[#71c6a4] transition-colors">About Us</Link>
        <Link href="/services" className="cursor-pointer hover:text-[#71c6a4] transition-colors">Services</Link>
        <Link href="/blog" className="cursor-pointer hover:text-[#71c6a4] transition-colors">Blog</Link>
        <span className="cursor-pointer hover:text-[#71c6a4] transition-colors">Resources</span>
      </div>

      <div className="flex items-center justify-end w-[20%] space-x-4">
        <FancyButton
          label="Login"
          textColor={scrolled ? "black" : "white"}
          borderColor={scrolled ? "black" : "white"}
          rippleColor="white"
          bgColor={scrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.25)"}
          extraClasses={`backdrop-blur-md hover:text-[black] transition-all duration-200 ${
            scrolled ? 'hover:bg-gray-100' : ''
          }`}
        />
        <FancyButton
          label="Sign Up"
          textColor="black"
          borderColor="[#71c6a4]"
          rippleColor="#2b4c8c"
          bgColor="#71c6a4"
          extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-200" />
      </div>
    </motion.nav>
  );
}
