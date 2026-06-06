import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Search, Calendar, Clock, Eye, ArrowRight, Leaf } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BLOG_POSTS } from '@/constants';
import { cn } from '@/lib/utils';

const categories = ['All', 'Wildlife', 'Biodiversity', 'Climate', 'Sustainability', 'Marine', 'Technology', 'Conservation'];

export default function Blog() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = BLOG_POSTS.filter(post => {
    const matchSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-24 pb-12 gradient-hero text-white">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Leaf className="w-3.5 h-3.5" /> Nature & Science Blog
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Stories from the natural world</h1>
            <p className="text-white/80 text-lg mb-8">Expert insights on biodiversity, conservation, climate science, and sustainable living.</p>
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <Input
                placeholder="Search articles..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:bg-white/20"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    activeCategory === cat ? 'bg-primary text-white shadow-sm' : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="flex justify-center text-4xl mb-4"><Leaf className="w-10 h-10 text-green-500" /></div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try a different search term or category.</p>
              </div>
            ) : (
              <>
                {/* Featured */}
                {filtered.slice(0, 1).map(post => (
                  <div key={post.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 rounded-2xl overflow-hidden bg-card border border-border card-hover cursor-pointer" onClick={() => navigate(`/blog/${post.id}`)}>
                    <img src={post.image} alt={post.title} className="w-full h-64 lg:h-full object-cover" />
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                      <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1 font-medium w-fit mb-4">{post.category}</span>
                      <h2 className="text-2xl font-bold text-card-foreground mb-3 leading-tight">{post.title}</h2>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={`https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=40&auto=format&fit=crop&q=80`} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                        <span className="text-sm font-medium text-foreground">{post.author}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.slice(1).map(post => (
                    <div key={post.id} className="rounded-2xl overflow-hidden bg-card border border-border card-hover cursor-pointer" onClick={() => navigate(`/blog/${post.id}`)}>
                      <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
                      <div className="p-5">
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">{post.category}</span>
                        <h3 className="font-semibold text-card-foreground mt-2 mb-2 line-clamp-2 leading-snug">{post.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
