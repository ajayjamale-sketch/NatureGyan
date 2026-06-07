import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Leaf, Clock, Star, ArrowRight, PlayCircle, BookOpen, Users, Medal, ScanFace, Globe, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const courses = [
  { title: 'Introduction to Plant Biology', duration: '4 Weeks', rating: '4.8', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format', students: '12.4k' },
  { title: 'Marine Ecosystems & Coral Reefs', duration: '6 Weeks', rating: '4.9', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format', students: '8.2k' },
  { title: 'Forest Ecology Essentials', duration: '5 Weeks', rating: '4.7', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format', students: '15.1k' },
  { title: 'Biodiversity & Climate Links', duration: '8 Weeks', rating: '4.9', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format', students: '9.6k' },
  { title: 'Urban Ecosystems', duration: '3 Weeks', rating: '4.6', img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&auto=format', students: '5.4k' },
  { title: 'Endangered Species Management', duration: '7 Weeks', rating: '4.8', img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format', students: '11.8k' }
];

const categories = [
  { name: 'Marine Biology', icon: Globe, count: 24, color: 'bg-[#0EA5E9]/10 text-[#0EA5E9]' },
  { name: 'Forestry & Botany', icon: Sprout, count: 38, color: 'bg-[#15803D]/10 text-[#15803D]' },
  { name: 'Wildlife Conservation', icon: ScanFace, count: 19, color: 'bg-[#92400E]/10 text-[#92400E]' },
];

export default function BiodiversityCourses() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 -z-10" />
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-foreground tracking-tight">
                Master the Science of <br/><span className="text-primary">Biodiversity</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
                Explore the intricate web of life. From microscopic organisms to vast forests, understand the ecosystems that sustain our planet through our AI-guided academy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-lg rounded-full border-0"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                >
                  Explore Courses
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-12 px-8 text-lg rounded-full border-border text-foreground bg-background hover:bg-muted"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                >
                  <PlayCircle className="w-5 h-5 mr-2" /> Watch Intro
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Featured Courses</h2>
                <p className="text-muted-foreground max-w-2xl">Hand-picked programs to start your journey into environmental science.</p>
              </div>
              <Button 
                variant="ghost" 
                className="hidden sm:flex text-primary font-semibold hover:text-primary/85 hover:bg-primary/10"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
              >
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((c, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full hover:-translate-y-1">
                  <div className="h-48 overflow-hidden relative flex-shrink-0 bg-muted">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {c.rating}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">{c.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-6 mt-auto">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {c.duration}</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {c.students}</span>
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0"
                      onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                    >
                      Enroll Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Paths */}
        <section className="py-20 bg-muted/50 border-t border-border">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Explore Learning Paths</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">Structured tracks to take you from beginner to expert in specific environmental fields.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <div 
                    key={i} 
                    className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer group"
                    onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                  >
                    <div className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{cat.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{cat.count} Specialized Courses</p>
                    <span className="text-primary font-semibold text-sm flex items-center justify-center">
                      Browse Path <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Integration Section */}
        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full -z-10" />
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format" alt="Nature Learning" className="rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 bg-card border border-border p-4 rounded-xl shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Medal className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Global Certifications</p>
                    <p className="text-xs text-muted-foreground">Recognized Worldwide</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  <ScanFace className="w-4 h-4" /> AI-Powered Education
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Identify species directly from your courses</h2>
                <p className="text-lg text-muted-foreground">
                  Our integrated AI Nature Assistant and Image Recognition tools allow you to apply theoretical knowledge immediately. Snap photos during field trips and get real-time species identification.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    'Interactive biodiversity mapping assignments',
                    'Real-time Q&A with our environmental AI',
                    'Earn Eco Points for citizen science contributions'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Ready to become an Eco Warrior?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join over 2.4 million learners making a tangible impact on the planet. Start your first biodiversity course for free today.
            </p>
            <Link to={isAuthenticated ? '/dashboard' : '/login'}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 text-lg rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/25">
                Join the Academy
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