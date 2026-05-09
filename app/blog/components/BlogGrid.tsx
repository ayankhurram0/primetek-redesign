"use client";

import { motion } from 'motion/react';
import { Clock, ArrowUpRight } from 'lucide-react';

import { blogs } from '../blogData';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogGrid() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="aspect-[16/10] rounded-[32px] overflow-hidden mb-8 border border-white/5 bg-brand-900 group-hover:border-brand-teal/30 transition-all duration-500 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform">
                    <div className="w-10 h-10 rounded-full bg-brand-teal text-brand-950 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      <Clock className="w-3 h-3" /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-medium text-teal-400 uppercase  leading-tight group-hover:text-brand-teal transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 font-light text-sm leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <button className="px-10 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all text-[10px] uppercase tracking-[0.3em]">
            Load More Investigations
          </button>
        </div>
      </div>
    </section>
  );
}
