import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useListings } from '../../context/ListingsContext';
import { LISTING_TYPES, LISTING_STATUSES } from '../../types';
import type { Listing } from '../../types';

const typeOptions = LISTING_TYPES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }));
const statusOptions = LISTING_STATUSES.map((s) => ({
  value: s,
  label: s === 'for-sale' ? 'For Sale' : s === 'for-rent' ? 'For Rent' : s.charAt(0).toUpperCase() + s.slice(1),
}));

interface FormData {
  title: string;
  price: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: string;
  baths: string;
  sqft: string;
  description: string;
  type: string;
  status: string;
  images: string;
  neighborhood: string;
  garage: string;
  yearBuilt: string;
  lotSize: string;
}

interface ListingFormProps {
  listing: Listing | null;
  onClose: () => void;
}

export function ListingForm({ listing, onClose }: ListingFormProps) {
  const { addListing, updateListing } = useListings();
  const [formData, setFormData] = useState<FormData>({
    title: listing?.title || '',
    price: listing?.price.toString() || '',
    address: listing?.address || '',
    city: listing?.city || '',
    state: listing?.state || 'NY',
    zip: listing?.zip || '',
    beds: listing?.beds.toString() || '0',
    baths: listing?.baths.toString() || '0',
    sqft: listing?.sqft.toString() || '0',
    description: listing?.description || '',
    type: listing?.type || 'house',
    status: listing?.status || 'for-sale',
    images: listing?.images[0] || '',
    neighborhood: listing?.neighborhood || '',
    garage: listing?.garage.toString() || '0',
    yearBuilt: listing?.yearBuilt.toString() || '0',
    lotSize: listing?.lotSize.toString() || '0',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      price: Number(formData.price),
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      sqft: Number(formData.sqft),
      description: formData.description,
      type: formData.type as Listing['type'],
      status: formData.status as Listing['status'],
      images: [formData.images || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'],
      featured: listing?.featured || false,
      tags: [],
      agent: listing?.agent || {
        name: 'Sarah Harper',
        email: 'sarah@harperreed.com',
        phone: '(555) 123-4567',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      },
      neighborhood: formData.neighborhood,
      garage: Number(formData.garage),
      yearBuilt: Number(formData.yearBuilt),
      lotSize: Number(formData.lotSize),
    };

    if (listing) {
      updateListing(listing.id, data);
      toast.success('Listing updated successfully');
    } else {
      addListing(data);
      toast.success('Listing created successfully');
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <Input
          label="Price ($)"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
          required
        />
        <Select
          label="Status"
          options={statusOptions}
          value={formData.status}
          onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
        />
        <Input
          label="Address"
          value={formData.address}
          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
          required
        />
        <Input
          label="Neighborhood"
          value={formData.neighborhood}
          onChange={(e) => setFormData((prev) => ({ ...prev, neighborhood: e.target.value }))}
        />
        <Input
          label="City"
          value={formData.city}
          onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="State"
            value={formData.state}
            onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
          />
          <Input
            label="ZIP"
            value={formData.zip}
            onChange={(e) => setFormData((prev) => ({ ...prev, zip: e.target.value }))}
          />
        </div>
        <Select
          label="Type"
          options={typeOptions}
          value={formData.type}
          onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Beds"
          type="number"
          value={formData.beds}
          onChange={(e) => setFormData((prev) => ({ ...prev, beds: e.target.value }))}
        />
        <Input
          label="Baths"
          type="number"
          value={formData.baths}
          onChange={(e) => setFormData((prev) => ({ ...prev, baths: e.target.value }))}
        />
        <Input
          label="Sq. Ft."
          type="number"
          value={formData.sqft}
          onChange={(e) => setFormData((prev) => ({ ...prev, sqft: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Garage"
          type="number"
          value={formData.garage}
          onChange={(e) => setFormData((prev) => ({ ...prev, garage: e.target.value }))}
        />
        <Input
          label="Year Built"
          type="number"
          value={formData.yearBuilt}
          onChange={(e) => setFormData((prev) => ({ ...prev, yearBuilt: e.target.value }))}
        />
        <Input
          label="Lot Size (Acres)"
          type="number"
          step="0.01"
          value={formData.lotSize}
          onChange={(e) => setFormData((prev) => ({ ...prev, lotSize: e.target.value }))}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">Image URL</label>
        <Input
          placeholder="https://images.unsplash.com/..."
          value={formData.images}
          onChange={(e) => setFormData((prev) => ({ ...prev, images: e.target.value }))}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          rows={4}
          required
          className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-forest-800 focus:ring-2 focus:ring-forest-800/20"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" size="md" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="md">
          {listing ? 'Update Listing' : 'Create Listing'}
        </Button>
      </div>
    </form>
  );
}
