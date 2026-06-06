import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Globe, Thermometer, Wind, CloudRain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ClimateEducation() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 mx-auto bg-sky-100 text-sky-600 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center mb-6">
              <Globe className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Climate Education</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Understand the science behind climate change, its global impacts, and the actionable solutions we can implement today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Thermometer, title: 'Global Warming', desc: 'Study temperature trends and greenhouse gas effects on our atmosphere.' },
              { icon: Wind, title: 'Renewable Energy', desc: 'Explore wind, solar, and alternative power sources shaping the future.' },
              { icon: CloudRain, title: 'Weather Patterns', desc: 'Learn how climate shifts affect extreme weather events and seasons.' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-card border border-border rounded-2xl text-center hover:border-sky-500/30 transition-colors">
                <div className="w-12 h-12 mx-auto bg-sky-50 text-sky-600 dark:bg-sky-900/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to master climate science?</h2>
            <p className="text-muted-foreground mb-6">Enroll in our comprehensive climate programs and start making a difference.</p>
            <Button size="lg" className="gradient-primary text-white">Browse Climate Courses <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
