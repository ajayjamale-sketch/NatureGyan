import { useState } from 'react';
import { CheckCircle2, Leaf, Zap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PRICING_PLANS } from '@/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { PaymentModal } from './PaymentModal';

const planIcons = [Leaf, Zap, Building2];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: number} | null>(null);

  const handlePlanClick = (planName: string, price: number) => {
    if (isAuthenticated) {
      setSelectedPlan({ name: planName, price });
      setPaymentModalOpen(true);
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            Simple Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Plans for every{' '}
            <span className="text-gradient">nature learner</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Start free, upgrade when ready. No credit card required for the Explorer plan.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-background border border-border rounded-full p-1">
            <button
              className={cn('px-5 py-2 rounded-full text-sm font-medium transition-all', !yearly ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground')}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              className={cn('px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2', yearly ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground')}
              onClick={() => setYearly(true)}
            >
              Yearly
              <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full px-2 py-0.5">Save 30%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRICING_PLANS.map((plan, index) => {
            const Icon = planIcons[index];
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            return (
              <div
                key={plan.id}
                className={cn(
                  'rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-300',
                  plan.highlighted
                    ? 'gradient-primary text-white shadow-2xl scale-105 relative'
                    : 'bg-card border border-border leaf-shadow hover:shadow-lg'
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', plan.highlighted ? 'bg-white/20' : 'bg-primary/10')}>
                  <Icon className={cn('w-6 h-6', plan.highlighted ? 'text-white' : 'text-primary')} />
                </div>

                <h3 className={cn('text-xl font-bold mb-1', plan.highlighted ? 'text-white' : 'text-card-foreground')}>{plan.name}</h3>
                <p className={cn('text-sm mb-6', plan.highlighted ? 'text-white/70' : 'text-muted-foreground')}>{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={cn('text-4xl font-bold', plan.highlighted ? 'text-white' : 'text-foreground')}>
                      {price === 0 ? 'Free' : `$${price}`}
                    </span>
                    {price > 0 && (
                      <span className={cn('text-sm', plan.highlighted ? 'text-white/60' : 'text-muted-foreground')}>
                        /{yearly ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {yearly && price > 0 && (
                    <p className={cn('text-xs mt-1', plan.highlighted ? 'text-white/60' : 'text-muted-foreground')}>
                      ${(plan.price.monthly * 12).toFixed(0)}/year → save ${(plan.price.monthly * 12 - price)}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className={cn('w-4 h-4 flex-shrink-0 mt-0.5', plan.highlighted ? 'text-white/80' : 'text-primary')} />
                      <span className={cn('text-sm', plan.highlighted ? 'text-white/90' : 'text-card-foreground')}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn('w-full font-semibold transition-all', plan.highlighted ? 'bg-white text-primary hover:bg-white/90' : 'gradient-primary text-white hover:opacity-90')}
                  onClick={() => handlePlanClick(plan.name, price)}
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Enterprise */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-card border border-border text-center">
          <h4 className="text-lg font-semibold text-card-foreground mb-2">Enterprise & Educational Institutions</h4>
          <p className="text-muted-foreground mb-4">Custom pricing for schools, universities, NGOs, and government organizations. Includes white-labeling, bulk licenses, and dedicated support.</p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" onClick={() => navigate('/contact')}>
            Contact Sales
          </Button>
        </div>
      </div>
      
      {selectedPlan && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          planName={selectedPlan.name}
          price={selectedPlan.price}
          yearly={yearly}
        />
      )}
    </section>
  );
}
