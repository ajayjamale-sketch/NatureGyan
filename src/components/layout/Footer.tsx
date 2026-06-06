import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import logoImg from '@/assets/logo.jpg';

const footerLinks = {
  Platform: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ],
  Learn: [
    { label: 'Learn', href: '/learn' },
    { label: 'Biodiversity Courses', href: '/biodiversity-courses' },
    { label: 'Climate Education', href: '/climate-education' },
    { label: 'Wildlife Programs', href: '/wildlife-programs' },
    { label: 'Sustainability Hub', href: '/sustainability-hub' },
    { label: 'Research Library', href: '/research-library' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Partners', href: '/partners' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};

const social = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <img 
                src={logoImg} 
                alt="NatureGyan" 
                className="w-10 h-10 rounded-xl object-cover group-hover:scale-105 transition-transform" 
              />
              <div className="leading-tight">
                <span className="font-bold text-xl block leading-none">
                  <span className="text-primary">Nature</span>
                  <span className="text-gray-900 dark:text-white">Gyan</span>
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-none">
                  AI for Environmental Education
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-xs">
              AI-powered environmental education platform helping millions learn about biodiversity, wildlife, climate change, and sustainable living.
            </p>
            <div className="flex gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 text-gray-900 dark:text-white">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span>hello@naturegyan.in</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span>+91 80 4567 8900</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Bangalore, Karnataka, India</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © 2026 NatureGyan. All rights reserved. Made with care for the planet.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Empowering 2.4M+ learners across 180+ countries
          </p>
        </div>
      </div>
    </footer>
  );
}