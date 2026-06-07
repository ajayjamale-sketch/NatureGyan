import { Brain, Camera, GraduationCap, Globe, Leaf, Users, Trophy, BarChart3, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Brain,
    title: 'AI Nature Assistant',
    description: 'Ask anything about wildlife, plants, ecosystems, or climate. Get instant, science-backed answers from our specialized environmental AI.',
    color: 'bg-green-50 dark:bg-primary/20 text-primary dark:text-primary',
    border: 'border-green-100 dark:border-green-800',
  },
  {
    icon: Camera,
    title: 'Species Identification',
    description: 'Upload a photo of any plant, bird, or insect and get instant AI-powered identification with detailed species information and habitat data.',
    color: 'bg-sky-50 dark:bg-accent/20 text-accent dark:text-accent',
    border: 'border-sky-100 dark:border-sky-800',
  },
  {
    icon: GraduationCap,
    title: 'Nature Learning Academy',
    description: '500+ expert-crafted courses on biodiversity, climate change, wildlife, sustainability, and ecology with verified certificates.',
    color: 'bg-amber-50 dark:bg-secondary/20 text-secondary dark:text-secondary',
    border: 'border-amber-100 dark:border-amber-800',
  },
  {
    icon: Globe,
    title: 'Biodiversity Explorer',
    description: 'Explore interactive maps and encyclopedias of flora and fauna, habitat types, migration patterns, and global conservation status.',
    color: 'bg-emerald-50 dark:bg-primary/20 text-primary dark:text-primary',
    border: 'border-emerald-100 dark:border-emerald-800',
  },
  {
    icon: Leaf,
    title: 'Sustainability Hub',
    description: 'Carbon footprint calculator, eco-lifestyle guides, green challenges, water conservation tips, and renewable energy education.',
    color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
    border: 'border-teal-100 dark:border-teal-800',
  },
  {
    icon: Users,
    title: 'Eco-Community Network',
    description: 'Connect with naturalists, researchers, and conservationists. Join forums, citizen science projects, eco-clubs, and local initiatives.',
    color: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400',
    border: 'border-violet-100 dark:border-violet-800',
  },
  {
    icon: Trophy,
    title: 'Eco-Challenges',
    description: 'Participate in tree planting drives, cleanup campaigns, wildlife monitoring, and sustainability challenges to earn eco-points.',
    color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    border: 'border-orange-100 dark:border-orange-800',
  },
  {
    icon: BarChart3,
    title: 'Impact Dashboard',
    description: 'Track your learning progress, sustainability score, carbon reduction metrics, eco-activities, and achievement badges.',
    color: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-100 dark:border-cyan-800',
  },
  {
    icon: BookOpen,
    title: 'Research Repository',
    description: 'Access thousands of research papers, environmental reports, scientific case studies, and educational resources curated by experts.',
    color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
    border: 'border-rose-100 dark:border-rose-800',
  },
];

export default function FeaturesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background nature-pattern">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Leaf className="w-3.5 h-3.5" />
            Everything You Need
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            A complete platform for{' '}
            <span className="text-gradient">nature education</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered species identification to certified biodiversity courses, NatureGyan gives you every tool to learn, explore, and make a difference.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`card-hover p-6 rounded-2xl bg-card border ${feature.border} leaf-shadow group cursor-default`}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="gradient-primary text-white px-8"
            onClick={() => navigate('/features')}
          >
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
}
