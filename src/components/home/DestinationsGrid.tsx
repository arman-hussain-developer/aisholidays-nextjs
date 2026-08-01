"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { domesticDestinations } from "@/data/destinations";
import { formatPrice } from "@/lib/utils";
import { getDestinationRoute } from "@/lib/destinationRoute";

export function DestinationsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-driven values
  const cloud1X = useTransform(scrollYProgress, [0, 1], ["-10%", "35%"]);
  const cloud2X = useTransform(scrollYProgress, [0, 1], ["20%", "-15%"]);
  const cloud3X = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const mountainY = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);
  const sunRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-cream via-cream to-cream-warm py-16 lg:py-24"
    >
      {/* ── Sun (top-right, rotates + descends on scroll) ── */}
      <motion.div
        aria-hidden
        style={{ rotate: sunRotate, y: sunY }}
        className="absolute top-10 right-6 lg:top-16 lg:right-20 pointer-events-none opacity-25"
      >
        <SunSvg />
      </motion.div>

      {/* ── Drifting clouds ── */}
      <motion.div aria-hidden style={{ x: cloud1X }} className="absolute top-24 left-[4%] pointer-events-none opacity-50">
        <CloudSvg width={70} />
      </motion.div>
      <motion.div aria-hidden style={{ x: cloud2X }} className="absolute top-40 right-[18%] pointer-events-none opacity-40 hidden md:block">
        <CloudSvg width={90} />
      </motion.div>
      <motion.div aria-hidden style={{ x: cloud3X }} className="absolute top-72 left-[35%] pointer-events-none opacity-35 hidden lg:block">
        <CloudSvg width={60} />
      </motion.div>

      {/* ── Birds flying loop ── */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 120, 0], y: [0, -12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-14 left-[42%] pointer-events-none opacity-45 hidden md:block"
      >
        <svg width="70" height="30" viewBox="0 0 70 30" fill="none">
          <path d="M5 18 Q 10 10 15 18 Q 20 10 25 18" stroke="#175548" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M38 14 Q 43 6 48 14 Q 53 6 58 14" stroke="#175548" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

      {/* ── Dotted route arc through middle ── */}
      <svg
        aria-hidden
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full pointer-events-none opacity-[0.12]"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,100 Q 360,30 720,100 T 1440,100"
          stroke="#175548"
          strokeWidth="2.5"
          strokeDasharray="4 14"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </svg>

      {/* ── Mountain silhouettes (parallax) ── */}
      <motion.svg
        aria-hidden
        style={{ y: mountainY }}
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none opacity-20"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,200 L0,140 L120,80 L240,120 L360,60 L480,100 L600,40 L720,90 L840,50 L960,110 L1080,70 L1200,120 L1320,60 L1440,100 L1440,200 Z"
          fill="#175548"
        />
        <path
          d="M0,200 L0,170 L100,130 L200,150 L320,110 L420,140 L540,100 L660,130 L780,90 L900,140 L1020,110 L1140,150 L1260,120 L1380,140 L1440,130 L1440,200 Z"
          fill="#7CC242"
          opacity="0.5"
        />
      </motion.svg>

      {/* ── Trees in corners ── */}
      <motion.div
        aria-hidden
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-2 lg:left-8 pointer-events-none opacity-25 origin-bottom hidden sm:block"
      >
        <TreeSvg />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ rotate: [2, -2, 2] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 right-2 lg:right-8 pointer-events-none opacity-25 origin-bottom hidden sm:block"
      >
        <TreeSvg />
      </motion.div>

      {/* ── Blurred orbs ── */}
      <div aria-hidden className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-terra-500/12 blur-3xl" />
      <div aria-hidden className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-teal-700/10 blur-3xl" />

      {/* ── Content ── */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 lg:mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-terra-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-terra-700">
            <Sparkles className="h-3 w-3" /> Explore India
          </span>
          <h2 className="mt-4 font-display text-display-md md:text-display-lg font-medium text-teal-800">
            India&apos;s Top <em className="italic text-terra-600">Tourist</em> Destinations
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-3 h-1 rounded-full bg-gradient-to-r from-terra-500 to-terra-600"
          />
          <p className="mt-4 max-w-xl mx-auto text-ink-muted">
            Handpicked across mountains, beaches, deserts and backwaters — each crafted with care.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {domesticDestinations.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: (i % 5) * 0.08 + Math.floor(i / 5) * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl bg-cream border border-teal-700/10 shadow-soft transition-shadow duration-500 hover:shadow-lift hover:border-terra-500/40"
            >
              {/* Pin badge top-right */}
              <span className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-cream/95 text-terra-500 shadow-soft backdrop-blur transition group-hover:bg-terra-500 group-hover:text-cream group-hover:scale-110">
                <MapPin className="h-3.5 w-3.5" />
              </span>

              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(min-width:1024px) 20vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 via-teal-900/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute top-3 left-3 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-teal-700 backdrop-blur shadow-soft">
                  {d.region}
                </span>

                {/* Starting price reveals on hover */}
                {d.startingPrice && (
                  <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="inline-flex items-center gap-1 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold text-teal-700 backdrop-blur shadow-soft">
                      <span className="font-normal text-ink-muted">From</span> {formatPrice(d.startingPrice)}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-teal-800 text-center">{d.name}</h3>
                <Link
                  href={getDestinationRoute(d.slug)}
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-terra-500 px-4 py-2.5 text-xs font-semibold text-cream tracking-wide transition hover:bg-terra-600 hover:shadow-lift"
                >
                  View Packages
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Decorative SVG components ────────────────────

function SunSvg() {
  const rays = Array.from({ length: 12 });
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
      <circle cx="55" cy="55" r="22" fill="#7CC242" />
      {rays.map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 55 + Math.cos(angle) * 30;
        const y1 = 55 + Math.sin(angle) * 30;
        const x2 = 55 + Math.cos(angle) * 44;
        const y2 = 55 + Math.sin(angle) * 44;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7CC242" strokeWidth="3" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function CloudSvg({ width = 80 }: { width?: number }) {
  return (
    <svg width={width} height={width * 0.6} viewBox="0 0 100 60" fill="none">
      <path
        d="M20 45 Q 10 45 10 35 Q 10 25 20 25 Q 20 15 32 15 Q 42 8 52 18 Q 65 12 72 25 Q 90 25 90 38 Q 90 50 78 50 L 25 50 Q 20 50 20 45 Z"
        fill="#175548"
        opacity="0.45"
      />
    </svg>
  );
}

function TreeSvg() {
  return (
    <svg width="56" height="84" viewBox="0 0 60 90" fill="none">
      <rect x="26" y="60" width="8" height="30" fill="#175548" />
      <path d="M30 5 L10 35 L20 35 L5 55 L18 55 L8 75 L52 75 L42 55 L55 55 L40 35 L50 35 Z" fill="#175548" opacity="0.7" />
    </svg>
  );
}