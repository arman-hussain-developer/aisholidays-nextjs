"use client";

import Link from "next/link";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { featuredPackages } from "@/data/packages";
import { formatPrice } from "@/lib/utils";

export function PackageDeals() {
  return (
    <section className="relative overflow-hidden bg-cream-warm py-4 lg:py-8">
      {/* Decorative blurred shape */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-terra-500/8 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-teal-700/8 blur-3xl" />

      <div className="container relative z-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Holiday Specials</p>
            <h2 className="mt-3 font-display text-display-md font-medium text-teal-700 text-balance">
              Traveller&apos;s
              <br />
              <em className="italic text-terra-500">favourite</em> picks
            </h2>
          </div>
          <p className="max-w-md text-base text-ink-muted">
            Hand-curated packages with the best inclusions, prices, and reviewer ratings —
            updated weekly by our team of in-country specialists.
          </p>
        </div>

        {/* Package grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPackages.map((pkg) => (
            <article
              key={pkg.slug}
              className="group relative overflow-hidden rounded-2xl bg-cream shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              {/* Image */}
              <Link href={`/packages/${pkg.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

                {pkg.discount && (
                  <div className="absolute left-3 top-3 badge-discount">
                    {pkg.discount}% OFF
                  </div>
                )}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-cream/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-soft backdrop-blur">
                  <Star className="h-3 w-3 fill-terra-500 text-terra-500" />
                  {pkg.rating}
                </div>
              </Link>

              <div className="p-5">
                <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  <Clock className="h-3 w-3" />
                  {pkg.duration}
                </div>

                <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                  <Link href={`/packages/${pkg.slug}`} className="hover:text-terra-600">
                    {pkg.title}
                  </Link>
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
                  <MapPin className="h-3 w-3 text-terra-500" />
                  {pkg.cities.join(" · ")}
                </div>

                {/* Price + CTA */}
                <div className="mt-4 flex items-end justify-between border-t border-ink/8 pt-4">
                  <div>
                    {!pkg.priceOnRequest &&
                    <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">From</p>
                    }
                    <div className="flex items-baseline gap-1.5">
                      {pkg.priceOnRequest ? (
                        <span className="font-display text-xl font-semibold text-terra-600">On Request</span>
                      ) : (
                        <>
                          <span className="font-display text-xl font-semibold text-teal-700">{formatPrice(pkg.price)}</span>
                          {pkg.originalPrice && (
                            <span className="text-xs text-ink-muted line-through">{formatPrice(pkg.originalPrice)}</span>
                          )}
                        </>
                      )}
                    </div>
                    <p className="text-[10px] text-ink-muted">per person</p>
                  </div>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    aria-label={`View ${pkg.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-cream transition group-hover:bg-terra-500"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/domestic-tours" className="btn-ghost">
            See all packages <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
