import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Car,
  Ruler,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
} from 'lucide-react';
import { PropertyCard } from '../components/ui/PropertyCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge, getBadgeVariant, getTagVariant } from '../components/ui/Badge';
import { getListingBySlug, mockListings } from '../data/listings';
import { formatCurrency } from '../lib/utils';
import { useMessages } from '../context/MessagesContext';
import type { ContactFormData, MessageSubject } from '../types';
import { cn } from '../lib/utils';

export function ListingDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addMessage } = useMessages();
  const [activeImage, setActiveImage] = useState(0);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const listing = slug ? getListingBySlug(slug) : undefined;

  if (!listing) {
    return (
      <div className="pt-20">
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-charcoal">Listing Not Found</h1>
          <p className="mt-4 text-gray-500">The property you're looking for doesn't exist.</p>
          <Button href="/listings" variant="outline" size="md" className="mt-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Button>
        </div>
      </div>
    );
  }

  const similar = mockListings
    .filter((l) => l.id !== listing.id && (l.type === listing.type || l.city === listing.city))
    .slice(0, 3);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage({
      ...contactForm,
      subject: 'Property Question' as MessageSubject,
      message: contactForm.message || `Interested in: ${listing.title}`,
    });
    toast.success('Message sent! Sarah will get back to you shortly.');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-20">
      <div className="container-custom py-6">
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-forest-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Link>
      </div>

      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-white">
              <div className="aspect-[16/9]">
                <img
                  src={listing.images[activeImage]}
                  alt={listing.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((p) => (p - 1 + listing.images.length) % listing.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActiveImage((p) => (p + 1) % listing.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {listing.images.length > 1 && (
                <div className="flex gap-2 border-t border-gray-100 p-3">
                  {listing.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        'h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                        i === activeImage ? 'border-forest-800' : 'border-transparent opacity-60 hover:opacity-100',
                      )}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {listing.tags.map((tag) => (
                      <Badge key={tag} variant={getTagVariant(tag)}>{tag === 'open-house' ? 'Open House' : tag}</Badge>
                    ))}
                    <Badge variant={getBadgeVariant(listing.status)}>
                      {listing.status === 'for-sale' ? 'For Sale' : listing.status === 'for-rent' ? 'For Rent' : listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </Badge>
                  </div>
                  <h1 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
                    {listing.title}
                  </h1>
                </div>
                <p className="text-3xl font-bold text-forest-800">
                  {listing.status === 'for-rent'
                    ? `${formatCurrency(listing.price)}/mo`
                    : formatCurrency(listing.price)}
                </p>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{listing.address}, {listing.city}, {listing.state} {listing.zip}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 border-y border-gray-100 py-6">
                {listing.beds > 0 && (
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-forest-600" />
                    <div>
                      <p className="text-lg font-semibold text-charcoal">{listing.beds}</p>
                      <p className="text-xs text-gray-500">Bedrooms</p>
                    </div>
                  </div>
                )}
                {listing.baths > 0 && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-forest-600" />
                    <div>
                      <p className="text-lg font-semibold text-charcoal">{listing.baths}</p>
                      <p className="text-xs text-gray-500">Bathrooms</p>
                    </div>
                  </div>
                )}
                {listing.sqft > 0 && (
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5 text-forest-600" />
                    <div>
                      <p className="text-lg font-semibold text-charcoal">{listing.sqft.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Sq. Ft.</p>
                    </div>
                  </div>
                )}
                {listing.garage > 0 && (
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-forest-600" />
                    <div>
                      <p className="text-lg font-semibold text-charcoal">{listing.garage}</p>
                      <p className="text-xs text-gray-500">Garage</p>
                    </div>
                  </div>
                )}
                {listing.yearBuilt > 0 && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-forest-600" />
                    <div>
                      <p className="text-lg font-semibold text-charcoal">{listing.yearBuilt}</p>
                      <p className="text-xs text-gray-500">Year Built</p>
                    </div>
                  </div>
                )}
                {listing.lotSize > 0 && (
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-forest-600" />
                    <div>
                      <p className="text-lg font-semibold text-charcoal">{listing.lotSize}</p>
                      <p className="text-xs text-gray-500">Acres</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-charcoal">Description</h2>
                <p className="mt-3 leading-relaxed text-gray-600">{listing.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-charcoal">Agent</h2>
                <div className="mt-3 flex items-center gap-4">
                  <img
                    src={listing.agent.photo}
                    alt={listing.agent.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-charcoal">{listing.agent.name}</p>
                    <p className="text-sm text-gray-500">{listing.agent.email}</p>
                    <p className="text-sm text-gray-500">{listing.agent.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-charcoal">Interested in this property?</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Send us a message and we'll get back to you.
                </p>
                <form onSubmit={handleContact} className="mt-4 space-y-4">
                  <Input
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Your phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                  <textarea
                    placeholder="Your message (optional)"
                    value={contactForm.message}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-forest-800 focus:ring-2 focus:ring-forest-800/20"
                  />
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
                <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                  <a href="tel:+15551234567" className="flex items-center gap-2 text-sm text-gray-600 hover:text-forest-800">
                    <Phone className="h-4 w-4" />
                    (555) 123-4567
                  </a>
                  <a href="mailto:info@harperreed.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-forest-800">
                    <Mail className="h-4 w-4" />
                    info@harperreed.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="container-custom py-16">
          <h2 className="mb-8 text-2xl font-bold text-charcoal">Similar Properties</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((l, i) => (
              <PropertyCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
