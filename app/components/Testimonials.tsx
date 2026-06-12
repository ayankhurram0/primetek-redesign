"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


import prof1 from "@/src/assets/prof1.png";
import prof2 from "@/src/assets/prof2.png";
import prof3 from "@/src/assets/prof3.png";

const testimonials = [
  {
    quote: "Your Path to a Happier, Healthier Life",
    text: "Lorem ipsum dolor sit amet, consectetur. Augue ornare et semper elementum. Et orci iaculis tempor enim quis. Enim libero sed pharetra dolor ipsum.",
    author: "Sylvia B. Weinberg",
    image: prof1,
    rating: 5
  },
  {
    quote: "Tips and Strategies for a Healthy...",
    text: "Lorem ipsum dolor sit amet, consectetur. Augue ornare et semper elementum. Et orci iaculis tempor enim quis. Enim libero sed pharetra dolor ipsum.",
    author: "Aaron Green",
    image: prof2,
    rating: 5
  },
  {
    quote: "A Comprehensive Approach to...",
    text: "Lorem ipsum dolor sit amet, consectetur. Augue ornare et semper elementum. Et orci iaculis tempor enim quis. Enim libero sed pharetra dolor ipsum.",
    author: "Gina M. Skinner",
    image: prof3,
    rating: 5
  },
  {
    quote: "Transforming Healthcare Operations",
    text: "Supporting healthcare providers with non-clinical operational solutions that drive efficiency and compliance.",
    author: "Marvin Richards",
    image: prof1,
    rating: 5
  }
];

import AnimationWrapper from "./AnimationWrapper";
import AnimatedNumber from "./AnimatedNumber";

export default function Testimonials() {
  return (
    <section className="py-30 z-10 overflow-hidden relative">

      <div className="w-[95%] max-w-[1800px] mx-auto px-6 md:px-12">

        {/* Header Section */}
        <AnimationWrapper direction="up" distance={30} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <h2 className="text-4xl 2xl:text-5xl font-bold max-w-2xl leading-tight text-white">
            <span className="text-[#64c4ad]">A Trusted</span> <br />
            <span>Operational Partner</span>
          </h2>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-teal-400/60 shadow-sm backdrop-blur-md">
            <div className="flex -space-x-4">
              {[prof1, prof2, prof3].map((img, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-teal-400/40 overflow-hidden shadow-sm">
                  <Image src={img} alt="Customer" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-bold text-sm">Happy Customer</p>
              <div className="flex items-center gap-1">
                <span className="text-teal-400 text-xs">★</span>
                <span className="text-white/60 text-[9px] font-bold">4.8 (15K Review)</span>
              </div>
            </div>
          </div>
        </AnimationWrapper>

        {/* Stats Section Bar */}
        <AnimationWrapper direction="up" distance={30} delay={0.1} className="w-full mb-20">
          <div className="w-full bg-gradient-to-r from-[#003c47] via-[#005969] to-[#003c47] border-y border-white/10 py-10 px-6 md:px-12 flex flex-col md:flex-row justify-around items-center gap-8 rounded-2xl md:rounded-full shadow-lg shadow-black/10">
            <div className="text-center flex-1">
              <div className="text-3xl md:text-4xl 2xl:text-5xl font-extrabold text-white mb-2">
                <AnimatedNumber value={4.2} prefix="$" suffix="M+" decimals={1} />
              </div>
              <div className="text-xs md:text-sm font-semibold tracking-wider text-white/80 uppercase">Revenue Recovered</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-3xl md:text-4xl 2xl:text-5xl font-extrabold text-white mb-2">
                <AnimatedNumber value={98} suffix="%" decimals={0} />
              </div>
              <div className="text-xs md:text-sm font-semibold tracking-wider text-white/80 uppercase">Audit Readiness Score</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-3xl md:text-4xl 2xl:text-5xl font-extrabold text-white mb-2">
                <AnimatedNumber value={2} suffix="x" decimals={0} />
              </div>
              <div className="text-xs md:text-sm font-semibold tracking-wider text-white/80 uppercase">Monthly Reporting Cycle</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-3xl md:text-4xl 2xl:text-5xl font-extrabold text-white mb-2">
                <AnimatedNumber value={100} suffix="+" decimals={0} />
              </div>
              <div className="text-xs md:text-sm font-semibold tracking-wider text-white/80 uppercase">Pharmacies Supported</div>
            </div>
          </div>
        </AnimationWrapper>

        <AnimationWrapper direction="up" distance={50} delay={0.2}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}

            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!flex"
          >

            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="!h-auto flex">

                <div className="bg-[#04212a] border border-white/10 px-10 py-12 flex flex-col h-full hover:bg-[#04212a]/80 transition-all duration-500 rounded-3xl group relative">
                  <div className="w-3 h-3 rounded-full bg-teal-400/20 border border-teal-400/40 mb-4" />
                  <h4 className="text-white font-bold text-lg 2xl:text-2xl mb-4 leading-tight">
                    “{item.quote}”
                  </h4>
                  <p className="text-slate-300 text-sm 2xl:text-base leading-relaxed mb-6 flex-1">
                    {item.text}
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-md ring-2 ring-teal-400">
                      <Image src={item.image} alt={item.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="text-white font-bold text-sm 2xl:text-base">{item.author}</h5>
                      <div className="flex text-teal-400 text-sm 2xl:text-base">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

          </Swiper>
        </AnimationWrapper>
      </div>

    </section>
  );
}
