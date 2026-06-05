import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/constants';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActiveIndex(i => (i + 1) % TESTIMONIALS.length);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Star className="w-3.5 h-3.5 fill-current" />
            Loved by 2.4M+ learners
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What our community{' '}
            <span className="text-gradient">is saying</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Educators, researchers, and nature enthusiasts from around the world share their NatureGyan experience.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-8">
          <div className="max-w-3xl mx-auto rounded-2xl bg-card border border-border p-8 sm:p-10 leaf-shadow relative overflow-hidden">
            <div className="absolute top-6 right-8 text-primary/10">
              <Quote className="w-20 h-20" />
            </div>
            <div className="flex items-start gap-4 mb-6">
              <img
                src={TESTIMONIALS[activeIndex].avatar}
                alt={TESTIMONIALS[activeIndex].name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0"
              />
              <div>
                <div className="font-semibold text-card-foreground text-lg">{TESTIMONIALS[activeIndex].name}</div>
                <div className="text-sm text-muted-foreground">{TESTIMONIALS[activeIndex].role}</div>
                <div className="text-sm text-primary/70">{TESTIMONIALS[activeIndex].organization}</div>
              </div>
            </div>
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: TESTIMONIALS[activeIndex].rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
              ))}
            </div>
            <p className="text-card-foreground leading-relaxed text-base italic relative z-10">
              "{TESTIMONIALS[activeIndex].content}"
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-muted hover:bg-muted-foreground'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mini Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <div key={t.id} className="p-5 rounded-xl bg-muted/50 border border-border">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic mb-4 line-clamp-3">"{t.content}"</p>
              <div className="flex items-center gap-2">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
