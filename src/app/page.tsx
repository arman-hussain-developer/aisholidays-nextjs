import { Hero } from "@/components/home/Hero";
import { DestinationsGrid } from "@/components/home/DestinationsGrid";
import { PackageDeals } from "@/components/home/PackageDeals";
import { OfferBanner } from "@/components/home/OfferBanner";
import { InternationalSection } from "@/components/home/InternationalSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { FAQ } from "@/components/home/FAQ";
import { EnquiryForm } from "@/components/home/EnquiryForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DestinationsGrid />
      <PackageDeals />
      <OfferBanner />
      <InternationalSection />
      <AboutPreview />
      <FAQ />
      <EnquiryForm />
    </>
  );
}