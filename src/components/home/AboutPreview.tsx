"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Plane, Compass, MapPin, Users, Award, Heart, Globe2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { domesticDestinations, internationalDestinations } from "@/data/destinations";

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-driven values
  const mainImgY = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);
  const smallImg1Y = useTransform(scrollYProgress, [0, 1], ["10%", "-18%"]);
  const smallImg2Y = useTransform(scrollYProgress, [0, 1], ["2%", "-6%"]);

  const kerala = domesticDestinations.find(d => d.slug === "kerala")?.image || "";
  const rajasthan = domesticDestinations.find(d => d.slug === "rajasthan")?.image || "";
  const dubai = internationalDestinations.find(d => d.slug === "dubai")?.image || "";

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-cream via-cream-warm to-cream py-12 lg:py-16">
      {/* ── Decorative blurred orbs ── */}
      <div aria-hidden className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-terra-500/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-teal-700/8 blur-3xl" />

      <div className="container relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">

          {/* ── LEFT: Image collage ── */}
          <div className="relative">
            {/* Main image with scroll parallax */}
            <motion.div
              style={{ y: mainImgY }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift"
            >
              <Image
                src={kerala}
                alt="AiS Kerala journey"
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/35 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-cream/95 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-teal-700 shadow-soft">
                <MapPin className="h-3 w-3 text-terra-500" />
                Kerala Backwaters
              </div>
            </motion.div>

            {/* Small image — top right overlap */}
            <motion.div
              style={{ y: smallImg1Y }}
              initial={{ opacity: 0, x: 60, rotate: 12 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-3 -right-2 sm:-right-4 w-28 h-36 sm:w-36 sm:h-44 overflow-hidden rounded-xl shadow-lift border-4 border-cream"
            >
              <Image src={dubai} alt="Dubai" fill sizes="200px" className="object-cover" />
            </motion.div>

            {/* Small image — bottom left overlap */}
            <motion.div
              style={{ y: smallImg2Y }}
              initial={{ opacity: 0, x: -60, rotate: -12 }}
              whileInView={{ opacity: 1, x: 0, rotate: -5 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-4 -left-2 sm:-left-4 w-28 h-36 sm:w-36 sm:h-44 overflow-hidden rounded-xl shadow-lift border-4 border-cream"
            >
              <Image src={rajasthan} alt="Rajasthan" fill sizes="200px" className="object-cover" />
            </motion.div>

            {/* Floating circular "Since" badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring", bounce: 0.45 }}
              className="absolute top-1/2 -translate-y-1/2 -right-1 sm:-right-3 z-10 hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-full bg-terra-500 text-cream shadow-lift"
            >
              <Award className="h-4 w-4 mb-0.5" />
              <div className="font-display text-lg font-bold leading-none">{siteConfig.established}</div>
              <div className="text-[7px] uppercase tracking-widest mt-0.5">Since</div>
            </motion.div>
          </div>

          {/* ── RIGHT: Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-terra-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-terra-700">
              <Heart className="h-3 w-3 fill-terra-600" /> About AiS
            </span>
            <h2 className="mt-3 font-display text-xl md:text-2xl font-medium text-teal-800 text-balance leading-tight">
              Curating unique experiences. <br className="hidden sm:block" />
             Every Journey <em className="italic text-terra-600">Has a Story. We Help You Create Yours.</em>.
            </h2>
            <p className="mt-3 text-sm text-ink-soft text-justify leading-relaxed max-w-lg">
              AiS (All Inclusive Services) is a trusted travel, events and destination wedding company dedicated to creating seamless experiences across India and around the world. From carefully planned family holidays and luxury escapes to corporate events and dream weddings, every experience is designed with attention to detail, comfort and personalization.
              Our travel experts craft itineraries that go beyond sightseeing. Whether you&apos;re exploring the snow-covered valleys of Kashmir, discovering the heritage of Rajasthan, relaxing on the beaches of Bali, experiencing the modern wonders of Dubai or celebrating special moments in Thailand, Singapore or Europe, every journey is thoughtfully planned to match your interests, schedule and budget.<br></br>

Beyond holidays, AiS specializes in destination weddings, group tours, corporate travel and event management, offering complete support from planning and logistics to on-ground coordination. With a strong network of hospitality partners, local experts and trusted suppliers, we ensure a smooth and memorable experience from start to finish.
<br></br><br></br>
Over the years, thousands of travelers, families, couples and corporate clients have trusted AiS to turn their travel plans and celebrations into lasting memories. Our commitment to quality service, transparent pricing and personalized support continues to make us a preferred choice for travel and event experiences.
            </p>

            {/* Stats grid with corner icon badges */}
            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { icon: Award, n: "10+", l: "Years of Experience" },
                { icon: Globe2, n: "90+", l: "Destinations" },
                { icon: Users, n: "20K+", l: "Travellers" },
              ].map(({ icon: Icon, n, l }) => (
                <div
                  key={l}
                  className="group relative rounded-lg border border-teal-700/15 bg-cream p-3 transition-all duration-500 hover:border-terra-500/50 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="absolute -top-2 left-3 flex h-6 w-6 items-center justify-center rounded-md bg-terra-500 text-cream shadow-soft transition group-hover:rotate-[-8deg] group-hover:bg-terra-600">
                    <Icon className="h-3 w-3" />
                  </span>
                  <div className="mt-2 font-display text-2xl font-bold text-teal-700">{n}</div>
                  <div className="mt-0.5 text-[9px] uppercase tracking-wider text-ink-muted">{l}</div>
                </div>
              ))}
            </div>

            {/* Service chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { icon: Plane, label: "Holidays" },
                { icon: Compass, label: "Events" },
                { icon: Heart, label: "Weddings" },
              ].map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href={`/${label.toLowerCase()}`}
                  className="inline-flex items-center gap-1 rounded-full bg-teal-700/8 px-3 py-1 text-xs font-medium text-teal-700 transition hover:bg-terra-500 hover:text-cream"
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </Link>
              ))}
            </div>

            <Link href="/about" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-terra-600 hover:text-terra-700 group">
              <span className="border-b border-terra-600/30 pb-0.5 group-hover:border-terra-700">Read our full story</span>
              <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
