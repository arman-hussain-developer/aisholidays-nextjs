"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScroll — Lenis-powered smooth scrolling with GSAP ScrollTrigger sync.
 * Wraps all client-side scroll behavior with momentum-based smoothing.
 * Auto-syncs with GSAP timelines so scroll-driven animations stay in step.
 *
 * Disabled on mobile (≤ 768px) for native feel & performance.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip on small screens — native scroll feels better on touch
    if (window.matchMedia("(max-width: 768px)").matches) return;

    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}
