import type { Metadata } from "next";
import { GalleryContent } from "./GalleryContent";

export const metadata: Metadata = {
  title: "Travel Gallery",
  description:
    "Moments from our journeys across India and beyond - Kashmir valleys, Kerala backwaters, Dubai skylines and more, captured by Team AiS Holidays.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}