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
    { label: 'Biodiversity Courses', href: '/features' },
    { label: 'Climate Education', href: '/features' },
    { label: 'Wildlife Programs', href: '/features' },
    { label: 'Sustainability Hub', href: '/features' },
    { label: 'Research Library', href: '/features' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/about' },
    { label: 'Press', href: '/about' },
    { label: 'Partners', href: '/about' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/privacy' },
    { label: 'Accessibility', href: '/about' },
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
    <footer style={{ backgroundColor: '#0d1117' }} className="text-white">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <img src={logoImg} alt="NatureGyan" className="w-10 h-10 rounded-xl object-cover group-hover:scale-105 transition-transform" />
              <div className="leading-tight">
                <span className="font-bold text-xl block leading-none">
                  <span className="text-primary">Nature</span>
                  <span className="text-white">Gyan</span>
                </span>
                <span className="text-[10px] text-white/40 leading-none">AI for Environmental Education</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              AI-powered environmental education platform helping millions learn about biodiversity, wildlife, climate change, and sustainable living.
            </p>
            <div className="flex gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary transition-colors flex items-center justify-center text-white/60 hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 text-white">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/55 hover:text-primary transition-colors"
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
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 text-sm text-white/55">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span>hello@naturegyan.in</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/55">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span>+91 80 4567 8900</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/55">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Bangalore, Karnataka, India</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-white/40">
            © 2026 NatureGyan. All rights reserved. Made with 🌿 for the planet.
          </p>
          <p className="text-xs text-white/40">
            Empowering 2.4M+ learners across 180+ countries
          </p>
        </div>
      </div>
    </footer>
  );
}
