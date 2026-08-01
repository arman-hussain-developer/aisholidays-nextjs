"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What kind of services does AiS offer?",
    a: "AiS — All Inclusive Services — offers three core verticals: Holidays (curated domestic and international tour packages), Events (corporate offsites, MICE, conferences, launches), and Weddings (full-service destination wedding planning).",
  },
  {
    q: "How do I book a tour or event with AiS?",
    a: "Submit an enquiry through any form on this site, or call us directly on +91 78386 02000. A dedicated planner reaches out within a few hours to understand your requirements and share a personalised proposal.",
  },
  {
    q: "Do you handle destination weddings?",
    a: "Yes. From Udaipur palaces and Goa beach resorts to Bali and Thailand, we plan and execute destination weddings end-to-end — venue, décor, catering, entertainment, photography, and guest logistics.",
  },
  {
    q: "Are flights included in tour packages?",
    a: "Most of our published packages start as land-only (hotels, transfers, sightseeing). We can add domestic or international flights on request and lock in the best available fares at booking.",
  },
  {
    q: "Can you customise an itinerary for me?",
    a: "Absolutely — bespoke is what we do best. Share your dates, destinations, budget and preferences, and we&apos;ll design a private itinerary tailored to your group.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellation terms depend on the destination and how close to the travel date you cancel. Full details are in our cancellation policy page, and your planner will walk you through it before booking.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-cream-warm py-20 lg:py-24">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Travel Questions?</p>
          <h2 className="mt-2 font-display text-display-md font-medium text-teal-800">
            Our Experts Are Ready To Assist.
          </h2>
          <p className="mt-5 text-ink-muted">
            Whether you&apos;re booking a family holiday, honeymoon, group tour, corporate trip or destination wedding, our travel specialists are ready to assist you at every step. From choosing the right destination and itinerary planning to visa guidance, hotel selection and on-ground support, we ensure a smooth and hassle-free experience. <br /> <br /><b>Have questions about packages</b>, pricing, custom itineraries or travel requirements? Get in touch with our team for quick assistance and personalized recommendations tailored to your travel preferences.
          </p>


          <div className="mt-6 space-y-2 text-sm text-ink-muted">
            <p>
              <span className="font-semibold text-teal-800">Email:</span>{" "}
              info@aisholidays.com
            </p>

            <p>
              <span className="font-semibold text-teal-800">Phone:</span>{" "}
              +91 783 860 2000, +91 742 828 0000
            </p>

            <p className="leading-6">
              <span className="font-semibold text-teal-800">Office:</span>{" "}
              AiS Tower, 11C/1, Opp. Najafgarh Metro Station, New Bhagat Singh Market,
              Naya Bazar, Najafgarh, New Delhi – 110043
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-teal-700/10 bg-cream transition hover:border-teal-700/20"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-base font-semibold text-teal-800 sm:text-lg">{f.q}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${isOpen ? "bg-terra-500 text-cream" : "bg-teal-700/8 text-teal-700"}`}>
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
