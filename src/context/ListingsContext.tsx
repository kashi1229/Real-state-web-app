import { createContext, useContext, useCallback, type ReactNode } from 'react';
import type { Listing } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockListings } from '../data/listings';
import { generateId, slugify } from '../lib/utils';

interface ListingsContextValue {
  listings: Listing[];
  getListing: (id: string) => Listing | undefined;
  addListing: (data: Omit<Listing, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => void;
  updateListing: (id: string, data: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
}

const ListingsContext = createContext<ListingsContextValue | undefined>(undefined);

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useLocalStorage<Listing[]>('hr-listings', mockListings);

  const getListing = useCallback(
    (id: string) => listings.find((l) => l.id === id),
    [listings],
  );

  const addListing = useCallback(
    (data: Omit<Listing, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      const newListing: Listing = {
        ...data,
        id: `ls-${generateId()}`,
        slug: slugify(data.title),
        createdAt: now,
        updatedAt: now,
      };
      setListings((prev) => [newListing, ...prev]);
    },
    [setListings],
  );

  const updateListing = useCallback(
    (id: string, data: Partial<Listing>) => {
      setListings((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, ...data, updatedAt: new Date().toISOString() } : l,
        ),
      );
    },
    [setListings],
  );

  const deleteListing = useCallback(
    (id: string) => {
      setListings((prev) => prev.filter((l) => l.id !== id));
    },
    [setListings],
  );

  return (
    <ListingsContext.Provider
      value={{ listings, getListing, addListing, updateListing, deleteListing }}
    >
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings(): ListingsContextValue {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error('useListings must be used within ListingsProvider');
  }
  return context;
}
