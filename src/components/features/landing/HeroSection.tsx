import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Leaf, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroForest from '@/assets/hero-forest.jpg';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroForest}
          alt="Lush forest canopy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Floating Badge */}
      <div className="absolute top-24 right-4 md:right-12 z-10 hidden sm:block">
        <div className="glass rounded-2xl px-4 py-3 text-white text-sm font-medium animate-fade-in delay-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            2.4M+ Active Learners
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-6 max-w-7xl pt-20">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-6 animate-fade-in-up">
            <Leaf className="w-4 h-4 text-green-400" />
            AI-Powered Environmental Education Platform
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up delay-100">
            Discover,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Learn
            </span>{' '}
            & Protect{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
              Nature
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl animate-fade-in-up delay-200">
            Explore biodiversity, master sustainability, identify wildlife, and take meaningful action for our planet — powered by AI and guided by experts.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up delay-300">
            <Button
              size="lg"
              className="gradient-primary text-white h-13 px-8 text-base font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all group"
              onClick={() => navigate('/register')}
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-13 px-8 text-base font-semibold border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              onClick={() => navigate('/features')}
            >
              <Play className="w-4 h-4 mr-2 fill-current" />
              See How It Works
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
            {[
              { icon: Shield, text: 'Certified Courses' },
              { icon: Zap, text: 'AI-Powered Learning' },
              { icon: Leaf, text: 'Real Impact Tracking' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon className="w-4 h-4 text-green-400" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '2.4M+', label: 'Active Learners' },
              { value: '500+', label: 'Expert Courses' },
              { value: '180+', label: 'Countries' },
              { value: '94%', label: 'Satisfaction Rate' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
