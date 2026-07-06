import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: LucideIcon;
  duration?: number;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function Counter({ end, suffix = '', prefix = '', label, icon: Icon, duration = 2 }: CounterProps) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const startTime = performance.now();
        let frameId: number;

        function animate(currentTime: number) {
          const elapsed = (currentTime - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutCubic(progress);
          const currentValue = Math.floor(easedProgress * end);

          setDisplay(currentValue.toLocaleString());

          if (progress < 1) {
            frameId = requestAnimationFrame(animate);
          }
        }

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      {Icon && <Icon className="h-6 w-6 text-brass" />}
      <p className="text-4xl font-bold text-forest-800">
        {prefix}{display}{suffix}
      </p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
