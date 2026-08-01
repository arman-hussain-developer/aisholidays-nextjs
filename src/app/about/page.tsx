import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.fullName} — our story, our values, and our approach to crafting journeys, events and weddings.`,
};

export default function AboutPage() {
  return <AboutContent />;
}