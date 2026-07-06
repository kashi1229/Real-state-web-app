import { useState } from 'react';
import { toast } from 'sonner';
import { Calculator, ArrowRight } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useMessages } from '../../context/MessagesContext';
import type { ValuationFormData } from '../../types';

export function ValuationCTA() {
  const { addMessage } = useMessages();
  const [formData, setFormData] = useState<ValuationFormData>({
    address: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<ValuationFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ValuationFormData> = {};
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addMessage({
      name: formData.address,
      email: formData.email,
      phone: formData.phone,
      subject: 'Valuation Request',
      message: `Home valuation request for property at: ${formData.address}`,
    });

    setSubmitted(true);
    toast.success('Valuation request submitted! We\'ll be in touch within 24 hours.');
  };

  if (submitted) {
    return (
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-forest-800 to-forest-950 p-12 text-center text-white shadow-xl">
            <Calculator className="mx-auto mb-6 h-12 w-12 text-brass" />
            <h2 className="text-3xl font-bold">Thank You!</h2>
            <p className="mt-4 text-lg text-gray-300">
              Your valuation request has been received. Sarah will prepare a comprehensive market
              analysis and reach out within 24 hours.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="mt-8"
              onClick={() => {
                setSubmitted(false);
                setFormData({ address: '', email: '', phone: '' });
              }}
            >
              Request Another Valuation
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-forest-800 to-forest-950 shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-8 text-white md:p-12">
                <Calculator className="mb-6 h-10 w-10 text-brass" />
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  What's My Home Worth?
                </h2>
                <p className="mt-4 leading-relaxed text-gray-300">
                  Get a free, no-obligation home valuation from our expert team. We'll provide a
                  comprehensive market analysis based on recent sales, current market conditions,
                  and your property's unique features.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brass/20 text-xs text-brass">✓</span>
                    Free comprehensive market analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brass/20 text-xs text-brass">✓</span>
                    Response within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brass/20 text-xs text-brass">✓</span>
                    No obligation, no spam
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 p-8 backdrop-blur-sm md:p-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Property Address"
                    placeholder="123 Main Street, Northwood, NY"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    error={errors.address}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    error={errors.email}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    error={errors.phone}
                  />
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Get My Home Value
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
