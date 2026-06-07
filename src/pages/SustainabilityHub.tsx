import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Recycle, Leaf, BatteryCharging, ArrowRight, Zap, Droplets, TreePine, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const guides = [
  { title: 'Zero Waste Kitchen Guide', icon: Recycle, desc: 'Learn how to eliminate food waste and start composting.' },
  { title: 'Solar Energy 101', icon: Zap, desc: 'A beginner\'s guide to rooftop solar panels and net metering.' },
  { title: 'Water Harvesting at Home', icon: Droplets, desc: 'Setup simple rainwater harvesting systems for your garden.' },
];

const impacts = [
  { value: '2.4M', label: 'Trees Planted', icon: TreePine },
  { value: '850K', label: 'Tons CO2 Offset', icon: Zap },
  { value: '1.2B', label: 'Liters Water Saved', icon: Droplets },
];

export default function SustainabilityHub() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative pt-32 pb-24 bg-primary text-emerald-50 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-emerald-400">
              <path d="M42.7,-73.4C55.9,-67.8,67.6,-57.4,76.5,-44.6C85.4,-31.8,91.5,-16.6,90.4,-2C89.3,12.7,81.1,26.7,71.2,38.1C61.3,49.5,49.8,58.3,37.1,65.3C24.4,72.3,10.6,77.5,-2.9,81.9C-16.4,86.4,-29.6,90,-41.4,85C-53.2,80,-63.5,66.4,-70.7,51.8C-77.9,37.2,-82,21.6,-83.4,6C-84.8,-9.6,-83.5,-25,-76.3,-37.6C-69.1,-50.2,-56,-60.1,-42.6,-65.6C-29.2,-71.1,-15.5,-72.3,-0.5,-71.5C14.5,-70.7,29.5,-79,42.7,-73.4Z" transform="translate(100 100) scale(1.1)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 text-white text-sm font-bold mb-6">
                <Leaf className="w-4 h-4" /> The Green Living Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Sustainable living made simple and actionable.
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-10">
                Discover practical guides, join eco-challenges, and track your personal carbon footprint alongside a global community of changemakers.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-background text-primary hover:bg-muted border border-primary/20 h-14 px-8 text-lg rounded-full font-bold"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                >
                  Take the Eco Pledge
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Practical Guides */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Practical Sustainability Guides</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Step-by-step blueprints to make your home, diet, and lifestyle more environmentally friendly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {guides.map((g, i) => {
                const Icon = g.icon;
                return (
                  <div key={i} className="bg-card border border-border p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
                    <div className="w-16 h-16 bg-primary dark:bg-primary/30 text-primary rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{g.title}</h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{g.desc}</p>
                    <Button 
                      variant="ghost" 
                      className="text-primary hover:text-primary hover:bg-primary/10 px-0"
                      onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                    >
                      Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
              >
                View all 50+ Guides
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3: Community Forums & Challenges */}
        <section className="py-24 bg-emerald-50 dark:bg-primary/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Join the Eco-Challenge Network</h2>
                <p className="text-lg text-muted-foreground">
                  Sustainability is a team sport. Join monthly challenges, share your progress in the community forums, and earn Eco Points.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <p className="text-foreground pt-1"><strong>Join a Challenge:</strong> e.g. "30 Days No Plastic"</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <p className="text-foreground pt-1"><strong>Log Activities:</strong> Track daily progress on your dashboard</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <p className="text-foreground pt-1"><strong>Earn Badges:</strong> Unlock achievements and climb the leaderboard</p>
                  </li>
                </ul>
                <Button 
                  className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                >
                  <MessageSquare className="w-4 h-4 mr-2"/> Browse Forums
                </Button>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-card rounded-3xl p-6 shadow-2xl border border-border">
                  <h3 className="font-bold text-lg mb-4">Trending Discussions</h3>
                  <div className="space-y-4">
                    {[
                      { topic: 'Best DIY composting bins?', replies: 142, category: 'Waste Management' },
                      { topic: 'My journey to 100% solar power', replies: 89, category: 'Energy' },
                      { topic: 'Local farmers market map for Bangalore', replies: 256, category: 'Food' }
                    ].map((d, i) => (
                      <div 
                        key={i} 
                        className="p-4 rounded-xl bg-muted hover:bg-muted/80 cursor-pointer transition-colors"
                        onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                      >
                        <div className="text-xs text-primary font-semibold mb-1">{d.category}</div>
                        <h4 className="font-bold text-foreground">{d.topic}</h4>
                        <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> {d.replies} replies
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Global Impact Tracker */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-16">Our Collective Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {impacts.map((imp, i) => {
                const Icon = imp.icon;
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-primary dark:bg-primary/30 flex items-center justify-center mb-6">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="text-5xl font-black text-foreground mb-2 tracking-tighter">{imp.value}</div>
                    <div className="text-lg text-muted-foreground font-medium">{imp.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Share your green journey</h2>
            <p className="text-emerald-100 text-lg mb-10">
              Create your profile today, calculate your initial carbon footprint, and get a personalized sustainability action plan.
            </p>
            <Link to={isAuthenticated ? '/dashboard' : '/login'}>
              <Button size="lg" className="bg-background text-primary hover:bg-muted border border-primary/20 h-14 px-10 text-lg rounded-full font-bold shadow-xl">
                Get Your Action Plan
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
