import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { FileText, Download, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ResearchLibrary() {
  const papers = [
    { title: 'Impact of Microplastics on Marine Biodiversity in the Pacific', authors: 'Dr. Sarah Jenkins, et al.', year: 2025, category: 'Marine Biology' },
    { title: 'Urban Afforestation: Air Quality Improvements in Mega-Cities', authors: 'Dr. R. Mehta', year: 2024, category: 'Ecology' },
    { title: 'Global Glacier Retreat Patterns and Water Scarcity Projections', authors: 'Climate Science Institute', year: 2026, category: 'Climate Change' },
    { title: 'Renewable Energy Adoption Rates in Developing Nations', authors: 'P. Kumar, S. Ali', year: 2025, category: 'Sustainability' },
    { title: 'Deforestation Tracking using Deep Learning on Satellite Imagery', authors: 'A. Patel, et al.', year: 2025, category: 'Technology' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Research Library</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access hundreds of peer-reviewed papers, journals, and reports on environmental science and conservation.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search papers, authors, or topics..." className="pl-10 py-6 text-base bg-card border-border" />
            </div>
            <Button variant="outline" className="py-6 px-6 flex items-center gap-2 border-border"><Filter className="w-5 h-5" /> Filters</Button>
          </div>

          <div className="space-y-4">
            {papers.map((p, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-card border border-border rounded-xl hover:border-purple-500/40 transition-all hover:shadow-sm">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 dark:bg-purple-900/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-lg mb-1 leading-snug">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.authors} • <span className="font-medium text-foreground/80">{p.year}</span></p>
                    <span className="inline-block mt-2 text-[11px] font-semibold tracking-wide uppercase bg-muted text-muted-foreground px-2.5 py-1 rounded-full">{p.category}</span>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="flex-shrink-0 w-full sm:w-auto"><Download className="w-4 h-4 mr-2" /> Download PDF</Button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
