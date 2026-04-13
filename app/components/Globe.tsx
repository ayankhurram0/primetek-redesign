import React, { useEffect, useRef } from "react";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      // Remove glow/shade effect
      // const glow = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.3);
      // glow.addColorStop(0, "rgba(0,200,255,0.15)");
      // glow.addColorStop(1, "rgba(0,200,255,0)");
      // ctx.fillStyle = glow;
      // ctx.beginPath();
      // ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      // ctx.fill();

      // Sphere
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,200,255,0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Longitude lines
      ctx.strokeStyle = "rgba(0,200,255,0.2)";
      ctx.lineWidth = 1;

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + rotation;
        const x = Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(x), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Latitude lines
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
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#00e0ff";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#00e0ff";
          ctx.fill();
          ctx.shadowBlur = 0;
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