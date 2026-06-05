import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    audience: 'Students & Learners',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80',
    points: [
      'Curriculum-aligned environmental science courses',
      'AI-assisted learning for complex ecology topics',
      'Gamified challenges and eco-quests',
      'Certified courses for academic portfolios',
      'Interactive species identification tools',
    ],
  },
  {
    audience: 'Teachers & Educators',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
    points: [
      'Classroom management and student tracking',
      'Curriculum-ready lesson plans and resources',
      'Student progress and learning analytics',
      'Virtual field trips and eco-activities',
      'Collaborative research project tools',
    ],
  },
  {
    audience: 'Researchers & Organizations',
    image: 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=600&auto=format&fit=crop&q=80',
    points: [
      'Access to 10,000+ research papers and reports',
      'Citizen science data collection networks',
      'Campaign and volunteer management tools',
      'Environmental impact analytics dashboard',
      'Partnership and publication opportunities',
    ],
  },
];

export default function BenefitsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            Built for Everyone
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Designed for every{' '}
            <span className="text-gradient">nature learner</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a student discovering ecosystems or a researcher publishing field studies, NatureGyan adapts to your goals.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.audience}
              className={`rounded-2xl overflow-hidden border border-border leaf-shadow card-hover ${
                index === 1 ? 'lg:-mt-4 lg:mb-4' : ''
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={benefit.image}
                  alt={benefit.audience}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white font-semibold text-lg">{benefit.audience}</span>
                </div>
              </div>
              <div className="p-6 bg-card">
                <ul className="space-y-3">
                  {benefit.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-card-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full mt-6 group border-primary/30 text-primary hover:bg-primary hover:text-white transition-all"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
