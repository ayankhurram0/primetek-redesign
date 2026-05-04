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

export default function Testimonials() {
  return (
    <section className="pb-60 bg-[#020817] z-10 overflow-hidden">
      <div className="w-[95%] max-w-[1800px] mx-auto px-6 md:px-12">

        {/* Header Section */}
        <AnimationWrapper direction="up" distance={30} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <h2 className="text-4xl 2xl:text-5xl font-bold max-w-2xl leading-tight text-white">
            <span className="text-[#64c4ad]">A Trusted</span> <br />
            <span>Operational Partner</span>
          </h2>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 shadow-sm backdrop-blur-md">
            <div className="flex -space-x-4">
              {[prof1, prof2, prof3].map((img, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#71c6a4]/40 overflow-hidden shadow-sm">
                  <Image src={img} alt="Customer" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-black text-sm">Happy Customer</p>
              <div className="flex items-center gap-1">
                <span className="text-[#71c6a4] text-xs">★</span>
                <span className="text-white/60 text-[10px] font-bold">4.8 (15K Review)</span>
              </div>
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

                <div className="bg-white/5 border border-[#71c6a4]/30 px-10 py-12 flex flex-col h-full hover:bg-white/10 hover:border-[#71c6a4]/60 transition-all duration-500 rounded-3xl backdrop-blur-md group relative">
                  <div className="w-3 h-3 rounded-full bg-[#71c6a4]/20 border border-[#71c6a4]/40 mb-6" />
                  <h4 className="text-white font-bold text-xl 2xl:text-3xl mb-6 leading-tight">
                    “{item.quote}”
                  </h4>
                  <p className="text-slate-300 text-base 2xl:text-xl leading-relaxed mb-10 flex-1">
                    {item.text}
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-18 h-18 rounded-full overflow-hidden shadow-md ring-2 ring-[#71c6a4]">
                      <Image src={item.image} alt={item.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="text-white font-bold 2xl:text-lg">{item.author}</h5>
                      <div className="flex text-[#71c6a4] 2xl:text-lg">
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
