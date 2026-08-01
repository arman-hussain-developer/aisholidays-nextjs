"use client";

import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";

export function FloatingActions() {
  const waMessage =
    "Hi! I'd like to enquire about a tour package.";

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={whatsappLink(siteConfig.contact.whatsapp, waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <MessageCircle className="relative h-6 w-6" strokeWidth={2.2} fill="white" />
      </a>

      {/* Call */}
      <a
        href={`tel:${siteConfig.contact.phone}`}
        aria-label="Call now"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-terra-500 text-white shadow-lift transition-transform hover:scale-110"
      >
        <Phone className="h-6 w-6" strokeWidth={2.2} />
      </a>
    </div>
  );
}
