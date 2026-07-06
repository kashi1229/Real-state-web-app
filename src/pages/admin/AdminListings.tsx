import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge, getBadgeVariant } from '../../components/ui/Badge';
import { useListings } from '../../context/ListingsContext';
import { formatCurrency } from '../../lib/utils';
import { ListingForm } from '../../components/admin/ListingForm';
import type { Listing } from '../../types';

export function AdminListingsPage() {
  const { listings, deleteListing } = useListings();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingListing(null);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteListing(id);
    setDeleteConfirm(null);
    toast.success('Listing deleted successfully');
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingListing(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {listings.length} {listings.length === 1 ? 'listing' : 'listings'} total
        </p>
        <Button onClick={handleAdd} variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          Add Listing
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 font-medium text-gray-500">Property</th>
                <th className="px-6 py-3 font-medium text-gray-500">Price</th>
                <th className="px-6 py-3 font-medium text-gray-500">Type</th>
                <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500">Beds/Baths</th>
                <th className="px-6 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="h-10 w-14 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-charcoal">{listing.title}</p>
                        <p className="text-xs text-gray-400">{listing.address}, {listing.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-charcoal">
                    {listing.status === 'for-rent' ? `${formatCurrency(listing.price)}/mo` : formatCurrency(listing.price)}
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-500">{listing.type}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getBadgeVariant(listing.status)}>
                      {listing.status === 'for-sale' ? 'For Sale' : listing.status === 'for-rent' ? 'For Rent' : listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {listing.beds > 0 ? `${listing.beds} / ${listing.baths}` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(listing)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-forest-50 hover:text-forest-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(listing.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isFormOpen} onClose={handleFormClose} title={editingListing ? 'Edit Listing' : 'Add Listing'}>
        <ListingForm listing={editingListing} onClose={handleFormClose} />
      </Modal>

      <Modal isOpen={deleteConfirm !== null} onClose={() => setDeleteConfirm(null)} title="Delete Listing">
        <div className="space-y-4">
          <p className="text-gray-600">Are you sure you want to delete this listing? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="md" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
