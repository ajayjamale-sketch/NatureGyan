import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Shield, Calendar } from 'lucide-react';

const sections = [
  { title: '1. Information We Collect', content: `We collect information you provide directly to us when you create an account, enroll in courses, use our AI tools, participate in challenges, or contact us. This includes:

• Account information: name, email address, password (hashed), profile photo, and learning preferences
• Learning data: course progress, quiz results, certificates earned, eco-points, and badges
• Usage data: pages visited, features used, search queries, and interactions with the AI assistant
• Device information: IP address, browser type, operating system, and device identifiers
• Communications: messages you send us and feedback you provide

We also collect data through cookies and similar technologies as described in our Cookie Policy.` },
  { title: '2. How We Use Your Information', content: `We use the information we collect to:

• Provide, personalize, and improve our platform and services
• Track your learning progress and generate eco-impact insights
• Recommend relevant courses, challenges, and community groups
• Send educational content, course updates, and platform notifications
• Respond to your comments, questions, and support requests
• Conduct research and analytics to improve NatureGyan
• Comply with legal obligations and enforce our policies

We process your data based on your consent, contractual necessity, legitimate interests, and legal obligations as applicable.` },
  { title: '3. Sharing of Information', content: `We do not sell your personal data. We may share information with:

• Service providers who help us operate the platform (hosting, analytics, payment processing)
• Educational partners when required to issue verified certificates
• Research partners for aggregate, anonymized environmental impact studies
• Law enforcement when required by law or to protect rights and safety

We require all third parties to maintain appropriate security standards and use your data only for specified purposes.` },
  { title: '4. Data Security', content: `We implement industry-standard security measures including:

• Encrypted data transmission (TLS/SSL)
• Encrypted password storage (bcrypt hashing)
• Regular security audits and penetration testing
• Access controls limiting employee access to user data
• Incident response procedures for potential data breaches

While we strive to protect your data, no method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password for your NatureGyan account.` },
  { title: '5. Your Rights & Choices', content: `Depending on your location, you may have rights including:

• Access: Request a copy of personal data we hold about you
• Correction: Update inaccurate or incomplete data
• Deletion: Request deletion of your account and associated data
• Portability: Receive your data in a machine-readable format
• Objection: Object to certain processing activities
• Withdrawal of Consent: Withdraw consent where processing is based on consent

To exercise these rights, contact us at privacy@naturegyan.in. We'll respond within 30 days.` },
  { title: '6. Cookies', content: `We use cookies and similar tracking technologies to enhance your experience. Types include:

• Essential cookies: Necessary for the platform to function (authentication, security)
• Analytics cookies: Help us understand how learners use our platform
• Preference cookies: Remember your settings and preferences
• Marketing cookies: Used with your consent for relevant promotions

You can manage cookie preferences through your browser settings or our cookie consent tool.` },
  { title: '7. Children\'s Privacy', content: `NatureGyan is designed for learners of all ages. For users under 13, we require parental or guardian consent. We collect only the minimum data necessary to provide educational services and do not display targeted advertising to children. Parents/guardians may request review or deletion of their child's data by contacting us.` },
  { title: '8. Contact Us', content: `For privacy-related questions, requests, or concerns, contact our Data Protection Officer:\n\nEmail: privacy@naturegyan.in\nAddress: NatureGyan Privacy Team, Bangalore, Karnataka 560001, India\n\nFor EU residents, you have the right to lodge a complaint with your local data protection authority.` },
];

export default function PrivacyPolicy() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="pt-24 pb-12 gradient-hero text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Shield className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-white/80">Your privacy matters to us. This policy explains how we collect, use, and protect your information.</p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10 p-4 rounded-lg bg-muted/50 border border-border">
              <Calendar className="w-4 h-4" />
              <span>Last updated: June 1, 2026 · Effective: June 1, 2026</span>
            </div>

            <div className="prose prose-sm max-w-none space-y-8">
              <p className="text-muted-foreground leading-relaxed text-base">
                NatureGyan ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our environmental education platform at naturegyan.in and associated services. Please read this policy carefully.
              </p>

              {sections.map(({ title, content }) => (
                <div key={title} className="rounded-xl p-6 bg-card border border-border">
                  <h2 className="text-lg font-bold text-card-foreground mb-4">{title}</h2>
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{content}</div>
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
