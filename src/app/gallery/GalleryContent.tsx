"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, MapPin } from "lucide-react";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";

// ---------- Build gallery from existing data (no new images needed) ----------

type GalleryItem = {
  src: string;
  title: string;
  sub: string;
  cat: "domestic" | "international";
};

function buildItems(): GalleryItem[] {
  const seen = new Set<string>();
  const items: GalleryItem[] = [];

  destinations.forEach((d) => {
    if (!seen.has(d.image)) {
      seen.add(d.image);
      items.push({ src: d.image, title: d.name, sub: d.region, cat: d.type });
    }
  });
  packages.forEach((p) => {
    if (!seen.has(p.image)) {
      seen.add(p.image);
      items.push({ src: p.image, title: p.destinationName, sub: p.duration, cat: p.category });
    }
  });
  return items;
}

const ALL_ITEMS = buildItems();

const FILTERS = [
  { k: "all", l: "All Moments" },
  { k: "domestic", l: "India" },
  { k: "international", l: "International" },
] as const;

type FilterKey = (typeof FILTERS)[number]["k"];

// Varied aspect ratios for masonry rhythm
const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/2]", "aspect-[4/5]", "aspect-square"];

export function GalleryContent() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = filter === "all" ? ALL_ITEMS : ALL_ITEMS.filter((i) => i.cat === filter);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % items.length));
  }, [items.length]);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  }, [items.length]);

  // Keyboard nav
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, next, prev]);

  // Scroll lock when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-teal-900 pt-32 pb-16">
        <motion.div
          aria-hidden
          initial={{ x: "-10vw" }}
          animate={{ x: "110vw" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-24 pointer-events-none opacity-15"
        >
          <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
            <path d="M58 32 L36 36 L30 58 L26 38 L6 32 L26 26 L30 6 L36 28 Z" fill="#F7FBF6" />
          </svg>
        </motion.div>

        <div className="container relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-sand-300"
          >
            <Camera className="h-3.5 w-3.5" /> Travel Gallery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-display-lg font-medium text-cream text-balance"
          >
            Moments from <em className="italic text-sand-300">the road.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-4 max-w-xl text-cream/70"
          >
            Valleys, beaches, skylines and celebrations - captured across our journeys.
            Click any photo to view it full screen.
          </motion.p>
        </div>
      </section>

      {/* ---------- FILTERS + MASONRY ---------- */}
      <section className="bg-cream py-12 lg:py-16">
        <div className="container">

          {/* Filter tabs */}
          <div className="mb-8 inline-flex rounded-full bg-cream-warm p-1.5 shadow-soft">
            {FILTERS.map(({ k, l }) => (
              <button
                key={k}
                onClick={() => { setFilter(k); setLightbox(null); }}
                className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                  filter === k ? "text-cream" : "text-ink-muted hover:text-teal-700"
                }`}
              >
                {filter === k && (
                  <motion.span
                    layoutId="gallery-tab"
                    className="absolute inset-0 rounded-full bg-teal-700"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {items.map((item, i) => (
              <motion.button
                key={item.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                onClick={() => setLightbox(i)}
                className={`group relative mb-4 block w-full overflow-hidden rounded-xl break-inside-avoid ${ASPECTS[i % ASPECTS.length]}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-left text-sm font-semibold text-cream">{item.title}</p>
                  <p className="flex items-center gap-1 text-left text-[11px] text-cream/75">
                    <MapPin className="h-3 w-3" /> {item.sub}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LIGHTBOX ---------- */}
      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-teal-900/95 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close gallery"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-semibold text-cream">
              {lightbox + 1} / {items.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/25"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[82vh] w-full max-w-4xl"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image
                  src={items[lightbox].src}
                  alt={items[lightbox].title}
                  fill
                  sizes="90vw"
                  priority
                  className="object-cover"
                />
              </div>
              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="font-display text-xl font-semibold text-cream">
                  {items[lightbox].title}
                </p>
                <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-cream/65">
                  <MapPin className="h-3 w-3 text-terra-300" /> {items[lightbox].sub}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/25"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}