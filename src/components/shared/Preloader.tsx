"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL = 2450; // plane khatam hote hi reveal

export function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ais-preloader")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("ais-preloader", "1");
      return;
    }
    const showTimer = window.setTimeout(() => setShow(true), 0);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem("ais-preloader", "1"); // flag END pe set (StrictMode fix)
      setShow(false);
      document.body.style.overflow = "";
    }, TOTAL);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ y: "-100%", transition: { duration: 0.35, ease: [0.7, 0, 0.3, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "#175548" }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center px-6"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-medium" style={{ color: "#F7FBF6" }}>
              AiS <em className="italic" style={{ color: "#E8C547" }}>Holidays</em>
            </h1>
            <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.3em]" style={{ color: "#F7FBF6", opacity: 0.6 }}>
              Holidays · Events · Weddings
            </p>
          </motion.div>

          {/* Animation stage */}
          <div className="relative mt-10 h-32 w-full max-w-md sm:max-w-lg overflow-hidden px-6">
            {/* Ground line */}
            <div className="absolute bottom-6 left-6 right-6 h-px" style={{ background: "rgba(247,251,246,0.25)" }} />

            {/* STAGE 1 — Walker */}
            <motion.div
              initial={{ x: "-30%" }}
              animate={{ x: "420%" }}
              transition={{ duration: 0.85, ease: "linear" }}
              className="absolute bottom-6 left-0 w-24"
            >
              <WalkerSvg />
            </motion.div>

            {/* STAGE 2 — Bus */}
            <motion.div
              initial={{ x: "-40%" }}
              animate={{ x: "380%" }}
              transition={{ duration: 0.75, delay: 0.75, ease: "linear" }}
              className="absolute bottom-6 left-0 w-32"
            >
              <BusSvg />
            </motion.div>

            {/* Dashed route — plane ke saath draw hota hai */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 400 128" preserveAspectRatio="none">
              <motion.path
                d="M10,105 Q 140,100 250,55 T 400,2"
                stroke="#7CC242"
                strokeWidth="1.5"
                strokeDasharray="3 7"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 0.9, delay: 1.5, ease: "easeIn" }}
              />
            </svg>

            {/* STAGE 3 — Plane UDTA hua: route follow + scale up + tilt */}
            <motion.div
              initial={{ x: "-20%", y: 14, scale: 0.8, opacity: 0, rotate: 0 }}
              animate={{
                x: ["-20%", "120%", "300%", "480%"],
                y: [14, 0, -55, -115],
                scale: [0.8, 1, 1.25, 1.5],
                opacity: [0, 1, 1, 1],
                rotate: [0, -8, -18, -24],
              }}
              transition={{ duration: 0.9, delay: 1.5, ease: "easeIn", times: [0, 0.3, 0.7, 1] }}
              className="absolute bottom-7 left-0 w-16"
            >
              <PlaneSvg />
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="mt-8 h-0.5 w-44 sm:w-56 overflow-hidden rounded-full" style={{ background: "rgba(247,251,246,0.15)" }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.4, ease: "linear" }}
              className="h-full rounded-full"
              style={{ background: "#7CC242" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- SVG figures ----------

function WalkerSvg() {
  return (
    <svg viewBox="0 0 90 70" fill="none" className="w-full">
      <circle cx="38" cy="14" r="6" fill="#F7FBF6" />
      <rect x="33" y="22" width="10" height="22" rx="4" fill="#F7FBF6" />
      <rect x="26" y="24" width="8" height="14" rx="3" fill="#7CC242" />
      <motion.line
        x1="37" y1="44" x2="31" y2="58"
        stroke="#F7FBF6" strokeWidth="3.5" strokeLinecap="round"
        animate={{ x2: [31, 43, 31] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      <motion.line
        x1="39" y1="44" x2="45" y2="58"
        stroke="#F7FBF6" strokeWidth="3.5" strokeLinecap="round"
        animate={{ x2: [45, 33, 45] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      <line x1="42" y1="28" x2="56" y2="40" stroke="#F7FBF6" strokeWidth="3" strokeLinecap="round" />
      <rect x="54" y="38" width="14" height="18" rx="3" fill="#E8C547" />
      <motion.circle
        cx="61" cy="59" r="3.5" fill="#F7FBF6"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function BusSvg() {
  return (
    <svg viewBox="0 0 120 60" fill="none" className="w-full">
      <line x1="2" y1="22" x2="16" y2="22" stroke="#F7FBF6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="0" y1="32" x2="12" y2="32" stroke="#F7FBF6" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
      <rect x="22" y="12" width="88" height="32" rx="7" fill="#7CC242" />
      <rect x="30" y="18" width="16" height="11" rx="2" fill="#F7FBF6" />
      <rect x="52" y="18" width="16" height="11" rx="2" fill="#F7FBF6" />
      <rect x="74" y="18" width="16" height="11" rx="2" fill="#F7FBF6" />
      <rect x="22" y="34" width="88" height="4" fill="#E8C547" />
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }} style={{ originX: "42px", originY: "48px" }}>
        <circle cx="42" cy="48" r="7" fill="#F7FBF6" />
        <line x1="42" y1="42" x2="42" y2="54" stroke="#175548" strokeWidth="1.5" />
      </motion.g>
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }} style={{ originX: "90px", originY: "48px" }}>
        <circle cx="90" cy="48" r="7" fill="#F7FBF6" />
        <line x1="90" y1="42" x2="90" y2="54" stroke="#175548" strokeWidth="1.5" />
      </motion.g>
    </svg>
  );
}

function PlaneSvg() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full">
      <path d="M58 32 L36 36 L30 58 L26 38 L6 32 L26 26 L30 6 L36 28 Z" fill="#F7FBF6" />
      <circle cx="32" cy="32" r="3" fill="#E8C547" />
    </svg>
  );
}
