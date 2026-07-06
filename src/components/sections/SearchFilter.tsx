import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { PropertyCard } from '../ui/PropertyCard';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { mockListings, NEIGHBORHOODS } from '../../data/listings';
import { LISTING_TYPES, DEFAULT_FILTERS } from '../../types';
import type { SearchFilters } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';

const typeOptions = [
  { value: '', label: 'All Types' },
  ...LISTING_TYPES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) })),
];

const neighborhoodOptions = [
  { value: '', label: 'All Neighborhoods' },
  ...NEIGHBORHOODS.map((n) => ({ value: n, label: n })),
];

export function SearchFilter() {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return mockListings.filter((l) => {
      if (filters.type && l.type !== filters.type) return false;
      if (filters.minPrice && l.price < filters.minPrice) return false;
      if (filters.maxPrice && l.price > filters.maxPrice) return false;
      if (filters.beds && l.beds < filters.beds) return false;
      if (filters.baths && l.baths < filters.baths) return false;
      if (filters.neighborhood && l.neighborhood !== filters.neighborhood) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        return (
          l.title.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filters]);

  return (
    <section className="bg-forest-50 py-20 md:py-28">
      <div className="container-custom">
        <ScrollReveal>
          <SectionTitle
            title="Find Your Perfect Home"
            subtitle="Search through our curated selection of premium properties"
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <Input
                  icon={Search}
                  placeholder="Search by address, city, or neighborhood..."
                  value={filters.query}
                  onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
                />
              </div>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setFilters(DEFAULT_FILTERS)}
              >
                Reset
              </Button>
            </div>

            {showFilters && (
              <div className="mt-4 grid gap-4 border-t border-gray-100 pt-4 md:grid-cols-4">
                <Select
                  label="Property Type"
                  options={typeOptions}
                  value={filters.type}
                  onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value as SearchFilters['type'] }))}
                />
                <Select
                  label="Neighborhood"
                  options={neighborhoodOptions}
                  value={filters.neighborhood}
                  onChange={(e) => setFilters((prev) => ({ ...prev, neighborhood: e.target.value }))}
                />
                <Select
                  label="Bedrooms"
                  options={[
                    { value: '0', label: 'Any' },
                    { value: '1', label: '1+' },
                    { value: '2', label: '2+' },
                    { value: '3', label: '3+' },
                    { value: '4', label: '4+' },
                    { value: '5', label: '5+' },
                  ]}
                  value={String(filters.beds)}
                  onChange={(e) => setFilters((prev) => ({ ...prev, beds: Number(e.target.value) }))}
                />
                <Select
                  label="Bathrooms"
                  options={[
                    { value: '0', label: 'Any' },
                    { value: '1', label: '1+' },
                    { value: '2', label: '2+' },
                    { value: '3', label: '3+' },
                    { value: '4', label: '4+' },
                  ]}
                  value={String(filters.baths)}
                  onChange={(e) => setFilters((prev) => ({ ...prev, baths: Number(e.target.value) }))}
                />
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-forest-800">{filtered.length}</span>
              {filtered.length === 1 ? 'property' : 'properties'} found
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 6).map((listing, i) => (
            <PropertyCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No properties match your current filters. Try adjusting your search criteria.
          </div>
        )}
      </div>
    </section>
  );
}
