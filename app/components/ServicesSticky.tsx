"use client";

import { motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import FancyButton from "./button";
import service1 from "@/src/assets/service1.png";
import service2 from "@/src/assets/service2.png";
import service3 from "@/src/assets/service3.png";
import service4 from "@/src/assets/service4.png";
import service5 from "@/src/assets/service5.png";

interface ServiceSectionProps {
  number: string;
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  zIndex: number;
}

const ServiceSection = ({ number, title, description, imageSrc, imageAlt, zIndex }: ServiceSectionProps) => {
  return (
    <motion.section
      style={{ zIndex }}
      className="sticky top-0 min-h-screen flex flex-col justify-center bg-white border-t border-black/10 py-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-16">
          <div className="flex items-center gap-8 flex-1">
            <h2 className="text-5xl md:text-7xl lg:text-6xl font-semibold tracking-tight text-[#2b4c8c]">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-4xl font-light text-[#71c6a4]">{number}</span>
            <div className="w-[1px] h-12 bg-[#2b4c8c]/20" />
            <div className="flex gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-[1px] h-6 bg-[#71c6a4]/30" />
              ))}
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Description */}
          <div className="lg:col-span-6 space-y-12">
            <p className="text-2xl md:text-xl font-light leading-relaxed text-gray-600">
              {description}
            </p>

            <FancyButton
              label="Explore Service"
              textColor="white"
              borderColor="[#71c6a4]"
              bgColor="#71c6a4"
              rippleColor="#2b4c8c"
              extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-200 px-10 py-5 font-bold text-sm shadow-[0_10px_30px_rgba(113,198,164,0.3)]"
            />
          </div>

          {/* Right: Portfolio Grid Image */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/5 aspect-[4/3]"
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2b4c8c]/5 via-transparent to-[#71c6a4]/10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default function ServicesSticky() {
  const services = [
    {
      number: "01",
      title: "Revenue Intelligence & Reporting",
      description: "Identify Revenue Leakage, Monitor PBM Performance, And Stay Ahead Of Compliance Risks Through Structured Data Analysis.",
      imageSrc: service1,
      imageAlt: "Revenue Intelligence"
    },
    {
      number: "02",
      title: "Claims & Reimbursement Optimization",
      description: "Recover Lost Revenue, Reduce Claim Fees, And Improve Reimbursement Accuracy Across All Payers.",
      imageSrc: service2,
      imageAlt: "Claims Optimization"
    },
    {
      number: "03",
      title: "Compliance & Audit Protection",
      description: "Stay Audit-Ready With Systems Designed To Reduce Recoupment Risk And Maintain Regulatory Alignment.",
      imageSrc: service3,
      imageAlt: "Compliance Protection"
    },
    {
      number: "04",
      title: "Patient & Operational Support Systems",
      description: "Streamline Communication, Improve Workflow Efficiency, And Enhance Patient Engagement Through Structured Support.",
      imageSrc: service4,
      imageAlt: "Patient Support"
    },
    {
      number: "05",
      title: "Pharmacy Growth & Performance Strategy",
      description: "Optimize Pricing, Sourcing, And Operational Strategy To Improve Profitability And Scalability.",
      imageSrc: service5,
      imageAlt: "Growth Strategy"
    }
  ];

  return (
    <section id="services" className="bg-white">
      {/* Hero Section */}
      <div className="sticky top-0 min-h-screen flex flex-col justify-center bg-white z-0 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className=" max-w-7xl mx-auto"
        >
          <h1 className="text-[8vw] md:text-7xl text-center font-bold leading-[1] tracking-tighter uppercase text-[#71c6a4]">
            Operational Systems That <span className="text-[#2b4c8c]">Protect & Grow Pharmacy Revenue</span>
          </h1>
        </motion.div>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#71c6a4]/20 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-12 space-y-12 text-center"
          >
            <p className="text-2xl md:text-3xl lg:text-xl font-light text-center leading-snug text-gray-700">
              Empower your pharmacy with automated workflows and data-driven insights that safeguard your margins and accelerate revenue generation.
            </p>

            <FancyButton
              label="Become a client"
              textColor="white"
              borderColor="[#71c6a4]"
              bgColor="#71c6a4"
              rippleColor="#2b4c8c"
              extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-200 px-8 py-4 font-semibold text-md shadow-[0_10px_30px_rgba(113,198,164,0.3)]"
            />
          </motion.div>
        </div>
      </div>

      {/* Service Sections */}
      <div className="bg-white max-w-8xl mx-auto px-50">
        {services.map((service, index) => (
          <ServiceSection
            key={service.number}
            zIndex={index + 10}
            {...service}
          />
        ))}
      </div>
    </section>
  );
}
