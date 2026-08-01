import type { Metadata } from "next";
import { DomesticToursContent } from "./DomesticToursContent";

export const metadata: Metadata = {
  title: "Domestic Tour Packages",
  description:
    "Explore handcrafted India tour packages - Kashmir, Kerala, Himachal, Rajasthan, Goa, North-East, and more.",
};

export default function DomesticToursPage() {
  return <DomesticToursContent />;
}