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
  const isDark = isHome && !isScrolled;

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
        isDark ? 'bg-forest-950/70 sm:backdrop-blur-md' : 'bg-cream/95 shadow-sm sm:backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-forest-800 sm:h-9 sm:w-9">
            <span className="text-xs font-bold text-brass sm:text-base">HR</span>
          </div>
          <div className="min-w-0 max-w-[110px] sm:max-w-none">
            <p className={cn('truncate text-xs font-bold leading-tight font-serif sm:text-base', isDark ? 'text-white' : 'text-forest-800')}>
              Harper & Reed
            </p>
            <p className={cn('truncate text-[9px] leading-tight tracking-wider sm:text-xs', isDark ? 'text-white/60' : 'text-gray-500')}>
              REALTY
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors relative',
                isDark ? 'hover:text-white' : 'hover:text-forest-800',
                location.pathname === link.href
                  ? isDark ? 'text-white' : 'text-forest-800'
                  : isDark ? 'text-white/70' : 'text-gray-600',
              )}
            >
              {link.label}
              {location.pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className={cn(
                    'absolute -bottom-1 left-0 right-0 h-0.5 rounded-full',
                    isDark ? 'bg-brass' : 'bg-forest-800',
                  )}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex lg:gap-4">
          <a
            href="tel:+15551234567"
            className={cn(
              'flex items-center gap-2 text-sm font-medium transition-colors',
              isDark ? 'text-white/70 hover:text-white' : 'text-forest-800 hover:text-forest-600',
            )}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden lg:inline">(555) 123-4567</span>
          </a>
          <Button href="/contact" variant="primary" size="sm">
            Schedule a Consultation
          </Button>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            'flex shrink-0 items-center justify-center rounded-lg p-1.5 transition-colors md:hidden',
            isDark
              ? 'bg-white/10 text-white active:bg-white/20'
              : 'bg-forest-100 text-forest-800 active:bg-forest-200',
          )}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 bg-cream shadow-lg md:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                      location.pathname === link.href
                        ? 'bg-forest-50 text-forest-800'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-forest-800',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 border-t border-gray-100 pt-4 pb-2">
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <Phone className="h-4 w-4 text-forest-600" />
                    (555) 123-4567
                  </a>
                </div>
                <Button href="/contact" variant="primary" size="md" className="mt-1 w-full">
                  Schedule a Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
