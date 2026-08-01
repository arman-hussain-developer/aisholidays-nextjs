import type { Metadata } from "next";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Reach out to ${siteConfig.name} — phone, email, WhatsApp, and office address.`,
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-teal-900 pt-32 pb-16">
        <div className="container">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sand-300">Get in touch</p>
          <h1 className="mt-3 font-display text-display-lg font-medium text-cream text-balance">
            Let&apos;s talk travel
          </h1>
          <p className="mt-4 max-w-xl text-cream/70">
            Whether you have a destination in mind or just want to be inspired —
            we&apos;re here to help craft your next trip.
          </p>
        </div>
      </div>

      <div className="container py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Phone, label: "Phone", value: siteConfig.contact.phoneDisplay, href: `tel:${siteConfig.contact.phone}` },
            { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
            { icon: MapPin, label: "Office", value: `${siteConfig.contact.address.line2}, ${siteConfig.contact.address.city}`, href: "#" },
          ].map((c) => (
            <a key={c.label} href={c.href} className="rounded-2xl bg-cream-warm p-6 transition hover:shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-700/8 text-teal-700">
                <c.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-ink-muted">{c.label}</p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">{c.value}</p>
            </a>
          ))}
        </div>
      </div>

      <EnquiryForm />
    </>
  );
}
