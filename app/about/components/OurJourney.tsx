"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import vandm1 from "@/src/assets/vandm1.png";
import vandm3 from "@/src/assets/vandm3.png";
import vandm4 from "@/src/assets/vandm4.png";
import vandm5 from "@/src/assets/vandm5.png";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "OUR VISION",
    paragraphs: [
      "Our vision is to become the leading AI-powered operations platform for independent pharmacies.",
      "We believe pharmacy owners shouldn't have to juggle multiple systems to manage their business. By bringing everything into one intelligent dashboard, we help pharmacies stay compliant, improve profitability, reduce operational risks, and make smarter decisions with confidence.",
      "Our goal is simple: to be the trusted technology partner that helps independent pharmacies work smarter, grow faster, and focus more on patient care.",
    ],
    img: vandm1,
    imgAlt: "PrimeTek vision",
    flip: false,
  },
  {
    number: "02",
    title: "OUR MISSION",
    paragraphs: [
      "At Primetek Services, our mission is to help independent pharmacies run smarter with AI-powered technology. We simplify compliance, automate reporting, uncover revenue opportunities, and deliver clear insights—all from one intelligent platform.",
      "By handling the complexity behind the scenes, we give pharmacy owners more time to focus on their patients, grow their business, and make confident decisions. We do the analysis, so you can focus on what matters most.",
    ],
    tagline: "We do the analysis. You make the decisions.",
    img: vandm5,
    imgAlt: "PrimeTek mission",
    flip: true,
  },
  {
    number: "03",
    title: "OUR CORE PURPOSE",
    paragraphs: [
      "Simplify. Protect. Grow.",
    ],
    bullets: [
      "We simplify pharmacy operations by eliminating fragmented systems.",
      "We protect pharmacies through proactive compliance monitoring, revenue intelligence, and early risk detection.",
      "We help pharmacies grow by turning operational data into business intelligence that drives smarter decisions and higher profitability.",
    ],
    img: vandm3,
    imgAlt: "PrimeTek core purpose",
    flip: false,
  },
  {
    number: "04",
    title: "THE PRIMETEK PROMISE",
    paragraphs: [
      "We believe pharmacy owners should spend their time leading their business—not chasing reports, logging into multiple websites, or trying to interpret complex PBM data.",
      "Primetek works behind the scenes every day—collecting data, monitoring compliance, analyzing financial performance, and delivering clear recommendations—so pharmacy owners can focus on expanding clinical services, strengthening patient relationships, increasing revenue, and building the future of their pharmacy.",
    ],
    tagline: "One Platform. One Login. Complete Operational Intelligence.",
    img: vandm4,
    imgAlt: "PrimeTek promise",
    flip: true,
    isLast: true,
  },
];

export const OurJourney = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll(".jrow").forEach((row) => {
        const isFlipped = row.classList.contains("flipped");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.from(row.querySelector(".jrow-content"), {
          opacity: 0,
          x: isFlipped ? 30 : -30,
          duration: 0.7,
          ease: "power3.out",
        });

        tl.from(
          row.querySelector(".jrow-img-container"),
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex flex-col gap-20 overflow-hidden bg-transparent py-12">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`jrow ${step.flip ? "flipped" : ""} relative flex min-h-[340px] flex-col items-stretch lg:flex-row ${
            step.flip ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="jrow-text relative z-10 flex w-full flex-row items-center px-8 py-16 md:px-14 xl:px-20 lg:w-1/2">
            <div className="jrow-content flex flex-1 flex-col justify-center">
              <h2 className="mb-6 font-display text-3xl font-bold uppercase leading-none tracking-tight text-ink md:text-4xl lg:text-5xl xl:text-6xl">
                {step.title}
              </h2>

              <div className="max-w-none space-y-4 text-base leading-relaxed text-ink-muted md:text-lg lg:text-xl">
                {step.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}

                {step.bullets && (
                  <ul className="list-disc space-y-2 pl-5">
                    {step.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 40)}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {step.closing?.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              {step.tagline && (
                <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-accent md:text-base">
                  {step.tagline}
                </p>
              )}

              {step.isLast && (
                <div className="mt-12 pt-6">
                  <span className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
                    We Are PrimeTek
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="jrow-img-container relative min-h-[550px] w-full overflow-hidden lg:w-1/2">
            <div
              className="absolute inset-0 h-full w-full"
              style={{
                maskImage: [
                  step.flip
                    ? "linear-gradient(to right, transparent 0%, black 10%, black 48%, transparent 100%)"
                    : "linear-gradient(to left, transparent 0%, black 10%, black 48%, transparent 100%)",
                  "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                ].join(", "),
                WebkitMaskImage: [
                  step.flip
                    ? "linear-gradient(to right, transparent 0%, black 10%, black 48%, transparent 100%)"
                    : "linear-gradient(to left, transparent 0%, black 10%, black 48%, transparent 100%)",
                  "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                ].join(", "),
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              <Image
                src={step.img}
                alt={step.imgAlt}
                fill
                priority
                className="object-cover opacity-90 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
