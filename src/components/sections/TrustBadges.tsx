import { ScrollReveal } from '../ui/ScrollReveal';

const badges = [
  { name: 'MLS', label: 'Multiple Listing Service' },
  { name: 'REALTOR', label: 'National Association of REALTORS' },
  { name: 'BBB', label: 'Better Business Bureau' },
  { name: 'NYR', label: 'New York State Realtors' },
  { name: 'EHO', label: 'Equal Housing Opportunity' },
];

export function TrustBadges() {
  return (
    <section className="border-y border-gray-200 bg-white py-8">
      <div className="container-custom">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {badges.map((badge) => (
              <div key={badge.name} className="flex flex-col items-center gap-1 text-center">
                <span className="text-lg font-bold uppercase tracking-widest text-forest-800">
                  {badge.name}
                </span>
                <span className="text-xs text-gray-400">{badge.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
