import { Award, Home, Users, Star } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Counter } from '../ui/Counter';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';

export function AboutAgent() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <ScrollReveal>
          <SectionTitle
            title="Meet Sarah Harper"
            subtitle="Award-winning real estate professional dedicated to helping you find your place in the world"
            align="left"
          />
        </ScrollReveal>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&crop=face"
                  alt="Sarah Harper - Real Estate Agent"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-brass px-6 py-4 text-white shadow-lg">
                <p className="text-2xl font-bold">15+</p>
                <p className="text-sm opacity-90">Years of Excellence</p>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal direction="right">
              <p className="text-lg leading-relaxed text-gray-600">
                With over fifteen years of experience in the Northwood real estate market, I've had the
                privilege of helping hundreds of families find their perfect homes and sellers achieve
                exceptional results. My approach combines deep local market knowledge with a
                personalized, white-glove service that puts your needs first.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Whether you're a first-time buyer, a growing family looking for more space, or
                preparing to sell your cherished home, I bring meticulous attention to detail,
                skilled negotiation, and genuine care to every transaction.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-800">
                  Luxury Specialist
                </span>
                <span className="rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-800">
                  First-Time Buyer Expert
                </span>
                <span className="rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-800">
                  Relocation Specialist
                </span>
                <span className="rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-800">
                  Certified Appraiser
                </span>
              </div>
            </ScrollReveal>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <Counter end={15} suffix="+" label="Years in Business" icon={Award} />
              <Counter end={500} suffix="+" label="Homes Sold" icon={Home} />
              <Counter end={98} suffix="%" label="Client Satisfaction" icon={Star} />
              <Counter end={10} suffix="+" label="Areas Served" icon={Users} />
            </div>

            <ScrollReveal direction="up">
              <div className="mt-8">
                <Button href="/about" variant="outline" size="md">
                  Learn More About Sarah
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
