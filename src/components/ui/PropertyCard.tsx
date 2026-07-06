import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, ArrowUpRight } from 'lucide-react';
import type { Listing } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Badge, getBadgeVariant, getTagVariant } from './Badge';
import { Button } from './Button';

interface PropertyCardProps {
  listing: Listing;
  index?: number;
}

export function PropertyCard({ listing, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {listing.tags.map((tag) => (
          <Badge key={tag} variant={getTagVariant(tag)} className="absolute left-3 top-3">
            {tag === 'open-house' ? 'Open House' : tag}
          </Badge>
        ))}
        <Badge variant={getBadgeVariant(listing.status)} className="absolute right-3 top-3">
          {listing.status === 'for-sale' ? 'For Sale' : listing.status === 'for-rent' ? 'For Rent' : listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
        </Badge>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Button
            href={`/listings/${listing.slug}`}
            variant="primary"
            size="sm"
            className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            Quick View
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      <div className="p-5">
        <p className="text-xl font-bold text-forest-800">
          {listing.status === 'for-rent' ? `${formatCurrency(listing.price)}/mo` : formatCurrency(listing.price)}
        </p>
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{listing.address}, {listing.city}</span>
        </div>

        {(listing.beds > 0 || listing.baths > 0 || listing.sqft > 0) && (
          <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-sm text-gray-600">
            {listing.beds > 0 && (
              <span className="flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-forest-600" />
                {listing.beds} {listing.beds === 1 ? 'Bed' : 'Beds'}
              </span>
            )}
            {listing.baths > 0 && (
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-forest-600" />
                {listing.baths} {listing.baths === 1 ? 'Bath' : 'Baths'}
              </span>
            )}
            {listing.sqft > 0 && (
              <span className="flex items-center gap-1.5">
                <Square className="h-4 w-4 text-forest-600" />
                {listing.sqft.toLocaleString()} sqft
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
