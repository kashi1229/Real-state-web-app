import { Award, Home, Users, Star, CheckCircle } from 'lucide-react';
import { Counter } from '../components/ui/Counter';
import { Button } from '../components/ui/Button';
import { ScrollReveal } from '../components/ui/ScrollReveal';

const credentials = [
  'Licensed Real Estate Broker — State of New York',
  'Certified Residential Specialist (CRS)',
  'Accredited Buyer\'s Representative (ABR)',
  'Senior Real Estate Specialist (SRES)',
  'Million Dollar Guild Award — 2022, 2023, 2024, 2025',
  'Five Star Professional Award — 8 consecutive years',
  'National Association of REALTORS® Member',
  'New York State Association of REALTORS®',
];

export function About() {
  return (
    <div className="pt-20">
      <div className="bg-forest-800 py-16 text-white">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="text-4xl font-bold md:text-5xl">About Sarah Harper</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-300">
              Dedicated to providing exceptional real estate services with integrity,
              expertise, and a personal touch.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <ScrollReveal direction="left">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&crop=face"
                  alt="Sarah Harper"
                  className="w-full object-cover"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <h2 className="text-3xl font-bold text-charcoal">A Lifetime of Local Knowledge</h2>
              <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Born and raised in Northwood, I've watched this community grow and evolve for over
                  four decades. There's no substitute for deep local knowledge — I know the school
                  districts, the commute patterns, the neighborhoods that fit every lifestyle, and
                  the hidden gems that only a local would know.
                </p>
                <p>
                  After earning my degree in Finance from Northwood University, I spent several years
                  in corporate finance before discovering my true passion: helping people find their
                  perfect home. I founded Harper & Reed Realty in 2010 with a simple mission —
                  provide white-glove service with uncompromising integrity.
                </p>
                <p>
                  Today, I lead a team of dedicated professionals who share my commitment to
                  excellence. Whether you're buying your first home, upgrading to your dream
                  property, or selling a home filled with memories, we treat every transaction
                  with the care and attention it deserves.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-forest-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Counter end={15} suffix="+" label="Years in Business" icon={Award} />
            <Counter end={500} suffix="+" label="Homes Sold" icon={Home} />
            <Counter end={98} suffix="%" label="Client Satisfaction" icon={Star} />
            <Counter end={10} suffix="+" label="Areas Served" icon={Users} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-charcoal">Credentials & Awards</h2>
            <p className="mt-2 text-gray-500">
              Professional certifications and industry recognition earned through years of dedication
            </p>
          </ScrollReveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {credentials.map((cred, i) => (
              <ScrollReveal key={cred} direction="up" delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
                  <span className="text-sm text-gray-700">{cred}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-50 py-16">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-charcoal">Ready to Work Together?</h2>
            <p className="mt-4 text-lg text-gray-500">
              Let's start your real estate journey with a conversation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Get in Touch
              </Button>
              <Button href="/listings" variant="outline" size="lg">
                Browse Properties
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
