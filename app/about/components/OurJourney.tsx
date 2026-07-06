"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import vandm1 from "@/src/assets/vandm1.png";
import vandm5 from "@/src/assets/vandm5.png";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "OUR VISION",
    paragraphs: [
      "Our vision is to become the leading AI-powered operational intelligence platform for independent pharmacies across the United States.",
      "We envision a future where pharmacy owners no longer need to log into multiple PBM portals, manufacturer websites, compliance systems, or reporting platforms. Instead, every critical piece of operational intelligence is centralized, simplified, and presented in one secure dashboard.",
      "Through intelligent automation, predictive analytics, and seamless integrations, we empower pharmacies to:",
    ],
    bullets: [
      "Maintain continuous compliance with PBMs, CMS, and regulatory requirements.",
      "Maximize reimbursements and profitability.",
      "Detect operational risks before they become financial losses.",
      "Make faster, data-driven business decisions.",
      "Spend less time managing reports and more time growing their business and caring for patients.",
    ],
    closing: [
      "Our vision is not just to build software.",
      "Our vision is to become the operational intelligence partner that helps every independent pharmacy operate smarter, remain compliant, and thrive in an increasingly complex healthcare environment.",
    ],
    img: vandm1,
    imgAlt: "PrimeTek vision",
    flip: false,
  },
  {
    number: "02",
    title: "OUR MISSION",
    paragraphs: [
      "At Primetek Services, our mission is to transform the independent pharmacy industry by bringing every critical operational function into one intelligent platform.",
      "We leverage artificial intelligence, advanced analytics, and pharmacy expertise to automate reporting, simplify compliance, uncover hidden revenue opportunities, and provide pharmacy owners with clear, actionable insights.",
      "Our goal is simple: give pharmacy owners their time back.",
      "Instead of spending hours reviewing reports, managing multiple portals, tracking reimbursements, or worrying about compliance, pharmacy owners can rely on Primetek to monitor their business continuously while they focus on what matters most—serving patients, growing their business, and improving profitability.",
    ],
    tagline: "We do the analysis. You make the decisions.",
    img: vandm5,
    imgAlt: "PrimeTek mission",
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

              <div className="max-w-xl space-y-4 text-base font-light leading-relaxed text-ink-muted md:text-lg lg:text-xl">
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
                maskImage: step.flip
                  ? "linear-gradient(to right, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)"
                  : "linear-gradient(to left, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage: step.flip
                  ? "linear-gradient(to right, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)"
                  : "linear-gradient(to left, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
              }}
            >
              <div
                className="relative h-full w-full"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                }}
              >
                <Image
                  src={step.img}
                  alt={step.imgAlt}
                  fill
                  priority
                  className="scale-105 object-cover opacity-85 transition-all duration-700"
                />

                <div
                  className={`absolute inset-0 blur-[100px] ${
                    step.flip
                      ? "bg-[radial-gradient(circle_at_75%_50%,rgba(0,89,105,0.15),transparent_55%)]"
                      : "bg-[radial-gradient(circle_at_25%_50%,rgba(0,89,105,0.15),transparent_55%)]"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
