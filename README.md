# AI Services

Angular 19 + Tailwind v4 marketing site for **Gbaski AI Services** (`https://ai-services.com.ng`).

## What's included

- Homepage optimised for AI workflow automation, agents, CRM, and conversions
- Service / platform / solution landing pages (n8n, HubSpot, GoHighLevel, WhatsApp AI, etc.)
- Industry, location, case study, and blog pages (100 guides)
- Full nav, sticky CTA, Calendly embed, discovery dialog, lead magnet, pricing
- JSON-LD (Organization, Service, FAQ, HowTo, Article, Breadcrumb, Speakable)
- Generated `sitemap.xml` + prerender route list

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## SEO / build

```bash
npm run seo:index      # regenerate src/index.html meta + JSON-LD
npm run seo:routes     # regenerate sitemap + prerender-routes.txt
npm run build          # full prerender production build
```

Update your Calendly URL in `src/app/config/booking.config.ts` before go-live.

## Key paths

```
src/app/data/          # services, industries, locations, blog, nav, schema helpers
src/app/pages/         # home, service, industry, location, blog, case-study, about
src/app/components/    # header/nav, sticky CTA, page CTA, pricing, lead magnet
public/sitemap.xml     # generated, do not hand-edit
```
