// All destinations data — easy to edit, type-safe

export type Destination = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  startingPrice: number;
  priceOnRequest?: boolean;

  type: "domestic" | "international";
  highlights: string[];
  content?: {                                      // 👈 NEW
    paragraphs?: string[];
    points?: string[];
    facts?: { label: string; value: string }[];
  };


};

export const destinations: Destination[] = [
  // ============== DOMESTIC ==============
  {
    slug: "himachal",
    name: "Himachal Pradesh",
    region: "North India",
    tagline: "Where pines whisper to passing clouds",
    description:
      "From Shimla's colonial charm to Manali's snow-capped peaks and Spiti's stark mountain monasteries — Himachal is India's mountain heart.",
    image: "/images/destinations/himachal.webp",
    startingPrice: 4500,
    type: "domestic",
    highlights: ["Manali", "Shimla", "Kasol", "Spiti Valley", "Dharamshala"],
    content: {
      paragraphs: [
        "Nestled in the lap of the Himalayas, Himachal Pradesh is a paradise for nature lovers, adventure seekers, and culture enthusiasts.",

      ],
      points: [
        "Colonial charm of Shimla and Mall Road walks",
        "Snow activities in Solang Valley, Manali",
        "Offbeat road trip to Spiti Valley",
        "Paragliding at Bir Billing",
      ],
      facts: [
        { label: "Best Time", value: "March to June, Dec-Jan for snow" },
        { label: "Ideal Duration", value: "5-7 days" },
        { label: "Nearest Airport", value: "Kullu (Bhuntar) / Chandigarh" },
        { label: "Famous For", value: "Hills, adventure, honeymoons" },
      ],
    },
  },

  {
    slug: "kashmir",
    name: "Kashmir",
    region: "North India",
    tagline: "Heaven on earth, written in chinar leaves",
    description:
      "Houseboats on Dal Lake, gondolas climbing Gulmarg's slopes, saffron fields in Pampore — Kashmir lives up to every legend.",
    image:
      "/images/kashmir.webp", // Local image (replace with your own)
    startingPrice: 11499,
    type: "domestic",
    highlights: ["Srinagar", "Gulmarg", "Pahalgam", "Sonmarg", "Doodhpathri"],
  },
  {
    slug: "kerala",
    name: "Kerala",
    region: "South India",
    tagline: "Slow drifts through God's own country",
    description:
      "Backwater houseboats, hill-station tea estates in Munnar, Ayurveda rituals, and beaches that catch the last light of the Arabian Sea.",
    image: "/images/destinations/kerala.webp",
    startingPrice: 13999,
    type: "domestic",
    highlights: ["Alleppey", "Munnar", "Cochin", "Thekkady", "Wayanad"],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    region: "West India",
    tagline: "Forts, dunes, and a desert that remembers",
    description:
      "Walk through Jaipur's pink courtyards, sleep in heritage havelis in Jaisalmer, and watch sunsets over Udaipur's lake palaces.",
    image: "/images/destinations/rajasthan.webp",
    startingPrice: 12999,
    type: "domestic",
    highlights: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Pushkar"],
  },
  {
    slug: "goa",
    name: "Goa",
    region: "West India",
    tagline: "Sun-bleached chapels and beach shacks",
    description:
      "From the quieter beaches of South Goa to the spirited markets of Anjuna and Baga — sea, susegad, and sundowners.",
    image: "/images/destinations/goa.webp",
    startingPrice: 0,
    priceOnRequest: true,
    type: "domestic",
    highlights: ["North Goa", "South Goa", "Old Goa", "Dudhsagar Falls"],
  },

  // ------------uttarakhand

  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    region: "North India",
    tagline: "Where the Ganga begins and the mountains pray",
    description:
      "Char Dham pilgrimages, valley walks in Auli, river-side mornings in Rishikesh, and Nainital's quiet lake evenings.",
    image: "/images/destinations/uttarakhand.webp",
    startingPrice: 7999,
    type: "domestic",
    highlights: ["Nainital", "Mussoorie", "Rishikesh", "Auli", "Jim Corbett"],
  },


  {
    slug: "north-east",
    name: "North East India",
    region: "East India",
    tagline: "Seven sisters, one slow rhythm",
    description:
      "Cherry blossoms in Shillong, root bridges in Meghalaya, tea estates in Assam, and monasteries in Tawang — India's last untouched frontier.",
    image:
      "/images/north-east-india.webp", // Local image (replace with your own)
    startingPrice: 13499,
    type: "domestic",
    highlights: ["Gangtok", "Darjeeling", "Shillong", "Cherrapunji", "Tawang"],
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    region: "West India",
    tagline: "White desert, blue cities, sacred shores",
    description:
      "The salt-white expanse of Rann, the Somnath–Dwarka pilgrim trail, the cobalt lanes of Jodhpur's cousin — Gujarat is quietly spectacular.",
    image:
      "/images/gujarat.jpg",
    startingPrice: 0,
    priceOnRequest: true,
    type: "domestic",
    highlights: ["Ahmedabad", "Dwarka", "Somnath", "Rann of Kutch", "Gir"],
  },

  {
    slug: "golden-triangle",
    name: "Golden Triangle",
    region: "North India",
    tagline: "Delhi · Agra · Jaipur — India's iconic trail",
    description:
      "Sunrise at the Taj Mahal, the pink-walled courtyards of Jaipur, and Delhi's layered history — the perfect first chapter of India for any traveller.",
    image: "/images/destinations/golden-triangle.webp",
    startingPrice: 14999,
    type: "domestic",
    highlights: ["Delhi", "Agra", "Jaipur", "Taj Mahal", "Amber Fort"],
  },
  {
    slug: "amarnath",
    name: "Amarnath",
    region: "North India",
    tagline: "Sacred ice lingam at 12,756 ft",
    description:
      "An annual Himalayan pilgrimage to the holy Amarnath cave — by helicopter or on foot, through trails of faith and snow.",
    image: "/images/destinations/amarnath.webp",
    startingPrice: 7500,
    type: "domestic",
    highlights: ["Srinagar", "Pahalgam", "Baltal", "Holy Cave", "Helicopter Yatra"],
  },
  // ============== INTERNATIONAL ==============
  // ─────────── THAILAND ───────────
  {
    slug: "thailand",
    name: "Thailand",
    region: "South East Asia",
    tagline: "Gilded temples, turquoise bays and sizzling street food",
    description:
      "From the golden spires of Bangkok's Wat Arun and the electric buzz of its night markets to the limestone-studded waters of the Andaman Sea and Pattaya's coral-fringed beaches — Thailand offers a seamless blend of culture, adventure and seaside ease that keeps travellers coming back every time.",
    image: "/images/destinations/thailand.webp",
    startingPrice: 32999,
    type: "international",
    highlights: ["Bangkok", "Pattaya", "Phuket", "Krabi", "Phi Phi Islands"],
  },

  // ─────────── DUBAI ───────────
  {
    slug: "dubai",
    name: "Dubai",
    region: "Middle East",
    tagline: "Towering skylines, golden dunes and tax-free luxury",
    description:
      "Where the world's tallest tower casts its shadow over a 16th-century gold souk, and a desert safari ends with a BBQ dinner under the Milky Way. Dubai is a city that reinvents superlatives daily — and a Dhow Cruise on the creek at night will make you believe every one of them.",
    image: "/images/destinations/dubai.webp",
    startingPrice: 45999,
    type: "international",
    highlights: ["Burj Khalifa", "Desert Safari", "Palm Jumeirah", "Dubai Marina", "Abu Dhabi"],
  },

  // ─────────── SINGAPORE ───────────
  {
    slug: "singapore",
    name: "Singapore",
    region: "South East Asia",
    tagline: "Futuristic gardens, hawker feasts and island adventures",
    description:
      "A city-state that packs world-class theme parks, Michelin-starred hawker stalls, colonial-era temples and the surreal glowing domes of Gardens by the Bay into an island you can cross in an hour. Singapore is the easiest, most seamless international trip you will ever take — and one of the most memorable.",
    image: "/images/destinations/singapore.webp",
    startingPrice: 52999,
    type: "international",
    highlights: ["Marina Bay", "Sentosa Island", "Night Safari", "Chinatown", "Little India"],
  },

  // ─────────── NEPAL ───────────
  {
    slug: "nepal",
    name: "Nepal",
    region: "South Asia",
    tagline: "Sacred summits, ancient stupas and Himalayan serenity",
    description:
      "The bells of Pashupatinath echo at dusk, prayer flags flutter over Boudhanath's great white dome, and across the lake at Pokhara the Annapurna range floats in perfect silence above the mist. Nepal is where the Himalayas become personal — and every traveller leaves a little changed.",
    image: "/images/destinations/nepal.webp",
    startingPrice: 19999,
    type: "international",
    highlights: ["Kathmandu", "Pokhara", "Pashupatinath", "Nagarkot", "Manakamana Temple"],
  },

  // ─────────── HONG KONG ───────────
  {
    slug: "hong-kong",
    name: "Hong Kong",
    region: "East Asia",
    tagline: "Harbour lights, dim-sum dawns and theme-park thrills",
    description:
      "Ride the historic Peak Tram to Victoria Peak for one of the world's most dramatic cityscapes, wander the lantern-lit lanes of Kowloon's night market, then cross to Lantau Island for the serene Tian Tan Buddha above the clouds. Hong Kong is shopping, spectacle and soul — all in one extraordinary harbour city.",
    image: "/images/destinations/hong-kong.webp",
    startingPrice: 58999,
    type: "international",
    highlights: ["Victoria Peak", "Disneyland", "Ocean Park", "Lantau Island", "Avenue of Stars"],
  },
];

// Helpers
export const domesticDestinations = destinations.filter((d) => d.type === "domestic");
export const internationalDestinations = destinations.filter((d) => d.type === "international");
export const getDestinationBySlug = (slug: string) =>
  destinations.find((d) => d.slug === slug);
