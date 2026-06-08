import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Brain, Camera, GraduationCap, Globe, Leaf, Users, Trophy, BarChart3, BookOpen, ArrowRight, CheckCircle2 , Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COURSES } from '@/constants';

const featureSections = [
  {
    icon: GraduationCap,
    title: 'Nature Learning Academy',
    description: 'A world-class library of 500+ courses spanning biodiversity, wildlife, climate change, ecology, and sustainability — each designed by domain experts and structured for deep, lasting learning.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
    points: ['Beginner to advanced level paths', 'Video lectures, readings & quizzes', 'Verified certificates on completion', 'Self-paced & instructor-led options'],
    accent: 'green',
  },
  {
    icon: Brain,
    title: 'AI Nature Assistant',
    description: 'Ask any environmental science question and receive instant, science-backed responses. Our AI is trained on millions of research papers and field studies to provide accurate ecological insights.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=80',
    points: ['Natural language Q&A on ecology', 'Climate science explanations', 'Conservation strategy recommendations', 'Learning support & study assistance'],
    accent: 'blue',
    reverse: true,
  },
  {
    icon: Camera,
    title: 'AI Species Identification',
    description: 'Point your camera at any plant, bird, insect, or animal. Our computer vision AI identifies species in seconds and delivers rich educational content about each one.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
    points: ['50,000+ plant & animal species', 'Habitat & conservation status data', 'Location-aware identification', 'Personal nature observation journal'],
    accent: 'amber',
  },
  {
    icon: Leaf,
    title: 'Sustainability Hub',
    description: 'Practical tools and programs to help you calculate, understand, and reduce your environmental impact — from carbon footprint tracking to eco-lifestyle challenges.',
    image: 'https://images.unsplash.com/photo-1536147116438-62679a5e01f2?w=800&auto=format&fit=crop&q=80',
    points: ['Personal carbon footprint calculator', 'Eco-lifestyle challenge program', 'Renewable energy education', 'Waste reduction guides'],
    accent: 'teal',
    reverse: true,
  },
];

const accentColors: Record<string, string> = {
  green: 'bg-green-50 dark:bg-primary/20 text-primary dark:text-primary',
  blue: 'bg-sky-50 dark:bg-accent/20 text-accent dark:text-accent',
  amber: 'bg-amber-50 dark:bg-secondary/20 text-secondary dark:text-secondary',
  teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
};

export default function Features() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-slate-50 dark:bg-slate-900/50 text-center border-b border-border">
          <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Leaf className="w-3.5 h-3.5" /> Platform Features
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Every tool to learn,{' '}
              <span className="text-primary dark:text-primary">explore & protect</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From AI-powered species identification to certified courses and eco-impact tracking — NatureGyan brings everything together in one platform.
            </p>
          </div>
        </section>

        {/* Feature Deep-Dives */}
        {featureSections.map((feature) => {
          const Icon = feature.icon;
          return (
            <section key={feature.title} className="py-16 bg-background odd:bg-muted/20">
              <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${feature.reverse ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={feature.reverse ? 'lg:order-2' : ''}>
                    <div className={`w-12 h-12 rounded-xl ${accentColors[feature.accent]} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">{feature.title}</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">{feature.description}</p>
                    <ul className="space-y-3 mb-8">
                      {feature.points.map(p => (
                        <li key={p} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-foreground">{p}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="gradient-primary text-white group" onClick={() => navigate('/register')}>
                      Try It Free <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <div className={feature.reverse ? 'lg:order-1' : ''}>
                    <img src={feature.image} alt={feature.title} className="rounded-2xl shadow-xl w-full h-72 lg:h-96 object-cover" />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Course Showcase */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Featured Courses</h2>
              <p className="text-muted-foreground">Start with our most popular courses, loved by millions of learners.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSES.map(course => (
                <div key={course.id} className="rounded-2xl overflow-hidden bg-card border border-border card-hover">
                  <img src={course.image} alt={course.title} className="w-full h-44 object-cover" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">{course.category}</span>
                      <span className="text-xs text-muted-foreground capitalize">{course.level}</span>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-1 line-clamp-2">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span><Star className="inline w-4 h-4 text-yellow-500 mr-1" /> {course.rating} · {course.enrolled.toLocaleString()} learners</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button className="gradient-primary text-white px-8" onClick={() => navigate('/biodiversity-courses')}>
                Explore All 500+ Courses
              </Button>
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">And much more...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Globe, title: 'Biodiversity Explorer', desc: 'Interactive encyclopedia of flora and fauna with habitat maps and conservation status.' },
                { icon: Users, title: 'Eco-Community', desc: 'Join forums, citizen science networks, eco-clubs, and conservation groups.' },
                { icon: Trophy, title: 'Eco-Challenges', desc: 'Tree planting drives, cleanup campaigns, and sustainability quests with real-world impact.' },
                { icon: BarChart3, title: 'Impact Dashboard', desc: 'Track your learning, carbon savings, eco-activities, and personal sustainability score.' },
                { icon: BookOpen, title: 'Research Library', desc: '10,000+ research papers, reports, and case studies curated by environmental scientists.' },
                { icon: Camera, title: 'Nature Journal', desc: 'Document your nature observations, build a personal species log, contribute to citizen science.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-5 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors">
                  <Icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
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
