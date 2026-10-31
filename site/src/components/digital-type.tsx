"use client";

import { useEffect, useRef } from "react";

/** The real text remains in the page; the canvas only adds texture to its ink. */
export function DigitalType({ children }: { children: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const mask = document.createElement("canvas");
    const maskContext = mask.getContext("2d");
    if (!text || !canvas || !context || !maskContext) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let fontSize = 0;
    let scale = 1;
    let animation = 0;
    let lastPaint = 0;
    let lastTick = 0;
    let elapsed = 0;
    let inView = false;
    let disposed = false;

    function paint() {
      if (!context || !width || !height) return;
      context.clearRect(0, 0, width, height);

      const step = Math.max(3, fontSize * 0.062);
      const bandWidth = width * 0.32;
      const center = ((elapsed % 7) / 7) * (width + bandWidth * 2) - bandWidth;
      const tick = Math.floor(elapsed * 8);

      // A sparse halftone field, with a denser wave crossing both words.
      for (let y = step / 2; y < height; y += step) {
        for (let x = step / 2; x < width; x += step) {
          const wave = Math.sin((y / height) * 5 + elapsed) * fontSize * 0.12;
          const strength = Math.max(
            0,
            1 - Math.abs(x - center + wave) / bandWidth,
          );
          const noise =
            Math.abs(
              Math.sin(x * 12.9898 + y * 78.233 + tick * 0.37) * 43758.5453,
            ) % 1;
          if (strength < 0.08 && noise > 0.04) continue;
          context.fillStyle = `rgba(252,252,255,${0.2 + strength * 0.7})`;
          const size = step * (0.15 + strength * 0.28 + noise * 0.08);
          if (noise > 0.76) {
            context.fillRect(x - size, y - size, size * 1.6, size * 1.6);
          } else {
            context.beginPath();
            context.arc(x, y, size, 0, Math.PI * 2);
            context.fill();
          }
        }
      }

      // Tiny changing digits sit within the same moving patch of letters.
      const digitSize = Math.max(6, fontSize * 0.125);
      context.font = `500 ${digitSize}px ui-monospace, monospace`;
      context.letterSpacing = "0px";
      context.fillStyle = "rgba(252,252,255,0.86)";
      for (let row = 0; row < 6; row++) {
        for (let column = -2; column < 3; column++) {
          const x = center + column * digitSize * 1.8 + (row % 2) * digitSize;
          const y = height * 0.2 + row * digitSize * 1.1;
          if ((row + column + tick) % 3 === 0) continue;
          context.fillText(
            String(Math.abs((row * 7 + column * 3 + tick) % 10)),
            x,
            y,
          );
        }
      }

      // Keep every dot and digit inside the actual letterforms.
      context.globalCompositeOperation = "destination-in";
      context.drawImage(mask, 0, 0, width, height);
      context.globalCompositeOperation = "source-over";
    }

    function resize() {
      if (!text || !canvas || !context || !maskContext || disposed) return;
      const bounds = text.getBoundingClientRect();
      const style = getComputedStyle(text);
      width = bounds.width;
      height = bounds.height;
      fontSize = parseFloat(style.fontSize);
      scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = mask.width = Math.ceil(width * scale);
      canvas.height = mask.height = Math.ceil(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      maskContext.setTransform(scale, 0, 0, scale, 0, 0);
      maskContext.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      maskContext.letterSpacing = style.letterSpacing;
      maskContext.textBaseline = "alphabetic";
      const metrics = maskContext.measureText(children);
      const ascent = metrics.fontBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent;
      const baseline = (height - ascent - descent) / 2 + ascent;
      maskContext.fillText(children, 0, baseline);
      if (!motion.matches) paint();
    }

    function animate(timestamp: number) {
      if (lastTick) elapsed += Math.min(timestamp - lastTick, 100) / 1000;
      lastTick = timestamp;
      if (timestamp - lastPaint >= 1000 / 12) {
        paint();
        lastPaint = timestamp;
      }
      animation = requestAnimationFrame(animate);
    }

    function syncPlayback() {
      cancelAnimationFrame(animation);
      lastTick = 0;
      if (motion.matches) context?.clearRect(0, 0, width, height);
      if (!disposed && !motion.matches && inView && !document.hidden) {
        animation = requestAnimationFrame(animate);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    resizeObserver.observe(text);
    visibilityObserver.observe(text);
    motion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    void document.fonts.ready.then(resize);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(animation);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      motion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [children]);

  return (
    <span className="digital-type">
      <span ref={textRef} className="digital-type-text">
        {children}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="digital-type-noise"
      />
    </span>
  );
}
