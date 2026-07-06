import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

export function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-8 shadow-sm transition-all duration-500 ${
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      <Quote className="mb-4 h-8 w-8 text-brass/40" />
      <p className="mb-6 text-lg leading-relaxed text-gray-600">"{testimonial.text}"</p>

      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating ? 'fill-brass text-brass' : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-100 text-sm font-semibold text-forest-800">
          {testimonial.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div>
          <p className="font-semibold text-charcoal">{testimonial.name}</p>
          <p className="text-sm text-gray-500">
            {testimonial.role} &middot; {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}
