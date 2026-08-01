"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Compass, Award, Heart, ShieldCheck, Sparkles, ArrowRight,
  Globe2, Plane, BadgeCheck, Clock, Users, Headphones, MapPin,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { domesticDestinations, internationalDestinations } from "@/data/destinations";

export function AboutContent() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <ServicesSection />
      <WhyUsSection />
      <TimelineSection />
      <EnquiryForm />
    </>
  );
}

// ═══════════════════════════════════════════════════
// 1. HERO — Travel SVGs floating + scroll animations
// ═══════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const planeX = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const compassRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 pt-32 pb-20 text-cream">
      {/* Decorative orbs */}
      <div aria-hidden className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-terra-500/20 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-terra-400/15 blur-3xl" />

      {/* Grid pattern */}
      <div aria-hidden className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Flying plane (scroll-driven) */}
      <motion.div style={{ x: planeX }} className="absolute top-16 left-[10%] pointer-events-none opacity-30" aria-hidden>
        <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
          <path d="M29 16 L18 18 L15 29 L13 19 L3 16 L13 13 L15 3 L18 14 Z" fill="#7CC242" />
        </svg>
      </motion.div>

      {/* Rotating compass top-right */}
      <motion.div style={{ rotate: compassRotate }} className="absolute top-24 right-12 lg:right-24 opacity-25 pointer-events-none hidden md:block" aria-hidden>
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" stroke="#7CC242" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="38" stroke="#7CC242" strokeWidth="1" fill="none" />
          <path d="M50 8 L55 50 L50 92 L45 50 Z" fill="#7CC242" />
          <circle cx="50" cy="50" r="4" fill="#fff" />
        </svg>
      </motion.div>

      {/* Dotted arc */}
      <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        <motion.path
          d="M-50,300 Q 360,150 720,300 T 1490,250"
          stroke="#7CC242"
          strokeWidth="2"
          strokeDasharray="4 12"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </svg>

      <div className="container relative z-10 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-terra-200">
            <Sparkles className="h-3 w-3" /> About AiS
          </span>
          <h1 className="mt-5 font-display text-display-sm md:text-display-md font-medium leading-[1.02]">
            We craft journeys, events &amp; <br className="hidden sm:block" />
            weddings with the <em className="italic text-terra-300">care of a family.</em>
          </h1>
          <p className="mt-6 max-w-xl text-cream/75 leading-relaxed text-base lg:text-lg">
            {siteConfig.fullName} is a Delhi-based travel and lifestyle services company. For over a decade we&apos;ve
            been the trusted name behind thousands of holidays, hundreds of corporate events, and the most personal
            day of many families&apos; lives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 gap-3 text-center"
        >
          {[
            { n: "10+", l: "Years" },
            { n: "20K+", l: "Travellers" },
            { n: "500+", l: "Events" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="rounded-2xl border border-cream/15 bg-cream/8 px-3 py-5 backdrop-blur transition hover:bg-cream/15"
            >
              <div className="font-display text-3xl font-bold text-terra-200">{s.n}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-cream/65">{s.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave bottom */}
      <svg aria-hidden className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 50" preserveAspectRatio="none">
        <path d="M0,25 Q360,5 720,25 T1440,25 L1440,50 L0,50 Z" fill="#F7FBF6" />
      </svg>
    </section>
  );
}

// ═══════════════════════════════════════════════════
// 2. STORY — Image collage + travel decoration
// ═══════════════════════════════════════════════════
function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mainImgY = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);
  const smallImg1Y = useTransform(scrollYProgress, [0, 1], ["12%", "-20%"]);
  const smallImg2Y = useTransform(scrollYProgress, [0, 1], ["4%", "-8%"]);

  const kerala = domesticDestinations.find(d => d.slug === "kerala")?.image || "";
  const rajasthan = domesticDestinations.find(d => d.slug === "rajasthan")?.image || "";
  const dubai = internationalDestinations.find(d => d.slug === "dubai")?.image || "";

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream py-20 lg:py-28">
      {/* Decorative clouds */}
      <CloudFloat top="top-16 left-[5%]" duration={8} opacity={0.25} />
      <CloudFloat top="top-32 right-[10%]" duration={10} opacity={0.2} size={70} />

      <div aria-hidden className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-terra-500/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-teal-700/10 blur-3xl" />

      <div className="container relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">

          {/* IMAGE COLLAGE */}
          <div className="relative">
            <motion.div
              style={{ y: mainImgY }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift"
            >
              <Image src={kerala} alt="Kerala journey" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1.5 text-[11px] font-semibold text-teal-700 backdrop-blur shadow-soft">
                <MapPin className="h-3 w-3 text-terra-500" /> Kerala Backwaters
              </div>
            </motion.div>

            <motion.div
              style={{ y: smallImg1Y }}
              initial={{ opacity: 0, x: 60, rotate: 12 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute -top-6 -right-4 sm:-right-8 w-32 h-40 sm:w-44 sm:h-52 overflow-hidden rounded-2xl shadow-lift border-[5px] border-cream"
            >
              <Image src={dubai} alt="Dubai" fill sizes="200px" className="object-cover" />
            </motion.div>

            <motion.div
              style={{ y: smallImg2Y }}
              initial={{ opacity: 0, x: -60, rotate: -12 }}
              whileInView={{ opacity: 1, x: 0, rotate: -5 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="absolute -bottom-8 -left-4 sm:-left-8 w-32 h-40 sm:w-44 sm:h-52 overflow-hidden rounded-2xl shadow-lift border-[5px] border-cream"
            >
              <Image src={rajasthan} alt="Rajasthan" fill sizes="200px" className="object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring", bounce: 0.45 }}
              className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-6 z-10 hidden sm:flex flex-col items-center justify-center w-24 h-24 rounded-full bg-terra-500 text-cream shadow-lift"
            >
              <Award className="h-5 w-5 mb-0.5" />
              <div className="font-display text-xl font-bold leading-none">{siteConfig.established}</div>
              <div className="text-[8px] uppercase tracking-[0.18em] mt-0.5">Since</div>
            </motion.div>
          </div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow text-terra-600">Our story</span>
            <h2 className="mt-3 font-display text-display-md md:text-display-md font-medium text-teal-800 leading-[1.05] text-balance">
              Our story isn&apos;t grand. <br className="hidden sm:block" />
              It&apos;s <em className="italic text-terra-600">grounded.</em>
            </h2>
            <p className="mt-5 text-ink-soft leading-relaxed">
              AiS started in {siteConfig.established} with a simple frustration — most travel companies treated journeys as
              transactions. We wanted something different: one trusted partner who handles every moving piece,
              answers every late-night call, and treats your trip the way they&apos;d plan their own.
            </p>
            <p className="mt-4 text-ink-soft leading-relaxed">
              A decade later, we&apos;re still doing exactly that. Whether it&apos;s a 5-day Kashmir holiday, a 300-guest
              corporate offsite, or a multi-day destination wedding — one team, one timeline, one invoice.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Heart, title: "Personal Service", desc: "A dedicated planner for your trip. No call centres, no scripts." },
                { icon: ShieldCheck, title: "Trusted Network", desc: "Vetted partners across 50+ destinations in India and abroad." },
                { icon: Sparkles, title: "Quiet Luxury", desc: "Thoughtful upgrades, hidden gems, and zero surprises on the bill." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-terra-500/15 text-terra-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-teal-800">{title}</h3>
                    <p className="mt-0.5 text-sm text-ink-muted">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════
// 3. SERVICES — 3 verticals with bg images
// ═══════════════════════════════════════════════════
function ServicesSection() {
  const services = [
    {
      icon: Compass, title: "Holidays", href: "/holidays",
      desc: "Curated tour packages across India and the world. Bespoke or off-the-shelf.",
      image: domesticDestinations.find(d => d.slug === "kerala")?.image || "",
    },
    {
      icon: Award, title: "Events", href: "/events",
      desc: "Corporate offsites, MICE, conferences, launches and award nights.",
      image: internationalDestinations.find(d => d.slug === "dubai")?.image || "",
    },
    {
      icon: Heart, title: "Weddings", href: "/weddings",
      desc: "Destination weddings, planned end-to-end. From mehndi to vidaai.",
      image: domesticDestinations.find(d => d.slug === "rajasthan")?.image || "",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-cream-warm py-20 lg:py-28">
      {/* Floating SVG icons */}
      <FloatingIcon className="top-12 left-[5%]" delay={0} duration={7}>
        <SuitcaseSvg />
      </FloatingIcon>
      <FloatingIcon className="bottom-16 right-[8%]" delay={2} duration={8}>
        <PassportSvg />
      </FloatingIcon>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="eyebrow">Three services, one team</span>
          <h2 className="mt-3 font-display text-display-md md:text-display-md font-medium text-teal-800 text-balance">
            From holidays to head-of-state events to your <em className="italic text-terra-600">wedding day</em>.
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map(({ icon: Icon, title, href, desc, image }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={href}
                className="group relative block overflow-hidden rounded-3xl aspect-[4/5] shadow-soft transition-shadow hover:shadow-lift"
              >
                <Image src={image} alt={title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/95 via-teal-900/40 to-teal-900/10" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terra-500 text-cream shadow-lift transition group-hover:rotate-[-6deg]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-cream/80 leading-snug">{desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-terra-200 transition group-hover:gap-2.5">
                    Explore {title.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════
// 4. WHY US — 6-feature grid with icon badges
// ═══════════════════════════════════════════════════
function WhyUsSection() {
  const reasons = [
    { icon: BadgeCheck, title: "End-to-End Planning", desc: "One team for everything — from booking flights to coordinating the smallest detail." },
    { icon: Globe2, title: "50+ Destinations", desc: "Vetted on-ground partners across India and the world. We know what works." },
    { icon: ShieldCheck, title: "Transparent Pricing", desc: "Itemised quotes. No hidden costs. You see what every rupee covers." },
    { icon: Headphones, title: "24×7 Support", desc: "Real humans on call. A dedicated planner you can WhatsApp anytime." },
    { icon: Sparkles, title: "Curated, Not Mass", desc: "We turn down work that doesn't suit us. It keeps our standards intact." },
    { icon: Users, title: "Single Accountability", desc: "One number to call if anything goes off-script. We don't pass the buck." },
  ];

  return (
    <section className="relative overflow-hidden bg-cream py-20 lg:py-28">
      {/* Dotted route */}
      <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <motion.path
          d="M0,200 Q 360,80 720,200 T 1440,200"
          stroke="#175548"
          strokeWidth="2"
          strokeDasharray="4 12"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      <FloatingIcon className="top-20 right-[12%]" delay={1} duration={9}>
        <CompassSvg />
      </FloatingIcon>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="eyebrow">Why choose AiS</span>
          <h2 className="mt-3 font-display text-display-md md:text-display-md font-medium text-teal-800 text-balance">
            How we earn the <em className="italic text-terra-600">trust</em> we&apos;ve built.
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-teal-700/10 bg-cream p-6 transition-all duration-500 hover:border-terra-500/40 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-terra-500 text-cream shadow-soft transition group-hover:rotate-[-8deg]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-teal-800">{title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════
// 5. TIMELINE — Journey milestones
// ═══════════════════════════════════════════════════
function TimelineSection() {
  const milestones = [
    { year: "2014", title: "Born in Najafgarh", desc: "AiS founded with a single Delhi office and a promise of all-inclusive travel." },
    { year: "2016", title: "Going Global", desc: "First international tours — Thailand, Dubai, Singapore added to our roster." },
    { year: "2019", title: "Events Vertical", desc: "Launched corporate events division. First 100-guest offsite delivered in Goa." },
    { year: "2021", title: "Destination Weddings", desc: "Added end-to-end wedding planning. Udaipur palace becomes our first venue." },
    { year: "2024", title: "20,000 Travellers", desc: "Crossed twenty thousand satisfied travellers across India and abroad." },
    { year: "Today", title: "Still Crafting", desc: "Same family-run ethos. Bigger team. Same single point of accountability." },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-800 to-teal-900 py-20 lg:py-28 text-cream">
      <div aria-hidden className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      <div aria-hidden className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-terra-500/15 blur-3xl" />

      <FloatPlaneLoop top="top-12" delay={0} duration={20} />
      <FloatPlaneLoop top="bottom-20" delay={10} duration={22} reverse />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-terra-200">
            <Clock className="h-3 w-3" /> Our journey
          </span>
          <h2 className="mt-4 font-display text-display-md md:text-display-md font-medium">
            A decade of <em className="italic text-terra-300">memories</em> made.
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical dotted line */}
          <div aria-hidden className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-ml-px border-l-2 border-dashed border-cream/20" />

          <div className="space-y-10 md:space-y-14">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`relative flex items-start gap-5 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Year dot */}
                <span className="absolute left-4 md:left-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-terra-500 text-cream shadow-lift ring-4 ring-teal-800 z-10">
                  <Plane className="h-3.5 w-3.5" />
                </span>

                <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 text-[11px] font-bold text-terra-200 backdrop-blur">
                    {m.year}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-cream">{m.title}</h3>
                  <p className="mt-2 text-sm text-cream/70 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════
// Helper SVG components
// ═══════════════════════════════════════════════════

function FloatingIcon({ children, className, delay, duration }: {
  children: React.ReactNode; className: string; delay: number; duration: number;
}) {
  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, -18, 0], rotate: [-6, 6, -6] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
      className={`absolute pointer-events-none opacity-25 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CloudFloat({ top, duration, opacity, size = 90 }: {
  top: string; duration: number; opacity: number; size?: number;
}) {
  return (
    <motion.div
      aria-hidden
      animate={{ x: [0, 60, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute pointer-events-none ${top}`}
      style={{ opacity }}
    >
      <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none">
        <path d="M20 45 Q 10 45 10 35 Q 10 25 20 25 Q 20 15 32 15 Q 42 8 52 18 Q 65 12 72 25 Q 90 25 90 38 Q 90 50 78 50 L 25 50 Q 20 50 20 45 Z" fill="#175548" />
      </svg>
    </motion.div>
  );
}

function FloatPlaneLoop({ top, delay, duration, reverse = false }: {
  top: string; delay: number; duration: number; reverse?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ x: reverse ? "120%" : "-20%" }}
      animate={{ x: reverse ? "-20%" : "120%" }}
      transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
      className={`absolute pointer-events-none opacity-25 ${top}`}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ transform: reverse ? "scaleX(-1)" : undefined }}>
        <path d="M29 16 L18 18 L15 29 L13 19 L3 16 L13 13 L15 3 L18 14 Z" fill="#fff" />
      </svg>
    </motion.div>
  );
}

function SuitcaseSvg() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="14" width="32" height="26" rx="3" fill="#175548" opacity="0.9" />
      <rect x="8" y="14" width="32" height="4" fill="#7CC242" opacity="0.55" />
      <rect x="18" y="8" width="12" height="6" rx="1.5" stroke="#175548" strokeWidth="2.5" fill="none" />
      <line x1="24" y1="18" x2="24" y2="40" stroke="#7CC242" strokeOpacity="0.5" strokeWidth="1.5" />
    </svg>
  );
}

function PassportSvg() {
  return (
    <svg width="36" height="44" viewBox="0 0 40 48" fill="none">
      <rect x="4" y="4" width="32" height="40" rx="3" fill="#175548" opacity="0.9" />
      <circle cx="20" cy="20" r="6" stroke="#7CC242" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="20" r="2" fill="#7CC242" />
      <line x1="10" y1="34" x2="30" y2="34" stroke="#7CC242" strokeOpacity="0.6" strokeWidth="1.5" />
      <line x1="10" y1="38" x2="26" y2="38" stroke="#7CC242" strokeOpacity="0.6" strokeWidth="1.5" />
    </svg>
  );
}

function CompassSvg() {
  return (
    <svg width="56" height="56" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke="#175548" strokeWidth="2" fill="none" />
      <circle cx="30" cy="30" r="20" stroke="#175548" strokeWidth="1" fill="none" />
      <path d="M30 6 L34 30 L30 54 L26 30 Z" fill="#175548" />
      <path d="M6 30 L30 34 L54 30 L30 26 Z" fill="#175548" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill="#7CC242" />
    </svg>
  );
}