import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const topics = ['General Inquiry', 'Course Support', 'Technical Issue', 'Partnership', 'Press / Media', 'Enterprise Sales'];

export default function Contact() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.message.trim() || form.message.length < 20) errs.message = 'Message must be at least 20 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-24 pb-16 gradient-hero text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-white/80">Have a question, partnership idea, or just want to say hi? We'd love to hear from you.</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Contact Information</h2>
                  <p className="text-muted-foreground">Our team is available Monday–Friday, 9am–6pm IST.</p>
                </div>
                {[
                  { icon: Mail, label: 'Email', value: 'hello@naturegyan.in', sub: 'We reply within 24 hours' },
                  { icon: Phone, label: 'Phone', value: '+91 80 4567 8900', sub: 'Mon–Fri, 9am–6pm IST' },
                  { icon: MapPin, label: 'Office', value: 'Bangalore, Karnataka', sub: 'India 560001' },
                  { icon: Clock, label: 'Response Time', value: '< 24 hours', sub: 'For general inquiries' },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</div>
                      <div className="font-medium text-foreground">{value}</div>
                      <div className="text-xs text-muted-foreground">{sub}</div>
                    </div>
                  </div>
                ))}

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">🌿 For NGOs & Educators</h4>
                  <p className="text-sm text-muted-foreground">We offer special pricing and dedicated support for schools, universities, and environmental NGOs. Reach out to discuss your needs.</p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl p-6 sm:p-8 bg-card border border-border">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-card-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                      <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: topics[0], message: '' }); }}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-card-foreground mb-6">Send us a message</h3>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label>Full Name</Label>
                            <Input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={cn(errors.name && 'border-destructive')} />
                            {errors.name && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label>Email Address</Label>
                            <Input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={cn(errors.email && 'border-destructive')} />
                            {errors.email && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label>Topic</Label>
                          <select
                            value={form.topic}
                            onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {topics.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <Label>Message</Label>
                          <Textarea
                            placeholder="Tell us how we can help..."
                            rows={5}
                            className={cn('resize-none', errors.message && 'border-destructive')}
                            value={form.message}
                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          />
                          {errors.message && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                        </div>
                        <Button type="submit" className="gradient-primary text-white w-full h-11 font-semibold" disabled={loading}>
                          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">🌿 Nature Digest Newsletter</h2>
            <p className="text-muted-foreground mb-6">Weekly nature stories, conservation news, new course alerts, and eco-tips straight to your inbox.</p>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { toast.error('Please enter a valid email'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setDone(true);
    toast.success('Subscribed! Welcome to the NatureGyan community 🌱');
  };

  if (done) return (
    <div className="flex items-center justify-center gap-2 text-primary font-medium">
      <CheckCircle2 className="w-5 h-5" /> You're subscribed! Check your inbox.
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 h-11" />
      <Button type="submit" className="gradient-primary text-white h-11 px-6 whitespace-nowrap" disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
      </Button>
    </form>
  );
}
