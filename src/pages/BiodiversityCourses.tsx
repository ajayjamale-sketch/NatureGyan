import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Leaf, Clock, Star, ArrowRight, PlayCircle, BookOpen, Users, Medal, ScanFace, Globe, Sprout, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const courses = [
  { title: 'Introduction to Plant Biology', duration: '4 Weeks', rating: '4.8', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format', students: '12.4k' },
  { title: 'Marine Ecosystems & Coral Reefs', duration: '6 Weeks', rating: '4.9', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format', students: '8.2k' },
  { title: 'Forest Ecology Essentials', duration: '5 Weeks', rating: '4.7', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format', students: '15.1k' },
  { title: 'Biodiversity & Climate Links', duration: '8 Weeks', rating: '4.9', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format', students: '9.6k' },
  { title: 'Urban Ecosystems', duration: '3 Weeks', rating: '4.6', img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&auto=format', students: '5.4k' },
  { title: 'Endangered Species Management', duration: '7 Weeks', rating: '4.8', img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format', students: '11.8k' }
];

const categories = [
  { name: 'Marine Biology', icon: Globe, count: 24, color: 'bg-[#0EA5E9]/10 text-[#0EA5E9] dark:bg-[#0EA5E9]/20 dark:text-[#7DD3FC]' },
  { name: 'Forestry & Botany', icon: Sprout, count: 38, color: 'bg-[#15803D]/10 text-[#15803D] dark:bg-[#22C55E]/20 dark:text-[#86EFAC]' },
  { name: 'Wildlife Conservation', icon: ScanFace, count: 19, color: 'bg-[#92400E]/10 text-[#92400E] dark:bg-[#F97316]/20 dark:text-[#FDBA74]' },
];

export default function BiodiversityCourses() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [enrollForm, setEnrollForm] = useState({ name: '', email: '', comments: '' });

  // Sync user info to form when authenticated user details are available
  useEffect(() => {
    if (user) {
      setEnrollForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  // Handle escape key to close modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIntroModalOpen(false);
        setEnrollModalOpen(false);
      }
    };
    if (introModalOpen || enrollModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [introModalOpen, enrollModalOpen]);

  const handleProtectedNavigation = (path: string) => {
    navigate(isAuthenticated ? path : '/login');
  };

  const handleEnrollClick = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setEnrollModalOpen(true);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Successfully enrolled in "${selectedCourse}"!`);
    setEnrollModalOpen(false);
    // Reset comments
    setEnrollForm(prev => ({ ...prev, comments: '' }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-6 shadow-lg">
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
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-lg rounded-full shadow-md hover:shadow-lg transition-all"
                  onClick={() => handleProtectedNavigation('/dashboard')}
                >
                  Explore Courses
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-12 px-8 text-lg rounded-full border-border text-foreground bg-background hover:bg-muted"
                  onClick={() => setIntroModalOpen(true)}
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
                onClick={() => handleProtectedNavigation('/dashboard')}
              >
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((c, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full hover:-translate-y-1">
                  <div className="h-48 overflow-hidden relative flex-shrink-0 bg-muted">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute top-4 left-4 bg-background/90 dark:bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-foreground flex items-center gap-1 shadow-sm">
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
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all"
                      onClick={() => handleEnrollClick(c.title)}
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
                    onClick={() => handleProtectedNavigation('/dashboard')}
                  >
                    <div className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{cat.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{cat.count} Specialized Courses</p>
                    <span className="text-primary font-semibold text-sm flex items-center justify-center gap-1">
                      Browse Path <ArrowRight className="w-4 h-4 transition-all group-hover:translate-x-1" />
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
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format" 
                  alt="Student exploring nature with field notebook" 
                  className="rounded-2xl shadow-2xl" 
                />
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

      {/* Intro Video Modal */}
      {introModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={(e) => e.target === e.currentTarget && setIntroModalOpen(false)}
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-border animate-in zoom-in-95 fade-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-border bg-muted/30">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" /> 
                Welcome to Biodiversity Academy
              </h3>
              <button 
                onClick={() => setIntroModalOpen(false)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/GnYyVlFpW_0?autoplay=1&rel=0"
                title="Introduction to Biodiversity"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-5 bg-card">
              <p className="text-muted-foreground">
                Discover how our AI-powered platform helps you learn about ecosystems, species identification, and conservation strategies.
                Get ready to dive into the fascinating world of biodiversity!
              </p>
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={() => setIntroModalOpen(false)}
                  variant="outline"
                  className="mr-2"
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setIntroModalOpen(false);
                    handleProtectedNavigation('/dashboard');
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Start Learning Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Enrollment Modal */}
      {enrollModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={(e) => e.target === e.currentTarget && setEnrollModalOpen(false)}
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-border animate-in zoom-in-95 fade-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-border bg-muted/30">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> 
                Course Enrollment
              </h3>
              <button 
                onClick={() => setEnrollModalOpen(false)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            
            <form onSubmit={handleEnrollSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Course Title</label>
                <Input 
                  type="text" 
                  value={selectedCourse} 
                  disabled 
                  className="bg-muted text-muted-foreground font-semibold border-border"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <Input 
                  type="text" 
                  required
                  placeholder="Enter your full name" 
                  value={enrollForm.name} 
                  onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                  className="bg-background text-foreground border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                <Input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  value={enrollForm.email} 
                  onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                  className="bg-background text-foreground border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Comments / Goals (Optional)</label>
                <textarea 
                  placeholder="What do you hope to learn from this course?" 
                  value={enrollForm.comments} 
                  onChange={(e) => setEnrollForm({ ...enrollForm, comments: e.target.value })}
                  className="w-full bg-background border border-border text-foreground text-sm rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-primary h-24 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <Button 
                  type="button"
                  onClick={() => setEnrollModalOpen(false)}
                  variant="outline"
                  className="px-5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-sm hover:shadow-md transition-all animate-pulse-green"
                >
                  Complete Enrollment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}