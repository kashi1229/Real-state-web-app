import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { TestimonialCard } from '../ui/TestimonialCard';
import { testimonials } from '../../data/testimonials';
import { ScrollReveal } from '../ui/ScrollReveal';

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <ScrollReveal>
          <SectionTitle
            title="What Our Clients Say"
            subtitle="Real stories from real clients — your satisfaction is our greatest achievement"
          />
        </ScrollReveal>

        <div
          className="mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[320px]">
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 ${
                  i === activeIndex
                    ? 'translate-x-0 opacity-100'
                    : i < activeIndex
                      ? '-translate-x-full opacity-0'
                      : 'translate-x-full opacity-0'
                }`}
              >
                <TestimonialCard testimonial={testimonial} isActive={i === activeIndex} />
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-forest-800 hover:text-forest-800"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-forest-800' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-forest-800 hover:text-forest-800"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
