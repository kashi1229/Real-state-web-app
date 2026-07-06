# Harper & Reed Realty — Architecture & Implementation Plan

> **Project**: Production-quality real estate agent demo website
> **Brand**: Harper & Reed Realty
> **Date**: 2026-07-06
> **Author**: Architecture Agent

---

## Table of Contents

1. [Current State Analysis](#1-current-state-analysis)
2. [Route Design](#2-route-design)
3. [Component Tree](#3-component-tree)
4. [Data Models (TypeScript Interfaces)](#4-data-models-typescript-interfaces)
5. [Data Flow & Persistence](#5-data-flow--persistence)
6. [File Structure](#6-file-structure)
7. [State Management](#7-state-management)
8. [Animation Strategy](#8-animation-strategy)
9. [Implementation Order](#9-implementation-order)
10. [Key Technical Decisions](#10-key-technical-decisions)
11. [Tailwind CSS 4 Theme Configuration](#11-tailwind-css-4-theme-configuration)

---

## 1. Current State Analysis

### Project Baseline
```
real-state/
├── index.html              # Vite shell — needs Google Fonts + meta tags
├── package.json            # React 19, TS 6, Vite 8, TW4, GSAP 3.15, FM 12, Lucide
├── vite.config.ts          # Minimal — only @vitejs/plugin-react
├── tsconfig.json
├── tsconfig.app.json       # verbatimModuleSyntax, noUnusedLocals, erasableSyntaxOnly
├── src/
│   ├── main.tsx            # Basic React root
│   ├── App.tsx             # Boilerplate counter (TO DELETE)
│   ├── App.css             # Boilerplate styles (TO DELETE)
│   ├── index.css           # Vite default theme (TO REPLACE)
│   └── assets/             # Vite boilerplate images
```

### Key Constraints from `tsconfig.app.json`

| Constraint | Impact |
|-----------|--------|
| `verbatimModuleSyntax: true` | Must use `import type { X }` for type-only imports |
| `erasableSyntaxOnly: true` | Cannot use `enum` — use `const` objects or union types |
| `noUnusedLocals: true` | Every variable must be used |
| `noUnusedParameters: true` | Prefix unused params with `_` |

### Packages to Install

```bash
npm install lenis sonner recharts
```

---

## 2. Route Design

```
Path                     Component         Auth  Layout     Description
──────────────────────────────────────────────────────────────────────────
/                        <Home>            ✗    Public      Landing page with all sections
/listings                <Listings>        ✗    Public      Filterable property grid
/listings/:id            <ListingDetail>   ✗    Public      Single property detail
/about                   <About>           ✗    Public      Agent bio, stats, credentials
/contact                 <Contact>         ✗    Public      Contact form + map placeholder
/admin                   <AdminLogin>      ✗    None        Login page → redirect if authed
/admin/dashboard         <AdminDashboard>  ✓    Admin       Stats overview
/admin/listings          <AdminListings>   ✓    Admin       CRUD listing management
/admin/messages          <AdminMessages>   ✓    Admin       Inbox for contact submissions
/admin/analytics         <AdminAnalytics>  ✓    Admin       Charts (recharts)
```

**Route configuration structure** (in `src/App.tsx`):

```tsx
<BrowserRouter>
  <Toaster position="top-right" richColors />
  <Routes>
    {/* Public routes — wrapped in Layout (Navbar + Footer + Lenis) */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/listings/:id" element={<ListingDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Route>

    {/* Admin login — no layout wrapper */}
    <Route path="/admin" element={<AdminLogin />} />

    {/* Admin protected routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/listings" element={<AdminListings />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
      </Route>
    </Route>

    {/* 404 fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>

  {/* Floating widgets — rendered outside routes so they persist */}
  <ChatWidget />
</BrowserRouter>
```

**`<PublicLayout />`** (uses `<Outlet />`):
- Initializes Lenis (smooth scroll)
- Registers GSAP ScrollTrigger with Lenis
- Renders `<Navbar />` then `<Outlet />` then `<Footer />`
- Manages scroll-to-top on route change

**`<ProtectedRoute />`**:
- Reads `AdminAuthContext`
- If not logged in, redirects to `/admin`
- Otherwise renders `<Outlet />`

**`<AdminLayout />`** (uses `<Outlet />`):
- Sidebar navigation + top header bar
- Content area renders `<Outlet />`

---

## 3. Component Tree

### Full Hierarchy

```
<App>
  ├── <Tooser />                          ← sonner toast container
  ├── <BrowserRouter>
  │   ├── <Routes>
  │   │   ├── <PublicLayout>              ← Navbar + Lenis init + Footer
  │   │   │   ├── <Home>
  │   │   │   │   ├── <Hero />            ← Parallax BG, search bar, CTAs
  │   │   │   │   ├── <TrustBadges />     ← MLS, Realtor, BBB, Local Board
  │   │   │   │   ├── <FeaturedListings /> ← 6 cards, GSAP stagger
  │   │   │   │   │   └── <PropertyCard /> (×6)
  │   │   │   │   ├── <SearchFilter />    ← Interactive filter demo
  │   │   │   │   │   └── <PropertyCard /> (filtered results)
  │   │   │   │   ├── <AboutAgent />      ← Photo, bio, animated counters
  │   │   │   │   │   └── <Counter /> (×4)
  │   │   │   │   ├── <Services />        ← 4-column service cards
  │   │   │   │   ├── <Testimonials />    ← Auto-rotating carousel
  │   │   │   │   │   └── <TestimonialCard />
  │   │   │   │   ├── <MarketInsights />  ← 3 blog preview cards
  │   │   │   │   └── <ValuationCTA />    ← Form section with validation
  │   │   │   │
  │   │   │   ├── <Listings>
  │   │   │   │   ├── <PageHeader />      ← Title + breadcrumb
  │   │   │   │   ├── <FilterSidebar />   ← Price, beds, baths, type, location
  │   │   │   │   ├── <ListingGrid />     ← Masonry/grid of PropertyCards
  │   │   │   │   │   └── <PropertyCard /> (×N)
  │   │   │   │   └── <Pagination />
  │   │   │   │
  │   │   │   ├── <ListingDetail>
  │   │   │   │   ├── <ImageGallery />    ← Main image + thumbnails
  │   │   │   │   ├── <PropertyDetails /> ← All listing info
  │   │   │   │   ├── <ContactAgentForm /> ← Sidebar form
  │   │   │   │   └── <SimilarListings /> ← 3 related cards
  │   │   │   │
  │   │   │   ├── <About>
  │   │   │   │   ├── <AboutHero />       ← Agent headshot + headline
  │   │   │   │   ├── <AgentStats />      ← Expanded stats row
  │   │   │   │   ├── <Credentials />     ← Certifications, awards
  │   │   │   │   └── <Philosophy />      ← Personal statement
  │   │   │   │
  │   │   │   └── <Contact>
  │   │   │       ├── <ContactInfo />     ← Address, phone, social links
  │   │   │       ├── <ContactForm />     ← Name, Email, Phone, Message
  │   │   │       └── <MapPlaceholder />  ← Styled div/map image
  │   │   │
  │   │   ├── <AdminLogin />              ← Login form, minimal
  │   │   │
  │   │   ├── <ProtectedRoute>
  │   │   │   └── <AdminLayout>
  │   │   │       ├── <AdminSidebar />    ← Nav links, active state
  │   │   │       ├── <AdminHeader />     ← Page title, user info, logout
  │   │   │       └── <Outlet />
  │   │   │
  │   │   ├── <AdminDashboard />
  │   │   │   ├── <StatsCard /> (×4)
  │   │   │   ├── <QuickActions />
  │   │   │   └── <RecentActivity />
  │   │   │
  │   │   ├── <AdminListings />
  │   │   │   ├── <ListingTable />        ← Sortable table (desktop) / cards (mobile)
  │   │   │   └── <ListingForm />         ← Modal/drawer for add/edit
  │   │   │
  │   │   ├── <AdminMessages />
  │   │   │   └── <MessageList />         ← Inbox with read/unread
  │   │   │
  │   │   └── <AdminAnalytics />
  │   │       └── <AnalyticsCharts />     ← recharts line/bar charts
  │   │
  │   └── <NotFound />                    ← 404 page
  │
  └── <ChatWidget />                      ← Fixed bottom-right, persistent across routes
```

### Component Details & Props

#### UI Components

| Component | File | Props | Notes |
|-----------|------|-------|-------|
| `Button` | `src/components/ui/Button.tsx` | `variant: 'primary' \| 'secondary' \| 'outline' \| 'ghost'`, `size: 'sm' \| 'md' \| 'lg'`, `children`, `onClick`, `disabled?`, `type?`, `className?` | Renders `<button>` or `<Link>` if `href` provided |
| `Input` | `src/components/ui/Input.tsx` | `label?`, `error?`, `icon?` (Lucide), plus standard HTML input props | Styled wrapper around `<input>` |
| `PropertyCard` | `src/components/ui/PropertyCard.tsx` | `listing: Listing`, `view: 'grid' \| 'list'` | Framer Motion hover lift + GSAP stagger via parent |
| `TestimonialCard` | `src/components/ui/TestimonialCard.tsx` | `testimonial: Testimonial`, `isActive: boolean` | Slide animation via Framer Motion |
| `Counter` | `src/components/ui/Counter.tsx` | `end: number`, `duration?: number`, `suffix?: string`, `label: string`, `icon?: LucideIcon` | GSAP animate counter |
| `SectionTitle` | `src/components/ui/SectionTitle.tsx` | `title: string`, `subtitle?: string`, `align?: 'left' \| 'center'` | Consistent section heading |
| `ScrollReveal` | `src/components/ui/ScrollReveal.tsx` | `children`, `direction?: 'up' \| 'down' \| 'left' \| 'right'`, `delay?: number`, `className?` | GSAP ScrollTrigger wrapper |

#### Layout Components

| Component | File | Notes |
|-----------|------|-------|
| `PublicLayout` | `src/components/layout/PublicLayout.tsx` | Initializes Lenis + GSAP + renders `<Outlet />` |
| `Navbar` | `src/components/layout/Navbar.tsx` | Responsive, scroll-aware (transparent→solid), mobile hamburger |
| `Footer` | `src/components/layout/Footer.tsx` | Multi-column, social links, disclaimer |
| `AdminLayout` | `src/components/admin/AdminLayout.tsx` | Sidebar + header + `<Outlet />` |
| `AdminSidebar` | `src/components/admin/AdminSidebar.tsx` | Nav links with active state |
| `AdminHeader` | `src/components/admin/AdminHeader.tsx` | Breadcrumb, user info, logout button |
| `ProtectedRoute` | `src/components/admin/ProtectedRoute.tsx` | Auth gate |

#### Section Components (Home Page)

| Component | File | GSAP? | Notes |
|-----------|------|-------|-------|
| `Hero` | `src/components/sections/Hero.tsx` | Parallax BG + CTA anims | Uses `useScrollAnimation` |
| `TrustBadges` | `src/components/sections/TrustBadges.tsx` | Scroll reveal | Logo row |
| `FeaturedListings` | `src/components/sections/FeaturedListings.tsx` | Stagger entrance | 6 PropertyCards |
| `SearchFilter` | `src/components/sections/SearchFilter.tsx` | Filter transitions | Interactive demo |
| `AboutAgent` | `src/components/sections/AboutAgent.tsx` | Animated counters | 4 stat counters |
| `Services` | `src/components/sections/Services.tsx` | Card stagger | 4 service cards |
| `Testimonials` | `src/components/sections/Testimonials.tsx` | Carousel (FM) | Auto-rotate |
| `MarketInsights` | `src/components/sections/MarketInsights.tsx` | Scroll reveal | 3 blog cards |
| `ValuationCTA` | `src/components/sections/ValuationCTA.tsx` | Form reveal | "What's My Home Worth?" |
| `ChatWidget` | `src/components/layout/ChatWidget.tsx` | Framer Motion | Floating, persistent |

---

## 4. Data Models (TypeScript Interfaces)

Located at `src/types/index.ts`.

> **Note**: Due to `erasableSyntaxOnly: true`, no `enum` types are used. All closed sets use `const` objects with union types derived via `(typeof X)[number]`.

```typescript
// ───── Listing ─────

export const LISTING_STATUSES = ['for-sale', 'pending', 'sold', 'for-rent'] as const;
export type ListingStatus = typeof LISTING_STATUSES[number];

export const LISTING_TYPES = ['house', 'condo', 'townhouse', 'apartment', 'land'] as const;
export type ListingType = typeof LISTING_TYPES[number];

export const LISTING_TAGS = ['new', 'open-house'] as const;
export type ListingTag = typeof LISTING_TAGS[number];

export interface ListingAgent {
  name: string;
  email: string;
  phone: string;
  photo: string;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: number;
  garage: number;
  yearBuilt: number;
  description: string;
  type: ListingType;
  status: ListingStatus;
  images: string[];
  featured: boolean;
  tags: ListingTag[];
  agent: ListingAgent;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  latitude?: number;
  longitude?: number;
}

// ───── Testimonial ─────

export const TESTIMONIAL_ROLES = ['Buyer', 'Seller'] as const;
export type TestimonialRole = typeof TESTIMONIAL_ROLES[number];

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;      // 1–5
  text: string;
  role: TestimonialRole;
  avatar?: string;
  date: string;        // ISO date string
}

// ───── Message (Contact Submission) ─────

export const MESSAGE_SUBJECTS = [
  'General Inquiry',
  'Property Question',
  'Selling Question',
  'Valuation Request',
  'Other',
] as const;
export type MessageSubject = typeof MESSAGE_SUBJECTS[number];

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: MessageSubject;
  message: string;
  read: boolean;
  createdAt: string;   // ISO date string
}

// ───── Market Insight / Blog Post ─────

export interface MarketInsight {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;        // ISO date string
  author: string;
  slug: string;
  readTime: number;    // minutes
}

// ───── Admin ─────

export interface AdminUser {
  email: string;
  name: string;
}

export interface AdminStats {
  totalListings: number;
  totalInquiries: number;
  newMessages: number;
  websiteVisits: number;
}

export interface AnalyticsDataPoint {
  month: string;
  inquiries: number;
  listingViews: number;
}

export interface ActivityItem {
  id: string;
  type: 'listing_created' | 'listing_updated' | 'listing_deleted' | 'message_received';
  description: string;
  timestamp: string;   // ISO date string
}

// ───── Forms ─────

export interface ValuationFormData {
  address: string;
  email: string;
  phone: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// ───── Search / Filters ─────

export interface SearchFilters {
  query: string;
  type: ListingType | '';
  minPrice: number;
  maxPrice: number;
  beds: number;
  baths: number;
  neighborhood: string;
  status: ListingStatus | '';
}

export const DEFAULT_FILTERS: SearchFilters = {
  query: '',
  type: '',
  minPrice: 0,
  maxPrice: 5_000_000,
  beds: 0,
  baths: 0,
  neighborhood: '',
  status: '',
};

// ───── Chat Widget ─────

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
}

export interface ChatOption {
  id: string;
  text: string;
  response: string;
  nextOptions: ChatOption[];
}
```

---

## 5. Data Flow & Persistence

### 5.1 Public Data Flow (Read-Only)

```
data/listings.ts ─────► Page (Home, Listings, ListingDetail)
                              │
                              ├── useMemo() → filtered list
                              └── props → Section/UI components
```

- All mock data lives in `src/data/*.ts` files
- Components import data directly
- Filtering is done via `useMemo` in the page component
- No persistence on the public side

### 5.2 Admin Data Flow (Read-Write with localStorage)

```
                         ┌──────────────────────────────────┐
                         │          localStorage             │
                         │  key: 'hr-listings'  (Listing[])  │
                         │  key: 'hr-messages'  (Message[])  │
                         │  key: 'hr-auth'       (JSON)      │
                         └──────────┬───────────────────────┘
                                    │
               ┌────────────────────┼────────────────────┐
               ▼                    ▼                    ▼
     ListingsContext           MessagesContext      AdminAuthContext
     (listings, CRUD)          (messages, ops)      (user, login, logout)
               │                    │                    │
               ▼                    ▼                    ▼
         AdminListings         AdminMessages          AdminLogin
         AdminDashboard         AdminDashboard        ProtectedRoute
```

**Initialization Flow (ListingsContext)**:
1. On mount, check `localStorage.getItem('hr-listings')`
2. If found → parse JSON → set as state
3. If not found → import mock data from `data/listings.ts` → set as state → write to localStorage
4. Any `addListing` / `updateListing` / `deleteListing` call updates both state and localStorage

**Messages Flow**:
1. Contact form submission from public pages → `MessagesContext.addMessage()`
2. `addMessage` pushes to state array + persists to `localStorage('hr-messages')`
3. Admin views/manages messages from context
4. Read/unread toggle and delete operations update both state and storage

**Auth Flow**:
1. Login form checks against hardcoded credentials (`admin@harperreed.com` / `Admin@123`)
2. On success → `AdminAuthContext.login(user)` → writes session to `localStorage('hr-auth')`
3. On logout → clears localStorage item → redirects to `/admin`
4. On page refresh → `AdminAuthContext` reads `localStorage('hr-auth')` to restore session

### 5.3 localStorage Key Conventions

| Key | Type | Purpose |
|-----|------|---------|
| `hr-listings` | `Listing[]` | Admin listing CRUD persistence |
| `hr-messages` | `Message[]` | Contact form submissions |
| `hr-auth` | `{ email: string; name: string }` | Admin session persistence |

All localStorage keys are prefixed with `hr-` to avoid collisions.

---

## 6. File Structure

```
src/
├── index.css                      # Tailwind v4 imports + @theme + global styles
├── main.tsx                       # React root + BrowserRouter
├── App.tsx                        # Route configuration, context wrappers
├── vite-env.d.ts                  # Vite client types
│
├── types/
│   └── index.ts                   # ALL TypeScript interfaces, type aliases, constants
│
├── lib/
│   └── utils.ts                   # cn(), formatCurrency(), formatDate(), slugify()
│
├── data/
│   ├── listings.ts                # 12 mock property listings
│   ├── testimonials.ts            # 6 mock testimonials
│   └── marketInsights.ts          # 3 mock blog entries
│
├── context/
│   ├── AdminAuthContext.tsx        # Login/logout, session persistence
│   ├── ListingsContext.tsx         # Listing CRUD with localStorage
│   └── MessagesContext.tsx         # Message management with localStorage
│
├── hooks/
│   ├── useScrollAnimation.ts      # GSAP ScrollTrigger ref hook
│   ├── useLocalStorage.ts         # Generic localStorage read/write hook
│   └── useMediaQuery.ts           # Responsive breakpoint detection
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── Counter.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   └── Select.tsx
│   │
│   ├── layout/
│   │   ├── PublicLayout.tsx        # Lenis + Navbar + Footer + Outlet
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ChatWidget.tsx          # Floating chat, always rendered
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── FeaturedListings.tsx
│   │   ├── SearchFilter.tsx
│   │   ├── AboutAgent.tsx
│   │   ├── Services.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── MarketInsights.tsx
│   │   └── ValuationCTA.tsx
│   │
│   ├── filters/
│   │   └── FilterSidebar.tsx       # Reusable for both Listings page & home SearchFilter
│   │
│   └── admin/
│       ├── AdminLayout.tsx
│       ├── AdminSidebar.tsx
│       ├── AdminHeader.tsx
│       ├── ProtectedRoute.tsx
│       ├── StatsCard.tsx
│       ├── QuickActions.tsx
│       ├── RecentActivity.tsx
│       ├── ListingTable.tsx
│       ├── ListingForm.tsx
│       ├── MessageList.tsx
│       └── AnalyticsCharts.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Listings.tsx
│   ├── ListingDetail.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── NotFound.tsx
│   └── admin/
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       ├── AdminListings.tsx
│       ├── AdminMessages.tsx
│       └── AdminAnalytics.tsx
│
└── assets/
    ├── hero-bg.jpg                 # Full-width hero background
    ├── agent-headshot.jpg          # Agent profile photo
    └── placeholder.jpg             # Placeholder for missing images
```

**Total: ~50 files** (excluding assets)

---

## 7. State Management

### 7.1 Context Architecture

```
<AdminAuthProvider>        ← wraps entire app (persists login)
  <ListingsProvider>       ← wraps admin routes (listing CRUD)
    <MessagesProvider>     ← wraps entire app (contact form from public side)
      <Router />
```

#### AdminAuthContext

| Detail | Value |
|--------|-------|
| **Scope** | Entire app |
| **File** | `src/context/AdminAuthContext.tsx` |
| **State** | `user: AdminUser \| null`, `isLoading: boolean` |
| **Exposes** | `login(email, password) => boolean`, `logout()`, `user`, `isAuthenticated` |
| **Persistence** | `localStorage('hr-auth')` — read on mount, cleared on logout |
| **Credentials** | Hardcoded: `admin@harperreed.com` / `Admin@123` |

#### ListingsContext

| Detail | Value |
|--------|-------|
| **Scope** | Admin routes only |
| **File** | `src/context/ListingsContext.tsx` |
| **State** | `listings: Listing[]` |
| **Exposes** | `listings`, `getListing(id)`, `addListing(data)`, `updateListing(id, data)`, `deleteListing(id)` |
| **Persistence** | `localStorage('hr-listings')` — CRUD operations sync immediately |
| **Fallback** | On first load with no localStorage, seeds from `data/listings.ts` |

#### MessagesContext

| Detail | Value |
|--------|-------|
| **Scope** | Entire app (public contact form writes, admin reads) |
| **File** | `src/context/MessagesContext.tsx` |
| **State** | `messages: Message[]` |
| **Exposes** | `messages`, `addMessage(data)`, `toggleRead(id)`, `deleteMessage(id)`, `unreadCount` |
| **Persistence** | `localStorage('hr-messages')` |

### 7.2 Local State Decisions

Use local `useState` (not context) for:

| Component | State | Reason |
|-----------|-------|--------|
| `Navbar` | `isMobileMenuOpen: boolean` | Component-specific UI toggle |
| `Hero` | `searchQuery: string` | Form input, no global need |
| `Listings` | `filters: SearchFilters`, `viewMode: 'grid'\|'list'` | Page-scoped filter state |
| `ListingDetail` | `activeImageIndex: number` | Gallery navigation |
| `TestimonialsCarousel` | `activeIndex: number` | Carousel position |
| `ValuationCTA` | `formData: ValuationFormData`, `submitted: boolean` | Form state |
| `Contact` | `formData: ContactFormData`, `submitted: boolean` | Form state |
| `AdminLogin` | `email, password, error: string` | Form state |
| `AdminListings` | `isFormOpen, editingListing` | UI toggles, modal state |
| `ChatWidget` | `isOpen: boolean`, `messages: ChatMessage[]` | Chat session state |

---

## 8. Animation Strategy

### 8.1 GSAP + ScrollTrigger (Heavy Lifting)

| Animation | Component | Trigger | Details |
|-----------|-----------|---------|---------|
| Hero parallax | `Hero` | Scroll | Background image moves slower than foreground |
| Hero text entrance | `Hero` | Page load | Staggered fade-in-up for headline, subtitle, CTA |
| Trust badge reveal | `TrustBadges` | Scroll | Each badge fades in with stagger |
| Featured listing stagger | `FeaturedListings` | Scroll | 6 cards fade-up in sequence |
| Counter animation | `AboutAgent` | Scroll | Numbers count from 0 → target |
| Service card stagger | `Services` | Scroll | 4 cards fade-up-left from alternating sides |
| Market insights reveal | `MarketInsights` | Scroll | Cards fade-up with delay |
| CTA form reveal | `ValuationCTA` | Scroll | Form elements slide-in |
| Footer entrance | `Footer` | Scroll | Column stagger |

**Implementation pattern** — `useScrollAnimation` hook:

```typescript
// hooks/useScrollAnimation.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: gsap.DOMTarget;
  animation?: gsap.TweenVars;
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = options.trigger
        ? (typeof options.trigger === 'string' ? document.querySelector(options.trigger) : options.trigger)
        : el;

      gsap.from(targets, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...options,
        },
        ...options.animation,
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
```

**Counter animation** — `Counter` component:

```typescript
// Uses GSAP's animate() to count from 0 to target value
useEffect(() => {
  if (!inView) return;  // controlled by IntersectionObserver or ScrollTrigger
  
  const obj = { value: 0 };
  gsap.to(obj, {
    value: end,
    duration: duration ?? 2,
    ease: 'power2.out',
    onUpdate: () => {
      setDisplay(Math.floor(obj.value).toLocaleString());
    },
  });
}, [inView, end]);
```

### 8.2 Framer Motion (Micro-Interactions)

| Animation | Component | Details |
|-----------|-----------|---------|
| Navbar mobile menu | `Navbar` | Slide-in from right with backdrop |
| PropertyCard hover | `PropertyCard` | Scale 1.03 + shadow lift + overlay button |
| Page transitions | `PublicLayout` | Fade in on route change via `AnimatePresence` |
| Testimonial carousel | `TestimonialsCarousel` | Slide x-transition between cards |
| Modal open/close | `Modal`, `ListingForm` | Scale+fade backdrop + content |
| Chat widget | `ChatWidget` | Slide-up panel, message bounce-in |
| Badge entrance | `Badge` | Gentle scale on mount |
| Button press | `Button` | Scale 0.97 on click |

**Page transition pattern**:

```tsx
// In PublicLayout
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <Outlet />
  </motion.div>
</AnimatePresence>
```

### 8.3 CSS Transitions (Simple Cases)

| Animation | Details |
|-----------|---------|
| Navbar background scroll | Transparent → solid white on scroll past hero |
| Filter hover states | `transition-colors` on filter options |
| Image gallery thumbnails | Active state border + scale |
| Sort/pagination hover | Background color transitions |
| Table row hover | Background tint |

### 8.4 Lenis Smooth Scrolling

```typescript
// In PublicLayout.tsx
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  // Connect GSAP ScrollTrigger to Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.destroy();
    gsap.ticker.lagSmoothing(1);
  };
}, []);
```

### 8.5 Animation Decision Matrix

| Criteria | Use |
|----------|-----|
| Scroll-triggered entrance | GSAP ScrollTrigger |
| Parallax | GSAP ScrollTrigger |
| Counter animation | GSAP |
| Route transitions | Framer Motion `AnimatePresence` |
| Hover effects (cards, buttons) | Framer Motion `whileHover` |
| Mobile menu | Framer Motion `animate` |
| Modal/dialog | Framer Motion |
| Carousel slide | Framer Motion |
| Simple opacity/color | CSS `transition` |
| Smooth scrolling | Lenis |

---

## 9. Implementation Order

### Phase 1: Foundation (Build First)
*No dependencies on other phases. Everything depends on this.*

| Step | Files | What to do |
|------|-------|------------|
| 1.1 | `src/index.css` | Replace entirely with Tailwind v4 `@import "tailwindcss"`, `@theme` block with all colors/fonts, and base reset styles |
| 1.2 | `index.html` | Add Google Fonts `<link>` (Playfair Display + Inter), update `<title>`, add meta description |
| 1.3 | Terminal | `npm install lenis sonner recharts` |
| 1.4 | `src/types/index.ts` | Create all interfaces, type aliases, and constants |
| 1.5 | `src/lib/utils.ts` | Create `cn()`, `formatCurrency()`, `formatDate()`, `slugify()` |
| 1.6 | `src/data/listings.ts` | Create 12 diverse mock listings with placeholder image URLs |
| 1.7 | `src/data/testimonials.ts` | Create 6 mock testimonials |
| 1.8 | `src/data/marketInsights.ts` | Create 3 mock blog entries |
| 1.9 | `src/hooks/useLocalStorage.ts` | Generic localStorage hook |
| 1.10 | `src/hooks/useScrollAnimation.ts` | GSAP ScrollTrigger ref hook |
| 1.11 | `src/hooks/useMediaQuery.ts` | Responsive breakpoint detection |
| 1.12 | `vite.config.ts` | Add Tailwind (`@tailwindcss/vite`) plugin — already present, verify |
| 1.13 | Cleanup | Delete `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg` |

### Phase 2: UI Components (Build Second)
*Depends on Phase 1 (types, utils, hooks)*

| Step | Files | Notes |
|------|-------|-------|
| 2.1 | `src/components/ui/Button.tsx` | Variant, size, icon support, `as={Link}` option |
| 2.2 | `src/components/ui/Input.tsx` | Label, error, icon, all HTML input types |
| 2.3 | `src/components/ui/Select.tsx` | Styled select dropdown |
| 2.4 | `src/components/ui/Badge.tsx` | Status badges (New, Open House, Sold, etc.) |
| 2.5 | `src/components/ui/PropertyCard.tsx` | Grid/list modes, Framer Motion hover, badge display |
| 2.6 | `src/components/ui/TestimonialCard.tsx` | Star rating, avatar, quote |
| 2.7 | `src/components/ui/Counter.tsx` | Animated number with GSAP |
| 2.8 | `src/components/ui/SectionTitle.tsx` | Consistent H2 + optional subtitle |
| 2.9 | `src/components/ui/ScrollReveal.tsx` | GSAP scroll-triggered reveal wrapper |
| 2.10 | `src/components/ui/Modal.tsx` | Framer Motion modal with backdrop |

### Phase 3: Layout + Routing (Build Third)
*Depends on Phase 2 (Button, etc.)*

| Step | Files | Notes |
|------|-------|-------|
| 3.1 | `src/components/layout/Navbar.tsx` | Responsive, scroll-aware, mobile hamburger |
| 3.2 | `src/components/layout/Footer.tsx` | Multi-column, social icons, disclaimer |
| 3.3 | `src/components/layout/PublicLayout.tsx` | Lenis init + Navbar + Outlet + Footer |
| 3.4 | `src/context/AdminAuthContext.tsx` | Auth provider |
| 3.5 | `src/context/ListingsContext.tsx` | Listing CRUD provider |
| 3.6 | `src/context/MessagesContext.tsx` | Messages provider |
| 3.7 | `src/App.tsx` | Route configuration with all context providers |
| 3.8 | `src/main.tsx` | Clean up — wrap App in providers |
| 3.9 | All `src/pages/*.tsx` | Create page shells (placeholder content, verify routing works) |

### Phase 4: Home Page Sections (Build Fourth)
*Depends on Phase 2 (UI components) + Phase 3 (layout)*

| Step | Component | Estimated complexity |
|------|-----------|---------------------|
| 4.1 | `Hero` | High — parallax, search bar, CTAs, GSAP animations |
| 4.2 | `TrustBadges` | Low — logo row with scroll reveal |
| 4.3 | `FeaturedListings` | Medium — 6 cards, stagger animation |
| 4.4 | `SearchFilter` | High — interactive filter demo with transitions |
| 4.5 | `AboutAgent` | Medium — photo, bio, 4 animated counters |
| 4.6 | `Services` | Medium — 4 cards, scroll stagger |
| 4.7 | `TestimonialsCarousel` | Medium — auto-rotate carousel |
| 4.8 | `MarketInsights` | Low — 3 blog preview cards |
| 4.9 | `ValuationCTA` | Medium — form with validation, toast on submit |

### Phase 5: Public Pages (Build Fifth)
*Depends on Phase 4 (reuses PropertyCard, UI components)*

| Step | Page | Notes |
|------|------|-------|
| 5.1 | `Listings.tsx` | Integrate FilterSidebar + ListingGrid + Pagination |
| 5.2 | `ListingDetail.tsx` | Image gallery, details panel, contact agent form |
| 5.3 | `About.tsx` | Extended agent bio — reuses Counter from Phase 4 |
| 5.4 | `Contact.tsx` | Contact form (writes to MessagesContext), map placeholder |
| 5.5 | `NotFound.tsx` | 404 page |

### Phase 6: Chat Widget (Build Sixth)
*Depends on Phase 3 (layout ready)*

| Step | Component | Notes |
|------|-----------|-------|
| 6.1 | `ChatWidget.tsx` | Floating button → slide-up panel → predefined conversation tree |

### Phase 7: Admin Panel (Build Seventh)
*Depends on Phase 2 (UI), Phase 3 (auth context, routing), Phase 5 (messages context)*

| Step | Component | Notes |
|------|-----------|-------|
| 7.1 | `ProtectedRoute.tsx` | Auth gate |
| 7.2 | `AdminLogin.tsx` | Login page |
| 7.3 | `AdminLayout.tsx` + `AdminSidebar.tsx` + `AdminHeader.tsx` | Layout shell |
| 7.4 | `StatsCard.tsx` | Dashboard stat display |
| 7.5 | `QuickActions.tsx` | Dashboard action buttons |
| 7.6 | `RecentActivity.tsx` | Activity feed |
| 7.7 | `AdminDashboard.tsx` | Assembles stats, actions, activity |
| 7.8 | `ListingTable.tsx` | Table/card view of listings |
| 7.9 | `ListingForm.tsx` | Add/edit modal form |
| 7.10 | `AdminListings.tsx` | Assembles table + form + delete confirm |
| 7.11 | `MessageList.tsx` | Inbox view with read/unread |
| 7.12 | `AdminMessages.tsx` | Assembles message list |
| 7.13 | `AnalyticsCharts.tsx` | recharts line + bar charts |
| 7.14 | `AdminAnalytics.tsx` | Assembles charts |

### Phase 8: Polish (Build Last)
*Depends on all previous phases*

| Step | What to do |
|------|-----------|
| 8.1 | Add Framer Motion page transitions to `PublicLayout` |
| 8.2 | Verify all GSAP animations work with React StrictMode double-render |
| 8.3 | Add toast notifications for: contact form submit, valuation submit, admin CRUD actions |
| 8.4 | Responsive testing at all breakpoints (375px, 768px, 1024px, 1440px) |
| 8.5 | Image optimization — use placeholder URLs that resolve (via picsum.photos or similar) |
| 8.6 | Accessibility audit — focus management, aria labels, semantic HTML |
| 8.7 | Performance — lazy load below-fold sections, code-split admin panel |

---

## 10. Key Technical Decisions

### 10.1 Why `AdminAuthContext` wraps entire app (not just admin routes)

Messages are written from the public contact form (any route) to `MessagesContext`, which should be available everywhere. And `AdminAuthContext` is needed by `ProtectedRoute`. Both contexts wrap early in the tree so routes can consume them regardless of nesting.

### 10.2 Why three separate contexts instead of one

Separation of concerns: authentication, listing data, and message data change independently. Combining them would cause unnecessary re-renders.

### 10.3 Image strategy (mock data)

All listing images use `https://picsum.photos/seed/{slug}/800/600` to generate unique, consistent placeholder images. The hero image and agent headshot use specific picsum IDs for repeatability.

### 10.4 No path aliases

`tsconfig.app.json` has no `paths` configured. All imports use relative paths (e.g., `../../types`). Path aliases could be added later but add config overhead.

### 10.5 Filtering is client-side

With only 12 mock listings, server-side filtering is unnecessary. The `Listings` page uses `useMemo` + array filters. This can be swapped for API calls when a backend is added.

### 10.6 erasableSyntaxOnly compliance

No `enum` keyword anywhere. All closed sets use:
```typescript
export const STATUSES = ['a', 'b'] as const;
export type Status = typeof STATUSES[number];
```

### 10.7 verbatimModuleSyntax compliance

Type-only imports use the `type` keyword:
```typescript
import type { Listing, SearchFilters } from '../../types';
import { formatCurrency } from '../../lib/utils';
```

### 10.8 Tailwind CSS 4 vs v3

Tailwind v4 uses CSS-first configuration. No `tailwind.config.js`. Theme is configured via `@theme` in CSS:
```css
@import "tailwindcss";
@theme {
  --color-forest-800: #1a3c34;
  /* ... */
}
```
Classes are used as `bg-forest-800`, `text-cream`, `font-serif`, etc.

---

## 11. Tailwind CSS 4 Theme Configuration

### `src/index.css` — Full Contents

```css
@import "tailwindcss";

/* ─── Custom Theme ─── */
@theme {
  /* Primary palette */
  --color-forest-50: #f0f7f4;
  --color-forest-100: #dceee4;
  --color-forest-200: #b9ddd0;
  --color-forest-300: #8fc4b2;
  --color-forest-400: #62a590;
  --color-forest-500: #428976;
  --color-forest-600: #326d5e;
  --color-forest-700: #2a584c;
  --color-forest-800: #1a3c34;
  --color-forest-900: #16312a;
  --color-forest-950: #0a1c18;

  --color-sand: #e8d5b7;
  --color-sand-light: #f0e3cd;
  --color-sand-dark: #d4bc98;

  --color-charcoal: #2d2d2d;
  --color-cream: #faf6f0;
  --color-brass: #c9a96e;
  --color-brass-light: #dcc39e;

  /* Typography */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}

/* ─── Base Layer ─── */
@layer base {
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: auto; /* Lenis handles smooth scroll */
  }

  body {
    @apply bg-cream text-charcoal font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif;
  }

  ::selection {
    @apply bg-forest-800 text-cream;
  }
}

/* ─── Component Layer ─── */
@layer components {
  .container-custom {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }
}
```

### `index.html` — Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

---

## Appendix A: Mock Data Shapes

### `data/listings.ts` — 12 listings

Each listing has:
- Unique `id` (uuid-style: `ls-001`)
- Mix of statuses: 8 `for-sale`, 2 `pending`, 1 `sold`, 1 `for-rent`
- Mix of types: 5 `house`, 3 `condo`, 2 `townhouse`, 1 `apartment`, 1 `land`
- 2–4 images each (picsum.photos with different seeds)
- 3 listings marked `featured: true`
- Price range: $250K–$2.8M
- Cities: "Northwood", "Westhaven", "Oakridge", "Southpointe", "Easton"
- Agent: "Sarah Harper" for all (primary agent), some with "James Reed" as secondary

### `data/testimonials.ts` — 6 testimonials

- Mix of buyers and sellers
- Ratings: 2× 5-star, 3× 4-star, 1× 5-star (all positive for demo)
- Names, locations, and realistic quotes

### `data/marketInsights.ts` — 3 articles

- "Should You Sell in Today's Market?" — Market trends, Q3 2026
- "First-Time Buyer Guide: 10 Steps to Your Dream Home" — Educational
- "Neighborhood Spotlight: Why Northwood is the Place to Be" — Local focus

---

## Appendix B: Key Implementation Notes

### GSAP + React StrictMode

React 19 StrictMode calls effects twice in development. GSAP handles this correctly if `ctx.revert()` is called in cleanup. All GSAP effects must return cleanup:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => { /* animations */ });
  return () => ctx.revert();
}, []);
```

### Lenis + GSAP Integration

Must be initialized once, destroyed on unmount of `PublicLayout`:

```typescript
const lenisRef = useRef<Lenis | null>(null);

useEffect(() => {
  const lenis = new Lenis({ /* ... */ });
  lenisRef.current = lenis;

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.destroy();
    gsap.ticker.lagSmoothing(1);
  };
}, []);
```

### sonner Toast Usage

```tsx
import { toast } from 'sonner';

// In contact form submit handler:
toast.success('Message sent successfully! We\'ll be in touch soon.');

// In admin CRUD:
toast.success('Listing created successfully');
toast.error('Failed to save listing');
```

### Admin Image Handling (Demo)

Listing form image uploads convert files to data URLs via `FileReader` and store them directly in the listing object. This keeps the demo self-contained without a server.

---

## Summary

| Metric | Count |
|--------|-------|
| Total files to create | ~50 |
| Implementation phases | 8 |
| Pages (public) | 5 |
| Pages (admin) | 5 |
| Context providers | 3 |
| Custom hooks | 3 |
| Home page sections | 9 |
| Admin components | 10 |
| UI components | 10 |
| GSAP animations | 9 |
| Framer Motion interactions | 8 |
