"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Star, Clock, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import type { Destination } from "@/data/destinations";
import type { Package } from "@/data/packages";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { formatPrice } from "@/lib/utils";

interface Props {
  destination: Destination;
  pkgs: Package[];
}

export function DestinationContent({ destination: d, pkgs }: Props) {
  return (
    <>
      <HeroSection d={d} />
      <IntroSection d={d} />
      {pkgs.length > 0 && <PackagesSection d={d} pkgs={pkgs} />}
      <EnquiryForm />
    </>
  );
}

// ---------- Hero with parallax ----------
function HeroSection({ d }: { d: Destination }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={ref} className="relative isolate min-h-[72vh] overflow-hidden pt-32 pb-16 bg-teal-900">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10">
        <Image src={d.image} alt={d.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/65 via-teal-900/40 to-teal-900/90" />
      </motion.div>



      <div className="container relative z-10 flex min-h-[58vh] flex-col justify-end text-cream">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 text-xs text-cream/60"
        >
          <Link href="/" className="hover:text-sand-300">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/domestic-tours" className="hover:text-sand-300">Domestic Tours</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-cream">{d.name}</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-[11px] uppercase tracking-[0.22em] text-sand-300"
        >
          {d.region}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 font-display text-display-xl font-medium text-balance"
        >
          {d.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-3 font-display text-2xl italic text-sand-300"
        >
          {d.tagline}
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {d.highlights.map((h, i) => (
            <motion.span
              key={h}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/8 px-3.5 py-1.5 text-xs text-cream backdrop-blur"
            >
              <MapPin className="h-3 w-3 text-terra-300" /> {h}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <svg aria-hidden className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path d="M0,20 Q360,0 720,20 T1440,20 L1440,40 L0,40 Z" fill="#F7FBF6" />
      </svg>
    </section>
  );
}
// ---------- Intro (redesigned: 2-col with tilted image card + facts) ----------
function IntroSection({ d }: { d: Destination }) {
  return (
    <section className="relative bg-cream py-20 lg:py-24 overflow-hidden">
      {/* Rotating compass */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -top-16 -right-16 pointer-events-none opacity-[0.05] hidden md:block"
      >
        <svg width="240" height="240" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" stroke="#175548" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="38" stroke="#175548" strokeWidth="1" fill="none" />
          <path d="M50 8 L55 50 L50 92 L45 50 Z" fill="#175548" />
        </svg>
      </motion.div>

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">

          {/* LEFT — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow">About {d.name}</p>
              <h2 className="mt-3 font-display text-display-md font-medium text-teal-700 text-balance">
                What to <em className="italic text-terra-600">expect</em>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-lg leading-relaxed text-ink-soft"
            >
              {d.description}
            </motion.p>

            {/* Extra paragraphs (agar content me hai) */}
            {d.content?.paragraphs?.map((p) => (
              <motion.p
                key={p.slice(0, 30)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-base leading-relaxed text-ink-soft"
              >
                {p}
              </motion.p>
            ))}

            {/* Bullet points */}
            {d.content?.points && (
              <motion.ul
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-5 space-y-2"
              >
                {d.content.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-terra-500" />
                    {pt}
                  </li>
                ))}
              </motion.ul>
            )}

            {/* Facts table */}
            {d.content?.facts && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-6 overflow-hidden rounded-xl border border-ink/8"
              >
                {d.content.facts.map((f, i) => (
                  <div
                    key={f.label}
                    className={`flex text-sm ${i % 2 === 0 ? "bg-cream-warm/60" : "bg-cream"}`}
                  >
                    <span className="w-36 shrink-0 px-4 py-2.5 font-semibold text-teal-800">
                      {f.label}
                    </span>
                    <span className="px-4 py-2.5 text-ink-soft">{f.value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Price highlight box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-7 inline-flex items-center gap-4 rounded-2xl border-2 border-dashed border-terra-500/30 bg-terra-500/5 px-5 py-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-terra-500 text-cream">
                <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
                  <path d="M58 32 L36 36 L30 58 L26 38 L6 32 L26 26 L30 6 L36 28 Z" fill="currentColor" />
                </svg>
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">Packages start from</p>
                <p className="font-display text-2xl font-bold text-teal-700">
                  {d.priceOnRequest ? "On Request" : (
                    <>
                      {formatPrice(d.startingPrice)}
                      <span className="ml-1 text-xs font-normal text-ink-muted">/ person</span>
                    </>
                  )}
                </p>
              </div>
            </motion.div>

            {/* Quick fact chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {[
                `${d.highlights.length} key spots covered`,
                "Fully customisable",
                "Private transfers",
                "Handpicked stays",
              ].map((t) => (
                <span key={t} className="rounded-full bg-teal-700/8 px-3.5 py-1.5 text-xs font-medium text-teal-800">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — tilted image card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 4 }}
            whileInView={{ opacity: 1, x: 0, rotate: 2 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Dashed frame behind */}
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] border-2 border-dashed border-teal-700/20 -rotate-3"
            />
            <div className="relative overflow-hidden rounded-[1.8rem] shadow-lift">
              <div className="relative aspect-[4/5]">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(min-width:1024px) 40vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 via-transparent to-transparent" />
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
                <p className="text-[10px] uppercase tracking-[0.2em] text-sand-300">{d.region}</p>
                <p className="font-display text-2xl italic">{d.tagline}</p>
              </div>
            </div>

            {/* Floating stamp badge */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
              className="absolute -top-5 -right-4 flex h-20 w-20 items-center justify-center rounded-full bg-terra-500 text-cream shadow-lift"
            >
              <div className="text-center leading-tight">
                <div className="text-[8px] uppercase tracking-wider">Explore</div>
                <div className="font-display text-sm font-bold">{d.name.split(" ")[0]}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------- Packages ----------
function PackagesSection({ d, pkgs }: { d: Destination; pkgs: Package[] }) {
  return (
    <section className="relative bg-cream-warm py-20 overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-end justify-between gap-6"
        >
          <div>
            <p className="eyebrow inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Available packages
            </p>
            <h2 className="mt-3 font-display text-display-md font-medium text-teal-700">
              {d.name} itineraries
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pkgs.map((pkg, i) => (
            <motion.article
              key={pkg.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden rounded-2xl bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <Link href={`/packages/${pkg.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {pkg.discount && (
                  <div className="absolute left-3 top-3 badge-discount">{pkg.discount}% OFF</div>
                )}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-cream/95 px-2.5 py-1 text-[11px] font-semibold text-ink">
                  <Star className="h-3 w-3 fill-terra-500 text-terra-500" /> {pkg.rating}
                </div>
              </Link>

              <div className="p-5">
                <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  <Clock className="h-3 w-3" /> {pkg.duration}
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-teal-700 transition-colors">
                  {pkg.title}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
                  <MapPin className="h-3 w-3 text-terra-500" /> {pkg.cities.join(" - ")}
                </p>
                <div className="mt-4 flex items-end justify-between border-t border-ink/8 pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">From</p>
                    <p className="font-display text-xl font-semibold text-teal-700">
                      {pkg.priceOnRequest ? "On Request" : formatPrice(pkg.price)}
                    </p>
                  </div>
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-cream transition group-hover:bg-terra-500"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}