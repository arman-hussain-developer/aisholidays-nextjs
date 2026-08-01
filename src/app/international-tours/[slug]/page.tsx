import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Star, Clock, ArrowRight, Plane } from "lucide-react";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { getPackagesByDestination } from "@/data/packages";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return destinations
    .filter((d) => d.type === "international")
    .map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestinationBySlug(slug);
  if (!d) return { title: "Destination not found" };
  return {
    title: `${d.name} Tour Packages`,
    description: `${d.tagline}. ${d.description} Starting from ${formatPrice(d.startingPrice)} per person.`,
    keywords: [`${d.name} tour package`, `${d.name} travel`, `${d.name} holiday`, ...siteConfig.keywords],
    alternates: { canonical: `${siteConfig.url}/international-tours/${d.slug}` },
  };
}

export default async function InternationalDestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const d = getDestinationBySlug(slug);
  if (!d || d.type !== "international") notFound();

  const pkgs = getPackagesByDestination(d.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${d.name} Tour Package`,
    description: d.description,
    image: d.image,
    touristType: "International",
    itinerary: d.highlights.map((h) => ({ "@type": "City", name: h })),
    offers: {
      "@type": "Offer",
      price: d.startingPrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-16 pb-12">
        <div className="absolute inset-0 -z-10">
          <img src={d.image} alt={d.name} className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0  bg-gradient-to-br from-slate-950/90 via-teal-950/40 to-slate-950/95" />
        </div>

        <div className="container relative z-10 flex min-h-[52vh] items-center">
          <div className="w-full max-w-4xl  p-4 ">
            <nav className="text-[12px] uppercase tracking-[0.50em] text-slate-100">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/international-tours" className="hover:text-white">International Tours</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{d.name}</span>
            </nav>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-slate-200 shadow-sm">
              <Plane className="h-3 w-3" /> {d.region}
            </div>
            <h1 className="mt-2 font-display text-[2.8rem] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[3.4rem]">
              {d.name}
            </h1>
            <p className=" max-w-2xl text-xl italic text-slate-100">{d.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {d.highlights.map((h) => (
                <span key={h} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/20 px-3 py-2 text-sm text-slate-50 backdrop-blur-lg">
                  <MapPin className="h-3 w-3" /> {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
  {/* Background */}
  <div className="absolute inset-0 bg-white" />

  {/* World Map SVG */}
  <div className="absolute inset-0 opacity-[0.03]">
    <svg
      viewBox="0 0 1200 600"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M120 320C240 220 430 180 620 240C790 295 950 285 1080 180"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <circle cx="120" cy="320" r="4" fill="currentColor" />
      <circle cx="1080" cy="180" r="4" fill="currentColor" />
    </svg>
  </div>

  <div className="container relative z-10">
    <div className="mx-auto max-w-5xl">

      {/* Heading */}
      <div className="mb-8">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          Destination Guide
        </span>

        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          About {d.name}
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          {d.description}
        </p>
      </div>

      {/* Info Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              What’s Included
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Our {d.name} packages start from{" "}
              <span className="font-semibold text-slate-900">
                {formatPrice(d.startingPrice)}
              </span>{" "}
              per person and include carefully selected stays,
              sightseeing experiences, airport transfers and
              end-to-end travel assistance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              "Flights",
              "Hotels",
              "Visa Support",
              "Transfers",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <span className="text-sm font-medium text-slate-800">
                  {item}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

      {/* Packages */}
      {pkgs.length > 0 && (
        <section className="bg-slate-100 py-20">
          <div className="container">
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow text-slate-500">Available packages</p>
              <h2 className="mt-3 font-display text-display-md font-semibold text-slate-950">
                {d.name} itineraries
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pkgs.map((pkg) => (
                <article key={pkg.slug} className="group overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200/60 transition hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  <Link href={`/packages/${pkg.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                    <img src={pkg.image} alt={pkg.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    {pkg.discount && (<div className="absolute left-3 top-3 badge-discount">{pkg.discount}% OFF</div>)}
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-950">
                      <Star className="h-3 w-3 fill-terra-500 text-terra-500" /> {pkg.rating}
                    </div>
                  </Link>
                  <div className="p-5">
                    <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      <Clock className="h-3 w-3" /> {pkg.duration}
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-slate-950">{pkg.title}</h3>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="h-3 w-3 text-teal-500" /> {pkg.cities.join(" · ")}
                    </p>
                    <div className="mt-4 flex items-end justify-between border-t border-slate-200/70 pt-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">From</p>
                        <p className="font-display text-xl font-semibold text-slate-950">{formatPrice(pkg.price)}</p>
                      </div>
                      <Link href={`/packages/${pkg.slug}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-700 text-cream transition group-hover:bg-teal-600">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <EnquiryForm />
    </>
  );
}
