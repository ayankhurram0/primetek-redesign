"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import AnimationWrapper from "./AnimationWrapper";

export default function AuditSlider() {
  return (
    <section className="py-20 bg-white">
      <AnimationWrapper direction="up" distance={30} className="max-w-7xl mx-auto rounded-r-4xl">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="slide"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: ".custom-audit-pagination",
            bulletClass: "audit-bullet",
            bulletActiveClass: "audit-bullet-active",
          }}
          className="rounded-[3.5rem] overflow-hidden shadow-2xl group cursor-pointer"
        >
          {[1, 2, 3].map((i) => (
            <SwiperSlide key={i}>
              <div className="relative aspect-21/9 w-full">
                <div className="absolute bottom-20 left-20 max-w-2xl">
                  <h2 className="text-white text-5xl  font-bold leading-tight drop-shadow-2xl mb-8">
                    PBM Audits And <br /> Recoupments
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="absolute !bottom-12 !left-20 z-20 flex custom-audit-pagination gap-3"></div>

          <style jsx global>{`
            .audit-bullet {
              height: 10px;
              width: 30px;
              background-color: #78fccb;
              opacity: 1;
              border-radius: 9999px;
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .audit-bullet-active {
              width: 64px;
              background-color: white !important;
            }

          `}</style>
        </Swiper>
      </AnimationWrapper>
    </section>
  );
}
