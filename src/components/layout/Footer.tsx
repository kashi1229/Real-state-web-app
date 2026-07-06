import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Listings', href: '/listings' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Buy a Home', href: '/listings' },
      { label: 'Sell Your Home', href: '/contact' },
      { label: 'Home Valuation', href: '/contact' },
      { label: 'Market Analysis', href: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Buyer Guide', href: '/about' },
      { label: 'Seller Guide', href: '/about' },
      { label: 'Market Insights', href: '/' },
      { label: 'FAQ', href: '/about' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-forest-950 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brass">
                <span className="text-lg font-bold text-forest-950">HR</span>
              </div>
              <div>
                <p className="text-xl font-bold text-white font-serif">Harper & Reed</p>
                <p className="text-xs tracking-wider text-gray-400">REALTY</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400">
              With over 15 years of experience serving the greater metro area, Harper & Reed Realty
              is your trusted partner in finding the perfect home or selling your property for the
              best value.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-800 text-gray-400 transition-colors hover:bg-forest-700 hover:text-white" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-800 text-gray-400 transition-colors hover:bg-forest-700 hover:text-white" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.83 2.013 9.942 2 12.315 2zm0 1.802c-2.36 0-2.64.01-3.574.052-.853.04-1.316.181-1.624.301a3.077 3.077 0 00-1.138.739 3.077 3.077 0 00-.739 1.138c-.12.308-.262.771-.302 1.624-.042.934-.052 1.214-.052 3.574s.01 2.64.052 3.574c.04.853.182 1.316.302 1.624.163.416.405.788.739 1.138.35.334.722.576 1.138.739.308.12.771.262 1.624.302.934.042 1.214.052 3.574.052s2.64-.01 3.574-.052c.853-.04 1.316-.182 1.624-.302a3.077 3.077 0 001.138-.739 3.077 3.077 0 00.739-1.138c.12-.308.262-.771.302-1.624.042-.934.052-1.214.052-3.574s-.01-2.64-.052-3.574c-.04-.853-.182-1.316-.302-1.624a3.077 3.077 0 00-.739-1.138 3.077 3.077 0 00-1.138-.739c-.308-.12-.771-.262-1.624-.302-.934-.042-1.214-.052-3.574-.052zM12.315 6.54a5.46 5.46 0 110 10.92 5.46 5.46 0 010-10.92zm0 1.802a3.658 3.658 0 100 7.316 3.658 3.658 0 000-7.316zm5.76-.684a1.278 1.278 0 11-2.556 0 1.278 1.278 0 012.556 0z"/></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-800 text-gray-400 transition-colors hover:bg-forest-700 hover:text-white" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-forest-800 pt-8">
          <div className="flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                Serving the Greater Metro Area
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" />
                (555) 123-4567
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                info@harperreed.com
              </span>
            </div>
            <p>&copy; {new Date().getFullYear()} Harper & Reed Realty. All rights reserved.</p>
          </div>
          <div className="mt-4 border-t border-forest-800/50 pt-4 text-xs leading-relaxed text-gray-500">
            <p>
              ML&S; and the ML&S; logo are registered trademarks of the National Association of
              REALTORS®. Harper & Reed Realty is a licensed real estate broker in the State of New
              York. Equal Housing Opportunity. All information is deemed reliable but not guaranteed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
