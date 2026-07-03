"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/src/assets/footer-logo.png";

const MIN_DISPLAY_MS = 1400;
const MAX_WAIT_MS = 5000;
const EXIT_MS = 600;
const SITE_BG = "/images/website-background.png";

function dispatchComplete(): void {
  window.dispatchEvent(new CustomEvent("preloaderComplete"));
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const progressRef = useRef(0);
  const doneRef = useRef(false);
  const runIdRef = useRef(0);

  useEffect(() => {
    const runId = ++runIdRef.current;
    const stale = () => runId !== runIdRef.current;

    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    let maxTimer: ReturnType<typeof setTimeout> | undefined;
    let rafId: number | null = null;
    const startTime = Date.now();

    document.body.style.overflow = "hidden";

    // Preload background so it paints with the preloader
    const bgPreload = new window.Image();
    bgPreload.src = SITE_BG;

    const setP = (value: number) => {
      if (stale()) return;
      progressRef.current = value;
      setProgress(value);
    };

    const animateTo = (target: number): Promise<void> =>
      new Promise((resolve) => {
        const step = () => {
          if (stale()) {
            resolve();
            return;
          }

          const current = progressRef.current;
          if (current >= target - 0.5) {
            setP(target);
            resolve();
            return;
          }

          setP(current + (target - current) * 0.1);
          rafId = requestAnimationFrame(step);
        };

        step();
      });

    const finish = () => {
      if (stale() || doneRef.current) return;
      doneRef.current = true;

      if (rafId !== null) cancelAnimationFrame(rafId);
      setP(100);
      setExiting(true);

      exitTimer = setTimeout(() => {
        if (stale()) return;
        setVisible(false);
        document.body.style.overflow = "";
        dispatchComplete();
      }, EXIT_MS);
    };

    const run = async () => {
      await animateTo(10);
      if (stale()) return;

      await animateTo(35);
      if (stale()) return;

      try {
        await Promise.race([
          document.fonts?.ready ?? Promise.resolve(),
          new Promise<void>((r) => setTimeout(r, 600)),
        ]);
      } catch {
        /* ignore */
      }

      if (stale()) return;
      await animateTo(60);
      if (stale()) return;

      await new Promise<void>((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r())),
      );

      if (stale()) return;
      await animateTo(85);
      if (stale()) return;
      await animateTo(100);

      if (stale()) return;

      const elapsed = Date.now() - startTime;
      finishTimer = setTimeout(finish, Math.max(0, MIN_DISPLAY_MS - elapsed));
    };

    maxTimer = setTimeout(finish, MAX_WAIT_MS);
    void run();

    return () => {
      runIdRef.current++;
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      clearTimeout(maxTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      data-loading-screen="true"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{
        pointerEvents: exiting ? "none" : "auto",
        opacity: exiting ? 0 : 1,
        transition: `opacity ${EXIT_MS}ms ease-out`,
      }}
    >
      {/* Site background image — img ensures it loads during preloader */}
      <div aria-hidden className="absolute inset-0 overflow-hidden bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SITE_BG}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Light white wash — keeps bg visible like the rest of the site */}
        <div className="absolute inset-0 bg-white/45" />
      </div>

      {/* Logo fill animation */}
      <div className="relative z-10 w-[600px] max-w-[80vw]">
        <Image
          src={logo}
          alt=""
          aria-hidden
          width={800}
          height={400}
          className="block h-auto w-full opacity-[0.18]"
          priority
        />

        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `linear-gradient(to right, black ${progress}%, transparent ${Math.min(progress + 2, 100)}%)`,
            maskImage: `linear-gradient(to right, black ${progress}%, transparent ${Math.min(progress + 2, 100)}%)`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <Image
            src={logo}
            alt="PrimeTek"
            width={800}
            height={400}
            className="block h-auto w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
