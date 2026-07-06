import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { PropertyCard } from '../components/ui/PropertyCard';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { mockListings, NEIGHBORHOODS } from '../data/listings';
import { LISTING_TYPES, DEFAULT_FILTERS } from '../types';
import type { SearchFilters, ListingType, ListingStatus } from '../types';
import { cn } from '../lib/utils';

const typeOptions = [
  { value: '', label: 'All Types' },
  ...LISTING_TYPES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) })),
];

const neighborhoodOptions = [
  { value: '', label: 'All Neighborhoods' },
  ...NEIGHBORHOODS.map((n) => ({ value: n, label: n })),
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'for-sale', label: 'For Sale' },
  { value: 'for-rent', label: 'For Rent' },
  { value: 'pending', label: 'Pending' },
  { value: 'sold', label: 'Sold' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'beds-desc', label: 'Most Bedrooms' },
];

export function Listings() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>(() => ({
    ...DEFAULT_FILTERS,
    query: searchParams.get('q') || '',
  }));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(true);

  const sorted = useMemo(() => {
    let result = mockListings.filter((l) => {
      if (filters.type && l.type !== filters.type) return false;
      if (filters.status && l.status !== filters.status) return false;
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
          l.city.toLowerCase().includes(q) ||
          l.neighborhood.toLowerCase().includes(q)
        );
      }
      return true;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'beds-desc':
        result.sort((a, b) => b.beds - a.beds);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="pt-20">
      <div className="bg-forest-800 py-12 text-white">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="text-4xl font-bold md:text-5xl">Property Listings</h1>
            <p className="mt-3 text-lg text-gray-300">
              Discover your perfect home from our curated collection of premium properties
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className={`w-full shrink-0 lg:w-72 ${showFilters ? 'block' : 'hidden'}`}>
            <div className="sticky top-24 space-y-5 rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-charcoal">Filters</h3>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="text-sm text-forest-600 hover:text-forest-800"
                >
                  Reset
                </button>
              </div>

              <Input
                placeholder="Search..."
                value={filters.query}
                onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
              />

              <Select
                label="Property Type"
                options={typeOptions}
                value={filters.type}
                onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value as ListingType | '' }))}
              />

              <Select
                label="Status"
                options={statusOptions}
                value={filters.status}
                onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value as ListingStatus | '' }))}
              />

              <Select
                label="Neighborhood"
                options={neighborhoodOptions}
                value={filters.neighborhood}
                onChange={(e) => setFilters((prev) => ({ ...prev, neighborhood: e.target.value }))}
              />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">Min. Bedrooms</label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setFilters((prev) => ({ ...prev, beds: n }))}
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors',
                        filters.beds === n
                          ? 'bg-forest-800 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                      )}
                    >
                      {n || 'Any'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">Min. Bathrooms</label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => setFilters((prev) => ({ ...prev, baths: n }))}
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors',
                        filters.baths === n
                          ? 'bg-forest-800 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                      )}
                    >
                      {n || 'Any'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-forest-800 hover:text-forest-800 lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-forest-800">{sorted.length}</span> properties found
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-44"
                />
                <div className="hidden rounded-lg border border-gray-200 sm:flex">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn('p-2', viewMode === 'grid' ? 'bg-forest-50 text-forest-800' : 'text-gray-400')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn('p-2', viewMode === 'list' ? 'bg-forest-50 text-forest-800' : 'text-gray-400')}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium text-charcoal">No properties found</p>
                <p className="mt-2 text-gray-500">Try adjusting your filters to see more results.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className={cn(
                'grid gap-6',
                viewMode === 'grid'
                  ? 'sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1',
              )}>
                {sorted.map((listing, i) => (
                  <PropertyCard key={listing.id} listing={listing} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
