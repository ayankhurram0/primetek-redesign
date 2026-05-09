"use client";
import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Send, CheckCircle2, Clock, Check, Phone, Printer, Mail, MapPin, ArrowRight } from "lucide-react";

export const ContactFormSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-form", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section ref={containerRef} className="py-24 px-26 relative overflow-hidden bg-transparent">
      <div className="grid lg:grid-cols-12 gap-12 relative z-10">

        {/* Left Column: Info & Details */}
        <div className="lg:col-span-4 space-y-8">
          {/* What to Expect */}
          <div className="reveal-form bg-white/[0.03] p-10 border border-white/10 rounded-3xl">
            <h3 className="text-3xl font-bold text-teal-400 mb-8 uppercase tracking-tight">What <span className="text-white">to Expect</span></h3>
            <ul className="space-y-6">
              {[
                "30-minute focused strategy call",
                "Review of your current compliance posture",
                "Identification of revenue recovery opportunities",
                "Overview of services tailored to your pharmacy",
                "No obligation — just clarity"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-teal-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-6 h-6 text-teal-400" />
                  </div>
                  <span className="text-slate-400 text-xl font-medium leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="reveal-form bg-white/[0.03] p-10 border border-white/10 rounded-3xl">
            <h3 className="text-3xl font-bold text-teal-400 mb-8 uppercase tracking-tight">Contact <span className="text-white">Information</span></h3>
            <div className="space-y-8">
              {[
                { icon: Phone, label: "Phone", value: "(908) 521-4440" },
                { icon: Printer, label: "Fax", value: "(908) 760-6990" },
                { icon: Mail, label: "Email", value: "info@primetekservices.com" },
                { icon: MapPin, label: "Location", value: "New Jersey, USA" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center text-teal-400">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-bold uppercase tracking-widest text-slate-500 mb-0.5">{item.label}</div>
                    <div className="text-xl font-bold text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Office Hours */}
          <div className="reveal-form bg-teal-400/5 p-10 border border-teal-400/10 rounded-3xl">
            <div className="flex items-center gap-3 text-white mb-8">
              <Clock className="w-6 h-6 text-brand-teal" />
              <h3 className="text-3xl font-bold text-teal-400 uppercase tracking-tight">Office <span className="text-white">Hours</span></h3>
            </div>
            <div className="space-y-4 text-slate-400 font-bold uppercase tracking-widest text-xl">
              <div className="flex justify-between">
                <span>Monday – Friday</span>
                <span className="text-white">9:00 AM – 6:00 PM ET</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">By Appointment</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-slate-600">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-8">
          <div className="reveal-form bg-white/[0.02] border border-white/5 p-12 md:p-20 shadow-2xl rounded-3xl">
            {isSubmitted ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-10">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-4xl font-bold text-white uppercase mb-6">Strategy Call Requested</h4>
                <p className="text-slate-400 text-xl font-light mb-12">
                  A PrimeTek specialist will reach out within one business day.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-brand-teal font-bold uppercase tracking-widest border-b-2 border-brand-teal"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="mb-12">
                  <h2 className="text-5xl font-bold text-teal-400 uppercase mb-4 leading-none">Schedule Your <span className="text-white">Strategy Call</span></h2>
                  <p className="text-slate-400 text-xl">Tell us about your pharmacy and we'll tailor the conversation to your needs.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-lg font-bold uppercase tracking-widest text-slate-300">Full Name <span className="text-rose-500">*</span></label>
                    <input required type="text" placeholder="Jane Smith" className="w-full bg-white/[0.03] border border-white/10 px-6 py-6 rounded-lg text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-lg font-bold uppercase tracking-widest text-slate-300">Email Address <span className="text-rose-500">*</span></label>
                    <input required type="email" placeholder="jane@pharmacy.com" className="w-full bg-white/[0.03] border border-white/10 px-6 py-6 rounded-lg text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-lg font-bold uppercase tracking-widest text-slate-300">Phone Number</label>
                    <input type="tel" placeholder="(555) 000-0000" className="w-full bg-white/[0.03] border border-white/10 px-6 py-6 rounded-lg text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-lg font-bold uppercase tracking-widest text-slate-300">Pharmacy Name <span className="text-rose-500">*</span></label>
                    <input required type="text" placeholder="Main Street Pharmacy" className="w-full bg-white/[0.03] border border-white/10 px-6 py-6 rounded-lg text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-lg font-bold uppercase tracking-widest text-slate-300">Number of Locations</label>
                    <select className="w-full bg-white/[0.03] border border-white/10 px-6 py-6 rounded-lg text-white focus:outline-none focus:border-brand-teal transition-all appearance-none">
                      <option className="bg-brand-dark">Select...</option>
                      <option className="bg-brand-dark">1-2 Locations</option>
                      <option className="bg-brand-dark">3-5 Locations</option>
                      <option className="bg-brand-dark">6-10 Locations</option>
                      <option className="bg-brand-dark">10+ Locations</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-lg font-bold uppercase tracking-widest text-slate-300">Primary Interest</label>
                    <select className="w-full bg-white/[0.03] border border-white/10 px-6 py-6 rounded-lg text-white focus:outline-none focus:border-brand-teal transition-all appearance-none">
                      <option className="bg-brand-dark">Select a service...</option>
                      <option className="bg-brand-dark">Audit Protection</option>
                      <option className="bg-brand-dark">Revenue Intelligence</option>
                      <option className="bg-brand-dark">Growth Strategy</option>
                      <option className="bg-brand-dark">On-Site Operations</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-lg font-bold uppercase tracking-widest text-slate-300">Tell Us About Your Situation</label>
                  <textarea rows={5} placeholder="Describe your current challenges, goals, or any specific concerns you'd like to discuss on the call..." className="w-full bg-white/[0.03] border border-white/10 px-6 py-6 rounded-lg text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all resize-none"></textarea>
                </div>

                <button type="submit" className="w-full bg-brand-teal text-brand-dark text-xl py-6 rounded-lg font-bold uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-white transition-all shadow-xl shadow-brand-dark/10 group">
                  Request My Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-slate-500 text-base font-medium">We respond within 1 business day. No obligation.</p>
              </form>
            )}
          </div>
        </div>
      </div >
    </section >
  );
};
