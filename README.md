# AiS Holidays — Travel, Events & Weddings Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Live Website](https://img.shields.io/badge/Live-aisholidays.com-7CC242)](https://aisholidays.com/)

Production website for **AiS Holidays**, a Delhi-based travel, events, and destination-wedding business. The application combines a premium editorial interface with structured travel content, search-friendly destination pages, reusable package templates, and a validated enquiry workflow.

**[View the live website →](https://aisholidays.com/)**

![AiS Holidays — Holidays, Events & Weddings](public/og-image.jpg)

## Project highlights

- Built a responsive multi-service experience for holidays, corporate events, and destination weddings.
- Modelled domestic and international destinations as reusable, data-driven pages.
- Created dynamic tour-package routes with itinerary, pricing, inclusion, and enquiry sections.
- Implemented lead capture with Zod validation, Nodemailer SMTP delivery, and customer auto-replies.
- Added technical SEO foundations: metadata, canonical URLs, Open Graph, JSON-LD, sitemap, and robots rules.
- Developed a maintainable component system with centralized business configuration and content data.
- Deployed the production application on Hostinger's managed Node.js hosting.

## Technology

| Area | Implementation |
| --- | --- |
| Framework | Next.js 16 App Router, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS, responsive design tokens |
| Motion | Framer Motion, GSAP, Lenis |
| Validation | Zod |
| Email | Nodemailer over SMTP |
| SEO | Metadata API, JSON-LD, sitemap, robots.txt |
| Hosting | Hostinger managed Node.js |

## Architecture

```text
src/
├── app/                  # Routes, layouts, metadata and API endpoint
│   ├── api/enquiry/      # Validated lead-capture workflow
│   ├── domestic-tours/   # Destination listing and dynamic detail routes
│   ├── international-tours/
│   └── packages/[slug]/  # Data-driven package detail pages
├── components/
│   ├── home/             # Landing-page sections
│   ├── layout/           # Header, footer and navigation
│   └── shared/           # Reusable interactions and UI
├── config/site.ts        # Central brand and contact configuration
├── data/                 # Destination and package content models
└── lib/                  # Shared utilities
```

## Run locally

### Requirements

- Node.js 20.9+ (Node.js 22 LTS recommended)
- npm 10+

### Setup

```bash
git clone https://github.com/arman-hussain-developer/aisholidays-nextjs.git
cd aisholidays-nextjs
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The website renders without SMTP credentials. In that mode, valid development enquiries are logged server-side instead of being emailed.

### Environment variables

| Variable | Required in production | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical website URL and sitemap base |
| `SMTP_HOST` | Yes | SMTP server hostname |
| `SMTP_PORT` | Yes | SMTP port, normally `587` or `465` |
| `SMTP_USER` | Yes | SMTP account username |
| `SMTP_PASS` | Yes | SMTP password or provider app password |
| `MAIL_FROM` | Recommended | Verified sender address |
| `MAIL_TO` | Recommended | Enquiry recipient; defaults to `SMTP_USER` |
| `MAIL_CC` | No | Optional copy recipient |

Never commit `.env.local` or production credentials. Use `.env.example` only as a safe template.

## Quality checks

```bash
npm run lint
npm run build
```

The production build validates TypeScript, application routes, static generation, and deployment readiness.

## Deployment

1. Connect this repository to a Node.js-compatible host.
2. Configure the environment variables in the hosting dashboard.
3. Use `npm ci && npm run build` as the build workflow.
4. Start the application with `npm start` on Node.js 20.

The current production deployment is available at [aisholidays.com](https://aisholidays.com/).

## Author

**Arman Hussain** — Full Stack Web Developer

- [GitHub](https://github.com/arman-hussain-developer)
- [LinkedIn](https://www.linkedin.com/in/arman-developer/)
- [Email](mailto:armanphpdeveloper@gmail.com)

> This repository is presented as a portfolio case study. Brand assets and business content belong to their respective owner.
