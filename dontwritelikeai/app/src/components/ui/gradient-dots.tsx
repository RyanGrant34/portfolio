"use client";

import React, { useEffect, useRef } from "react";

type GridBackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  gridSize?: number;
  glowColor?: string;
  pulseSpeed?: number;
};

export function GradientDots({
  gridSize = 48,
  glowColor = "0, 255, 136",
  className,
  ...props
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Draw grid lines
      ctx.strokeStyle = `rgba(${glowColor}, 0.04)`;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw intersection dots with pulse
      for (let x = 0; x < w; x += gridSize) {
        for (let y = 0; y < h; y += gridSize) {
          const dist = Math.sqrt(
            Math.pow(x - w / 2, 2) + Math.pow(y - h / 2, 2)
          );
          const maxDist = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2));
          const wave = Math.sin(time * 0.8 - dist * 0.008) * 0.5 + 0.5;
          const falloff = 1 - dist / maxDist;
          const alpha = wave * falloff * 0.4;

          if (alpha > 0.02) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${glowColor}, ${alpha})`;
            ctx.fill();

            // Glow ring on bright dots
            if (alpha > 0.15) {
              ctx.beginPath();
              ctx.arc(x, y, 6, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${glowColor}, ${alpha * 0.1})`;
              ctx.fill();
            }
          }
        }
      }

      // Center glow
      const gradient = ctx.createRadialGradient(
        w / 2, h * 0.4, 0,
        w / 2, h * 0.4, w * 0.5
      );
      gradient.addColorStop(0, `rgba(${glowColor}, 0.06)`);
      gradient.addColorStop(0.5, `rgba(${glowColor}, 0.02)`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      time += 0.016;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [gridSize, glowColor]);

  return (
    <div className={`absolute inset-0 ${className ?? ""}`} {...props}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
