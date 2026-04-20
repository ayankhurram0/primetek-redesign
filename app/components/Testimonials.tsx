"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
    <section className="pb-60 bg-white z-10 overflow-hidden">
      <div className="w-[95%] max-w-[1800px] mx-auto px-6 md:px-12">

        {/* Header Section */}
        <AnimationWrapper direction="up" distance={30} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <h2 className="text-4xl 2xl:text-6xl font-black max-w-2xl leading-tight">
            <span className="text-[#64c4ad]">A Trusted</span> <br />
            <span className="text-[#2b4c8c]">Operational Partner</span>
          </h2>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex -space-x-4">
              {[prof1, prof2, prof3].map((img, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                  <Image src={img} alt="Customer" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-black font-black text-sm">Happy Customer</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-black text-[10px] font-bold">4.8 (15K Review)</span>
              </div>
            </div>
          </div>
        </AnimationWrapper>

        <AnimationWrapper direction="up" distance={50} delay={0.2}>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: ".custom-test-pagination",
              bulletClass: "test-bullet",
              bulletActiveClass: "test-bullet-active",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-24"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white border-x border-slate-100 px-10 py-12 flex flex-col h-full hover:bg-slate-50/50 transition-colors duration-500">
                  <h4 className="text-black font-black text-xl 2xl:text-2xl mb-6 leading-tight">
                    “{item.quote}”
                  </h4>
                  <p className="text-black text-base 2xl:text-md leading-relaxed mb-10 flex-1">
                    {item.text}
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-18 h-18 rounded-full overflow-hidden shadow-md ring-2 ring-slate-100">
                      <Image src={item.image} alt={item.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="text-black font-bold 2xl:text-lg">{item.author}</h5>
                      <div className="flex text-yellow-400 2xl:text-lg">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex custom-test-pagination gap-2"></div>
          </Swiper>
        </AnimationWrapper>

        <style jsx global>{`
          .test-bullet {
            height: 10px;
            width: 24px;
            background-color: #2b4c8c;
            opacity: 0.3;
            border-radius: 9999px;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .test-bullet-active {
            width: 80px;
            background-color: #2b4c8c !important;
            opacity: 1;
          }
        `}</style>
      </div>
    </section>
  );
}
