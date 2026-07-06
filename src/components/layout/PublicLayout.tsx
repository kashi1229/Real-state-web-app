import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

gsap.registerPlugin(ScrollTrigger);

export function PublicLayout() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 35,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.tagName === 'SELECT';
      if (isInput) return;

      const step = (() => {
        switch (e.key) {
          case 'ArrowDown':
            return window.innerHeight * 0.5;
          case 'ArrowUp':
            return -window.innerHeight * 0.5;
          case 'PageDown':
            return window.innerHeight * 0.8;
          case 'PageUp':
            return -window.innerHeight * 0.8;
          case ' ':
            return window.innerHeight * 0.8;
          case 'Home':
            return 'top' as const;
          case 'End':
            return 'bottom' as const;
          default:
            return null;
        }
      })();

      if (step === null) return;
      e.preventDefault();

      if (step === 'top') {
        lenis.scrollTo(0);
      } else if (step === 'bottom') {
        lenis.scrollTo('bottom');
      } else {
        lenis.scrollTo(lenis.scroll + step);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      lenis.destroy();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
