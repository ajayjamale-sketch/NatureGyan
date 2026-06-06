import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Shield, MapPin, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WildlifePrograms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto bg-amber-100 text-amber-600 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Wildlife Protection Programs</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join active conservation efforts to protect endangered species and their natural habitats across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="rounded-2xl overflow-hidden relative h-[400px]">
              <img src="https://images.unsplash.com/photo-1549366021-9f761d450615?w=800" alt="Wildlife Conservation" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">Featured Program</span>
                <h2 className="text-2xl font-bold text-white mb-2">Tiger Reserve Initiative</h2>
                <p className="text-white/80 mb-4">Help us track and protect the endangered Bengal Tiger populations in critical habitats.</p>
                <Button className="w-fit" variant="secondary">Learn More</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Anti-Poaching Patrols', icon: Shield, desc: 'Support on-ground teams preventing illegal hunting and tracking poachers.' },
                { title: 'Habitat Restoration', icon: MapPin, desc: 'Replanting forests and securing safe wildlife corridors for migration.' },
                { title: 'Community Education', icon: Users, desc: 'Teaching local communities to coexist with wildlife peacefully.' },
                { title: 'Animal Rescue', icon: Heart, desc: 'Emergency response for injured, displaced, or stranded animals.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:border-amber-500/30 transition-colors">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 dark:bg-amber-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1 text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
