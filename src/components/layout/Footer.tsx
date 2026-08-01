import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { domesticDestinations, internationalDestinations } from "@/data/destinations";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-900 text-cream/80">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-terra-500/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-terra-400/8 blur-3xl" />

      <div className="container relative z-10 py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <Link href="/" className="inline-block">
              <div className="rounded-2xl bg-cream/95 p-3 inline-block">
                <Logo variant="full" className="h-14 w-auto" />
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
              {siteConfig.description}
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 text-cream/75 transition hover:text-terra-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/8">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <span>
                  {siteConfig.contact.phoneDisplay}
                  <span className="ml-2 text-cream/40">·</span>
                  <span className="ml-2 text-cream/55">{siteConfig.contact.phoneAltDisplay}</span>
                </span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-cream/75 transition hover:text-terra-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/8">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                {siteConfig.contact.email}
              </a>
              <div className="flex items-start gap-3 text-cream/75">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/8">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <span className="leading-snug">
                  {siteConfig.contact.address.line1},<br />
                  {siteConfig.contact.address.line2},<br />
                  {siteConfig.contact.address.city} — {siteConfig.contact.address.pincode}
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-2">
              {[
                { href: siteConfig.social.facebook, icon: Facebook, label: "Facebook" },
                { href: siteConfig.social.instagram, icon: Instagram, label: "Instagram" },
                { href: siteConfig.social.youtube, icon: Youtube, label: "YouTube" },
                { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/8 text-cream/80 transition hover:bg-terra-500 hover:text-cream"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="eyebrow mb-4 text-terra-200">Company</p>
            <ul className="space-y-2.5 text-sm">
              <FooterLink href="/about">About AiS</FooterLink>
              <FooterLink href="/holidays">Holidays</FooterLink>
              <FooterLink href="/events">Events</FooterLink>
              <FooterLink href="/weddings">Weddings</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/blogs">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/cancellation">Cancellation Policy</FooterLink>
            </ul>
          </div>

          {/* Domestic */}
          <div>
            <p className="eyebrow mb-4 text-terra-200">Domestic</p>
            <ul className="space-y-2.5 text-sm">
              {domesticDestinations.slice(0, 8).map((d) => (
                <FooterLink key={d.slug} href={`/domestic-tours/${d.slug}`}>
                  {d.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* International */}
          <div>
            <p className="eyebrow mb-4 text-terra-200">International</p>
            <ul className="space-y-2.5 text-sm">
              {internationalDestinations.map((d) => (
                <FooterLink key={d.slug} href={`/international-tours/${d.slug}`}>
                  {d.name}
                </FooterLink>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-cream/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-terra-200">Newsletter</p>
              <p className="mt-1.5 text-xs text-cream/65">Travel inspiration in your inbox.</p>
              <form className="mt-3 flex gap-2">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 rounded-lg bg-cream/10 px-3 py-2 text-xs text-cream placeholder:text-cream/40 outline-none focus:bg-cream/15"
                />
                <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-lg bg-terra-500 text-cream transition hover:bg-terra-600">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Partners strip */}
        <div className="mt-12 border-t border-cream/10 pt-6">
          <p className="eyebrow mb-3 text-center text-cream/50">Trusted Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium tracking-wide text-cream/40">
            {siteConfig.partners.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-[11px] text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p className="tracking-wider">
            Crafted with care · {siteConfig.contact.address.city}, India
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-cream/70 transition hover:text-terra-200">
        {children}
      </Link>
    </li>
  );
}
