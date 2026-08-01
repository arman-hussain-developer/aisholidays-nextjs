"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { internationalDestinations } from "@/data/destinations";
import { getDestinationRoute } from "@/lib/destinationRoute";

export function InternationalSection() {
  const [thailand, dubai, singapore, nepal, hongkong] = internationalDestinations;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-800 to-teal-900 py-16 lg:py-20">
      {/* ── Lightweight grid pattern ── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── SVG flight paths + pulsing city dots ── */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M 100,200 Q 400,80 720,250 Q 1040,420 1340,250"
          stroke="#7CC242"
          strokeWidth="2"
          strokeDasharray="4 10"
          fill="none"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 1340,400 Q 1000,300 720,400 Q 440,500 100,380"
          stroke="#7CC242"
          strokeWidth="2"
          strokeDasharray="4 10"
          fill="none"
          opacity="0.35"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Pulsing city dots */}
        {[
          { cx: 100, cy: 200 },
          { cx: 400, cy: 80 },
          { cx: 720, cy: 250 },
          { cx: 1040, cy: 420 },
          { cx: 1340, cy: 250 },
          { cx: 1340, cy: 400 },
          { cx: 100, cy: 380 },
        ].map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r="5" fill="#7CC242">
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${2 + (i % 3) * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* ── Floating planes ── */}
      <FloatPlane top="top-20" delay={0} duration={22} />
      <FloatPlane top="bottom-40" delay={8} duration={26} reverse />

      {/* ── Decorative orbs ── */}
      <div aria-hidden className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-terra-500/15 blur-3xl" />
      <div aria-hidden className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-terra-400/10 blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-terra-200">
            <Globe className="h-3 w-3" /> Beyond Borders
          </span>
          <h2 className="mt-4 font-display text-display-md md:text-display-lg font-medium text-cream">
            World&apos;s Top <em className="italic text-terra-300">Tourist</em> Destinations
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-3 h-1 rounded-full bg-gradient-to-r from-terra-400 to-terra-500"
          />
          <p className="mt-4 max-w-xl mx-auto text-cream/70">
            Curated international itineraries with visa support and trusted on-ground partners.
          </p>
        </motion.div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-5 md:[grid-template-rows:240px_240px] lg:[grid-template-rows:280px_280px]">
          <BentoCard dest={thailand} delay={0} />
          <BentoCard dest={dubai} delay={0.1} span />
          <BentoCard dest={singapore} delay={0.2} />
          <BentoCard dest={nepal} delay={0.3} />
          <BentoCard dest={hongkong} delay={0.4} />
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  dest,
  span = false,
  delay,
}: {
  dest: { slug: string; name: string; region: string; image: string };
 
  span?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative aspect-[4/3] sm:aspect-[5/4] md:aspect-auto ${span ? "md:row-span-2" : ""}`}
    >
      <Link
        href={getDestinationRoute(dest.slug)}
        className="group relative block h-full w-full overflow-hidden rounded-2xl ring-1 ring-cream/10 transition-all duration-500 hover:ring-terra-400/60 hover:-translate-y-1"
      >
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          sizes={span ? "(min-width:768px) 33vw, 100vw" : "(min-width:768px) 33vw, 50vw"}
          className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/95 via-teal-900/30 to-transparent" />

        <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur transition group-hover:bg-terra-500 group-hover:scale-110">
          <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-12" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5 text-cream">
          <p className="text-[10px] uppercase tracking-[0.22em] text-terra-200">{dest.region}</p>
          <h3 className={`mt-1 font-display font-semibold ${span ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"}`}>
            {dest.name}
          </h3>
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-cream/85">
            <span className="h-1.5 w-1.5 rounded-full bg-terra-400 animate-pulse" />
            Explore packages
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FloatPlane({
  top,
  delay,
  duration,
  reverse = false,
}: {
  top: string;
  delay: number;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ x: reverse ? "120%" : "-20%" }}
      animate={{ x: reverse ? "-20%" : "120%" }}
      transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
      className={`absolute pointer-events-none opacity-25 ${top}`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        style={{ transform: reverse ? "scaleX(-1)" : undefined }}
      >
        <path d="M29 16 L18 18 L15 29 L13 19 L3 16 L13 13 L15 3 L18 14 Z" fill="#fff" />
      </svg>
    </motion.div>
  );
}