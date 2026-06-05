import { ArrowRight, Leaf, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RegistrationModal } from '@/components/ui/registration-modal';

export default function CTABanner() {
  const navigate = useNavigate();
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 max-w-7xl relative z-10">
        <div className="rounded-3xl gradient-primary p-8 sm:p-12 lg:p-16 text-white overflow-hidden relative">
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Leaf className="w-3.5 h-3.5" />
                Join the movement
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Start your nature education journey today
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Join 2.4 million learners, educators, and conservationists who are using NatureGyan to understand our planet and protect it for future generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg group"
                  onClick={() => setJoinModalOpen(true)}
                >
                  Join the Community
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                  onClick={() => navigate('/contact')}
                >
                  Talk to Sales
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Leaf, value: '500+', label: 'Expert Courses', desc: 'Certified programs in biodiversity, climate, and wildlife' },
                { icon: Users, value: '2.4M+', label: 'Active Learners', desc: 'Students, teachers, and researchers worldwide' },
                { icon: Globe, value: '180+', label: 'Countries', desc: 'Global community of nature enthusiasts' },
                { icon: Leaf, value: '94%', label: 'Satisfaction', desc: 'Learners report measurable environmental knowledge gain' },
              ].map(({ icon: Icon, value, label, desc }) => (
                <div key={label} className="rounded-2xl bg-white/10 backdrop-blur-sm p-5 border border-white/20">
                  <Icon className="w-6 h-6 text-white/70 mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-sm font-medium text-white/80 mb-1">{label}</div>
                  <div className="text-xs text-white/60 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <RegistrationModal isOpen={joinModalOpen} onClose={() => setJoinModalOpen(false)} type="community" />
    </section>
  );
}
