import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Users, Send, Building2, GraduationCap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const partnerTiers = [
  {
    icon: GraduationCap,
    title: 'Academic Partners',
    description: 'Universities, schools, and research groups integrating our courses into curricula and assisting with data collection.',
  },
  {
    icon: Globe,
    title: 'NGOs & Non-Profits',
    description: 'Conservation organizations using our platform to organize local communities and log ecological sightings.',
  },
  {
    icon: Building2,
    title: 'Corporate Sponsors',
    description: 'Organizations sponsoring courses, eco-challenges, or funding remote classroom digital connectivity projects.',
  },
];

export default function Partners() {
  const { pathname } = useLocation();
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState('Academic');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Partnership inquiry received!', {
        description: `Thank you for contacting us. Our partnerships coordinator will reach out to ${email} shortly.`,
      });
      setSubmitting(false);
      setOrgName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-slate-50 dark:bg-slate-900/50 text-center border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Users className="w-3.5 h-3.5" /> Partners
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Partner With Us</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We collaborate with academic institutions, non-profits, and corporate entities to scale global environmental action and digital education.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-20 bg-muted/10">
          <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnerTiers.map((tier, i) => {
                const Icon = tier.icon;
                return (
                  <div key={i} className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">{tier.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4 lg:px-6 max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Start a Collaboration</h2>
              <p className="text-muted-foreground text-sm">
                Fill out the form below and let us know how we can work together.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border border-border p-8 rounded-2xl shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Organization Name</label>
                  <Input
                    type="text"
                    placeholder="University or NGO Name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="bg-background border-border text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Contact Email</label>
                  <Input
                    type="email"
                    placeholder="partner@organization.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-border text-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Partnership Type</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary h-10"
                >
                  <option value="Academic">Academic Collaboration</option>
                  <option value="NGO">NGO Integration</option>
                  <option value="Corporate">Corporate Sponsorship</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Proposed Collaboration Details</label>
                <textarea
                  className="w-full bg-background border border-border text-foreground text-sm rounded-lg p-3 outline-none focus:ring-1 focus:ring-primary min-h-[120px]"
                  placeholder="Outline the details of the collaboration..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="gradient-primary text-white font-semibold flex items-center gap-2 w-full justify-center"
              >
                {submitting ? 'Sending inquiry...' : 'Send Inquiry'}
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
