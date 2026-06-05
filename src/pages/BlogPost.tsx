import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { BLOG_POSTS } from '@/constants';
import { Calendar, Clock, Eye, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">We couldn't find the article you're looking for.</p>
          <Button onClick={() => navigate('/blog')} className="gradient-primary text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <article className="pt-24 pb-16">
          {/* Header */}
          <header className="container mx-auto px-4 lg:px-6 max-w-4xl text-center mb-10">
            <div className="mb-6 flex justify-center">
              <span className="text-xs bg-primary/10 text-primary rounded-full px-4 py-1.5 font-semibold tracking-wide uppercase">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <img 
                  src={`https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=40&auto=format&fit=crop&q=80`} 
                  alt={post.author} 
                  className="w-10 h-10 rounded-full object-cover" 
                />
                <span className="font-semibold text-foreground">{post.author}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {post.views.toLocaleString()} views</span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="container mx-auto px-4 lg:px-6 max-w-5xl mb-12">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto aspect-video object-cover rounded-3xl shadow-xl" 
            />
          </div>

          {/* Body */}
          <div className="container mx-auto px-4 lg:px-6 max-w-3xl">
            <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <h2>The Scope of the Problem</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
              <blockquote>
                "Conservation is a state of harmony between men and land. By land is meant all of the things on, over, or in the earth." - Aldo Leopold
              </blockquote>
              <h3>Key Findings and Future Directions</h3>
              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
              </p>
              <ul>
                <li>Preservation of natural habitats is crucial.</li>
                <li>Community engagement drives successful conservation.</li>
                <li>Innovative technology can accelerate our understanding of ecosystems.</li>
              </ul>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>
            </div>
            
            {/* Tags & Actions */}
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags?.map(tag => (
                  <span key={tag} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-muted" onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}>
                  <Share2 className="w-4 h-4 mr-2" /> Share Article
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
