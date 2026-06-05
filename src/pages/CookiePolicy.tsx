import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { ShieldAlert, Calendar } from 'lucide-react';

const cookieSections = [
  {
    title: '1. What are Cookies?',
    content: 'Cookies are small text files stored on your computer or mobile device when you visit websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.',
  },
  {
    title: '2. How We Use Cookies',
    content: `We use cookies to:
• Keep you signed in to your NatureGyan account
• Remember your preferences (such as language or dark mode settings)
• Analyze how you navigate and interact with our platform so we can improve usability
• Personalize your educational dashboard and recommend relevant conservation challenges`,
  },
  {
    title: '3. Types of Cookies We Use',
    content: `• Essential Cookies: Necessary for basic website functions, like security, network management, and accessibility. You cannot opt out of these.
• Performance & Analytical Cookies: Used to gather statistics on visitor volumes, source channels, page engagement, and error frequency. This data is aggregated and anonymized.
• Functional Cookies: Enable enhanced functionality and customization, such as remembering your login name or region preference.`,
  },
  {
    title: '4. Managing Your Preferences',
    content: 'Most web browsers allow you to control cookies through their settings preferences. You can configure your browser to reject cookies or notify you when a cookie is placed. Note that disabling essential cookies will prevent the login and course features from functioning.',
  },
  {
    title: '5. Policy Updates',
    content: 'We may modify this Cookie Policy from time to time to reflect changes in our technology or regulatory obligations. The updated version will be indicated by a new revision date at the top of this page.',
  },
];

export default function CookiePolicy() {
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
              <ShieldAlert className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-white/80">Information about our use of cookies and tracking technologies.</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10 p-4 rounded-lg bg-muted/50 border border-border">
              <Calendar className="w-4 h-4" />
              <span>Last updated: June 1, 2026 · Effective: June 1, 2026</span>
            </div>
            <div className="space-y-6">
              {cookieSections.map((section) => (
                <div key={section.title} className="rounded-xl p-6 bg-card border border-border">
                  <h2 className="text-lg font-bold text-card-foreground mb-3">{section.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
