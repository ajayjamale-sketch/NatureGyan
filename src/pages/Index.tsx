import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import HeroSection from '@/components/features/landing/HeroSection';
import FeaturesSection from '@/components/features/landing/FeaturesSection';
import WorkflowSection from '@/components/features/landing/WorkflowSection';
import BenefitsSection from '@/components/features/landing/BenefitsSection';
import DashboardPreview from '@/components/features/landing/DashboardPreview';
import TestimonialsSection from '@/components/features/landing/TestimonialsSection';
import PricingSection from '@/components/features/landing/PricingSection';
import FAQSection from '@/components/features/landing/FAQSection';
import CTABanner from '@/components/features/landing/CTABanner';

export default function Index() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <BenefitsSection />
        <DashboardPreview />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
