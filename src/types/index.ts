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
  createdAt: string;
  updatedAt: string;
}

export const TESTIMONIAL_ROLES = ['Buyer', 'Seller'] as const;
export type TestimonialRole = typeof TESTIMONIAL_ROLES[number];

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  role: TestimonialRole;
  avatar?: string;
  date: string;
}

export const MESSAGE_SUBJECTS = ['General Inquiry', 'Property Question', 'Selling Question', 'Valuation Request', 'Other'] as const;
export type MessageSubject = typeof MESSAGE_SUBJECTS[number];

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: MessageSubject;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface MarketInsight {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  slug: string;
  readTime: number;
}

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
  timestamp: string;
}

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

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
}
