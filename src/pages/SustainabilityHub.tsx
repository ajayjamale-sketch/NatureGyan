import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Activity, Battery, Droplets, Recycle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SustainabilityHub() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6">
              <Activity className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Sustainability Hub</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical strategies and tools to reduce your environmental footprint and live a more eco-conscious lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
             {[
               { icon: Recycle, title: 'Zero Waste Living', desc: 'Tips for reducing plastic use and managing household waste efficiently.' },
               { icon: Battery, title: 'Energy Efficiency', desc: 'How to lower your power consumption and optimize home energy use.' },
               { icon: Droplets, title: 'Water Conservation', desc: 'Smart ways to save water in your daily routine and garden.' },
             ].map((item, i) => (
               <div key={i} className="bg-card border border-border p-6 rounded-2xl hover:border-emerald-500/30 transition-all flex flex-col">
                 <div className="w-12 h-12 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center mb-4">
                   <item.icon className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                 <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.desc}</p>
                 <Button variant="link" className="p-0 text-emerald-600 self-start">Read Guide <ArrowRight className="w-4 h-4 ml-1" /></Button>
               </div>
             ))}
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
             <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-2 text-foreground">Track your impact</h3>
               <p className="text-muted-foreground">Use our interactive carbon footprint calculator to measure your progress over time.</p>
             </div>
             <Button size="lg" className="gradient-primary text-white flex-shrink-0 relative z-10">Open Calculator</Button>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
