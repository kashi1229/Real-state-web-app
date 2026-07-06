import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: LucideIcon;
  duration?: number;
}

export function Counter({ end, suffix = '', prefix = '', label, icon: Icon, duration = 2 }: CounterProps) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          const obj = { value: 0 };
          gsap.to(obj, {
            value: end,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              setDisplay(Math.floor(obj.value).toLocaleString());
            },
          });
        },
      });
    });

    return () => ctx.revert();
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
