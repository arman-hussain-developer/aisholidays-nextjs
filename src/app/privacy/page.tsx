import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy of ${siteConfig.name} — how we collect, store, and use your information.`,
};

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-teal-900 pt-32 pb-12">
        <div className="container">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sand-300">Legal</p>
          <h1 className="mt-3 font-display text-display-lg font-medium text-cream">
            Privacy Policy
          </h1>
        </div>
      </div>

      <article className="container max-w-3xl py-16">
        <p className="text-sm text-ink-muted">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

        <Section title="Our Commitment">
          <p>
            {siteConfig.name} respects your privacy. This Privacy Policy explains what
            personal information we collect, how we use it, and the steps we take to keep it safe.
          </p>
        </Section>

        <Section title="Information We Collect">
          <ul>
            <li><strong>Contact details:</strong> name, email address, phone number, postal address.</li>
            <li><strong>Travel preferences:</strong> destination, dates, number of travellers, budget.</li>
            <li><strong>Booking information:</strong> passport details (for international tours), payment information, special requirements.</li>
            <li><strong>Website usage:</strong> IP address, browser, pages visited, session duration (via analytics cookies).</li>
          </ul>
        </Section>

        <Section title="How We Use Your Information">
          <ul>
            <li>To respond to your enquiries and prepare custom quotes.</li>
            <li>To process bookings and communicate trip-related details.</li>
            <li>To share occasional offers and travel updates (only if you opt-in).</li>
            <li>To improve our website, services, and customer experience.</li>
            <li>To comply with legal, tax, and regulatory requirements.</li>
          </ul>
        </Section>

        <Section title="Information Sharing">
          <p>
            We share your information only with trusted travel partners (hotels, airlines, transport providers, visa consultants) strictly to deliver the services you have booked. We never sell or rent your data to third parties for marketing purposes.
          </p>
        </Section>

        <Section title="Data Security">
          <p>
            We use industry-standard security measures (SSL encryption, restricted server access, secure payment gateways) to protect your data. While no system is 100% secure, we take all reasonable measures to safeguard the information you share with us.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            Our website uses cookies for basic functionality and analytics. You can disable cookies through your browser settings — though some features of the site may not work as expected.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>
            You have the right to access, correct, or delete the personal information we hold about you. To exercise these rights, contact us at <a href={`mailto:${siteConfig.contact.email}`} className="text-terra-600 hover:underline">{siteConfig.contact.email}</a>.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The &quot;last updated&quot; date at the top will reflect the most recent revision. Continued use of our services constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            For any privacy-related questions, write to us at <a href={`mailto:${siteConfig.contact.email}`} className="text-terra-600 hover:underline">{siteConfig.contact.email}</a>.
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
