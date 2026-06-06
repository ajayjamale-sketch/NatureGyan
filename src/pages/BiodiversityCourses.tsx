import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Leaf, Clock, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const courses = [
  { title: 'Introduction to Plant Biology', duration: '4 Weeks', rating: '4.8', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400' },
  { title: 'Marine Ecosystems & Coral Reefs', duration: '6 Weeks', rating: '4.9', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400' },
  { title: 'Forest Ecology Essentials', duration: '5 Weeks', rating: '4.7', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400' },
  { title: 'Biodiversity & Climate Links', duration: '8 Weeks', rating: '4.9', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400' },
  { title: 'Urban Ecosystems', duration: '3 Weeks', rating: '4.6', img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400' },
  { title: 'Endangered Species Management', duration: '7 Weeks', rating: '4.8', img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400' }
];

export default function BiodiversityCourses() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Biodiversity Courses</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore the intricate web of life. From microscopic organisms to vast forests, understand the ecosystems that sustain our planet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative flex-shrink-0">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{c.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 mt-auto">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {c.duration}</span>
                    <span className="flex items-center gap-1 text-amber-500"><Star className="w-4 h-4 fill-current" /> {c.rating}</span>
                  </div>
                  <Button className="w-full" variant="outline">View Course <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </div>
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
