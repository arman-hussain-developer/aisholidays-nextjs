"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { domesticDestinations, internationalDestinations } from "@/data/destinations";

// Lightweight slider — auto-rotates, no text overlay (per requirement)
const slides = [
  { img: domesticDestinations.find(d => d.slug === "kashmir")?.image, label: "Kashmir" },
  { img: domesticDestinations.find(d => d.slug === "kerala")?.image, label: "Kerala" },
  { img: domesticDestinations.find(d => d.slug === "rajasthan")?.image, label: "Rajasthan" },
  { img: internationalDestinations.find(d => d.slug === "dubai")?.image, label: "Dubai" },
  { img: internationalDestinations.find(d => d.slug === "thailand")?.image, label: "Thailand" },
].filter(s => s.img) as { img: string; label: string }[];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-cream">
      {/* SLIDER — clean, no text overlay, reduced height */}
      <div className="relative h-[42vh] min-h-[280px] max-h-[520px] w-full overflow-hidden sm:h-[55vh] sm:max-h-[560px] lg:h-[64vh]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image
              src={slide.img}
              alt={slide.label}
              fill
              priority={i === 0}
              className={`object-cover ${i === active ? "animate-slow-zoom" : ""}`}
              sizes="100vw"
            />
            {/* Soft bottom gradient only — keeps image clean, no overlay text */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-teal-900/40 to-transparent" />
          </div>
        ))}

        {/* Destination chip (bottom-left, minimal) */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-cream/95 px-3 py-1.5 text-xs font-medium text-teal-800 shadow-soft backdrop-blur sm:bottom-6 sm:left-6 sm:gap-2.5 sm:px-4 sm:py-2 sm:text-sm">
          <MapPin className="h-3.5 w-3.5 text-terra-500" />
          {slides[active]?.label}
        </div>

        {/* Slider dots */}
        <div className="absolute bottom-4 right-4 flex gap-1.5 sm:bottom-6 sm:right-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-8 bg-cream" : "w-1.5 bg-cream/50 hover:bg-cream/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CONTENT BAND — text lives here, NOT on the slider */}
      <div className="container relative -mt-8 pb-3 sm:-mt-12 sm:pb-16 lg:-mt-16 lg:pb-16">
        <div className="rounded-2xl bg-cream p-3 shadow-lift sm:rounded-3xl sm:p-10 lg:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-12">
            {/* Left — headline */}
            <div className="animate-fade-up">
              <p className="eyebrow mb-3 flex items-center gap-2 text-terra-600">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-terra-500" />
                Premium Travel · Events · Weddings
              </p>
              <h1 className="font-display text-display-md font-medium text-teal-800 leading-[1.05]">
                Journeys, <em className="not-italic text-terra-600">events</em> &amp; weddings — <br className="hidden sm:block" />
                <span className="italic font-normal">all inclusive.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm text-ink-muted sm:mt-5 sm:text-base">
                From Himalayan retreats to destination weddings in Udaipur, AiS plans every detail —
                stays, flights, transfers, experiences — so you simply arrive and enjoy.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
                <Link href="#enquiry" className="btn-primary">
                  Plan your journey
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/domestic-tours" className="btn-ghost">
                  Explore destinations
                </Link>
              </div>

              {/* Quick destination pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Kashmir", "Kerala", "Manali", "Rajasthan", "Dubai", "Thailand"].map((d) => (
                  <Link
                    key={d}
                    href={`/domestic-tours/${d.toLowerCase()}`}
                    className="rounded-full border border-teal-700/15 bg-cream px-3.5 py-1.5 text-xs font-medium text-teal-700 transition hover:border-terra-500 hover:bg-terra-50 hover:text-terra-700"
                  >
                    {d}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right — stats card */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-col">
              <div className="rounded-2xl bg-teal-700 p-5 text-cream lg:p-6">
                <div className="flex items-center gap-1.5 text-sand-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <div className="mt-2 font-display text-3xl font-semibold lg:text-4xl">4.9</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-cream/70">
                  2,400+ traveller reviews
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                <Stat label="Years" value="10+" />
                <Stat label="Cities" value="50+" />
                <Stat label="Travellers" value="20K+" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream-warm p-3 text-center sm:p-4">
      <div className="font-display text-xl font-semibold text-teal-700 sm:text-2xl">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">{label}</div>
    </div>
  );
}
