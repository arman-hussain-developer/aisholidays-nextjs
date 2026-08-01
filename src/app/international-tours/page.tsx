import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { internationalDestinations } from "@/data/destinations";
import { formatPrice } from "@/lib/utils";
import { getDestinationRoute } from "@/lib/destinationRoute";

export const metadata: Metadata = {
  title: "International Tour Packages",
  description: "Curated international tour packages — Thailand, Dubai, Singapore, Nepal, Hong Kong and more.",
};

export default function InternationalToursPage() {
  return (
    <>
      <div className="bg-teal-900 pt-32 pb-16">
        <div className="container">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sand-300">Beyond India</p>
          <h1 className="mt-3 font-display text-display-lg font-medium text-cream text-balance">
            International tour packages
          </h1>
          <p className="mt-4 max-w-2xl text-cream/70">
            From the temples of Bangkok to the dunes of Dubai — curated international
            journeys with visa support, premium hotels, and trusted ground partners.
          </p>
        </div>
      </div>

      <section className="bg-cream py-16 lg:py-20">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {internationalDestinations.map((d) => (
              <Link key={d.slug} href={getDestinationRoute(d.slug)} className="group overflow-hidden rounded-2xl bg-cream-warm transition-shadow hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-cream/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cream backdrop-blur-md">
                    {d.region}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl font-semibold text-ink">{d.name}</h3>
                  <p className="mt-1 font-display text-sm italic text-terra-600">{d.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{d.description}</p>
                  <div className="mt-4 flex items-end justify-between border-t border-ink/8 pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">Starting from</p>
                      <p className="font-display text-lg font-semibold text-teal-700">
                        {formatPrice(d.startingPrice)} <span className="text-xs font-normal text-ink-muted">/ person</span>
                      </p>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-cream transition group-hover:-rotate-45 group-hover:bg-terra-500">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
