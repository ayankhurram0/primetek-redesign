"use client";

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Quote, MapPin, Calendar, Hash } from 'lucide-react';

export interface CaseStudyData {
   category: string;
   type: string;
   title: string;
   location: string;
   statValue: string;
   statLabel: string;
   statDuration: string;
   challenge: string;
   approach: string;
   results: string[];
   quote: string;
   author: string;
   authorRole: string;
   theme: 'teal' | 'purple' | 'blue' | 'red';
}

const themeStyles = {
   teal: {
      border: 'border-teal-400/20',
      text: 'text-teal-400',
      bg: 'bg-teal-400/5',
      accent: 'bg-teal-400'
   },
   purple: {
      border: 'border-purple-500/20',
      text: 'text-purple-400',
      bg: 'bg-purple-500/5',
      accent: 'bg-purple-500'
   },
   blue: {
      border: 'border-blue-500/20',
      text: 'text-blue-400',
      bg: 'bg-blue-500/5',
      accent: 'bg-blue-500'
   },
   red: {
      border: 'border-red-500/20',
      text: 'text-red-400',
      bg: 'bg-red-500/5',
      accent: 'bg-red-500'
   }
};

interface CaseStudyCardProps {
   study: CaseStudyData;
   idx: number;
   key?: React.Key;
}

export default function CaseStudyCard({ study, idx }: CaseStudyCardProps) {
   const styles = themeStyles[study.theme];

   return (
      <motion.div
         initial={{ opacity: 0, y: 40 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         className="bg-[#010810]/40 backdrop-blur-3xl border border-white/5 mb-24 relative overflow-hidden group font-montserrat"
      >
         {/* Background ID Watermark */}
         <div className="absolute top-0 right-0 p-8 select-none pointer-events-none opacity-[0.02]">
            <span className="text-9xl font-display font-bold  tracking-tighter">NODE_0{idx + 1}</span>
         </div>

         {/* Header Technical Bar */}
         <div className={`px-10 py-4 border-b border-white/5 flex items-center justify-between ${styles.bg}`}>
            <div className="flex items-center gap-6">
               <span className={`flex items-center gap-2 text-xl font-montserrat font-bold uppercase tracking-[0.3em] ${styles.text}`}>
                  <Hash className="w-4 h-4" /> STUDY LOG 0{idx + 1}
               </span>
               <span className="hidden sm:block w-px h-6 bg-white/10" />
               <span className="hidden sm:block text-xl text-slate-500 font-montserrat font-bold uppercase tracking-widest">{study.type}</span>
            </div>
            <div className={`px-4 py-2 rounded-sm border border-current text-xl font-montserrat font-bold uppercase tracking-[0.2em] ${styles.text}`}>
               {study.category}
            </div>
         </div>

         <div className="p-10 md:p-16">
            {/* Title & Metadata */}
            <div className="flex flex-col lg:flex-row gap-16 mb-16">
               <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-6 mb-8">
                     <div className="flex items-center gap-2 text-lg font-montserrat text-slate-500 font-bold uppercase tracking-widest">
                        <MapPin className={`w-5 h-5 ${styles.text}`} /> {study.location}
                     </div>
                     <div className="flex items-center gap-2 text-lg font-montserrat text-slate-500 font-bold uppercase tracking-widest">
                        <Calendar className={`w-5 h-5 ${styles.text}`} /> {study.statDuration}
                     </div>
                  </div>

                  <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1] tracking-tighter uppercase mb-10">
                     {study.title}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-white/5">
                     <div className="space-y-4">
                        <h4 className={`text-xl font-montserrat font-bold uppercase mb-4 ${styles.text}`}>INITIAL CONDITION</h4>
                        <p className="text-slate-400 text-xl leading-relaxed font-light">{study.challenge}</p>
                     </div>
                     <div className="space-y-4">
                        <h4 className={`text-xl font-montserrat font-bold uppercase mb-4 ${styles.text}`}>SYSTEM DEPLOYMENT</h4>
                        <p className="text-slate-400 text-xl leading-relaxed font-light">{study.approach}</p>
                     </div>
                  </div>
               </div>

               {/* Diagnostic Stat Panel */}
               <div className="lg:w-80 shrink-0">
                  <div className="sticky top-10">
                     <div className={`p-10 border border-white/10 ${styles.bg} relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 -translate-y-1/2 translate-x-1/2 rotate-45" />
                        <div className={`text-6xl font-display font-bold mb-2 tracking-tighter ${styles.text}`}>{study.statValue}</div>
                        <div className="text-xl text-white font-montserrat font-bold uppercase mb-4">{study.statLabel}</div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className={`h-full ${styles.accent}`}
                           />
                        </div>
                     </div>

                     <div className="mt-8">
                        <ul className="space-y-4">
                           {study.results.map((result, i) => (
                              <li key={i} className="flex items-start gap-3 group/li">
                                 <div className={`w-2 h-2 rounded-full mt-2.5 shrink-0 ${styles.accent} opacity-50 group-hover/li:opacity-100 transition-opacity`} />
                                 <span className="text-slate-300 font-montserrat text-lg leading-tight uppercase opacity-80">{result}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            {/* Quote Terminal */}
            <div className="bg-white/[0.02] border border-white/5 p-12 relative overflow-hidden">
               <Quote className={`absolute top-10 right-10 w-20 h-20 opacity-5 ${styles.text}`} />
               <p className={`text-2xl md:text-3xl font-display font-bold mb-10 relative z-10 leading-[1.1] tracking-tight ${styles.text}`}>
                  "{study.quote}"
               </p>
               <div className={`flex items-center gap-6 relative z-10 border-l-2 pl-6 ${styles.text.replace('text-', 'border-')}`}>
                  <div>
                     <div className="text-white font-montserrat font-bold text-2xl uppercase tracking-widest">{study.author}</div>
                     <div className="text-2xl text-slate-500 font-montserrat font-bold uppercase tracking-widest mt-1 opacity-60 font-bold">{study.authorRole}</div>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
   );
}
