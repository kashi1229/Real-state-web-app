import { type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

function getInitialTransform(direction: string, isVisible: boolean): string {
  if (isVisible) return 'translate3d(0,0,0) scale3d(1,1,1)';
  switch (direction) {
    case 'up': return 'translate3d(0,40px,0)';
    case 'down': return 'translate3d(0,-40px,0)';
    case 'left': return 'translate3d(40px,0,0)';
    case 'right': return 'translate3d(-40px,0,0)';
    default: return 'translate3d(0,40px,0)';
  }
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getInitialTransform(direction, isVisible),
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
