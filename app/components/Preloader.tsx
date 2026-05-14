"use client";

import { useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/src/assets/footer-logo.png";

const MIN_DISPLAY_MS = 500;
const MAX_WAIT_MS = 12_000;

/** Yield so React can commit the new route and client trees before we measure "ready". */
function yieldToReact(): Promise<void> {
  return new Promise((r) => setTimeout(r, 0));
}

function waitWindowLoad(): Promise<void> {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

async function waitFonts(): Promise<void> {
  try {
    if (typeof document !== "undefined" && document.fonts?.ready) {
      await document.fonts.ready;
    }
  } catch {
    /* ignore */
  }
}

/** After paint so layout from client components has settled. */
function waitNextPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

/** Brief idle slice so low-priority hydration work can run (cap so we never hang forever). */
function waitIdleCap(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      ric(() => resolve(), { timeout: ms });
    } else {
      setTimeout(resolve, Math.min(ms, 80));
    }
  });
}

function smoothProgressTo(
  target: number,
  progressRef: MutableRefObject<number>,
  setProgress: (n: number) => void,
  signal: AbortSignal,
): Promise<void> {
  return new Promise((resolve) => {
    const step = () => {
      if (signal.aborted) {
        resolve();
        return;
      }
      const cur = progressRef.current;
      if (cur >= target - 0.5) {
        progressRef.current = target;
        setProgress(target);
        resolve();
        return;
      }
      progressRef.current += (target - cur) * 0.18;
      setProgress(progressRef.current);
      requestAnimationFrame(step);
    };
    step();
  });
}

async function runReadyPipeline(
  signal: AbortSignal,
  progressRef: MutableRefObject<number>,
  setProgress: (n: number) => void,
): Promise<void> {
  if (signal.aborted) return;

  await yieldToReact();
  if (signal.aborted) return;
  await smoothProgressTo(18, progressRef, setProgress, signal);
  if (signal.aborted) return;

  await waitWindowLoad();
  if (signal.aborted) return;
  await smoothProgressTo(48, progressRef, setProgress, signal);
  if (signal.aborted) return;

  await waitFonts();
  if (signal.aborted) return;
  await smoothProgressTo(72, progressRef, setProgress, signal);
  if (signal.aborted) return;

  await waitNextPaint();
  if (signal.aborted) return;
  await smoothProgressTo(90, progressRef, setProgress, signal);
  if (signal.aborted) return;

  await waitIdleCap(200);
  if (signal.aborted) return;
  await smoothProgressTo(99, progressRef, setProgress, signal);
}

function finishProgressAndHide(
  startTime: number,
  progressRef: MutableRefObject<number>,
  setProgress: (n: number) => void,
  setIsLoading: (v: boolean) => void,
  signal: AbortSignal,
) {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

  window.setTimeout(() => {
    if (signal.aborted) return;

    const animateToComplete = () => {
      if (signal.aborted) return;
      if (progressRef.current >= 100) {
        window.setTimeout(() => {
          if (signal.aborted) return;
          setIsLoading(false);
          window.dispatchEvent(new CustomEvent("preloaderComplete"));
        }, 400);
        return;
      }

      const diff = 100 - progressRef.current;
      progressRef.current += diff * 0.14;
      setProgress(progressRef.current);

      if (progressRef.current < 99.9) {
        requestAnimationFrame(animateToComplete);
      } else {
        progressRef.current = 100;
        setProgress(100);
        window.setTimeout(() => {
          if (signal.aborted) return;
          setIsLoading(false);
          window.dispatchEvent(new CustomEvent("preloaderComplete"));
        }, 400);
      }
    };

    animateToComplete();
  }, remaining);
}

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const progressRef = useRef(0);
  const previousPathnameRef = useRef(pathname);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      abortRef.current?.abort();
      setIsLoading(true);
      setProgress(0);
      progressRef.current = 0;
    }
  }, [pathname]);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const { signal } = controller;
    const startTime = Date.now();

    let timeoutId: number | undefined;

    const run = async () => {
      try {
        await Promise.race([
          runReadyPipeline(signal, progressRef, setProgress),
          new Promise<void>((_, reject) => {
            timeoutId = window.setTimeout(
              () => reject(new Error("timeout")),
              MAX_WAIT_MS,
            );
          }),
        ]);
      } catch {
        /* hard cap elapsed — still dismiss */
      } finally {
        if (timeoutId !== undefined) {
          window.clearTimeout(timeoutId);
        }
      }

      if (signal.aborted) return;

      finishProgressAndHide(
        startTime,
        progressRef,
        setProgress,
        setIsLoading,
        signal,
      );
    };

    void run();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      controller.abort();
    };
  }, [pathname]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      data-loading-screen="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        transition: "opacity 0.8s ease-out",
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "auto" : "none",
        background: `radial-gradient(circle at top left, #005969 0%, transparent 60%), 
                     radial-gradient(circle at center right, #005969 0%, transparent 40%), 
                     radial-gradient(circle at bottom center, #06101a 15%, #02070d 60%)`,
      }}
    >

      <div
        style={{
          position: "relative",
          width: "600px",
          maxWidth: "80vw",
        }}
      >
        <Image
          src={logo}
          alt="PrimeTek"
          width={800}
          height={400}
          style={{
            opacity: 0.15,
            display: "block",
            width: "100%",
            height: "auto",
          }}
          priority
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            WebkitMaskImage: `linear-gradient(to right, black ${progress}%, transparent ${Math.min(progress + 1.5, 100)}%)`,
            maskImage: `linear-gradient(to right, black ${progress}%, transparent ${Math.min(progress + 1.5, 100)}%)`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            willChange: "mask-image",
            transition: "mask-image 0.03s linear",
          }}
        >
          <Image
            src={logo}
            alt="PrimeTek"
            width={800}
            height={400}
            style={{
              opacity: 1,
              display: "block",
              width: "100%",
              height: "auto",
            }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
