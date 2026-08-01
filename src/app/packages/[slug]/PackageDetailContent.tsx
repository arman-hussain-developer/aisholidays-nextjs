"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  MapPin, Star, Calendar, Users, Check, X, Phone,
  Plane, Hotel, Utensils, Camera, ShieldCheck, ChevronRight,
  ArrowRight, Sparkles, BadgeCheck, MessageCircle,
} from "lucide-react";
import type { Package } from "@/data/packages";
import type { Destination } from "@/data/destinations";
import { formatPrice, whatsappLink } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// ---------- Types & constants ----------

type ItineraryItem = {
  day: number;
  title: string;
  description: string;
  meals: string;
};

type TabKey = "itinerary" | "inclusions" | "info";

const TABS: { k: TabKey; l: string; icon: LucideIcon }[] = [
  { k: "itinerary", l: "Tour Itinerary", icon: Calendar },
  { k: "inclusions", l: "Inclusions", icon: Check },
  { k: "info", l: "Package Info", icon: Sparkles },
];

const EXCLUSIONS = [
  "Air/Rail fare unless specified in inclusions",
  "Personal expenses (laundry, phone calls, tips)",
  "Travel insurance & medical assistance",
  "Anything not listed in the inclusions",
  "5% GST applicable on total package cost",
  "Entry fees to monuments unless mentioned",
];

interface Props {
  pkg: Package;
  destination?: Destination;
  similar: Package[];
}

// ---------- Main component ----------

