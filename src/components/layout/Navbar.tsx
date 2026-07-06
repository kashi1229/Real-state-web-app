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
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        isScrolled || !isHome
          ? 'bg-cream/95 shadow-sm backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <nav className="container-custom flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-800">
            <span className="text-lg font-bold text-brass">HR</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-lg font-bold leading-tight text-forest-800 font-serif">
              Harper & Reed
            </p>
            <p className="text-xs tracking-wider text-gray-500">REALTY</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-forest-800',
                location.pathname === link.href
                  ? 'text-forest-800'
                  : 'text-gray-600',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+15551234567"
            className="flex items-center gap-2 text-sm font-medium text-forest-800 transition-colors hover:text-forest-600"
          >
            <Phone className="h-4 w-4" />
            (555) 123-4567
          </a>
          <Button href="/contact" variant="primary" size="sm">
            Schedule a Consultation
          </Button>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="rounded-lg p-2 text-forest-800 transition-colors hover:bg-forest-50 lg:hidden"
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
