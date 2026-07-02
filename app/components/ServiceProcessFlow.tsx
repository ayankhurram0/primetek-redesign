"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const ARC_PATH = "M 52 62 Q 160 8 268 62";

const STAGE_POSITIONS = [
  { x: 52, y: 62 },
  { x: 160, y: 22 },
  { x: 268, y: 62 },
];

export type ServiceProcessFlowState = "future" | "active" | "past";

type ServiceProcessFlowProps = {
  stages: [string, string, string];
  color: string;
  /** Timeline mode — past/active/future milestone; omit for auto-cycling (services detail) */
  milestoneState?: ServiceProcessFlowState;
  className?: string;
};

/** 3-stage arc flow — dot grid panel, diamonds, animated path */
export function ServiceProcessFlow({
  stages,
  color,
  milestoneState,
  className = "",
}: ServiceProcessFlowProps) {
  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    if (milestoneState !== "active") return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, [milestoneState]);

  useEffect(() => {
    if (milestoneState !== "active") return;
    setActiveStage(1);
  }, [milestoneState]);

  useEffect(() => {
    if (milestoneState !== undefined) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, [milestoneState]);

  const pathProgress =
    milestoneState === "past"
      ? 1
      : milestoneState === "future"
        ? 0
        : activeStage === 0
          ? 0
          : activeStage === 1
            ? 0.5
            : 1;

  const dimmed = milestoneState === "future";

  return (
    <div
      className={`w-full min-h-[200px] flex items-center justify-center relative overflow-hidden rounded-2xl border border-ink/10 bg-white/75 p-6 transition-opacity duration-500 ${
        dimmed ? "opacity-45" : "opacity-100"
      } ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.28] pointer-events-none rounded-2xl"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />
      <div
        className="absolute left-5 top-[42%] w-1.5 h-1.5 rounded-full bg-white pointer-events-none"
        style={{ boxShadow: "0 0 18px 5px rgba(255,255,255,0.45)" }}
      />

      <svg
        className="w-full max-w-[340px] h-[118px] overflow-visible relative z-10"
        viewBox="0 0 320 118"
        fill="none"
      >
        <path
          d={ARC_PATH}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          d={ARC_PATH}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: pathProgress }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />

        {stages.map((label, idx) => {
          const { x, y } = STAGE_POSITIONS[idx];
          const isActive =
            milestoneState === "past"
              ? false
              : milestoneState === "future"
                ? false
                : milestoneState === "active"
                  ? activeStage === idx
                  : activeStage === idx;
          const isPast =
            milestoneState === "past"
              ? true
              : milestoneState === "future"
                ? false
                : idx < activeStage;
          const size = isActive ? 20 : 16;

          return (
            <g key={label}>
              <motion.rect
                x={x - size / 2}
                y={y - size / 2}
                width={size}
                height={size}
                rx={2}
                transform={`rotate(45 ${x} ${y})`}
                fill="#0a0f1d"
                stroke={isActive || isPast ? color : "rgba(255,255,255,0.15)"}
                strokeWidth={isActive ? 2.5 : 1.5}
                animate={
                  isActive
                    ? {
                        scale: [1, 1.08, 1],
                        filter: [
                          `drop-shadow(0 0 4px ${color}60)`,
                          `drop-shadow(0 0 14px ${color})`,
                          `drop-shadow(0 0 4px ${color}60)`,
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />

              {isPast && !isActive ? (
                <path
                  d={`M ${x - 4} ${y} L ${x - 1} ${y + 3.5} L ${x + 5} ${y - 3.5}`}
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 3.5 : 2.5}
                  fill={isActive || isPast ? color : "rgba(255,255,255,0.2)"}
                />
              )}

              <text
                x={x}
                y={98}
                textAnchor="middle"
                fill={isActive || isPast ? color : "rgba(255,255,255,0.22)"}
                fontSize="8"
                fontWeight="700"
                letterSpacing="0.12em"
              >
                {label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
