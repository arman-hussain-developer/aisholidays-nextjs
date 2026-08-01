import { Phone, Mail, Clock, Facebook, Instagram, Youtube, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function TopBar() {
  return (
    <div className="hidden bg-teal-800 text-cream/85 lg:block">
      <div className="container flex h-9 items-center justify-between text-[11px]">
        <div className="flex items-center gap-5">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center gap-1.5 transition hover:text-terra-200"
          >
            <Phone className="h-3 w-3" strokeWidth={2.2} />
            <span className="tracking-wide">{siteConfig.contact.phoneDisplay}</span>
          </a>
          <span className="text-cream/30">·</span>
          <a
            href={`tel:${siteConfig.contact.phoneAlt}`}
            className="hidden items-center gap-1.5 transition hover:text-terra-200 xl:flex"
          >
            <span className="tracking-wide">{siteConfig.contact.phoneAltDisplay}</span>
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-1.5 transition hover:text-terra-200"
          >
            <Mail className="h-3 w-3" strokeWidth={2.2} />
            <span>{siteConfig.contact.email}</span>
          </a>
          <div className="hidden items-center gap-1.5 text-cream/55 xl:flex">
            <MapPin className="h-3 w-3" strokeWidth={2.2} />
            <span>Najafgarh, New Delhi</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-cream/55">
            <Clock className="h-3 w-3" strokeWidth={2.2} />
            <span>{siteConfig.contact.hours}</span>
          </div>
          <div className="h-3 w-px bg-cream/20" />
          <div className="flex items-center gap-3">
            <a href={siteConfig.social.facebook} aria-label="Facebook" className="transition hover:text-terra-200">
              <Facebook className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
            <a href={siteConfig.social.instagram} aria-label="Instagram" className="transition hover:text-terra-200">
              <Instagram className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
            <a href={siteConfig.social.youtube} aria-label="YouTube" className="transition hover:text-terra-200">
              <Youtube className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
