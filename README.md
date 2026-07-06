# Harper & Reed Realty

> A production-grade real estate platform with smooth-scroll animations, interactive admin panel, and a warm, trustworthy brand experience.

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Demo Credentials](#demo-credentials)
- [Design System](#design-system)
- [Performance](#performance)
- [Browser Support](#browser-support)
- [License](#license)

---

## Overview

**Harper & Reed Realty** is a modern real estate web application built for a boutique brokerage. It showcases property listings with cinematic scroll animations, a fully functional admin panel for content management, and a carefully crafted design system that communicates trust and premium service.

The entire application runs client-side with mock data persisted to `localStorage` — no database or backend required.

### Live Demo

[View Demo](https://github.com/kashi1229/Real-state-web-app.git)

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://react.dev) | 19 | UI framework |
| [TypeScript](https://www.typescriptlang.org) | 6.0 | Type safety |
| [Vite](https://vite.dev) | 8 | Build tool and dev server |
| [React Router](https://reactrouter.com) | 7 | Client-side routing |

### Styling & Animations

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first styling |
| [GSAP](https://gsap.com) | 3.15 | Scroll-triggered parallax & animations |
| [Framer Motion](https://www.framer.com/motion) | 12 | UI micro-interactions & page transitions |
| [Lenis](https://lenis.studiofreight.com) | 1.3 | Smooth, inertia-based scrolling |

### UI & Utilities

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Lucide React](https://lucide.dev) | 1.23 | Icon library |
| [Recharts](https://recharts.org) | 3 | Admin analytics charts |
| [Sonner](https://sonner.emilkowal.ski) | 2 | Toast notifications |

---

## Features

### Public Site

- **Hero with parallax** — Full-viewport background image with GSAP scroll-driven parallax
- **Property listings** — Filterable, sortable grid of 12 mock properties with grid/list view toggle
- **Listing detail pages** — Image gallery, property specs, agent contact form
- **Animated counters** — Stats section with scroll-triggered counting animation
- **Testimonials carousel** — Client reviews with auto-play
- **Search & filter** — By location, price range, property type, beds, baths
- **Chat widget** — Floating assistant with predefined conversation flow
- **Valuation CTA form** — "What's My Home Worth?" with validation
- **Smooth scrolling** — Inertia-based Lenis scroll with arrow key support
- **ScrollReveal animations** — IntersectionObserver-based entrance animations
- **Responsive design** — Mobile-first with adaptive navigation

### Admin Panel (`/admin`)

- **Dashboard** — Stats overview with quick action buttons
- **Listings CRUD** — Add, edit, delete property listings with modal forms
- **Messages inbox** — Read, mark as read/unread, delete inquiries
- **Analytics** — Recharts visualizations for listing views and inquiries over time
- **Protected routes** — Authentication guard with localStorage session

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+ (or pnpm, yarn, bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/kashi1229/Real-state-web-app.git
cd Real-state-web-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
# Type-check and build
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── admin/              # Admin panel (Sidebar, Stats, Charts, Forms)
│   ├── filters/            # Search filter components
│   ├── layout/             # Navbar, Footer, PublicLayout, ChatWidget
│   ├── sections/           # Home page sections (Hero, Services, etc.)
│   └── ui/                 # Reusable primitives (Button, Modal, Card, etc.)
├── context/                # React Context providers (Auth, Listings, Messages)
├── data/                   # Mock data (listings, testimonials, market insights)
├── hooks/                  # Custom hooks (useLocalStorage, useMediaQuery)
├── lib/                    # Utility functions (formatting, ID generation)
├── pages/                  # Route-level page components
│   └── admin/              # Admin pages (Dashboard, Messages, Analytics)
├── types/                  # TypeScript interfaces and constants
├── assets/                 # Static assets (hero.png)
├── App.tsx                 # Root component with routing and providers
├── main.tsx                # Application entry point
└── index.css               # Tailwind theme and global styles
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Type-check with `tsc -b`, then build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run oxlint across the codebase |

---

## Demo Credentials

The admin panel uses hardcoded credentials for demonstration purposes:

| Field | Value |
|-------|-------|
| **Email** | `admin@harperreed.com` |
| **Password** | `Admin@123` |

Navigate to `/admin` to log in.

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `forest-800` | `#1a3c34` | Primary brand color, headings, buttons |
| `sand` | `#e8d5b7` | Secondary accent, backgrounds |
| `brass` | `#c9a96e` | Gold accent, highlights, CTAs |
| `charcoal` | `#2d2d2d` | Body text |
| `cream` | `#faf6f0` | Page background |

### Typography

- **Headlines**: Playfair Display (serif) — conveys trust and established heritage
- **Body**: Inter (sans-serif) — clean, readable, modern UI

### Animation Philosophy

| Technique | Where |
|-----------|-------|
| **GSAP ScrollTrigger** | Hero parallax (single instance for performance) |
| **Framer Motion** | Property cards, modals, chat widget, page transitions |
| **Lenis** | Global smooth scroll with inertia (0.08 lerp) |
| **IntersectionObserver + CSS** | Section entrance reveals (lightweight, no scroll cost) |

---

## Performance

The application is optimized for fast load times and smooth interactions:

| Metric | Detail |
|--------|--------|
| **Initial JS payload** | ~274 kB gzipped (down from 1 MB via route splitting) |
| **Code splitting** | All 11 routes lazy-loaded; admin pages load on demand |
| **Vendor chunking** | framer-motion, GSAP, recharts split into separate cacheable chunks |
| **Font loading** | Google Fonts deferred with `media="print"` swap pattern |
| **Scroll performance** | Single ScrollTrigger instance; `backdrop-blur` disabled on mobile |
| **Re-render prevention** | Context values memoized; navbar scroll handler RAF-throttled |

---

## Browser Support

Modern evergreen browsers (last 2 versions):

- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+
- Mobile Safari 17+
- Chrome for Android 120+

---

## License

MIT
