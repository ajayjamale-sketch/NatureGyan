import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Newspaper, Download, Calendar, Mail, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const pressReleases = [
  {
    id: 'pr-1',
    date: 'May 12, 2026',
    title: 'NatureGyan Crosses 2.4 Million Active Learners Milestone Globally',
    excerpt: 'The AI-powered environmental education platform announces significant global user expansion alongside new regional species classification models.',
    content: 'We are thrilled to announce that NatureGyan has officially surpassed 2.4 million active users worldwide. Over the past twelve months, the platform has seen exponential adoption, particularly in classrooms across South Asia and East Africa.\n\nAlongside this milestone, we are releasing updated regional machine learning models for biodiversity identification, allowing for higher precision in recognizing native fauna and flora under varying canopy coverage conditions.\n\nOur team remains committed to offering world-class open-access environmental coursework to students, researchers, and citizen scientists globally.'
  },
  {
    id: 'pr-2',
    date: 'March 20, 2026',
    title: 'NatureGyan Partners with Leading Conservation NGOs to Power Citizen Science',
    excerpt: 'Collaborative integration enables verified field observations from students and local researchers to directly assist regional biodiversity mapping databases.',
    content: 'NatureGyan has entered into a strategic collaboration with regional and international conservation organizations. Under this new partnership framework, field observations uploaded via our mobile and offline applications can be voluntarily shared with verified databases.\n\nThis bridge facilitates real-time data flow from student excursions directly to ecological research portals. The collaboration aims to accelerate local policy drafting and focus habitat restoration efforts on critical ecological corridors.'
  },
  {
    id: 'pr-3',
    date: 'January 15, 2026',
    title: 'NatureGyan Unveils Offline AI Model Support for Remote Classrooms',
    excerpt: 'A breakthrough lightweight local model enables classrooms with intermittent or zero internet connectivity to use species identification features.',
    content: 'Access to technology should not be limited by connectivity. Today, NatureGyan releases its local classification model capability, designed to run entirely on mid-range smartphones and tablets without requiring an active internet connection.\n\nBy leveraging advanced model compression techniques, we have package-sized our database of 50,000+ local flora and fauna species to run locally. This update empowers educators in remote forest reserves and field research sites to continue teaching without interruption.'
  },
];

export default function Press() {
  const { pathname } = useLocation();
  const [selectedRelease, setSelectedRelease] = useState<any | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedRelease(null);
      }
    };
    if (selectedRelease) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedRelease]);

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
        <section className="pt-32 pb-16 bg-slate-50 dark:bg-slate-900/50 text-center border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Newspaper className="w-3.5 h-3.5" /> Press
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Press & Media Room</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
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
                  <Button 
                    variant="link" 
                    className="text-primary hover:text-primary/80 font-bold p-0 flex items-center gap-1.5"
                    onClick={() => setSelectedRelease(pr)}
                  >
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
            <div 
              className="inline-flex items-center gap-2.5 bg-card border border-border px-5 py-3 rounded-xl shadow-sm cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => {
                navigator.clipboard.writeText('press@naturegyan.in');
                toast.success('Email copied to clipboard: press@naturegyan.in');
              }}
            >
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">press@naturegyan.in</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />

      {/* Press Release Details Modal */}
      {selectedRelease && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={(e) => e.target === e.currentTarget && setSelectedRelease(null)}
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border animate-in zoom-in-95 fade-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-border bg-muted/30">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-primary" /> 
                Press Release
              </h3>
              <button 
                onClick={() => setSelectedRelease(null)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                <Calendar className="w-3.5 h-3.5" /> {selectedRelease.date}
              </div>
              <h4 className="text-2xl font-bold text-foreground">{selectedRelease.title}</h4>
              <p className="text-sm font-semibold text-muted-foreground border-l-2 border-primary pl-3 italic">
                {selectedRelease.excerpt}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-foreground leading-relaxed text-sm whitespace-pre-line">
                  {selectedRelease.content}
                </p>
              </div>
            </div>
            <div className="p-5 border-t border-border bg-muted/20 flex justify-end gap-2">
              <Button 
                onClick={() => {
                  toast.success('Press release PDF compiled!');
                  setSelectedRelease(null);
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 border-0 shadow-sm"
              >
                Download Release PDF
              </Button>
              <Button 
                onClick={() => setSelectedRelease(null)}
                variant="outline"
                className="rounded-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
