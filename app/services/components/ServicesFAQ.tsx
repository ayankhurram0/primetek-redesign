"use client";

import { useState } from "react";
import AnimationWrapper, { StaggerContainer, StaggerItem } from "@/app/components/AnimationWrapper";

const faqs = [
  {
    question: "How does PrimeTek improve revenue performance?",
    answer: "We implement structured monitoring systems that identify revenue leakage, monitor payer performance thresholds, and standardize documentation to ensure every claim is optimized for maximum reimbursement."
  },
  {
    question: "Is PrimeTek involved in clinical decision-making?",
    answer: "No. PrimeTek operates strictly within non-clinical boundaries. We focus on administrative, operational, and compliance systems, ensuring your clinical team can focus entirely on patient care without being bogged down by operational inefficiencies."
  },
  {
    question: "What types of pharmacies do you support?",
    answer: "We support a wide range of organizations, including independent community pharmacies, multi-location pharmacy groups, and larger healthcare institutions looking to refine their non-clinical operational control."
  },
  {
    question: "How do you ensure audit resilience?",
    answer: "Our framework includes year-round audit readiness by standardizing internal reporting clarity and maintaining rigorous documentation protocols that align with the latest PBM and regulatory requirements."
  }
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-6 last:border-0 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className={`text-xl font-black transition-colors duration-300 ${isOpen ? 'text-[#71c6a4]' : 'text-[#2b4c8c] group-hover:text-[#71c6a4]'}`}>
          {question}
        </span>
        <span className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-[#71c6a4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 font-light leading-relaxed text-lg">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function ServicesFAQ() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <AnimationWrapper direction="up" distance={20}>
            <span className="text-[#2b4c8c] font-black text-sm uppercase tracking-widest mb-4 block">
              Frequently Asked Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#2b4c8c] leading-tight mb-6">
              Got Questions? We Have <span className="text-[#71c6a4]">Answers</span>
            </h2>
          </AnimationWrapper>
        </div>

        <AnimationWrapper direction="up" distance={30} delay={0.2}>
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100 italic font-medium">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
