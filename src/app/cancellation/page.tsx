import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: `Cancellation and refund policy for tour packages booked with ${siteConfig.name}.`,
};

export default function CancellationPage() {
  return (
    <>
      <div className="bg-teal-900 pt-32 pb-12">
        <div className="container">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sand-300">Legal</p>
          <h1 className="mt-3 font-display text-display-lg font-medium text-cream">
            Cancellation &amp; Refund Policy
          </h1>
        </div>
      </div>

      <article className="container max-w-3xl py-16">
        <p className="text-sm text-ink-muted">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

        <Section title="General">
          <p>
            We understand that travel plans sometimes change. This policy outlines the cancellation charges that apply when you cancel a confirmed booking. All cancellation requests must be sent to us in writing via email.
          </p>
        </Section>

        <Section title="Standard Cancellation Charges (Domestic Tours)">
          <div className="overflow-hidden rounded-2xl border border-ink/10">
            <table className="w-full text-sm">
              <thead className="bg-teal-700/8 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-teal-700">Days before departure</th>
                  <th className="px-4 py-3 font-semibold text-teal-700">Cancellation charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/8 bg-cream">
                <tr><td className="px-4 py-3">More than 45 days</td><td className="px-4 py-3">10% of package cost</td></tr>
                <tr><td className="px-4 py-3">30 to 45 days</td><td className="px-4 py-3">25% of package cost</td></tr>
                <tr><td className="px-4 py-3">15 to 30 days</td><td className="px-4 py-3">50% of package cost</td></tr>
                <tr><td className="px-4 py-3">7 to 14 days</td><td className="px-4 py-3">75% of package cost</td></tr>
                <tr><td className="px-4 py-3">Less than 7 days / No-show</td><td className="px-4 py-3">100% of package cost</td></tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="International Tour Cancellations">
          <p>
            Cancellation charges for international tours are typically higher and are governed by the individual airline, hotel, and partner cancellation policies. Exact charges are confirmed at the time of booking and shared in writing before the deposit is collected.
          </p>
        </Section>

        <Section title="Refund Processing">
          <ul>
            <li>Approved refunds are processed within 10 to 21 working days of cancellation confirmation.</li>
            <li>Refunds are credited to the original payment method.</li>
            <li>Bank charges, payment gateway fees, and transaction costs (if any) will be deducted.</li>
            <li>Refunds for visa fees, insurance premiums, and other non-refundable third-party services are not possible once paid.</li>
          </ul>
        </Section>

        <Section title="Force Majeure">
          <p>
            In the event of cancellations due to force majeure (natural disasters, pandemics, government restrictions, civil unrest, etc.), we will work with travellers and our partners to either reschedule the trip or offer the maximum possible refund — typically after deducting non-recoverable costs from suppliers.
          </p>
        </Section>

        <Section title="Modifications">
          <p>
            Changes to confirmed bookings (date shifts, hotel upgrades, addition/removal of travellers) are subject to availability and may attract amendment charges. Please request changes at least 15 days before departure for the smoothest experience.
          </p>
        </Section>

        <Section title="No-Show">
          <p>
            A no-show on the trip start date will be treated as a cancellation with 100% charges. We are unable to refund any portion of unused services once the tour has commenced.
          </p>
        </Section>

        <Section title="Need Help?">
          <p>
            For cancellation requests or queries, write to us at <a href={`mailto:${siteConfig.contact.email}`} className="text-terra-600 hover:underline">{siteConfig.contact.email}</a> or call <a href={`tel:${siteConfig.contact.phone}`} className="text-terra-600 hover:underline">{siteConfig.contact.phoneDisplay}</a>.
          </p>
        </Section>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-semibold text-teal-700">{title}</h2>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-ink-soft [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
