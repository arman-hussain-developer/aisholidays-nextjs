"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { domesticDestinations } from "@/data/destinations";
import { formatPrice } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DomesticToursContent() {
  return (
    <>
      <HeroSection />
      <DestinationsEditorial />
      <BottomCta />
    </>
  );
}

// ---------- HERO with marquee ----------

function HeroSection() {
  const names = domesticDestinations.map((d) => d.name);

  return (
    <section className="relative overflow-hidden bg-teal-900 pt-32 pb-0">
      {/* Drifting clouds */}
      <Cloud className="top-24 w-32 opacity-10" duration={38} delay={0} />
      <Cloud className="top-44 w-24 opacity-[0.07]" duration={50} delay={10} />

      {/* Plane */}
      <motion.div
        aria-hidden
        initial={{ x: "-10vw", y: 20 }}
        animate={{ x: "110vw", y: -30 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute top-28 pointer-events-none opacity-20"
      >
        <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
          <path d="M58 32 L36 36 L30 58 L26 38 L6 32 L26 26 L30 6 L36 28 Z" fill="#F7FBF6" />
        </svg>
      </motion.div>

      <div className="container relative z-10 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-sand-300"
        >
          <Sparkles className="h-3.5 w-3.5" /> Discover India
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-display-lg lg:text-display-xl font-medium text-cream text-balance max-w-3xl leading-[1.02]"
        >
          One country.
          <br />
          <em className="italic text-sand-300">A thousand journeys.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-5 max-w-xl text-cream/70"
        >
          Destinations curated by people who have walked the road first.
          Scroll down and find your kind of India.
        </motion.p>
      </div>

      {/* Marquee strip */}
      <div className="relative border-t border-cream/10 bg-teal-800/40 py-4 overflow-hidden">
        <motion.div
          aria-hidden
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-10 whitespace-nowrap"
        >
          {[...names, ...names].map((n, i) => (
            <span
              key={`${n}-${i}`}
              className="flex items-center gap-10 font-display text-xl italic text-cream/40"
            >
              {n}
              <span className="h-1.5 w-1.5 rounded-full bg-terra-500/60" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------- EDITORIAL LIST with GSAP ScrollTrigger ----------

function DestinationsEditorial() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".dest-row");

      rows.forEach((row) => {
        const img = row.querySelector(".dest-img");
        const num = row.querySelector(".dest-num");
        const content = row.querySelector(".dest-content");

        // Image parallax (scrub)
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Ghost number slides in (scrub)
        if (num) {
          gsap.fromTo(
            num,
            { xPercent: -20, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
                end: "top 45%",
                scrub: true,
              },
            }
          );
        }

        // Content reveal (one-shot)
        if (content) {
          gsap.from(content, {
            opacity: 0,
            y: 50,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-cream py-16 lg:py-24 overflow-hidden">
      {/* Center dotted line (desktop) */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 bottom-0 hidden lg:block w-px border-l-2 border-dashed border-teal-700/10"
      />

      <div className="container relative z-10 space-y-20 lg:space-y-28">
        {domesticDestinations.map((d, i) => {
          const even = i % 2 === 0;
          return (
            <article
              key={d.slug}
              className={`dest-row relative grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${even ? "" : "lg:[direction:rtl]"
                }`}
            >
              {/* Ghost number */}
              <span
                aria-hidden
                className="dest-num pointer-events-none absolute -top-10 left-0 font-display text-[7rem] lg:text-[11rem] font-bold leading-none text-teal-700/8 select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* IMAGE side */}
              <Link
                href={`/domestic-tours/${d.slug}`}
                className="group relative block overflow-hidden rounded-[2rem] [direction:ltr]"
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem]">
                  {/* taller wrapper for parallax space */}
                  <div className="dest-img absolute inset-0 -top-[12%] -bottom-[12%]">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="(min-width:1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />

                  {/* Region chip */}
                  <div className="absolute left-5 top-5 rounded-full bg-cream/15 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cream backdrop-blur-md">
                    {d.region}
                  </div>

                  {/* Hover arrow */}
                  <span className="absolute right-5 bottom-5 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-teal-700 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>

              {/* CONTENT side */}
              <div className="dest-content [direction:ltr]">
                <p className="font-display text-sm italic text-terra-600">{d.tagline}</p>
                <h2 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-ink">
                  <Link href={`/domestic-tours/${d.slug}`} className="hover:text-teal-700 transition-colors">
                    {d.name}
                  </Link>
                </h2>
                <p className="mt-4 max-w-md text-sm lg:text-base leading-relaxed text-ink-muted">
                  {d.description}
                </p>

                {/* Highlights */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {d.highlights.slice(0, 4).map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1 rounded-full bg-teal-700/8 px-3 py-1 text-[11px] text-teal-800"
                    >
                      <MapPin className="h-3 w-3 text-terra-500" /> {h}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">Starting from</p>
                    <p className="font-display text-2xl font-semibold text-teal-700">
                      {d.priceOnRequest ? "On Request" : (
                        <>
                          {formatPrice(d.startingPrice)}
                          <span className="ml-1 text-xs font-normal text-ink-muted">/ person</span>
                        </>
                      )}
                    </p>
                    {formatPrice(d.startingPrice)}
                    <span className="ml-1 text-xs font-normal text-ink-muted">/ person</span>
                  
                </div>
                <Link
                  href={`/domestic-tours/${d.slug}`}
                  className="btn-primary !py-3 !px-6 text-sm"
                >
                  Explore packages
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            </article>
      );
        })}
    </div>
    </section >
  );
}

// ---------- Bottom CTA ----------

function BottomCta() {
  return (
    <section className="relative overflow-hidden bg-teal-900 py-16">
      <motion.div
        aria-hidden
        animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-8 top-8 pointer-events-none opacity-10 hidden md:block"
      >
        <svg width="70" height="70" viewBox="0 0 64 64" fill="none">
          <path d="M58 32 L36 36 L30 58 L26 38 L6 32 L26 26 L30 6 L36 28 Z" fill="#F7FBF6" />
        </svg>
      </motion.div>

      <div className="container relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-display-md font-medium text-cream text-balance"
        >
          Could not find your destination?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-3 max-w-md text-cream/70 text-sm"
        >
          We craft custom itineraries for every corner of India. Tell us where you want to go.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-7"
        >
          <Link href="/contact" className="btn-accent !px-8 !py-3.5">
            Plan a custom trip <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Cloud helper ----------

function Cloud({ className, duration, delay }: { className: string; duration: number; delay: number }) {
  return (
    <motion.div
      aria-hidden
      initial={{ x: "-15vw" }}
      animate={{ x: "115vw" }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      className={`absolute pointer-events-none ${className}`}
    >
      <svg viewBox="0 0 100 40" fill="#F7FBF6">
        <ellipse cx="30" cy="28" rx="22" ry="11" />
        <ellipse cx="55" cy="20" rx="26" ry="14" />
        <ellipse cx="78" cy="28" rx="18" ry="9" />
      </svg>
    </motion.div>
  );
}