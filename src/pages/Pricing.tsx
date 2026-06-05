import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import PricingSection from '@/components/features/landing/PricingSection';
import { CheckCircle2, X } from 'lucide-react';

const comparisonRows = [
  { feature: 'Foundational Courses', explorer: true, naturalist: true, professional: true },
  { feature: 'Advanced Course Library (200+)', explorer: false, naturalist: true, professional: true },
  { feature: 'AI Nature Assistant', explorer: 'Basic', naturalist: true, professional: true },
  { feature: 'AI Species Identification', explorer: false, naturalist: true, professional: true },
  { feature: 'Verified Certificates', explorer: false, naturalist: true, professional: true },
  { feature: 'Carbon Footprint Calculator', explorer: false, naturalist: true, professional: true },
  { feature: 'Eco-Challenge Participation', explorer: false, naturalist: true, professional: true },
  { feature: 'Research Repository', explorer: false, naturalist: true, professional: true },
  { feature: 'Classroom Management', explorer: false, naturalist: false, professional: true },
  { feature: 'Student Analytics', explorer: false, naturalist: false, professional: true },
  { feature: 'Event Creation', explorer: false, naturalist: false, professional: true },
  { feature: 'API Access', explorer: false, naturalist: false, professional: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-muted-foreground mx-auto" />;
  return <span className="text-xs text-muted-foreground">{value}</span>;
}

export default function Pricing() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="pt-16">
          <PricingSection />
        </div>

        {/* Comparison Table */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Feature Comparison</h2>
            <div className="rounded-2xl border border-border overflow-hidden bg-card">
              <div className="grid grid-cols-4 bg-muted/50 border-b border-border">
                <div className="p-4 font-semibold text-foreground">Feature</div>
                {['Explorer', 'Naturalist', 'Professional'].map(plan => (
                  <div key={plan} className="p-4 text-center font-semibold text-foreground">{plan}</div>
                ))}
              </div>
              {comparisonRows.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-4 border-b border-border/50 last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                  <div className="p-4 text-sm text-muted-foreground">{row.feature}</div>
                  <div className="p-4 flex items-center justify-center"><Cell value={row.explorer} /></div>
                  <div className="p-4 flex items-center justify-center bg-primary/5"><Cell value={row.naturalist} /></div>
                  <div className="p-4 flex items-center justify-center"><Cell value={row.professional} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">Pricing FAQs</h2>
            <div className="space-y-4">
              {[
                { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription anytime. Your access continues until the end of the billing period.' },
                { q: 'Is there a student discount?', a: 'Yes! Students with a valid .edu email get 50% off the Naturalist plan. Contact us to claim your discount.' },
                { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, net banking, and PayPal.' },
                { q: 'Can I switch plans?', a: 'Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades at the next billing cycle.' },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-xl p-5 bg-card border border-border">
                  <h4 className="font-semibold text-card-foreground mb-2">{q}</h4>
                  <p className="text-sm text-muted-foreground">{a}</p>
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
