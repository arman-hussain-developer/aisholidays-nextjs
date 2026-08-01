import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Sparkles, Crown, Camera, Utensils, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { domesticDestinations, internationalDestinations } from "@/data/destinations";
import { EnquiryForm } from "@/components/home/EnquiryForm";

export const metadata: Metadata = {
  title: "Destination Weddings — Planned End to End",
  description: `Destination wedding planners by ${siteConfig.shortName}. Udaipur, Jaipur, Goa, Bali, Thailand — full-service planning, design and management.`,
};

const venues = [
  { name: "Udaipur", region: "Royal Rajasthan", img: domesticDestinations.find(d => d.slug === "rajasthan")?.image },
  { name: "Goa", region: "Beach Weddings", img: domesticDestinations.find(d => d.slug === "goa")?.image },
  { name: "Kerala", region: "Backwater Vows", img: domesticDestinations.find(d => d.slug === "kerala")?.image },
  { name: "Thailand", region: "Tropical Escapes", img: internationalDestinations.find(d => d.slug === "thailand")?.image },
  { name: "Dubai", region: "Skyline Glamour", img: internationalDestinations.find(d => d.slug === "dubai")?.image },
  { name: "Kashmir", region: "Mountain Magic", img: domesticDestinations.find(d => d.slug === "kashmir")?.image },
].filter(v => v.img);

export default function WeddingsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-teal-900 pt-32 pb-16 text-cream">
        <div aria-hidden className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-terra-500/15 blur-3xl" />
        <div aria-hidden className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sand-300/10 blur-3xl" />
        <div className="container relative z-10">
          <p className="eyebrow text-terra-200 flex items-center gap-2">
            <Heart className="h-3 w-3 fill-terra-200" /> Service · Weddings
          </p>
          <h1 className="mt-4 font-display text-display-lg font-medium max-w-3xl">
            Destination weddings, <em className="italic text-terra-300">flawlessly</em> orchestrated.
          </h1>
          <p className="mt-5 max-w-2xl text-cream/75 leading-relaxed">
            From the proposal photoshoot to the farewell brunch — we plan, design and execute weddings
            across India&apos;s royal palaces, beach resorts, hill stations and international destinations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#enquiry" className="btn-accent">Plan your wedding <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="container py-16 lg:py-20">
        <p className="eyebrow text-center">What we handle</p>
        <h2 className="mt-3 text-center font-display text-display-md font-medium text-teal-800">Every ritual. Every guest. Every memory.</h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: MapPin, title: "Venue & Hotels", desc: "Palace, resort or villa — block-bookings & group rates locked in." },
            { icon: Crown, title: "Décor & Design", desc: "Mandap, mehndi, sangeet — custom set design from a dedicated stylist." },
            { icon: Utensils, title: "Catering & Bar", desc: "Multi-cuisine menus, live counters, premium bar curation." },
            { icon: Sparkles, title: "Entertainment", desc: "DJ, dhol, baraat, choreographers, celebrity performances." },
            { icon: Camera, title: "Photography & Cinema", desc: "Full pre-wedding-to-vidaai coverage by award-winning teams." },
            { icon: Heart, title: "Guest Management", desc: "Flights, transfers, welcome kits, RSVP tracking — handled." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-teal-700/10 bg-cream p-6 transition hover:shadow-soft hover:-translate-y-0.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-terra-500/15 text-terra-600">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-teal-800">{title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-warm py-16 lg:py-20">
        <div className="container">
          <p className="eyebrow">Wedding destinations</p>
          <h2 className="mt-2 font-display text-display-md font-medium text-teal-800">Say yes, anywhere.</h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((v) => (
              <div key={v.name} className="group relative aspect-[5/4] overflow-hidden rounded-2xl">
                <Image src={v.img!} alt={v.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width:1024px) 33vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/85 via-teal-900/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-terra-200">{v.region}</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">{v.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm />
    </>
  );
}
