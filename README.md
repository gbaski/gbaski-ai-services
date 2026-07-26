# AI Services

A dark, minimalist landing page for **AI Services** — reverse-engineered from the [Rizq Framer template](https://rizq.framer.website/) aesthetic. Built with **Angular 19** and **Tailwind CSS v4**.

## Features

- Two-column hero with headline, CTAs, and parallax rock graphic
- Fixed header with navigation and pill CTA
- Partner logo strip
- Full page sections: Platform, Testimonials, Why, Benefits, Capabilities, FAQs
- Framer-style animations: text reveal, fade/scale, scroll-triggered reveals, hover effects
- Smooth scrolling via Lenis
- Fully responsive (stacks on mobile)

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## Build

```bash
ng build
```

Production output is written to `dist/ai-services/`.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Fixed nav + logo + Free Trial CTA
│   │   ├── hero/            # Two-column hero with rock graphic
│   │   ├── logo-strip/      # Muted partner logos
│   │   ├── sections/        # Platform, testimonials, why, benefits, capabilities, FAQ
│   │   └── footer/
│   ├── directives/
│   │   └── scroll-reveal.directive.ts
│   ├── services/
│   │   └── smooth-scroll.service.ts
│   └── app.component.*
├── styles.css               # Tailwind + global animations
└── index.html
```

## Animations

| Animation | Where | Technique |
|-----------|-------|-----------|
| Text reveal (mask slide up + fade) | Hero headline & subtext | `.reveal-mask` + `@keyframes revealUp` |
| Graphic fade/scale | Hero rock image | CSS `@keyframes fadeScale` |
| Staggered logo fade-in | Partner logo strip | CSS `animation-delay` |
| Button hover lift | Pill CTAs | CSS `transform` + opacity |
| Scroll parallax | Hero rock graphic | Lenis scroll callback |
| Mouse parallax | Hero rock graphic | `mousemove` listener |
| Scroll-triggered reveals | All sections | `IntersectionObserver` directive |
| FAQ accordion | FAQ section | CSS `max-height` transition |
| Header blur on scroll | Navigation | Scroll position class toggle |

## Limitations

- Rock graphic uses an Unsplash placeholder image (not a custom 3D render)
- Partner logos are text/icon placeholders, not real brand assets
- CTAs link to in-page anchors; no backend or form integration
- Mobile nav is a simple overlay (no animated drawer)
