import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Leaf, Target, Heart, Globe, Users, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const team = [
  { name: 'Dr. Priya Sharma', role: 'Founder & CEO', expertise: 'Environmental Science, Wildlife Biology', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=300&auto=format&fit=crop&q=80' },
  { name: 'Arjun Mehta', role: 'CTO & Co-founder', expertise: 'AI/ML, EdTech Platform Architecture', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80' },
  { name: 'Dr. Kavya Nair', role: 'Head of Content', expertise: 'Biodiversity, Conservation Science', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80' },
  { name: 'Rahul Verma', role: 'Head of Community', expertise: 'Environmental Education, NGO Partnerships', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
  { name: 'Anjali Patel', role: 'Lead AI Researcher', expertise: 'Computer Vision, Species Identification', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80' },
  { name: 'Meera Krishnan', role: 'Head of Partnerships', expertise: 'Sustainability, Corporate ESG', image: 'https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=300&auto=format&fit=crop&q=80' },
];

const milestones = [
  { year: '2020', event: 'NatureGyan founded with a mission to democratize environmental education' },
  { year: '2021', event: 'Launched first 50 biodiversity courses; reached 10,000 learners in 6 months' },
  { year: '2022', event: 'AI Species Identification feature launched with 50,000+ species database' },
  { year: '2023', event: 'Crossed 500,000 active learners across 80+ countries' },
  { year: '2024', event: 'Launched Eco-Challenge platform; 1M trees planted by community' },
  { year: '2025', event: 'Reached 2.4M learners; partnered with UNEP and WWF for global programs' },
];

export default function About() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-24 pb-16 gradient-hero text-white">
          <div className="container mx-auto px-4 lg:px-6 max-w-7xl text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Leaf className="w-3.5 h-3.5" /> Our Story
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Reconnecting humans with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300">the natural world</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Founded in 2020, NatureGyan was born from a simple belief: that meaningful environmental education can inspire a generation of informed, passionate, and effective conservationists.
            </p>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: 'Our Mission', color: 'bg-green-50 dark:bg-green-900/20 text-green-600', text: 'To make world-class environmental education accessible to every curious mind — regardless of geography, background, or resources — and translate that knowledge into real-world conservation action.' },
                { icon: Heart, title: 'Our Vision', color: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600', text: 'A world where every person understands their relationship with nature, makes informed sustainability choices, and actively participates in protecting biodiversity for future generations.' },
                { icon: Globe, title: 'Our Values', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', text: 'Science-first education, inclusive access, community-driven learning, measurable impact, and unwavering commitment to ecological integrity guide every decision we make.' },
              ].map(({ icon: Icon, title, color, text }) => (
                <div key={title} className="p-6 rounded-2xl bg-card border border-border leaf-shadow">
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-xl text-card-foreground mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: '2.4M+', label: 'Active Learners', emoji: '🌍' },
                { value: '500+', label: 'Expert Courses', emoji: '📚' },
                { value: '1M+', label: 'Trees Planted', emoji: '🌳' },
                { value: '50K+', label: 'Species Identified', emoji: '🦋' },
              ].map(({ value, label, emoji }) => (
                <div key={label} className="rounded-2xl p-6 bg-card border border-border">
                  <div className="text-3xl mb-2">{emoji}</div>
                  <div className="text-3xl font-bold text-primary mb-1">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'} pl-12 sm:pl-0`}>
                    <div className="inline-block bg-primary text-primary-foreground text-xs font-bold rounded-full px-3 py-1 mb-2">{m.year}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.event}</p>
                  </div>
                  <div className="absolute left-2 sm:left-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-1 flex-shrink-0" />
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Meet our team</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Scientists, educators, technologists, and conservationists united by a shared love of nature.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map(member => (
                <div key={member.name} className="rounded-2xl overflow-hidden bg-card border border-border card-hover">
                  <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <h3 className="font-semibold text-card-foreground">{member.name}</h3>
                    <p className="text-primary text-sm font-medium">{member.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{member.expertise}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-5xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Trusted by leading organizations</h2>
            <p className="text-muted-foreground mb-10">We partner with global environmental institutions to bring the highest quality scientific content to our learners.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {['WWF', 'UNEP', 'National Geographic', 'IUCN'].map(org => (
                <div key={org} className="rounded-xl p-6 bg-muted/50 border border-border flex items-center justify-center">
                  <span className="font-bold text-muted-foreground text-sm text-center">{org}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Join us in protecting our planet</h2>
            <p className="text-muted-foreground mb-8">Whether you're a learner, educator, researcher, or organization — there's a place for you at NatureGyan.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-primary text-white px-8" onClick={() => navigate('/register')}>
                Start Learning Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/contact')}>Partner With Us</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
