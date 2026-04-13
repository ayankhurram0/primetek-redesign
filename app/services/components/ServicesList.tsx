"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "../servicesData";
import FancyButton from "@/app/components/button";
import AnimationWrapper, { StaggerContainer, StaggerItem } from "@/app/components/AnimationWrapper";

export default function ServicesList() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <Link href={`/services/${service.slug}`} className="block group h-full">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_2px_6px_rgba(120,220,202,0.3)] hover:shadow-[0_0_30px_rgba(43,76,140,0.2)] transition-all duration-300 flex flex-col h-full border border-slate-50">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#2b4c8c]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>

                  <div className="p-10 pt-14 flex flex-col flex-1 z-10 relative">
                    <div className="absolute -top-12 left-10 z-20">
                      <div className="bg-white p-5 rounded-2xl shadow-xl text-[#71c6a4] z-20 border border-slate-50">
                        <Image src={service.icon} alt={service.title} width={40} height={40} />
                      </div>
                    </div>
                    <h4 className="text-[#2b4c8c] font-black text-2xl mb-4 leading-tight">
                      {service.title}
                    </h4>
                    <p className="text-slate-600 text-base leading-relaxed mb-8 flex-1 font-light">
                      {service.shortDesc}
                    </p>
                    <div className="w-fit pointer-events-none">
                      <FancyButton
                        label="Read More"
                        textColor="white"
                        borderColor="[#71c6a4]"
                        rippleColor="#2b4c8c"
                        bgColor="#71c6a4"
                        extraClasses="!py-3 !text-sm group-hover:translate-x-1 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
