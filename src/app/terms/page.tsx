import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for booking tour packages with ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <div className="bg-teal-900 pt-32 pb-12">
        <div className="container">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sand-300">Legal</p>
          <h1 className="mt-3 font-display text-display-lg font-medium text-cream">
            Terms &amp; Conditions
          </h1>
        </div>
      </div>

      <article className="container max-w-3xl py-16 prose-styled">
        <p className="text-sm text-ink-muted">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

        <Section title="1. Acceptance of Terms">
          <p>
            By booking a tour package or using the services of {siteConfig.name}, you agree to be bound by these Terms &amp; Conditions. Please read them carefully before making a booking.
          </p>
        </Section>

        <Section title="2. Booking & Payment">
          <ul>
            <li>A confirmation deposit of 25% of the total package cost is required to confirm any booking.</li>
            <li>The remaining balance must be paid no later than 7 days before the date of departure.</li>
            <li>For bookings made within 7 days of departure, full payment is required upfront.</li>
            <li>All payments must be made by bank transfer, UPI, or any approved payment method.</li>
          </ul>
        </Section>

        <Section title="3. Pricing">
          <ul>
            <li>All prices are quoted in Indian Rupees (INR) unless otherwise specified.</li>
            <li>Prices are per person on twin-sharing basis unless mentioned.</li>
            <li>Prices may vary based on season, availability, currency fluctuations, and group size.</li>
            <li>Government taxes, GST, and TCS as applicable are charged extra.</li>
          </ul>
        </Section>

        <Section title="4. Itinerary Changes">
          <p>
            We reserve the right to modify itineraries due to circumstances beyond our control, including but not limited to weather conditions, government restrictions, transport delays, or supplier issues. Best efforts will be made to provide equivalent alternatives.
          </p>
        </Section>

        <Section title="5. Traveller Responsibilities">
          <ul>
            <li>Travellers are responsible for valid government-issued ID and (for international travel) valid passport and visa.</li>
            <li>Travellers must reach designated pickup points on time. {siteConfig.name} is not liable for missed services due to traveller delays.</li>
            <li>Any damage caused by the traveller to hotel property, vehicle, or third-party premises is the traveller&apos;s liability.</li>
          </ul>
        </Section>

        <Section title="6. Insurance">
          <p>
            Travel insurance is not included in our standard packages unless specified. We strongly recommend all travellers (especially for international tours) purchase appropriate insurance. We can assist in arranging insurance on request.
          </p>
        </Section>

        <Section title="7. Liability">
          <p>
            {siteConfig.name} acts as a facilitator between the traveller and various service providers (hotels, airlines, transport, etc.). We are not liable for any loss, injury, delay, or damage arising due to acts of third-party providers, force majeure events, or circumstances beyond our reasonable control.
          </p>
        </Section>

        <Section title="8. Jurisdiction">
          <p>
            All disputes are subject to the exclusive jurisdiction of the courts in {siteConfig.contact.address.city}, India.
          </p>
        </Section>

        <Section title="9. Contact">
          <p>
            For any clarifications regarding these terms, please contact us at <a href={`mailto:${siteConfig.contact.email}`} className="text-terra-600 hover:underline">{siteConfig.contact.email}</a> or call <a href={`tel:${siteConfig.contact.phone}`} className="text-terra-600 hover:underline">{siteConfig.contact.phoneDisplay}</a>.
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
