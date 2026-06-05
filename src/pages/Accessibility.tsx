import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Eye, Mail, Calendar } from 'lucide-react';

const accessibilitySections = [
  {
    title: '1. Our Commitment',
    content: 'NatureGyan is committed to ensuring digital accessibility for all users, including individuals with disabilities. We continuously optimize our learning platform, species recognition UI, and eco-forums to improve the user experience for everyone and apply relevant accessibility standards.',
  },
  {
    title: '2. Standards and Guidelines',
    content: 'We target compliance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible for people with visual, auditory, physical, cognitive, and neurological disabilities.',
  },
  {
    title: '3. Platform Accessibility Features',
    content: `To provide an inclusive learning experience, we design NatureGyan with:
• High-contrast and dark theme settings to support users with low vision or light sensitivity
• Text scaling compatibility across mobile and desktop layouts
• Alternative text descriptions (alt text) for photos, including user-uploaded species observations
• Screen reader-friendly markup using HTML5 semantic elements and ARIA attributes
• Keyboard-navigable controls, buttons, and forms`,
  },
  {
    title: '4. Feedback and Support',
    content: 'We welcome your feedback on the accessibility of the NatureGyan platform. If you encounter any accessibility barriers, have difficulty accessing content, or wish to suggest improvements, please contact our accessibility support representative.',
  },
];

export default function Accessibility() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Eye className="w-3.5 h-3.5" /> Statement
            </div>
            <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
            <p className="text-white/80">Making environmental education inclusive and accessible to everyone.</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10 p-4 rounded-lg bg-muted/50 border border-border">
              <Calendar className="w-4 h-4" />
              <span>Last updated: June 1, 2026 · Effective: June 1, 2026</span>
            </div>
            <div className="space-y-6 animate-fade-in">
              {accessibilitySections.map((section) => (
                <div key={section.title} className="rounded-xl p-6 bg-card border border-border">
                  <h2 className="text-lg font-bold text-card-foreground mb-3">{section.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-muted/20 border-t border-border">
          <div className="container mx-auto px-4 lg:px-6 max-w-3xl text-center space-y-6">
            <h2 className="text-2xl font-bold">Accessibility Inquiries</h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto text-sm">
              If you require assistance or want to report an issue, please email our support address. We aim to respond within 2 business days.
            </p>
            <div className="inline-flex items-center gap-2.5 bg-card border border-border px-5 py-3 rounded-xl shadow-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">accessibility@naturegyan.in</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
