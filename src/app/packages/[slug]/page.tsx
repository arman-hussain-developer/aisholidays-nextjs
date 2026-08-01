import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { packages, getPackageBySlug } from "@/data/packages";
import { getDestinationBySlug } from "@/data/destinations";
import { siteConfig } from "@/config/site";
import { PackageDetailContent } from "./PackageDetailContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: `${pkg.title} — ${pkg.duration}`,
    description: `${pkg.title} starting at ₹${pkg.price.toLocaleString("en-IN")} per person. ${pkg.cities.join(" · ")}. Book with ${siteConfig.shortName} for the best curated experience.`,
    openGraph: { images: [pkg.image] },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const destination = getDestinationBySlug(pkg.destination);
  const similar = packages
    .filter((p) => p.destination === pkg.destination && p.slug !== pkg.slug)
    .slice(0, 3);

  // JSON-LD TouristTrip schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: `${pkg.duration} package covering ${pkg.cities.join(", ")}`,
    image: pkg.image,
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: pkg.rating,
      reviewCount: pkg.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PackageDetailContent pkg={pkg} destination={destination} similar={similar} />
    </>
  );
}