export function PackageDetailContent({ pkg, destination, similar }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("itinerary");
  const itinerary = pkg.itinerary ?? generateItinerary(pkg.cities, pkg.days);

  return (
    <>
      <HeroSection pkg={pkg} destination={destination} />

      <section className="relative bg-cream py-12 lg:py-16">
        <FloatingCompass />
        <FloatingPlane />

        <div className="container relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
            {/* LEFT */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
              >
                <InfoChip icon={Calendar} label="Duration" value={pkg.duration} />
                <InfoChip icon={MapPin} label="Cities" value={`${pkg.cities.length} stops`} />
                <InfoChip icon={Users} label="Group" value="Private / Group" />
                <InfoChip icon={Hotel} label="Stay" value="Hand-picked" />
              </motion.div>

              {/* Tabs */}
              <div className="rounded-2xl bg-cream-warm p-1.5 inline-flex shadow-soft mb-6">
                {TABS.map(({ k, l, icon: Icon }) => (
                  <button
                    key={k}
                    onClick={() => setActiveTab(k)}
                    className={`relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm font-semibold transition-all ${activeTab === k ? "text-cream" : "text-ink-muted hover:text-teal-700"
                      }`}
                  >
                    {activeTab === k && (
                      <motion.span
                        layoutId="active-tab"
                        className="absolute inset-0 rounded-xl bg-teal-700"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <Icon className="relative h-3.5 w-3.5" />
                    <span className="relative">{l}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "itinerary" && (
                  <ItineraryTab key="itinerary" items={itinerary} pkg={pkg} />
                )}
                {activeTab === "inclusions" && (
                  <InclusionsTab key="inclusions" inclusions={pkg.inclusions} />
                )}
                {activeTab === "info" && <InfoTab key="info" pkg={pkg} />}
              </AnimatePresence>

              {destination && <GallerySection destination={destination} pkg={pkg} />}

              {similar.length > 0 && <SimilarPackages packages={similar} />}
            </div>

            {/* RIGHT — Sticky sidebar */}
            <div>
              <StickySidebar pkg={pkg} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- Hero ----------

function HeroSection({ pkg, destination }: { pkg: Package; destination?: Destination }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.9]);

  return (
    <section ref={ref} className="relative h-[60vh] min-h-[460px] max-h-[640px] overflow-hidden bg-teal-900 pt-20">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <Image src={pkg.image} alt={pkg.title} fill priority sizes="100vw" className="object-cover" />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-teal-900 via-teal-900/60 to-teal-900/30"
      />

      {/* <svg aria-hidden className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <motion.path
          d="M50,250 Q 360,100 720,200 T 1390,180"
          stroke="#7CC242"
          strokeWidth="2"
          strokeDasharray="4 10"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg> */}

      <div className="container relative z-10 h-full flex flex-col justify-end pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 text-xs text-cream/70 mb-4"
        >
          <Link href="/" className="hover:text-terra-200">Home</Link>
          <ChevronRight className="h-3 w-3" />
          {destination && (
            <>
              <Link href={`/${destination.type}-tours/${destination.slug}`} className="hover:text-terra-200">
                {destination.name}
              </Link>
              <ChevronRight className="h-3 w-3" />
            </>
          )}
          <span className="text-terra-200">{pkg.title}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {pkg.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-terra-500 px-2.5 py-1 text-[10px] font-bold text-cream uppercase tracking-wider">
                <Sparkles className="h-3 w-3" /> Featured
              </span>
            )}
            {pkg.discount && (
              <span className="rounded-full bg-cream/15 px-2.5 py-1 text-[10px] font-bold text-cream uppercase tracking-wider backdrop-blur">
                {pkg.discount}% OFF
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-cream/15 px-2.5 py-1 text-[10px] font-semibold text-cream backdrop-blur">
              <Star className="h-3 w-3 fill-sand-300 text-sand-300" /> {pkg.rating} ({pkg.reviewCount})
            </span>
          </div>

          <h1 className="font-display text-display-md md:text-display-lg font-medium text-cream max-w-3xl leading-[1.05]">
            {pkg.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-cream/85 text-sm">
            {pkg.cities.map((city, i) => (
              <span key={city} className="flex items-center gap-2">
                <span className="font-medium">{city}</span>
                {i < pkg.cities.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-terra-300" />}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <svg aria-hidden className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path d="M0,20 Q360,0 720,20 T1440,20 L1440,40 L0,40 Z" fill="#F7FBF6" />
      </svg>
    </section>
  );
}

// ---------- Itinerary tab ----------

function ItineraryTab({ items, pkg }: { items: ItineraryItem[]; pkg: Package }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
    >
      <div className="rounded-2xl border border-teal-700/10 bg-cream p-6 lg:p-8 shadow-soft">
        <h2 className="font-display text-2xl font-semibold text-teal-800 mb-2">Day-by-Day Itinerary</h2>
        <p className="text-sm text-ink-muted mb-8">
          A {pkg.duration} journey through {pkg.cities.join(" - ")}.
        </p>

        <div className="relative">
          <div aria-hidden className="absolute left-5 top-2 bottom-2 w-px border-l-2 border-dashed border-terra-500/30" />

          <div className="space-y-8">
            {items.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-14"
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-terra-500 text-cream shadow-soft ring-4 ring-cream">
                  <span className="font-display text-sm font-bold">{day.day}</span>
                </span>

                <div className="rounded-xl bg-cream-warm p-5 transition hover:shadow-soft">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-terra-600">
                      Day {day.day}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-ink-muted" />
                    <span className="text-[11px] text-ink-muted">{day.meals}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-teal-800">{day.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{day.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* <div className="mt-8 rounded-xl bg-teal-700/5 p-4 text-xs text-ink-muted leading-relaxed border-l-4 border-terra-500">
          <strong className="text-teal-800">Note:</strong> This is a sample itinerary and can be fully customised
          based on your preferences, group size, and travel dates. Contact us for a personalised plan.
        </div> */}
      </div>
    </motion.div>
  );
}

// ---------- Inclusions tab ----------

function InclusionsTab({ inclusions }: { inclusions: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="grid gap-5 md:grid-cols-2"
    >
      <div className="rounded-2xl border border-terra-500/20 bg-cream p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-terra-500 text-cream">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <h3 className="font-display text-xl font-semibold text-teal-800">What is Included</h3>
        </div>
        <ul className="space-y-3">
          {inclusions.map((inc, i) => (
            <motion.li
              key={inc}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 text-sm text-ink-soft"
            >
              <Check className="h-4 w-4 mt-0.5 shrink-0 text-terra-500" strokeWidth={3} />
              {inc}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-teal-700/10 bg-cream-warm p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-muted/20 text-ink-soft">
            <X className="h-4 w-4" strokeWidth={3} />
          </span>
          <h3 className="font-display text-xl font-semibold text-teal-800">Not Included</h3>
        </div>
        <ul className="space-y-3">
          {EXCLUSIONS.map((exc, i) => (
            <motion.li
              key={exc}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 text-sm text-ink-muted"
            >
              <X className="h-4 w-4 mt-0.5 shrink-0 text-ink-muted/60" strokeWidth={3} />
              {exc}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ---------- Info tab ----------

function InfoTab({ pkg }: { pkg: Package }) {
  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Calendar, label: "Duration", value: pkg.duration },
    { icon: MapPin, label: "Cities Covered", value: pkg.cities.join(", ") },
    { icon: Hotel, label: "Accommodation", value: "Hand-picked hotels (3 / 4 star)" },
    { icon: Utensils, label: "Meals", value: "As per inclusions" },
    { icon: Plane, label: "Transport", value: "Private cab / Volvo / Flight" },
    { icon: Users, label: "Group Size", value: "Private or group (2-30 pax)" },
    { icon: ShieldCheck, label: "Best Time", value: "All seasons (check with planner)" },
    { icon: BadgeCheck, label: "Customisable", value: "Yes, fully personalised" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
    >
      <div className="rounded-2xl border border-teal-700/10 bg-cream p-6 lg:p-8 shadow-soft">
        <h3 className="font-display text-2xl font-semibold text-teal-800 mb-2">Package Information</h3>
        <p className="text-sm text-ink-muted mb-6">Everything you need to know at a glance.</p>
        {pkg.packageInfo && (
          <p className="text-sm text-ink-soft leading-relaxed mb-6">{pkg.packageInfo}</p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {facts.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-xl bg-cream-warm p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-terra-500/15 text-terra-600">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">{label}</div>
                <div className="mt-0.5 text-sm font-semibold text-teal-800">{value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {pkg.cancellationPolicy && (
          <div className="mt-8">
            <h4 className="font-display text-lg font-semibold text-teal-800 mb-3">Cancellation Policy</h4>
            <ul className="space-y-2">
              {pkg.cancellationPolicy.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ---------- Sticky sidebar ----------

function StickySidebar({ pkg }: { pkg: Package }) {
  return (

    <>
      <div className="lg:sticky lg:top-24 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border-2 border-terra-500/20 bg-cream p-6 shadow-lift"
        >
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <span className="text-xs uppercase tracking-[0.18em] text-ink-muted">Starting from</span>
            {pkg.discount && (
              <span className="rounded-full bg-terra-500/15 px-2 py-0.5 text-[10px] font-bold text-terra-700">
                SAVE {pkg.discount}%
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            {pkg.priceOnRequest ? (
              <span className="font-display text-3xl font-bold text-terra-600">On Request</span>
            ) : (
              <>
                <span className="font-display text-4xl font-bold text-teal-800">{formatPrice(pkg.price)}</span>
                {pkg.originalPrice && (
                  <span className="text-sm text-ink-muted line-through">{formatPrice(pkg.originalPrice)}</span>
                )}
              </>
            )}
          </div>
          <div className="mt-0.5 text-xs text-ink-muted">
            {pkg.priceOnRequest ? "price shared on enquiry" : "per person on twin sharing"}
          </div>


          <div className="mt-5 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-cream-warm py-2.5">
              <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">Duration</div>
              <div className="mt-0.5 text-xs font-bold text-teal-700">{pkg.duration}</div>
            </div>
            <div className="rounded-xl bg-cream-warm py-2.5">
              <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">Rating</div>
              <div className="mt-0.5 inline-flex items-center gap-1 text-xs font-bold text-teal-700">
                <Star className="h-3 w-3 fill-sand-300 text-sand-300" />
                {pkg.rating}
              </div>
            </div>
          </div>

          <Link
            href="#enquiry"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-terra-500 px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-terra-600 hover:shadow-lift"
          >
            {pkg.priceOnRequest ? "Get Quote" : "Book Now"}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={whatsappLink(`Hi, I am interested in: ${pkg.title} (${pkg.duration}${pkg.priceOnRequest ? "" : `, ${formatPrice(pkg.price)}`})`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full border-2 border-teal-700/15 px-6 py-3 text-sm font-semibold text-teal-700 transition hover:border-terra-500/40 hover:bg-teal-700/5"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl bg-teal-700 p-5 text-cream shadow-soft"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream/15 text-terra-200">
              <Phone className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-terra-200">Need help?</div>
              <a href={`tel:${siteConfig.contact.phone}`} className="block font-display text-lg font-semibold leading-tight">
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-cream/70 leading-relaxed">
            Talk to a dedicated travel planner. {siteConfig.contact.hours}.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-teal-700/10 bg-cream p-5"
        >
          {[
            { icon: ShieldCheck, label: "100% Safe and Secure Booking" },
            { icon: BadgeCheck, label: "Verified Hotel Partners" },
            { icon: Sparkles, label: "Best Price Guarantee" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 py-1.5 text-xs text-ink-soft">
              <Icon className="h-4 w-4 text-terra-500" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}

// ---------- Gallery ----------
function GallerySection({ destination, pkg }: { destination: Destination; pkg: Package }) {
  const images = pkg.gallery?.length
    ? pkg.gallery
    : [...new Set([pkg.image, destination.image])]; // fallback: duplicates hata ke

  if (images.length < 2) return null; // 1 hi image hai to gallery mat dikhao

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="mt-10"
    >
      <div className="flex items-center gap-2 mb-5">
        <Camera className="h-5 w-5 text-terra-500" />
        <h3 className="font-display text-2xl font-semibold text-teal-800">Gallery</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[160px] gap-3">
        {images.slice(0, 5).map((img, i) => (
          <div
            key={`${img}-${i}`}
            className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? "col-span-2 row-span-2" : ""
              }`}
          >
            <Image
              src={img}
              alt={`${pkg.title} photo ${i + 1}`}
              fill
              sizes="(min-width:768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-teal-900/0 group-hover:bg-teal-900/25 transition" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ---------- Similar packages ----------

function SimilarPackages({ packages }: { packages: Package[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >
      <h3 className="font-display text-2xl font-semibold text-teal-800 mb-5">You may also like</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((p) => (
          <Link key={p.slug} href={`/packages/${p.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-teal-900/5">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width:1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {p.discount && (
                <span className="absolute top-3 left-3 rounded-full bg-terra-500 px-2 py-1 text-[10px] font-bold text-cream">
                  {p.discount}% OFF
                </span>
              )}
            </div>
            <div className="pt-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">{p.duration}</p>
              <h4 className="mt-1 font-display text-base font-semibold text-teal-800 line-clamp-2 group-hover:text-terra-600 transition">
                {p.title}
              </h4>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-sm font-bold text-teal-700">
                  {p.priceOnRequest ? "On Request" : formatPrice(p.price)}
                </span>
                {p.originalPrice && (
                  <span className="text-xs text-ink-muted line-through">{formatPrice(p.originalPrice)}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

// ---------- Small helpers ----------

function InfoChip({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-cream-warm px-3 py-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-terra-500/15 text-terra-600">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0">
        <div className="text-[9px] uppercase tracking-[0.16em] text-ink-muted">{label}</div>
        <div className="text-xs font-semibold text-teal-800 truncate">{value}</div>
      </div>
    </div>
  );
}

function FloatingCompass() {
  return (
    <motion.div
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="absolute top-20 right-4 lg:right-12 pointer-events-none opacity-[0.06] hidden md:block"
    >
      <svg width="180" height="180" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" stroke="#175548" strokeWidth="2" fill="none" />
        <circle cx="50" cy="50" r="38" stroke="#175548" strokeWidth="1" fill="none" />
        <path d="M50 8 L55 50 L50 92 L45 50 Z" fill="#175548" />
        <path d="M8 50 L50 45 L92 50 L50 55 Z" fill="#175548" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

function FloatingPlane() {
  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, -20, 0], rotate: [-10, 10, -10] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/3 left-4 lg:left-8 pointer-events-none opacity-15 hidden md:block"
    >
      <svg width="80" height="80" viewBox="0 0 64 64" fill="none">
        <path d="M58 32 L36 36 L30 58 L26 38 L6 32 L26 26 L30 6 L36 28 Z" fill="#175548" />
      </svg>
    </motion.div>
  );
}

// ---------- Itinerary generator ----------

function generateItinerary(cities: string[], days: number): ItineraryItem[] {
  if (!cities.length || days < 1) return [];
  const items: ItineraryItem[] = [];

  items.push({
    day: 1,
    title: `Arrival in ${cities[0]}`,
    description: `Welcome to ${cities[0]}. On arrival at the airport or railway station, our representative will assist you with the transfer to your hotel. After check-in, freshen up and unwind. Evening is at leisure to explore the local market or rest before tomorrow.`,
    meals: "Dinner",
  });

  const middleDays = days - 2;
  if (middleDays > 0) {
    const cityCount = cities.length;
    for (let i = 0; i < middleDays; i++) {
      const cityIdx = Math.min(
        Math.floor((i / Math.max(middleDays, 1)) * cityCount),
        cityCount - 1
      );
      const prevIdx = i === 0
        ? 0
        : Math.min(
          Math.floor(((i - 1) / Math.max(middleDays, 1)) * cityCount),
          cityCount - 1
        );
      const city = cities[cityIdx];
      const isTransfer = i > 0 && cityIdx !== prevIdx;

      items.push({
        day: i + 2,
        title: isTransfer
          ? `Transfer to ${city} and local sightseeing`
          : `${city} - sightseeing and experiences`,
        description: isTransfer
          ? `After breakfast, check out and transfer to ${city} by private vehicle. Enjoy scenic views along the way. On arrival, check in to your hotel, freshen up and head out for an evening exploring local highlights.`
          : `After breakfast, head out for a full day of sightseeing in ${city}. Visit the must-see attractions, scenic viewpoints and local cultural spots with a private vehicle and driver. Evening at leisure for shopping or relaxation.`,
        meals: "Breakfast, Dinner",
      });
    }
  }

  if (days >= 2) {
    const lastCity = cities[cities.length - 1];
    items.push({
      day: days,
      title: `Departure from ${lastCity}`,
      description: `After a leisurely breakfast, check out from the hotel. Our team will assist with the transfer to the airport or railway station for your onward journey home with memories to last a lifetime.`,
      meals: "Breakfast",
    });
  }

  return items;
}