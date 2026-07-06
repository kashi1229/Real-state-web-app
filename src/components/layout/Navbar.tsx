import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/listings', label: 'Listings' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-500',
        isScrolled || !isHome
          ? 'bg-cream/95 shadow-sm backdrop-blur-md'
          : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm',
      )}
    >
      <nav className="container-custom flex h-20 items-center justify-between">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-800 sm:h-10 sm:w-10">
            <span className="text-base font-bold text-brass sm:text-lg">HR</span>
          </div>
          <div className="min-w-0">
            <p className={cn('truncate text-sm font-bold leading-tight font-serif sm:text-lg', isScrolled || !isHome ? 'text-forest-800' : 'text-white')}>
              Harper & Reed
            </p>
            <p className={cn('truncate text-[10px] tracking-wider sm:text-xs', isScrolled || !isHome ? 'text-gray-500' : 'text-white/60')}>REALTY</p>
          </div>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isScrolled || !isHome
                  ? 'hover:text-forest-800'
                  : 'hover:text-white',
                location.pathname === link.href
                  ? isScrolled || !isHome ? 'text-forest-800' : 'text-white'
                  : isScrolled || !isHome ? 'text-gray-600' : 'text-white/75',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+15551234567"
            className={cn(
              'flex items-center gap-2 text-sm font-medium transition-colors',
              isScrolled || !isHome
                ? 'text-forest-800 hover:text-forest-600'
                : 'text-white/80 hover:text-white',
            )}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">(555) 123-4567</span>
          </a>
          <Button href="/contact" variant="primary" size="sm" className="whitespace-nowrap">
            <span className="hidden sm:inline">Schedule a Consultation</span>
            <span className="sm:hidden">Consult</span>
          </Button>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            'rounded-lg p-2 transition-colors lg:hidden',
            isScrolled || !isHome
              ? 'text-forest-800 hover:bg-forest-50'
              : 'text-white hover:bg-white/10',
          )}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 bg-cream shadow-lg lg:hidden"
          >
            <div className="container-custom flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-base font-medium transition-colors hover:text-forest-800',
                    location.pathname === link.href
                      ? 'text-forest-800'
                      : 'text-gray-600',
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-4">
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 text-sm font-medium text-forest-800"
                >
                  <Phone className="h-4 w-4" />
                  (555) 123-4567
                </a>
              </div>
              <Button href="/contact" variant="primary" size="md" className="w-full">
                Schedule a Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
