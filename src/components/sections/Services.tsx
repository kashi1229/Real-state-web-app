import { Search, Handshake, TrendingUp, Truck } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';

const services = [
  {
    icon: Search,
    title: 'Buying a Home',
    description:
      'From neighborhood research to closing day, we guide you through every step of the home buying journey with market insight and personalized attention.',
    color: 'bg-forest-50 text-forest-800',
  },
  {
    icon: Handshake,
    title: 'Selling Your Home',
    description:
      'Maximize your home\'s value with professional staging, strategic pricing, targeted marketing, and skilled negotiation that gets you the best offer.',
    color: 'bg-sand-light text-charcoal',
  },
  {
    icon: TrendingUp,
    title: 'Market Analysis',
    description:
      'Data-driven comparative market analysis to help you make informed decisions, whether you\'re buying, selling, or investing in real estate.',
    color: 'bg-forest-50 text-forest-800',
  },
  {
    icon: Truck,
    title: 'Relocation Services',
    description:
      'Seamless relocation support for individuals and families moving to the area, including virtual tours, area orientation, and settlement assistance.',
    color: 'bg-sand-light text-charcoal',
  },
];

export function Services() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-custom">
        <ScrollReveal>
          <SectionTitle
            title="Why Work With Us"
            subtitle="Comprehensive real estate services tailored to your unique needs"
          />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} direction="up" delay={i * 0.1}>
              <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className={`mb-5 inline-flex rounded-xl p-3 ${service.color}`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-charcoal">{service.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
