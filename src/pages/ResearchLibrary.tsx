import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { BookOpen, Search, Filter, ArrowRight, Download, FileText, FlaskConical, Milestone, Users, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const papers = [
  { title: 'Genomic analysis of endangered Bengal Tigers', authors: 'Dr. Suresh Iyer, et al.', year: '2025', journal: 'Nature Conservation', citations: 142 },
  { title: 'Urban heat island mitigation via canopy planning', authors: 'P. Sharma, A. Gupta', year: '2026', journal: 'Urban Ecology', citations: 89 },
  { title: 'Coral bleaching resilience in the Lakshadweep Sea', authors: 'Dr. Ananya K.', year: '2025', journal: 'Marine Biology Reports', citations: 215 },
];

const categories = [
  { name: 'Ecology & Biodiversity', icon: Leaf },
  { name: 'Climatology', icon: FlaskConical },
  { name: 'Conservation Policy', icon: Milestone },
  { name: 'Environmental Sociology', icon: Users }
];

export default function ResearchLibrary() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary dark:bg-primary/30 text-primary rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-foreground tracking-tight">
                The Open <span className="text-primary dark:text-primary">Research</span> Repository
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
                Access over 50,000 peer-reviewed papers, environmental reports, and case studies. Accelerate your research with our AI-powered knowledge base.
              </p>
              
              {/* Search Bar Mockup */}
              <div className="w-full max-w-3xl flex items-center bg-background border border-border rounded-full p-2 shadow-sm">
                <Search className="w-5 h-5 text-muted-foreground ml-3" />
                <input type="text" placeholder="Search papers, authors, or topics..." className="flex-1 bg-transparent border-none outline-none px-4 text-foreground" />
                <Button 
                  variant="ghost" 
                  className="rounded-full px-4 text-muted-foreground hidden sm:flex"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                >
                  <Filter className="w-4 h-4 mr-2"/> Filters
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Featured Papers */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-12">Featured Publications</h2>
            <div className="space-y-6">
              {papers.map((p, i) => (
                <div key={i} className="bg-card border border-border p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-primary/50 transition-colors group">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">{p.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <span>{p.authors}</span>
                      <span>•</span>
                      <span>{p.journal} ({p.year})</span>
                      <span>•</span>
                      <span>{p.citations} Citations</span>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <Button 
                      variant="outline" 
                      className="flex-1 md:flex-none rounded-full"
                      onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                    >
                      <BookOpen className="w-4 h-4 mr-2" /> Read
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="rounded-full px-3 text-muted-foreground hover:text-primary"
                      onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button 
                variant="link" 
                className="text-primary font-semibold hover:text-primary/80"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
              >
                View all trending papers <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3: Browse Categories */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Browse by Discipline</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <div 
                    key={i} 
                    className="bg-card border border-border p-6 rounded-2xl hover:shadow-md transition-shadow text-center cursor-pointer"
                    onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                  >
                    <div className="w-12 h-12 bg-primary dark:bg-primary/30 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-foreground">{cat.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: Top Researchers */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Top Contributors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-16">Connect with the brilliant minds driving environmental science forward.</p>
            
            <div className="flex flex-wrap justify-center gap-12">
              {[
                { name: 'Dr. Suresh Iyer', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80', role: 'Genomics' },
                { name: 'Dr. Ananya K.', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?auto=format&fit=crop&w=300&q=80', role: 'Marine Biology' },
                { name: 'Prof. J. Doe', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', role: 'Climatology' },
              ].map((r, i) => (
                <div key={i} className="flex flex-col items-center">
                  <img src={r.img} alt={r.name} className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-primary/10 dark:ring-primary/20" />
                  <h4 className="font-bold text-foreground">{r.name}</h4>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Contribute to the Repository</h2>
            <p className="text-emerald-100 text-lg mb-10">
              Are you a researcher or educator? Publish your findings, share case studies, and collaborate with a global network of environmental scientists.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={isAuthenticated ? '/dashboard' : '/login'}>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 h-14 px-10 text-lg rounded-full font-bold">
                  Create Researcher Profile
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-primary-foreground hover:text-primary h-14 px-10 text-lg rounded-full"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
