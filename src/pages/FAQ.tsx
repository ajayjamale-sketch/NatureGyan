import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FAQ_ITEMS } from '@/constants';
import { cn } from '@/lib/utils';

const faqCategories = ['All', 'General', 'Courses', 'AI Features', 'Pricing', 'Education', 'Community', 'Features'];

export default function FAQ() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const [open, setOpen] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = FAQ_ITEMS.filter(item => {
    const matchSearch = !search || item.question.toLowerCase().includes(search.toLowerCase()) || item.answer.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-24 pb-12 gradient-hero text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <HelpCircle className="w-3.5 h-3.5" /> Help Center
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-white/80 mb-8">Everything you need to know about NatureGyan.</p>
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <Input
                placeholder="Search questions..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {faqCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    activeCategory === cat ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="flex justify-center text-4xl mb-4"><Search className="w-10 h-10 text-primary" /></div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">Try different search terms or browse all categories.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(item => (
                  <div key={item.id} className={cn('rounded-xl border transition-all', open === item.id ? 'border-primary/30 bg-primary/5' : 'border-border bg-card hover:border-primary/20')}>
                    <button className="w-full flex items-center justify-between px-6 py-4 text-left" onClick={() => setOpen(open === item.id ? null : item.id)}>
                      <div className="flex items-start gap-3 pr-4">
                        <span className="text-xs bg-muted text-muted-foreground rounded px-2 py-0.5 mt-0.5 flex-shrink-0">{item.category}</span>
                        <span className={cn('font-medium text-sm sm:text-base', open === item.id ? 'text-primary' : 'text-card-foreground')}>{item.question}</span>
                      </div>
                      <ChevronDown className={cn('w-5 h-5 flex-shrink-0 transition-transform', open === item.id ? 'rotate-180 text-primary' : 'text-muted-foreground')} />
                    </button>
                    {open === item.id && (
                      <div className="px-6 pb-5 pl-[4.5rem]">
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Still need help */}
            <div className="mt-16 rounded-2xl p-8 bg-primary/5 border border-primary/20 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">Our support team is happy to help. We usually reply within a few hours.</p>
              <Button className="gradient-primary text-white" onClick={() => navigate('/contact')}>
                Contact Support
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
