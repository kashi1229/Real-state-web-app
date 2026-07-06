import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  animation?: gsap.TweenVars;
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
  triggers?: unknown[];
}

export function useScrollAnimation<T extends HTMLElement>(options: ScrollAnimationOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 85%',
          toggleActions: options.toggleActions ?? 'play none none reverse',
          ...(options.scrub !== undefined ? { scrub: options.scrub } : {}),
        },
        ...options.animation,
      });
    });

    return () => ctx.revert();
  }, [options.triggers ?? []]);

  return ref;
}
