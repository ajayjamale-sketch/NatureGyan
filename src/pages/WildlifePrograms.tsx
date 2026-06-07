import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Map, Calendar, Users, ArrowRight, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const programs = [
  { 
    title: 'Amazon Rainforest Expedition', 
    type: 'Field Work', 
    date: 'Aug 15 - Aug 30', 
    img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format', 
    spots: 5 
  },
  { 
    title: 'African Savanna Tracking', 
    type: 'Eco-Tour', 
    date: 'Sep 10 - Sep 20', 
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format', 
    spots: 12 
  },
  { 
    title: 'Local Wetland Restoration', 
    type: 'Volunteer', 
    date: 'Every Weekend', 
    img: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=800&auto=format', 
    spots: 20 
  },
];

const goals = [
  { title: 'Habitat Protection', desc: 'Working to secure 1M+ acres of critical wildlife corridors.', icon: ShieldCheck },
  { title: 'Anti-Poaching Tech', desc: 'Deploying AI cameras and acoustic sensors in reserves.', icon: Compass },
  { title: 'Community Engagement', desc: 'Partnering with indigenous communities for sustainable stewardship.', icon: HeartHandshake }
];

export default function WildlifePrograms() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1564349683136-5efa1ea61b65?w=1600&auto=format" 
              alt="Wildlife conservation" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
          </div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10 text-white">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-secondary">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 max-w-2xl leading-tight">
              Experience Wildlife Conservation in Action
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-10">
              Join our field programs, eco-tours, and volunteer initiatives. Step out of the classroom and into the wild to make a tangible difference.
            </p>
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg rounded-full border-0 text-primary-foreground bg-primary hover:bg-primary/90"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
            >
              View Upcoming Expeditions
            </Button>
          </div>
        </section>

        {/* Featured Programs Section */}
        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Featured Expeditions & Programs</h2>
                <p className="text-muted-foreground">From weekend local cleanups to two-week international conservation expeditions. Find your next adventure.</p>
              </div>
              <Button 
                variant="outline" 
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
              >
                Browse Map <Map className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((p, i) => (
                <div 
                  key={i} 
                  className="bg-card border border-border rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow"
                >
                  <div className="h-56 relative overflow-hidden bg-muted">
                    <img 
                      src={p.img} 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div 
                      className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary"
                    >
                      {p.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-4 text-foreground line-clamp-2">{p.title}</h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 text-secondary" /> {p.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2 text-secondary" /> Only {p.spots} spots left
                      </div>
                    </div>
                    <Button 
                      className="w-full text-primary-foreground bg-primary hover:bg-primary/90 border-0"
                      onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conservation Goals Section */}
        <section className="py-24 bg-muted/50 border-t border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Our Conservation Goals</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Every program directly funds and supports these three critical pillars of global wildlife conservation.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {goals.map((g, i) => {
                const Icon = g.icon;
                return (
                  <div key={i} className="text-center flex flex-col items-center">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-primary/10"
                    >
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{g.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{g.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partner Organizations Section */}
        <section className="py-16 border-y border-border bg-background">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">In Partnership With Leading Organizations</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-60 hover:opacity-100 transition-all duration-500">
              <h3 className="text-2xl font-black text-primary">Global Wildlife Fund</h3>
              <h3 className="text-2xl font-black font-serif italic text-secondary">Earth Watch</h3>
              <h3 className="text-2xl font-black tracking-tighter text-accent">NatureConservancy</h3>
              <h3 className="text-2xl font-black text-primary">Oceana</h3>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 text-white bg-[#92400E]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to pack your bags?</h2>
            <p className="text-xl text-amber-50 mb-10 max-w-2xl mx-auto">
              Whether you are an aspiring biologist or just a passionate nature enthusiast, there's a place for you in the field.
            </p>
            <Link to={isAuthenticated ? '/dashboard' : '/login'}>
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-gray-900 h-14 px-10 text-lg rounded-full font-bold"
              >
                Join the Network
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