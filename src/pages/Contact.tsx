import { useState } from 'react';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { useMessages } from '../context/MessagesContext';
import { MESSAGE_SUBJECTS } from '../types';
import type { ContactFormData, MessageSubject } from '../types';

const subjectOptions = MESSAGE_SUBJECTS.map((s) => ({ value: s, label: s }));

export function Contact() {
  const { addMessage } = useMessages();
  const [formData, setFormData] = useState<ContactFormData & { subject: MessageSubject }>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(formData);
    toast.success('Message sent successfully! We\'ll be in touch soon.');
    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="pt-20">
      <div className="bg-forest-800 py-16 text-white">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="text-4xl font-bold md:text-5xl">Get in Touch</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-300">
              Ready to start your real estate journey? We'd love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-1">
              <ScrollReveal direction="left">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-50">
                      <Phone className="h-5 w-5 text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Phone</h3>
                      <a href="tel:+15551234567" className="text-sm text-gray-500 hover:text-forest-800">
                        (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-50">
                      <Mail className="h-5 w-5 text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Email</h3>
                      <a href="mailto:info@harperreed.com" className="text-sm text-gray-500 hover:text-forest-800">
                        info@harperreed.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-50">
                      <MapPin className="h-5 w-5 text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Office</h3>
                      <p className="text-sm text-gray-500">Serving the Greater Metro Area</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-50">
                      <Clock className="h-5 w-5 text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Hours</h3>
                      <p className="text-sm text-gray-500">Mon–Fri: 9 AM – 7 PM</p>
                      <p className="text-sm text-gray-500">Sat: 10 AM – 5 PM</p>
                      <p className="text-sm text-gray-500">Sun: By appointment</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-2">
              <ScrollReveal direction="right">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-charcoal">Send Us a Message</h2>
                  <p className="mt-2 text-gray-500">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Your Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                      <Select
                        label="Subject"
                        options={subjectOptions}
                        value={formData.subject}
                        onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value as MessageSubject }))}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-charcoal">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        rows={5}
                        required
                        placeholder="Tell us about your real estate needs..."
                        className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-forest-800 focus:ring-2 focus:ring-forest-800/20"
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
