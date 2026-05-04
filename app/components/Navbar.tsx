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
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 font-sans transition-all duration-300 ${scrolled ? 'bg-[#020817]/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}

    >
      <Link href="/" className="flex items-center justify-start w-[20%]">
        <Image
          src={logo}
          alt="PrimeTek Services"
          width={500}
          height={80}
          priority
          className="h-24 w-auto"
        />
      </Link>

      <div className={`hidden lg:flex items-center justify-center space-x-8 text-md 2xl:text-xl font-bold tracking-wide uppercase w-[60%] transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white text-[0px]'
        }`}>
        <Link href="/" className="cursor-pointer hover:text-[#2dd4bf] transition-colors">Home</Link>
        <Link href="/about" className="cursor-pointer hover:text-[#2dd4bf] transition-colors">About Us</Link>
        <Link href="/services" className="cursor-pointer hover:text-[#2dd4bf] transition-colors">Services</Link>
        <Link href="/blog" className="cursor-pointer hover:text-[#2dd4bf] transition-colors">Blog</Link>
        <span className="cursor-pointer hover:text-[#2dd4bf] transition-colors">Resources</span>
      </div>

      <div className="flex items-center justify-end w-[20%] space-x-4">
        <Link href="/login">
          <FancyButton
            label="Login"
            textColor="white"
            borderColor={scrolled ? "white/20" : "#2b4c8c"}
            rippleColor="#2dd4bf"
            bgColor={scrolled ? "white/5" : "#2b4c8c"}
            extraClasses={`backdrop-blur-md hover:text-[black] hover:border-[#2dd4bf] transition-all duration-200 2xl:py-5 2xl:px-10 2xl:text-xl ${scrolled ? 'hover:bg-white' : ''
              }`}
          />
        </Link>
        <Link href="/signup">
          <FancyButton
            label="Sign Up"
            textColor="white"
            borderColor="[#2dd4bf]"
            rippleColor="#2b4c8c"
            bgColor="#2dd4bf"
            extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-200 2xl:py-5 2xl:px-10 2xl:text-xl" />
        </Link>
      </div>
    </motion.nav>
  );
}
