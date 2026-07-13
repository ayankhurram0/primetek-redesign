"use client";

import React from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";

export const FEATURE_BLUE = "#2b4c8c";
export const FEATURE_TEAL = "#2dd4bf";

const CHAMFER = 28;

/** Top-left + bottom-right cut — matches the reference card shape */
function cardClipPath(c: number) {
  return `polygon(${c}px 0, 100% 0, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, 0 100%, 0 ${c}px)`;
}

function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-5 gap-[5px] ${className}`} aria-hidden>
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="h-[3px] w-[3px] rounded-full bg-[#94a3b8]/45"
        />
      ))}
    </div>
  );
}

type FeatureStepCardProps = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
};

function Ribbon({ accent }: { accent: string }) {
  const ribbonDeep =
    accent === FEATURE_TEAL
      ? "#0f766e"
      : accent === FEATURE_BLUE
        ? "#152a52"
        : `color-mix(in srgb, ${accent} 45%, #0f172a)`;
  const useExactRibbon = accent === FEATURE_BLUE;

  return (
    <div
      className="pointer-events-none absolute -left-3 bottom-2 top-2 z-20 w-[40px] transition-[filter] duration-500 group-hover:brightness-110"
      style={{ filter: "drop-shadow(4px 2px 8px rgba(15,23,42,0.3))" }}
      aria-hidden
    >
      {useExactRibbon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/feature-ribbon.png"
          alt=""
          className="h-full w-full object-fill object-left"
          draggable={false}
        />
      ) : (
        <div
          className="h-full w-full"
          style={{
            WebkitMaskImage: "url(/images/feature-ribbon.png)",
            maskImage: "url(/images/feature-ribbon.png)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
            background: `linear-gradient(
              168deg,
              ${accent} 0%,
              ${accent} 27%,
              color-mix(in srgb, ${accent} 45%, ${ribbonDeep}) 32%,
              ${ribbonDeep} 36%,
              ${ribbonDeep} 100%
            )`,
          }}
        />
      )}
    </div>
  );
}

export { Ribbon };

export function FeatureStepCard({
  id,
  title,
  description,
  icon: Icon,
  accent,
  className = "",
  active = false,
  onClick,
}: FeatureStepCardProps) {
  const clip = cardClipPath(CHAMFER);
  const interactive = typeof onClick === "function";

  const content = (
    <div className="relative z-[2] flex flex-col px-5 pb-5 pl-12 pt-5">
      <DotGrid className="absolute right-5 top-5" />

      <div className="mb-5">
        <span
          className="mb-1.5 block text-[1.9rem] font-bold leading-none tracking-tight"
          style={{ color: accent }}
        >
          {id}
        </span>
        <div className="h-[2.5px] w-7" style={{ backgroundColor: accent }} />
      </div>

      <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#eef2f7] bg-white shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
        <Icon className="h-8 w-8" style={{ color: accent }} strokeWidth={1.5} />
      </div>

      <h3 className="mb-1.5 font-display text-[1.55rem] font-bold leading-snug text-[#0f172a]">
        {title}
      </h3>
      <div className="mb-3 h-[2.5px] w-8" style={{ backgroundColor: accent }} />

      <p className="mb-6 text-[1.15rem] font-normal leading-[1.55] text-[#64748b]">
        {description}
      </p>

      <div className="flex justify-end">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-all duration-500 ease-out group-hover:rotate-12 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white ${
            active
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[#d5dee8] text-[var(--accent)]"
          }`}
        >
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
      </div>
    </div>
  );

  return (
    <div
      className={`why-step-card group relative transition-[filter,transform] duration-500 ease-out hover:-translate-y-2 ${className}`}
      style={{
        filter: active
          ? `drop-shadow(0 8px 20px rgba(15,23,42,0.06)) drop-shadow(0 14px 36px ${accent}33)`
          : "drop-shadow(0 10px 24px rgba(15,23,42,0.05)) drop-shadow(0 18px 48px rgba(15,23,42,0.08))",
      }}
    >
      {/* Ribbon sits on the OUTER left edge (wrap-from-outside), not inset in the card */}
      <Ribbon accent={accent} />

      {interactive ? (
        <button
          type="button"
          onClick={onClick}
          className="relative flex w-full flex-col bg-white text-left"
          style={{
            ["--accent" as string]: accent,
            clipPath: clip,
            borderRadius: "0 1.25rem 0 1.25rem",
          }}
        >
          {content}
        </button>
      ) : (
        <article
          className="relative flex flex-col bg-white"
          style={{
            ["--accent" as string]: accent,
            clipPath: clip,
            borderRadius: "0 1.25rem 0 1.25rem",
          }}
        >
          {content}
        </article>
      )}
    </div>
  );
}
