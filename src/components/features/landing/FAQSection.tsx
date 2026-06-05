import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '@/constants';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function FAQSection() {
  const [open, setOpen] = useState<string | null>('1');
  const navigate = useNavigate();
  const displayed = FAQ_ITEMS.slice(0, 6);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently asked{' '}
            <span className="text-gradient">questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about NatureGyan. Can't find what you're looking for?{' '}
            <button onClick={() => navigate('/contact')} className="text-primary hover:underline">Contact us</button>.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {displayed.map((item) => (
            <div
              key={item.id}
              className={cn(
                'rounded-xl border transition-all duration-200',
                open === item.id
                  ? 'border-primary/30 bg-primary/5 shadow-sm'
                  : 'border-border bg-card hover:border-primary/20'
              )}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpen(open === item.id ? null : item.id)}
              >
                <span className={cn('font-medium text-sm sm:text-base pr-4', open === item.id ? 'text-primary' : 'text-card-foreground')}>
                  {item.question}
                </span>
                <ChevronDown
                  className={cn('w-5 h-5 flex-shrink-0 transition-transform duration-300', open === item.id ? 'rotate-180 text-primary' : 'text-muted-foreground')}
                />
              </button>
              {open === item.id && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button onClick={() => navigate('/faq')} className="text-primary hover:underline text-sm font-medium">
            View all {FAQ_ITEMS.length} questions →
          </button>
        </div>
      </div>
    </section>
  );
}
