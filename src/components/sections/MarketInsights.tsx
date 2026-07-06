import { Calendar, Clock } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';
import { marketInsights } from '../../data/marketInsights';
import { formatDate } from '../../lib/utils';

export function MarketInsights() {
  return (
    <section className="bg-forest-50 py-20 md:py-28">
      <div className="container-custom">
        <ScrollReveal>
          <SectionTitle
            title="Market Insights"
            subtitle="Stay informed with the latest real estate trends, guides, and neighborhood spotlights"
          />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {marketInsights.map((post, i) => (
            <ScrollReveal key={post.id} direction="up" delay={i * 0.1}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full bg-brass/10 px-3 py-1 text-xs font-medium text-brass">
                    {post.category}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-charcoal transition-colors group-hover:text-forest-800">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime} min read
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
