'use client'
import Image from "next/image";
import logo from "@/src/assets/footer-logo.png";
import Link from "next/link";
import FancyButton from "./button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { services } from "../services/servicesData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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

      <div className={`hidden lg:flex items-center justify-center space-x-10 text-md 2xl:text-xl font-bold tracking-wide uppercase w-[60%] transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white'
        }`}>
        <Link href="/" className="cursor-pointer hover:text-[#2dd4bf] transition-colors">Home</Link>
        <Link href="/about" className="cursor-pointer hover:text-[#2dd4bf] transition-colors">About Us</Link>
        
        {/* Services Dropdown */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#2dd4bf] transition-colors py-2">
            Services <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
          </div>
          
          <AnimatePresence>
            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[350px] bg-[#020817]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mt-2"
              >
                <div className="flex flex-col gap-2">
                  {services.map((service, idx) => (
                    <Link 
                      key={service.slug} 
                      href={`/services/${service.slug}`}
                      className="group/item flex flex-col p-3 rounded-xl hover:bg-white/5 transition-all relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-400/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      <span className="text-sm font-bold text-white group-hover/item:text-teal-400 transition-colors relative z-10">{service.title}</span>
                      <span className="text-[10px] text-slate-400 normal-case font-normal mt-1 leading-tight line-clamp-1 relative z-10">{service.shortDesc}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link href="/case-studies" className="cursor-pointer hover:text-[#2dd4bf] transition-colors">Case Studies</Link>
        <Link href="/resources" className="cursor-pointer hover:text-[#2dd4bf] transition-colors">Resources</Link>
        <Link href="/blog" className="cursor-pointer hover:text-[#2dd4bf] transition-colors">Blog</Link>
        <Link href="/contact" className="cursor-pointer hover:text-[#2dd4bf] transition-colors">Contact</Link>
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
