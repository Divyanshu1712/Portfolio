'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor with a comet-style trailing chain (small, blurred,
 * faint dots dissolving into a crisp solid head).
 *
 * Performance notes:
 * - Only two React re-renders happen on state changes that are rare
 *   (visibility, hover). Position updates for every dot happen via
 *   direct DOM style writes inside a requestAnimationFrame loop, so
 *   mouse movement never triggers React re-renders.
 * - Each trailing dot "chases" the dot in front of it (a lag chain),
 *   which produces the smooth comet shape instead of discrete blips.
 */

const TRAIL_COUNT = 14; // number of trailing dots behind the head
const HEAD_SIZE = 14; // px, solid lead circle
const HEAD_SIZE_HOVER = 22;
const MAX_TRAIL_SIZE = 11; // px, size of the first (largest) trail dot
const HEAD_LAG = 0.35; // how quickly the head catches the real cursor (0-1)
const TRAIL_LAG_BASE = 0.35; // how quickly dot[0] catches the head
const TRAIL_LAG_DECAY = 0.965; // each subsequent dot lags a little more

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const headRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Mutable, non-rendering state lives in refs so mousemove never
  // triggers a React re-render.
  const target = useRef({ x: -100, y: -100 });
  const headPos = useRef({ x: -100, y: -100 });
  const trailPos = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const rafId = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    // Skip on touch devices — there's no cursor to enhance.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      const el = e.target as HTMLElement | null;
      const hovering = !!(
        el &&
        (el.tagName === 'BUTTON' ||
          el.tagName === 'A' ||
          el.closest('button') ||
          el.closest('a') ||
          el.classList.contains('cursor-pointer') ||
          el.getAttribute('role') === 'button')
      );
      if (hovering !== isHoveredRef.current) {
        isHoveredRef.current = hovering;
        setIsHovered(hovering);
      }
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    // Animation loop: chain each point toward the one ahead of it.
    const tick = () => {
      // Head chases the real cursor.
      headPos.current.x += (target.current.x - headPos.current.x) * HEAD_LAG;
      headPos.current.y += (target.current.y - headPos.current.y) * HEAD_LAG;

      if (headRef.current) {
        const size = isHoveredRef.current ? HEAD_SIZE_HOVER : HEAD_SIZE;
        headRef.current.style.width = `${size}px`;
        headRef.current.style.height = `${size}px`;
        headRef.current.style.transform = `translate3d(${headPos.current.x - size / 2
          }px, ${headPos.current.y - size / 2}px, 0)`;
      }

      // Each trail dot chases the previous one (dot 0 chases the head).
      let lag = TRAIL_LAG_BASE;
      let prevX = headPos.current.x;
      let prevY = headPos.current.y;

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const p = trailPos.current[i];
        p.x += (prevX - p.x) * lag;
        p.y += (prevY - p.y) * lag;

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        }

        prevX = p.x;
        prevY = p.y;
        lag *= TRAIL_LAG_DECAY;
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optional: hide the native cursor while the custom one is active.
  useEffect(() => {
    if (!isVisible) return;
    const prev = document.body.style.cursor;
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = prev;
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Trailing chain, rendered back-to-front so later (fainter) dots sit under earlier ones */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => {
        const ratio = 1 - i / TRAIL_COUNT; // 1 = closest to head, 0 = tail end
        const size = Math.max(2, MAX_TRAIL_SIZE * Math.pow(ratio, 1.4));
        const opacity = Math.max(0.04, Math.pow(ratio, 1.8) * 0.85);
        const blur = (1 - ratio) * 6; // sharper near head, foggier toward tail

        return (
          <div
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 rounded-full bg-primary will-change-transform"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              filter: `blur(${blur}px)`,
            }}
          />
        );
      })}

      {/* Solid lead circle */}
      <div
        ref={headRef}
        className="absolute top-0 left-0 rounded-full bg-primary will-change-transform transition-[width,height] duration-150 ease-out shadow-[0_0_12px_oklch(var(--primary)/0.8)]"
      />
    </div>
  );
}
