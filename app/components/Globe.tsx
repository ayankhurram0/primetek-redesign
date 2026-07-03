import React, { useEffect, useRef } from "react";

/** Matches primary FancyButton gradient + --accent-light */
const NEON = "#18E7D5";
const TEAL = "#14b8a6";
const EMERALD = "#10b981";

export default function Globe() {  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.5;

      // Neon green atmosphere (matches button glow)
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.45, cx, cy, radius * 1.2);
      glow.addColorStop(0, "rgba(24, 231, 213, 0.2)");
      glow.addColorStop(0.5, "rgba(20, 184, 166, 0.1)");
      glow.addColorStop(1, "rgba(16, 185, 129, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Sphere outline
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = TEAL;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(24, 231, 213, 0.65)";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Longitude lines
      ctx.strokeStyle = "rgba(24, 231, 213, 0.55)";
      ctx.lineWidth = 1.25;

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + rotation;
        const x = Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(x), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Latitude lines
      ctx.strokeStyle = "rgba(20, 184, 166, 0.65)";
      ctx.lineWidth = 1.25;
      for (let i = 1; i < 6; i++) {
        const y = (i / 6) * radius * 2 - radius;
        const r = Math.sqrt(radius * radius - y * y);

        ctx.beginPath();
        ctx.ellipse(cx, cy + y, r, r * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Data dots
      for (let i = 0; i < 25; i++) {
        const t = rotation * 2 + i * (Math.PI * 2 / 25);
        const lat = Math.sin(i * 1.5) * radius * 0.8;
        const r = Math.sqrt(radius * radius - lat * lat);

        const x = cx + Math.cos(t) * r;
        const y = cy + lat;

        if (Math.sin(t) > 0) {
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = NEON;
          ctx.shadowBlur = 14;
          ctx.shadowColor = "rgba(24, 231, 213, 0.95)";
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = EMERALD;
          ctx.fill();
        }
      }

      rotation += 0.005;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}