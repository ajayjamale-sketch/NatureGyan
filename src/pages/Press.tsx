import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Newspaper, Download, Calendar, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const pressReleases = [
  {
    id: 'pr-1',
    date: 'May 12, 2026',
    title: 'NatureGyan Crosses 2.4 Million Active Learners Milestone Globally',
    excerpt: 'The AI-powered environmental education platform announces significant global user expansion alongside new regional species classification models.',
  },
  {
    id: 'pr-2',
    date: 'March 20, 2026',
    title: 'NatureGyan Partners with Leading Conservation NGOs to Power Citizen Science',
    excerpt: 'Collaborative integration enables verified field observations from students and local researchers to directly assist regional biodiversity mapping databases.',
  },
  {
    id: 'pr-3',
    date: 'January 15, 2026',
    title: 'NatureGyan Unveils Offline AI Model Support for Remote Classrooms',
    excerpt: 'A breakthrough lightweight local model enables classrooms with intermittent or zero internet connectivity to use species identification features.',
  },
];

export default function Press() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleDownloadBrandKit = () => {
    toast.success('Brand kit download started!', {
      description: 'The NatureGyan Media Assets ZIP file is downloading.',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Newspaper className="w-3.5 h-3.5" /> Press
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Press & Media Room</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Access the latest updates, news releases, official statements, and approved brand media assets.
            </p>
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="py-16 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
            <div className="bg-card border border-border p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-sm">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">NatureGyan Brand Assets</h2>
                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  Download high-resolution logos, brand guidelines, product mockups, and team photographs approved for publication.
                </p>
              </div>
              <Button
                onClick={handleDownloadBrandKit}
                className="gradient-primary text-white font-semibold flex items-center gap-2 w-full md:w-auto justify-center"
              >
                <Download className="w-4 h-4" /> Download Brand Kit (14.2 MB)
              </Button>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((pr) => (
                <div key={pr.id} className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-3">
                    <Calendar className="w-3.5 h-3.5" /> {pr.date}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{pr.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pr.excerpt}</p>
                  <Button variant="link" className="text-primary hover:text-primary/80 font-bold p-0 flex items-center gap-1.5">
                    Read Full Release <FileText className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact */}
        <section className="py-16 bg-muted/20 border-t border-border">
          <div className="container mx-auto px-4 lg:px-6 max-w-3xl text-center space-y-6">
            <h2 className="text-2xl font-bold">Media Inquiries</h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto text-sm">
              Are you a journalist or researcher working on a story about educational technology, AI, or citizen science conservation? Get in touch with our communications team.
            </p>
            <div className="inline-flex items-center gap-2.5 bg-card border border-border px-5 py-3 rounded-xl shadow-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">press@naturegyan.in</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
