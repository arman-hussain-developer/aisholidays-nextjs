"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Tag, Sparkles, ShieldCheck, Headphones, BadgeCheck } from "lucide-react";

export function OfferBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-terra-500 via-terra-500 to-terra-600">
      {/* ─── Floating travel SVG icons ─── */}
      <FloatingIcon className="top-8 left-[5%] hidden md:block" delay={0} duration={6}>
        <SuitcaseSvg />
      </FloatingIcon>
      <FloatingIcon className="top-1/2 left-[10%] hidden lg:block" delay={1} duration={5}>
        <PalmSvg />
      </FloatingIcon>
      <FloatingIcon className="bottom-12 left-[22%] hidden md:block" delay={1.5} duration={7}>
        <CameraSvg />
      </FloatingIcon>
      <FloatingIcon className="top-14 right-[38%] hidden md:block" delay={0.5} duration={6.5}>
        <PassportSvg />
      </FloatingIcon>
      <FloatingIcon className="bottom-16 right-[42%] hidden lg:block" delay={2} duration={5.5}>
        <TicketSvg />
      </FloatingIcon>
      <FloatingIcon className="top-20 right-[8%] hidden lg:block" delay={2.5} duration={6}>
        <CompassSvg />
      </FloatingIcon>

      {/* ─── Plane flying across continuously ─── */}
      <motion.div
        initial={{ x: "-10%", y: 20 }}
        animate={{ x: "115%", y: -20 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 pointer-events-none z-[1]"
        aria-hidden
      >
        <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
          <path d="M58 32 L36 36 L30 58 L26 38 L6 32 L26 26 L30 6 L36 28 Z" fill="#fff" opacity="0.95" />
          <path d="M36 36 L30 58 L26 38 Z" fill="#175548" opacity="0.3" />
        </svg>
      </motion.div>

      {/* ─── Dotted curved trail (draws on scroll-in) ─── */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M-50,100 Q 360,260 720,140 T 1490,200"
          stroke="#fff"
          strokeWidth="2"
          strokeDasharray="3 9"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </svg>

      {/* ─── Confetti dots ─── */}
      {[...Array(22)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute h-1.5 w-1.5 rounded-full bg-cream/45"
          style={{
            top: `${(i * 11) % 95}%`,
            left: `${(i * 17) % 95}%`,
          }}
          animate={{
            y: [0, 25, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ─── Shine sweep ─── */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cream/15 to-transparent pointer-events-none skew-x-12"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
      />

      {/* ─── Dot pattern + blurred orbs ─── */}
      <div aria-hidden className="absolute inset-0 opacity-[0.09]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }} />
      <div aria-hidden className="absolute -top-10 -left-10 h-56 w-56 rounded-full bg-cream/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-teal-900/30 blur-3xl" />

      {/* ─── Content ─── */}
      <div className="container relative z-10 py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.45fr_1fr]">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-cream"
          >
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 rounded-full bg-cream/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur"
            >
              <Sparkles className="h-3 w-3 fill-cream" /> Limited Time Offer
            </motion.span>

            <h2 className="mt-5 font-display text-display-md lg:text-display-lg font-semibold leading-[1.02] text-balance">
              Go &amp; Discover. <br />
              Save big on every <em className="italic">journey</em>.
            </h2>

            <p className="mt-4 text-cream/90 max-w-md leading-relaxed">
              Up to <strong className="text-cream">20% off</strong> on handpicked domestic &amp; international tour packages — for a limited time only.
            </p>

            {/* Perks row */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                { icon: ShieldCheck, label: "Free Cancellation" },
                { icon: Headphones, label: "24×7 Support" },
                { icon: BadgeCheck, label: "Best Price Guarantee" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1.5 text-[11px] font-medium text-cream backdrop-blur">
                  <Icon className="h-3 w-3" />
                  {label}
                </div>
              ))}
            </div>

            <Link
              href="#enquiry"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-terra-700 transition-all hover:bg-teal-900 hover:text-cream shadow-lift hover:shadow-2xl hover:-translate-y-0.5 group"
            >
              Book Now
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* RIGHT: Discount badge cluster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow */}
              <div aria-hidden className="absolute inset-0 bg-cream/30 blur-3xl rounded-full scale-110" />

              {/* Rotating dashed ring */}
              <motion.svg
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)]"
                viewBox="0 0 240 240"
              >
                <circle
                  cx="120"
                  cy="120"
                  r="115"
                  stroke="#fff"
                  strokeOpacity="0.5"
                  strokeWidth="2"
                  strokeDasharray="6 10"
                  fill="none"
                />
              </motion.svg>

              {/* Main badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex flex-col items-center justify-center h-52 w-52 sm:h-56 sm:w-56 rounded-full bg-cream text-terra-600 shadow-lift"
              >
                <Tag className="h-6 w-6 mb-1" />
                <div className="font-display text-6xl sm:text-7xl font-bold leading-none">20%</div>
                <div className="text-xs uppercase tracking-[0.28em] mt-2">OFF</div>

                <Sparkles className="absolute top-7 right-8 h-4 w-4 text-terra-500 animate-pulse" />
                <Sparkles className="absolute bottom-9 left-7 h-3 w-3 text-terra-500 animate-pulse" style={{ animationDelay: "0.6s" }} />
              </motion.div>

              {/* Hurry wobble sticker */}
              <motion.div
                animate={{ rotate: [10, 16, 10] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-5 rounded-full bg-teal-800 px-4 py-1.5 text-[10px] font-bold text-cream uppercase tracking-wider shadow-lift"
              >
                Hurry!
              </motion.div>

              {/* Promo code chip */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-teal-900 px-3.5 py-1.5 text-[10px] font-bold text-cream uppercase tracking-wider whitespace-nowrap shadow-soft">
                Use code <span className="text-terra-200">AIS20</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom transition */}
      <svg
        aria-hidden
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 1440 50"
        preserveAspectRatio="none"
      >
        <path d="M0,25 Q360,5 720,25 T1440,25 L1440,50 L0,50 Z" fill="#F7FBF6" />
      </svg>
    </section>
  );
}

// ────────────────────────────────────────────────────
// Helper components
// ────────────────────────────────────────────────────

function FloatingIcon({
  children,
  className,
  delay,
  duration,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, -18, 0], rotate: [-6, 6, -6] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
      className={`absolute pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SuitcaseSvg() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="14" width="32" height="26" rx="3" fill="#fff" opacity="0.9" />
      <rect x="8" y="14" width="32" height="4" fill="#175548" opacity="0.55" />
      <rect x="18" y="8" width="12" height="6" rx="1.5" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.9" />
      <line x1="24" y1="18" x2="24" y2="40" stroke="#175548" strokeOpacity="0.4" strokeWidth="1.5" />
    </svg>
  );
}

function PalmSvg() {
  return (
    <svg width="40" height="48" viewBox="0 0 48 56" fill="none">
      <path d="M24 56 Q22 36 24 22" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <path d="M24 22 Q10 14 4 8 Q14 12 20 18 Z" fill="#fff" opacity="0.9" />
      <path d="M24 22 Q38 14 44 8 Q34 12 28 18 Z" fill="#fff" opacity="0.9" />
      <path d="M24 22 Q16 4 8 4 Q18 8 22 18 Z" fill="#fff" opacity="0.9" />
      <path d="M24 22 Q32 4 40 4 Q30 8 26 18 Z" fill="#fff" opacity="0.9" />
    </svg>
  );
}

function CameraSvg() {
  return (
    <svg width="42" height="38" viewBox="0 0 48 40" fill="none">
      <rect x="4" y="10" width="40" height="26" rx="3" fill="#fff" opacity="0.9" />
      <path d="M16 10 L18 6 L30 6 L32 10" stroke="#fff" strokeWidth="2.5" fill="#fff" opacity="0.9" />
      <circle cx="24" cy="23" r="7" stroke="#175548" strokeOpacity="0.45" strokeWidth="2" fill="none" />
      <circle cx="24" cy="23" r="3" fill="#175548" opacity="0.55" />
    </svg>
  );
}

function PassportSvg() {
  return (
    <svg width="36" height="44" viewBox="0 0 40 48" fill="none">
      <rect x="4" y="4" width="32" height="40" rx="3" fill="#fff" opacity="0.9" />
      <circle cx="20" cy="20" r="6" stroke="#175548" strokeOpacity="0.55" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="20" r="2" fill="#175548" opacity="0.55" />
      <line x1="10" y1="34" x2="30" y2="34" stroke="#175548" strokeOpacity="0.45" strokeWidth="1.5" />
      <line x1="10" y1="38" x2="26" y2="38" stroke="#175548" strokeOpacity="0.45" strokeWidth="1.5" />
    </svg>
  );
}

function TicketSvg() {
  return (
    <svg width="48" height="32" viewBox="0 0 56 36" fill="none">
      <path d="M4 8 Q4 4 8 4 L48 4 Q52 4 52 8 L52 14 Q47 14 47 18 Q47 22 52 22 L52 28 Q52 32 48 32 L8 32 Q4 32 4 28 L4 22 Q9 22 9 18 Q9 14 4 14 Z" fill="#fff" opacity="0.9" />
      <line x1="20" y1="8" x2="20" y2="28" stroke="#175548" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function CompassSvg() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke="#fff" strokeWidth="2" fill="none" opacity="0.9" />
      <path d="M20 6 L23 20 L20 34 L17 20 Z" fill="#fff" opacity="0.9" />
      <circle cx="20" cy="20" r="2" fill="#175548" opacity="0.6" />
    </svg>
  );
}