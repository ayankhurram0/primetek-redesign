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
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 font-montserrat transition-[background-color,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-white/25 backdrop-blur-md"
          : "bg-transparent backdrop-blur-none"
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

      <div className="hidden lg:flex items-center justify-center space-x-10 text-md 2xl:text-xl font-bold tracking-wide uppercase w-[60%] text-ink transition-colors duration-300">
        <Link href="/" className="cursor-pointer hover:text-accent transition-colors">Home</Link>
        <Link href="/about" className="cursor-pointer hover:text-accent transition-colors">About Us</Link>
        <Link href="/services" className="cursor-pointer hover:text-accent transition-colors">Services</Link>

        <Link href="/case-studies" className="cursor-pointer hover:text-accent transition-colors">Case Studies</Link>
        <Link href="/contact" className="cursor-pointer hover:text-accent transition-colors">Contact</Link>
      </div>

      <div className="flex items-center justify-end w-[20%] space-x-4">
        <Link href="/login">
          <FancyButton
            label="Login"
            variant="secondary"
            extraClasses="2xl:py-5 2xl:px-10 2xl:text-xl"
          />
        </Link>
        <Link href="/signup">
          <FancyButton
            label="Sign Up"
            extraClasses="2xl:py-5 2xl:px-10 2xl:text-xl"
          />
        </Link>
      </div>
    </motion.nav>
  );
}
