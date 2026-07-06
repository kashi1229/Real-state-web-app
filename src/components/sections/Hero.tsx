import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const neighborhoods = ['All Neighborhoods', 'Northwood', 'Westhaven', 'Oakridge', 'Southpointe', 'Easton'];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          y: '25%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 -top-1/2 -bottom-1/2">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
          alt="Luxury home"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-forest-950/60 to-transparent" />
      </div>

      <div ref={contentRef} className="container-custom relative z-10 pt-24 pb-20">
        <div className="max-w-2xl">
          <p className="mb-4 inline-block rounded-full bg-brass/20 px-4 py-1.5 text-sm font-medium text-brass-light backdrop-blur-sm">
            Northwood's Trusted Real Estate Partner Since 2010
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Your Trusted Guide to
            <span className="block text-brass">Northwood Real Estate</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
            With 15+ years of experience and over 500 homes sold, Sarah Harper brings
            unparalleled market knowledge, integrity, and dedication to every transaction.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/listings" variant="primary" size="lg">
              Browse Listings
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Schedule a Consultation
            </Button>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-300">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white outline-none backdrop-blur-sm focus:border-brass">
                  {neighborhoods.map((n) => (
                    <option key={n} value={n === 'All Neighborhoods' ? '' : n} className="text-charcoal">
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-300">Price Range</label>
              <select className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 py-3 pl-4 pr-4 text-sm text-white outline-none backdrop-blur-sm focus:border-brass">
                <option value="" className="text-charcoal">Any Price</option>
                <option value="0-500000" className="text-charcoal">$0 - $500,000</option>
                <option value="500000-1000000" className="text-charcoal">$500k - $1M</option>
                <option value="1000000-2000000" className="text-charcoal">$1M - $2M</option>
                <option value="2000000+" className="text-charcoal">$2M+</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <select className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 py-3 pl-4 pr-4 text-sm text-white outline-none backdrop-blur-sm focus:border-brass">
                <option value="" className="text-charcoal">Beds</option>
                <option className="text-charcoal">1+</option>
                <option className="text-charcoal">2+</option>
                <option className="text-charcoal">3+</option>
                <option className="text-charcoal">4+</option>
                <option className="text-charcoal">5+</option>
              </select>
            </div>
            <Button
              href="/listings"
              variant="primary"
              size="lg"
              className="flex w-full items-center justify-center gap-2 md:w-auto"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
