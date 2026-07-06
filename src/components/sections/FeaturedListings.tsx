import { ArrowRight } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { PropertyCard } from '../ui/PropertyCard';
import { Button } from '../ui/Button';
import { getFeaturedListings } from '../../data/listings';

export function FeaturedListings() {
  const listings = getFeaturedListings();

  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <SectionTitle
          title="Featured Properties"
          subtitle="Hand-picked homes that exemplify the finest living in the greater metro area"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, i) => (
            <PropertyCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/listings" variant="outline" size="lg">
            View All Listings
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
