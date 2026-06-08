import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { ThermometerSun, Wind, Droplets, ArrowRight, Activity, Users, Globe2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const modules = [
  { title: 'The Science of Global Warming', icon: ThermometerSun, desc: 'Understand greenhouse gases and temperature modeling.' },
  { title: 'Ocean Acidification', icon: Droplets, desc: 'How CO2 is changing marine chemistry and coral reefs.' },
  { title: 'Atmospheric Dynamics', icon: Wind, desc: 'Weather patterns, jet streams, and extreme weather.' }
];

const stats = [
  { label: 'Degrees Celsius Rise', value: '+1.1°C', icon: Activity },
  { label: 'Students Educated', value: '850K+', icon: Users },
  { label: 'Countries Reached', value: '142', icon: Globe2 }
];

const stories = [
  { name: 'Sarah Jenkins', role: 'High School Teacher', quote: 'The interactive climate models helped my students visualize carbon impact perfectly.' },
  { name: 'David Okafor', role: 'University Researcher', quote: 'An incredible repository of peer-reviewed climate data made accessible for everyone.' }
];

export default function ClimateEducation() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-background text-foreground border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                  <Globe2 className="w-4 h-4" /> Global Climate Initiative
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-foreground">
                  Understand the Climate. <br/><span className="text-primary">Change the Future.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                  Dive into data-driven climate science. Learn about the mechanics of global warming, carbon footprints, and actionable mitigation strategies.
                </p>
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-full border-0 shadow-md transition-all"
                    onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                  >
                    Start Learning
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Live Climate Tracker</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-border pb-2">
                      <span className="text-muted-foreground">Global CO2 Level</span>
                      <span className="font-bold text-primary text-lg">421 ppm</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border pb-2">
                      <span className="text-muted-foreground">Arctic Ice Minimum</span>
                      <span className="font-bold text-primary text-lg">-12.6% per decade</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Forest Loss (2026)</span>
                      <span className="font-bold text-red-500 text-lg">4.2M hectares</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Core Curriculum */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Core Curriculum</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
              Our modules break down complex atmospheric and ecological science into interactive, easy-to-digest lessons.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {modules.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div key={i} className="bg-card border border-border p-8 rounded-2xl text-left hover:shadow-xl transition-shadow group">
                    <div className="w-14 h-14 bg-primary/10 dark:bg-primary/30 text-primary rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{m.title}</h3>
                    <p className="text-muted-foreground mb-6">{m.desc}</p>
                    <Link to={isAuthenticated ? '/dashboard' : '/login'} className="text-primary font-semibold flex items-center hover:text-primary transition-colors">
                      View Module <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Global Impact Stats */}
        <section className="py-16 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center pt-8 md:pt-0 first:pt-0">
                    <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-4xl font-extrabold text-foreground mb-2">{s.value}</div>
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: Success Stories */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3">
                <h2 className="text-3xl font-bold text-foreground mb-4">Empowering Educators & Researchers</h2>
                <p className="text-muted-foreground mb-6">
                  NatureGyan's climate tools are being used in classrooms and labs around the world to drive real climate action.
                </p>
                <Button 
                  variant="outline" 
                  className="rounded-full"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                >
                  Read all stories
                </Button>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {stories.map((s, i) => (
                  <div key={i} className="bg-muted p-8 rounded-2xl relative">
                    <BookOpen className="absolute top-6 right-6 w-8 h-8 text-border opacity-50" />
                    <p className="text-foreground italic mb-6 relative z-10">"{s.quote}"</p>
                    <div>
                      <p className="font-bold text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-4xl font-bold mb-6 text-white">Become a Climate Advocate</h2>
            <p className="text-emerald-100 text-lg mb-10">
              Access premium climate data, interactive models, and join a community of thousands dedicated to climate education.
            </p>
            <Link to={isAuthenticated ? '/dashboard' : '/login'}>
              <Button size="lg" className="bg-background text-primary hover:bg-muted border border-primary/20 h-14 px-10 text-lg rounded-full font-bold shadow-xl">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
