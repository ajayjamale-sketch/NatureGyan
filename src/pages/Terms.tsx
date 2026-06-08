import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { FileText, Calendar } from 'lucide-react';

const termsSections = [
  { title: '1. Acceptance of Terms', content: 'By accessing or using NatureGyan ("the Platform"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services. These terms apply to all users including students, educators, researchers, and organizational accounts.' },
  { title: '2. User Accounts', content: 'To access most features, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. You must provide accurate information and promptly update it if it changes. You may not create accounts for others without authorization or create multiple accounts for the same individual.' },
  { title: '3. Acceptable Use', content: `You agree not to:
• Use the platform for any unlawful purpose or in violation of these terms
• Share, sell, or distribute course content without explicit permission
• Misrepresent your identity or affiliation with any organization
• Upload content that violates intellectual property rights, contains harmful material, or is fraudulent
• Attempt to access, disrupt, or interfere with the platform's security or functionality
• Use automated tools to scrape content or create fake accounts
• Submit false species identification reports that could mislead the community` },
  { title: '4. Content & Intellectual Property', content: 'All course content, AI-generated responses, platform design, and NatureGyan branding are owned by or licensed to NatureGyan. You may access content for personal, educational use only. You retain ownership of content you create (forum posts, research submissions, eco-challenge records) but grant NatureGyan a license to display and distribute it on the platform.' },
  { title: '5. Paid Services & Refunds', content: 'Paid subscriptions are charged in advance on a monthly or annual basis. You may cancel at any time; your access continues until the end of the paid period. For annual plans, we offer a pro-rated refund within 14 days of purchase if you are unsatisfied. Certificates once issued are non-refundable.' },
  { title: '6. Disclaimer of Warranties', content: 'The platform and its content are provided "as is" without warranties of any kind. While we strive for accuracy in scientific content, NatureGyan is an educational platform and should not be the sole basis for critical environmental decisions. AI-powered species identification is provided for learning purposes and may not be 100% accurate in all cases.' },
  { title: '7. Limitation of Liability', content: 'To the maximum extent permitted by law, NatureGyan shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability for any claim shall not exceed the amount you paid to us in the 12 months preceding the claim.' },
  { title: '8. Termination', content: 'We may suspend or terminate your account for violations of these terms, harmful conduct, extended inactivity (for free accounts), or at our discretion with reasonable notice. Upon termination, your right to use the platform ceases. We will retain your data per our Privacy Policy and applicable law.' },
  { title: '9. Governing Law', content: 'These terms shall be governed by the laws of India. Any disputes shall be resolved through binding arbitration in Bangalore, Karnataka, except where prohibited by law. You waive the right to participate in class action lawsuits against NatureGyan.' },
  { title: '10. Contact', content: 'For questions about these Terms of Service, contact us at legal@naturegyan.in or write to: NatureGyan Legal Team, Bangalore, Karnataka 560001, India.' },
];

export default function Terms() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-slate-50 dark:bg-slate-900/50 text-center border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <FileText className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">Please read these terms carefully before using NatureGyan.</p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10 p-4 rounded-lg bg-muted/50 border border-border">
              <Calendar className="w-4 h-4" />
              <span>Last updated: June 1, 2026 · Effective: June 1, 2026</span>
            </div>
            <div className="space-y-6">
              {termsSections.map(({ title, content }) => (
                <div key={title} className="rounded-xl p-6 bg-card border border-border">
                  <h2 className="text-lg font-bold text-card-foreground mb-3">{title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{content}</p>
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
