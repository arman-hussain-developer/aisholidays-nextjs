"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, Phone, MapPin, Plane, Calendar, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { domesticDestinations, internationalDestinations } from "@/data/destinations";
import { TopBar } from "./TopBar";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [domesticOpen, setDomesticOpen] = useState(false);
  const [internationalOpen, setInternationalOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />

      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "bg-cream/95 shadow-soft backdrop-blur-lg"
            : "bg-cream/85 backdrop-blur-md"
        )}
      >
        <nav className="container flex h-[68px] items-center justify-between lg:h-[76px]">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label={siteConfig.name}>
            <Logo variant="full" className="h-11 w-auto sm:h-12 lg:h-14 transition-transform duration-500 group-hover:scale-[1.03]" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-0.5 text-[13px] font-medium text-ink-soft xl:flex">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>

            {/* Domestic dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setDomesticOpen(true)}
              onMouseLeave={() => setDomesticOpen(false)}
            >
              <Link
                href="/domestic-tours"
                className="flex items-center gap-1 rounded-full px-3 py-2 transition hover:text-teal-700"
              >
                Domestic
                <ChevronDown className={cn("h-3 w-3 transition", domesticOpen && "rotate-180")} />
              </Link>
              {domesticOpen && (
                <div className="absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-2">
                  <div className="rounded-2xl border border-teal-700/8 bg-cream p-5 shadow-lift">
                    <div className="mb-3 flex items-center justify-between border-b border-teal-700/10 pb-3">
                      <span className="eyebrow">Explore India</span>
                      <Link href="/domestic-tours" className="text-[11px] font-semibold text-terra-600 hover:text-terra-700">
                        View all destinations →
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
                      {domesticDestinations.map((d) => (
                        <Link
                          key={d.slug}
                          href={`/domestic-tours/${d.slug}`}
                          className="group flex items-center justify-between rounded-md py-1.5 text-[13px] text-ink-soft transition hover:text-teal-700"
                        >
                          <span className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-terra-500/0 transition group-hover:text-terra-500" />
                            {d.name}
                          </span>
                          <span className="text-[10px] text-ink-muted">{d.region}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>

            <li
              className="relative"
              onMouseEnter={() => setInternationalOpen(true)}
              onMouseLeave={() => setInternationalOpen(false)}
            >
              <Link
                href="/international-tours"
                className="flex items-center gap-1 rounded-full px-3 py-2 transition hover:text-teal-700"
              >
                International
                <ChevronDown className={cn("h-3 w-3 transition", internationalOpen && "rotate-180")} />
              </Link>
              {internationalOpen && (
                <div className="absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-2">
                  <div className="rounded-2xl border border-teal-700/8 bg-cream p-5 shadow-lift">
                    <div className="mb-3 flex items-center justify-between border-b border-teal-700/10 pb-3">
                      <span className="eyebrow">Explore the world</span>
                      <Link href="/international-tours" className="text-[11px] font-semibold text-terra-600 hover:text-terra-700">
                        View all destinations →
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
                      {internationalDestinations.map((d) => (
                        <Link
                          key={d.slug}
                          href={`/international-tours/${d.slug}`}
                          className="group flex items-center justify-between rounded-md py-1.5 text-[13px] text-ink-soft transition hover:text-teal-700"
                        >
                          <span className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-terra-500/0 transition group-hover:text-terra-500" />
                            {d.name}
                          </span>
                          <span className="text-[10px] text-ink-muted">{d.region}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Services dropdown — Events / Weddings */}
            <li
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-full px-3 py-2 transition hover:text-teal-700">
                Services
                <ChevronDown className={cn("h-3 w-3 transition", servicesOpen && "rotate-180")} />
              </button>
              {servicesOpen && (
                <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2">
                  <div className="rounded-2xl border border-teal-700/8 bg-cream p-3 shadow-lift">
                    <ServiceLink href="/holidays" icon={<Plane className="h-4 w-4" />} title="Holidays" desc="Curated tour packages" />
                    <ServiceLink href="/events" icon={<Calendar className="h-4 w-4" />} title="Events" desc="MICE & corporate gatherings" />
                    <ServiceLink href="/weddings" icon={<Heart className="h-4 w-4" />} title="Weddings" desc="Destination weddings" />
                  </div>
                </div>
              )}
            </li>

            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/blogs">Blog</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </ul>

          {/* Right CTA */}
          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="hidden items-center gap-2 text-sm text-teal-700 xl:flex"
              aria-label="Call now"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terra-500/15 text-terra-600">
                <Phone className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <div className="leading-tight">
                <div className="text-[9px] uppercase tracking-[0.18em] text-ink-muted">Call us</div>
                <div className="text-[13px] font-semibold">{siteConfig.contact.phoneDisplay}</div>
              </div>
            </a>

            <Link href="#enquiry" className="btn-accent !px-4 !py-2.5 text-xs sm:!px-5 lg:!px-6 lg:!py-3 lg:text-sm">
              Plan My Trip
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700/8 text-teal-700 xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <div className="absolute inset-0 bg-teal-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-cream p-6 shadow-lift">
            <div className="mb-6 flex items-center justify-between">
              <Logo variant="mark" className="h-10 w-auto" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700/8 text-teal-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1 text-base font-medium">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/domestic-tours", label: "Domestic Tours" },
                { href: "/international-tours", label: "International Tours" },
                { href: "/holidays", label: "Holidays" },
                { href: "/events", label: "Events" },
                { href: "/weddings", label: "Weddings" },
                { href: "/gallery", label: "Gallery" },
                { href: "/blogs", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-ink-soft transition hover:bg-teal-700/5 hover:text-teal-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 border-t border-teal-700/10 pt-6">
              <p className="eyebrow mb-3">Top Domestic</p>
              <div className="grid grid-cols-2 gap-2">
                {domesticDestinations.slice(0, 6).map((d) => (
                  <Link
                    key={d.slug}
                    href={`/domestic-tours/${d.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg bg-teal-700/5 px-3 py-2 text-xs text-teal-700"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-teal-700 p-5 text-cream">
              <p className="text-[10px] uppercase tracking-[0.22em] text-terra-200">Talk to us</p>
              <a href={`tel:${siteConfig.contact.phone}`} className="mt-1 block font-display text-2xl font-semibold">
                {siteConfig.contact.phoneDisplay}
              </a>
              <a href={`tel:${siteConfig.contact.phoneAlt}`} className="mt-0.5 block text-sm text-cream/80">
                {siteConfig.contact.phoneAltDisplay}
              </a>
              <p className="mt-2 text-xs text-cream/70">{siteConfig.contact.hours}</p>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-full px-3 py-2 transition hover:text-teal-700"
      >
        {children}
      </Link>
    </li>
  );
}

function ServiceLink({
  href, icon, title, desc,
}: { href: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-teal-700/5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-terra-500/15 text-terra-600 transition group-hover:bg-terra-500 group-hover:text-cream">
        {icon}
      </span>
      <span className="block leading-tight">
        <span className="block text-sm font-semibold text-teal-700">{title}</span>
        <span className="block text-[11px] text-ink-muted">{desc}</span>
      </span>
    </Link>
  );
}
