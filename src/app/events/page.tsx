import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Users, Building2, Music, Sparkles, Mic, Award, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { EnquiryForm } from "@/components/home/EnquiryForm";

export const metadata: Metadata = {
  title: "Events — Corporate, MICE & Celebrations",
  description: `Corporate events, conferences, product launches and celebration management across India by ${siteConfig.shortName}.`,
};

const services = [
  { icon: Building2, title: "Corporate Events", desc: "Annual meets, conferences, AGMs, town halls — staged with precision." },
  { icon: Mic, title: "Product Launches", desc: "Brand reveals that hold a room. From venue scouting to AV production." },
  { icon: Award, title: "Award Nights", desc: "Stage, lights, sound, hospitality — turnkey delivery for ceremonies." },
  { icon: Users, title: "MICE Programs", desc: "Meetings, incentives, conferences, exhibitions — full event lifecycle." },
  { icon: Music, title: "Live Entertainment", desc: "Artist management, DJ nights, fashion shows, themed evenings." },
  { icon: Sparkles, title: "Festive Celebrations", desc: "Diwali parties, anniversary events, milestone gatherings." },
];

export default function EventsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-teal-900 pt-32 pb-16 text-cream">
        <div aria-hidden className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-terra-500/15 blur-3xl" />
        <div className="container relative z-10">
          <p className="eyebrow text-terra-200 flex items-center gap-2">
            <Calendar className="h-3 w-3" /> Service · Events
          </p>
          <h1 className="mt-4 font-display text-display-lg font-medium max-w-3xl">
            Events that earn <em className="italic text-terra-300">applause</em>, not apologies.
          </h1>
          <p className="mt-5 max-w-2xl text-cream/75 leading-relaxed">
            From a 30-person leadership offsite to a 3000-guest annual conference — AiS plans, designs and runs
            corporate events across India with end-to-end accountability.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#enquiry" className="btn-accent">Request a proposal <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="rounded-full border border-cream/25 px-6 py-3 text-sm font-medium text-cream transition hover:bg-cream/10">
              Talk to a planner
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-16 lg:py-20">
        <p className="eyebrow text-center">What we plan</p>
        <h2 className="mt-3 text-center font-display text-display-md font-medium text-teal-800">Every detail. Every guest. Every time.</h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }) => (
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

      <section className="bg-teal-800 py-16 text-cream lg:py-20">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-4">
            {[
              { n: "500+", l: "Events delivered" },
              { n: "200+", l: "Brand clients" },
              { n: "20+", l: "Cities covered" },
              { n: "98%", l: "Client retention" },
            ].map((s) => (
              <div key={s.l} className="border-l border-cream/15 pl-5">
                <div className="font-display text-display-md font-semibold text-terra-200">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/65">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm />
    </>
  );
}
