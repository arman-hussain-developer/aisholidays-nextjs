import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plane, Compass, Sparkles, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { featuredPackages } from "@/data/packages";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Holidays — Curated Tour Packages",
  description: `Handpicked holiday packages across India and the world by ${siteConfig.shortName}. Honeymoons, family trips, group tours and bespoke itineraries.`,
};

export default function HolidaysPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-teal-900 pt-32 pb-16 text-cream">
        <div aria-hidden className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-terra-500/15 blur-3xl" />
        <div aria-hidden className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-terra-400/10 blur-3xl" />
        <div className="container relative z-10">
          <p className="eyebrow text-terra-200 flex items-center gap-2">
            <Plane className="h-3 w-3" /> Service · Holidays
          </p>
          <h1 className="mt-4 font-display text-display-lg font-medium max-w-3xl">
            Holiday packages, <em className="italic text-terra-300">curated</em> for every kind of traveller.
          </h1>
          <p className="mt-5 max-w-2xl text-cream/75 leading-relaxed">
            From snow-dusted Himalayan ridges to backwater houseboats and golden desert palaces — we design holidays
            that match how you actually want to travel. Honeymoon, family, friends, solo, or corporate offsite.
          </p>
        </div>
      </section>

      <section className="container py-16 lg:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Compass, title: "Bespoke Itineraries", desc: "No cookie-cutter trips. Every day shaped around your pace." },
            { icon: ShieldCheck, title: "End-to-End Handling", desc: "Flights, stays, transfers, permits, tickets — all on us." },
            { icon: Sparkles, title: "Trusted Local Network", desc: "Vetted partners in every destination, on-ground 24×7 support." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-teal-700/10 bg-cream-warm p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-terra-500/15 text-terra-600">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-teal-800">{title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-warm py-16 lg:py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow">Featured · Holiday packages</p>
              <h2 className="mt-2 font-display text-display-md font-medium text-teal-800">Popular this season</h2>
            </div>
            <Link href="/domestic-tours" className="hidden text-sm font-semibold text-terra-600 hover:text-terra-700 md:block">
              View all →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPackages.slice(0, 8).map((pkg) => (
              <Link key={pkg.slug} href={`/packages/${pkg.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-teal-900/5">
                  <Image src={pkg.image} alt={pkg.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width:1024px) 25vw, 50vw" />
                  {pkg.discount && (
                    <span className="absolute top-3 left-3 rounded-full bg-terra-500 px-2.5 py-1 text-[10px] font-bold tracking-wide text-cream">
                      {pkg.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="pt-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">{pkg.duration}</p>
                  <h3 className="mt-1 font-display text-base font-semibold text-teal-800 line-clamp-2">{pkg.title}</h3>
                  <div className="mt-2 flex items-baseline justify-between">
                    {pkg.priceOnRequest ? (
                      <span className="text-sm font-bold text-terra-600">On Request</span>
                    ) : (
                      <>
                        <span className="text-sm font-bold text-teal-700">{formatPrice(pkg.price)}</span>
                        {pkg.originalPrice && (
                          <span className="text-xs text-ink-muted line-through">{formatPrice(pkg.originalPrice)}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm />
    </>
  );
}
