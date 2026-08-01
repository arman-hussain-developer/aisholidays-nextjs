import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Stories & Guides",
  description: "Read travel guides, itineraries, and stories from our destination experts.",
};

export default function BlogsPage() {
  return (
    <>
      <div className="bg-teal-900 pt-32 pb-12">
        <div className="container">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sand-300">The Journal</p>
          <h1 className="mt-3 font-display text-display-lg font-medium text-cream text-balance">
            Travel stories &amp; guides
          </h1>
        </div>
      </div>

      <div className="container py-20 text-center">
        <p className="font-display text-2xl text-teal-700">Blog coming soon</p>
        <p className="mt-4 max-w-md mx-auto text-sm text-ink-muted">
          Destination deep-dives, packing guides, hidden-gem itineraries — written by people who have actually been there.
        </p>
      </div>
    </>
  );
}
