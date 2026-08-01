import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { getPackagesByDestination } from "@/data/packages";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { DestinationContent } from "./DestinationContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return destinations
    .filter((d) => d.type === "domestic")
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
    alternates: { canonical: `${siteConfig.url}/domestic-tours/${d.slug}` },
  };
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const d = getDestinationBySlug(slug);
  if (!d || d.type !== "domestic") notFound();

  const pkgs = getPackagesByDestination(d.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${d.name} Tour Package`,
    description: d.description,
    image: d.image,
    touristType: "Domestic",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationContent destination={d} pkgs={pkgs} />
    </>
  );
}
