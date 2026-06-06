import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { BookOpen, Leaf, Globe, Shield, Activity, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const topics = [
  { title: 'Biodiversity Courses', icon: Leaf, href: '/biodiversity-courses', color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400', desc: 'Explore the richness of life on Earth.' },
  { title: 'Climate Education', icon: Globe, href: '/climate-education', color: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400', desc: 'Understand climate science and solutions.' },
  { title: 'Wildlife Programs', icon: Shield, href: '/wildlife-programs', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', desc: 'Learn about wildlife conservation.' },
  { title: 'Sustainability Hub', icon: Activity, href: '/sustainability-hub', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400', desc: 'Practical guides for an eco-friendly life.' },
  { title: 'Research Library', icon: FileText, href: '/research-library', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400', desc: 'Access peer-reviewed papers and reports.' },
];

export default function Learn() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Learning Center</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dive deep into environmental science with our curated educational pathways. Choose a topic below to start your journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <Link key={topic.title} to={topic.href} className="group p-6 bg-card border border-border rounded-2xl hover:shadow-lg transition-all hover:border-primary/50">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${topic.color}`}>
                  <topic.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{topic.title}</h3>
                <p className="text-muted-foreground text-sm">{topic.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
