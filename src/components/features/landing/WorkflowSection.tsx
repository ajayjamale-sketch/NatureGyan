import { UserCircle, Search, Scan, Zap } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: UserCircle,
    title: 'Create Your Learning Profile',
    description: 'Tell us your interests — biodiversity, climate, wildlife, or sustainability. Our AI personalizes your entire learning journey from day one.',
    detail: 'Choose from Student, Educator, Researcher, or Nature Enthusiast profiles',
  },
  {
    step: '02',
    icon: Search,
    title: 'Explore & Learn',
    description: 'Dive into expert-crafted courses, ask the AI assistant your questions, and explore the interactive biodiversity encyclopedia.',
    detail: '500+ courses across 12 subject categories',
  },
  {
    step: '03',
    icon: Scan,
    title: 'Identify & Discover',
    description: 'Upload photos to identify species in your surroundings. Every identification becomes a learning moment connected to relevant courses.',
    detail: 'Recognize 50,000+ plant and animal species',
  },
  {
    step: '04',
    icon: Zap,
    title: 'Act & Make Impact',
    description: 'Join eco-challenges, participate in conservation campaigns, reduce your carbon footprint, and contribute to citizen science projects.',
    detail: 'Track your personal environmental impact in real time',
  },
];

export default function WorkflowSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your journey from{' '}
            <span className="text-gradient">curious to impactful</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            NatureGyan guides you through a seamless path from first discovery to real-world environmental action.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative text-center group">
                  {/* Step Number + Icon */}
                  <div className="relative inline-flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow relative z-10 mb-2">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-bold text-primary/60 tracking-widest">{step.step}</span>
                  </div>

                  <h3 className="font-semibold text-lg text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                  <div className="inline-flex items-center text-xs text-primary bg-primary/8 rounded-full px-3 py-1 font-medium">
                    {step.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
