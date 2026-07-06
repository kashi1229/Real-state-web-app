import { Hero } from '../components/sections/Hero';
import { TrustBadges } from '../components/sections/TrustBadges';
import { FeaturedListings } from '../components/sections/FeaturedListings';
import { SearchFilter } from '../components/sections/SearchFilter';
import { AboutAgent } from '../components/sections/AboutAgent';
import { Services } from '../components/sections/Services';
import { TestimonialsCarousel } from '../components/sections/TestimonialsCarousel';
import { MarketInsights } from '../components/sections/MarketInsights';
import { ValuationCTA } from '../components/sections/ValuationCTA';

export function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedListings />
      <SearchFilter />
      <AboutAgent />
      <Services />
      <TestimonialsCarousel />
      <MarketInsights />
      <ValuationCTA />
    </>
  );
}
