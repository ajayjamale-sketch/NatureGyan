import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Briefcase, ArrowRight, MapPin, Clock, CheckCircle, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const positions = [
  {
    id: '1',
    title: 'AI Computer Vision Engineer',
    department: 'Engineering',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    description: 'Help build and scale our species identification models. Experience with PyTorch, TensorFlow, and Edge AI deployment is preferred.',
  },
  {
    id: '2',
    title: 'Curriculum Designer (Biodiversity & Climate)',
    department: 'Education',
    location: 'Remote (India)',
    type: 'Full-time',
    description: 'Design engaging, scientifically accurate courses and interactive learning challenges for students and citizen scientists.',
  },
  {
    id: '3',
    title: 'Community Growth Specialist',
    department: 'Marketing & Community',
    location: 'Bangalore, India',
    type: 'Full-time',
    description: 'Drive engagement across our eco-forums, coordinate NGO partner programs, and run international school campaigns.',
  },
];

const values = [
  { title: 'Impact First', desc: 'Every line of code and piece of curriculum we write aims to inspire direct conservation action.' },
  { title: 'Scientific Integrity', desc: 'We collaborate with researchers to ensure all AI and educational materials are rigorous and accurate.' },
  { title: 'Inclusivity', desc: 'Environmental education should be accessible to anyone, anywhere, regardless of background.' },
];

export default function Careers() {
  const { pathname } = useLocation();
  const [selectedJob, setSelectedJob] = useState<typeof positions[0] | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    setTimeout(() => {
      toast.success(`Application submitted!`, {
        description: `Thank you, ${name}. We'll review your profile for the ${selectedJob?.title} role and get back to you soon.`,
      });
      setIsApplying(false);
      setSelectedJob(null);
      setName('');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Briefcase className="w-3.5 h-3.5" /> Careers
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Build the Future of Conservation</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Join our remote-first team of engineers, educators, and design thinkers working to empower the next generation of environmental stewards.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                What drives our culture and guides how we work together every single day.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div key={i} className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold mb-6">
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Open Roles</h2>
              <p className="text-muted-foreground">
                Find your fit and help us build AI for environmental education.
              </p>
            </div>

            <div className="space-y-4">
              {positions.map((job) => (
                <div
                  key={job.id}
                  className="bg-card border border-border hover:border-primary/45 rounded-2xl p-6 transition-all duration-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" /> {job.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{job.description}</p>
                  </div>
                  <Button
                    onClick={() => setSelectedJob(job)}
                    className="gradient-primary text-white font-semibold flex items-center gap-1.5 self-stretch md:self-auto justify-center"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-foreground text-lg">Apply for Position</h3>
                <p className="text-xs text-muted-foreground">{selectedJob.title}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleApply} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Email Address</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Resume / LinkedIn Profile Link</label>
                <Input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Why do you want to join NatureGyan?</label>
                <textarea
                  className="w-full bg-background border border-border text-foreground text-sm rounded-lg p-3 outline-none focus:ring-1 focus:ring-primary min-h-[100px]"
                  placeholder="Tell us about your passion for environmental impact..."
                  required
                ></textarea>
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-border text-foreground"
                  onClick={() => setSelectedJob(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isApplying}
                  className="gradient-primary text-white font-semibold flex items-center gap-2"
                >
                  {isApplying ? 'Submitting...' : 'Submit Application'}
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
}
