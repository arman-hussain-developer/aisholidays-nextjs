import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combine class names with Tailwind merge (handles conflicts) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price as Indian rupees (e.g. ₹13,999) */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Years since established (auto-updates each year) */
export function yearsSince(year: number): number {
  return new Date().getFullYear() - year;
}

/** WhatsApp deeplink with pre-filled text */
export function whatsappLink(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
