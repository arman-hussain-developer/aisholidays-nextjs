// =====================================================
// 🎯 SITE CONFIG — AiS All Inclusive Services
// Single source of truth for branding & contact
// =====================================================

export const siteConfig = {
  // Brand identity
  name: "AiS Holidays",
  fullName: "AiS — All Inclusive Services",
  shortName: "AiS",
  tagline: "Holidays · Events · Weddings",
  description:
    "AiS — All Inclusive Services. Premium holiday packages, destination events and weddings across India and the world. Handcrafted journeys, end-to-end planning, trusted by thousands.",

  // SEO defaults
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://aisholidays.com",
  ogImage: "/og-image.jpg",
  keywords: [
    "AiS Holidays",
    "All Inclusive Services",
    "holiday packages India",
    "destination wedding planner",
    "Kashmir tour package",
    "Himachal tour package",
    "Kerala tour package",
    "Rajasthan tour package",
    "Goa tour package",
    "Andaman tour package",
    "Dubai tour package",
    "Thailand tour package",
    "Singapore tour package",
    "corporate events planner Delhi",
    "travel agency Najafgarh Delhi",
  ],
// +91 78386 02000
// +91 74282 80000
  // Contact
  contact: {
    phone: "+91-7428280000",
    phoneDisplay: "+91 74282 80000",
    phoneAlt: "+91-7838602000",
    phoneAltDisplay: "+91 78386 02000",
    whatsapp: "+91 74282 80000",
    email: "info@aisholidays.com",
    bookingEmail: "info@aisholidays.com",
    address: {
      line1: "AiS Tower, 11C/1, Naya Bazar",
      line2: "Opp. Najafgarh Metro Station",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110043",
      country: "India",
    },
    gstin: "",
    hours: "Mon – Sat: 10:00 AM – 7:30 PM",
  },

  // Social
  social: {
    facebook: "https://facebook.com/aisholidays",
    instagram: "https://instagram.com/aisholidays",
    youtube: "https://youtube.com/@aisholidays",
    twitter: "https://twitter.com/aisholidays",
    linkedin: "https://linkedin.com/company/aisholidays",
  },

  // Service verticals (from logo: Holidays | Events | Weddings)
  verticals: [
    { name: "Holidays", slug: "holidays", description: "Curated tour packages across India and the world." },
    { name: "Events", slug: "events", description: "Corporate events, conferences, MICE & celebrations." },
    { name: "Weddings", slug: "weddings", description: "Destination weddings planned end-to-end." },
  ],

  // Footer credits / partners
  partners: ["MakeMyTrip", "TripAdvisor", "Goibibo", "IRCTC", "IATA"],

  // Established year
  established: 2014,
} as const;

export type SiteConfig = typeof siteConfig;
