import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Recycle, Leaf, BatteryCharging, ArrowRight, Zap, Droplets, TreePine, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const ALL_GUIDES = [
  { id: '1', title: 'Zero Waste Kitchen Guide', icon: Recycle, desc: 'Learn how to eliminate food waste, start composting, and choose sustainable food packaging.', content: 'To create a zero-waste kitchen, start by conducting a waste audit to see what you throw away most. Set up a multi-bin system for recycling, organic compost, and landfill. Focus on meal planning to reduce food waste, purchase in bulk using reusable jars, and substitute single-use paper towels with washable cloth rags. Composting organic waste can reduce your household garbage by up to 40%.' },
  { id: '2', title: 'Solar Energy 101', icon: Zap, desc: 'A beginner\'s guide to rooftop solar panels, net metering, and clean power.', content: 'Switching to solar energy starts with assessing your roof\'s sunlight exposure and structural integrity. Solar photovoltaic (PV) panels convert sunlight into electricity. Net metering allows you to feed excess electricity back into the municipal grid, earning credits on your utility bills. Typical residential installations pay for themselves in 5 to 8 years, significantly reducing carbon emissions.' },
  { id: '3', title: 'Water Harvesting at Home', icon: Droplets, desc: 'Setup simple rainwater harvesting systems and greywater recycling for your garden.', content: 'Rainwater harvesting captures runoff from your roof and stores it for irrigation or non-potable household use. A basic rain barrel system includes gutter connections, a leaf screen diverter, and a storage tank with a spigot. Using greywater from washing machines and showers (with eco-friendly soaps) for garden plants is another great way to conserve municipal water resources.' },
  { id: '4', title: 'Eco-Friendly Transportation', icon: Zap, desc: 'How to transition to low-carbon commuting, cycling, and electric vehicles.', content: 'Reduce your travel footprint by prioritizing active transport like walking or cycling for short trips. For longer commutes, leverage public transit networks. If a personal vehicle is necessary, consider hybrid or electric vehicles (EVs), which emit zero tailpipe emissions and have significantly lower lifetime operational impacts compared to combustion engines.' },
  { id: '5', title: 'Sustainable Fashion Practices', icon: Leaf, desc: 'Avoid fast fashion, understand sustainable textiles, and maintain your wardrobe.', content: 'The fashion industry contributes to substantial global wastewater and carbon emissions. Build a sustainable wardrobe by curating a capsule collection of durable, timeless pieces. Opt for organic cotton, linen, hemp, or recycled materials. Extend garment lifespans by washing at lower temperatures, air drying, and repairing minor damages. Support second-hand thrift stores and eco-conscious circular brands.' },
  { id: '6', title: 'Urban Gardening & Composting', icon: TreePine, desc: 'Grow your own vegetables in small urban apartments and manage food waste.', content: 'Urban farming utilizes containers, balconies, and vertical spaces to grow herbs, leafy greens, and vegetables. Micro-greens and herbs can easily grow on windowsills. Combine gardening with indoor vermicomposting (using worms) or small bokashi bins to turn kitchen scraps into nutrient-rich soil fertilizer, closing the loop on organic food waste.' }
];

const impacts = [
  { value: '2.4M', label: 'Trees Planted', icon: TreePine },
  { value: '850K', label: 'Tons CO2 Offset', icon: Zap },
  { value: '1.2B', label: 'Liters Water Saved', icon: Droplets },
];

export default function SustainabilityHub() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Modals & Interactive States
  const [pledgeModalOpen, setPledgeModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<any | null>(null);
  const [discussionModalOpen, setDiscussionModalOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<any | null>(null);
  const [viewAllGuides, setViewAllGuides] = useState(false);

  const [pledgeForm, setPledgeForm] = useState({
    name: '',
    email: '',
    pledgeType: 'Waste Reduction',
    frequency: 'Daily'
  });

  const [discussions, setDiscussions] = useState([
    { id: '1', topic: 'Best DIY composting bins?', replies: 142, category: 'Waste Management', author: 'Nikhil S.', posts: ['What is the best material to construct a compost bin in a hot, humid climate?', 'I recommend using cedar wood as it resists rot naturally, or simple aerated plastic bins.', 'Make sure you maintain a good ratio of green (nitrogen-rich) and brown (carbon-rich) organic materials!'] },
    { id: '2', topic: 'My journey to 100% solar power', replies: 89, category: 'Energy', author: 'Rohan P.', posts: ['Just completed installing a 5kW rooftop solar system. Ask me anything!', 'Congrats! What was the initial cost and did you get any government subsidy?', 'Yes, the subsidy covered about 30% of the cost. Savings started from month one!'] },
    { id: '3', topic: 'Local farmers market map for Bangalore', replies: 256, category: 'Food', author: 'Deepa K.', posts: ['Let\'s compile a list of local organic markets operating on weekends.', 'The Sunday market near Jayanagar has excellent fresh organic produce directly from local farmers.', 'There\'s also one in Indiranagar on Saturdays that has great artisan cheese and honey.'] }
  ]);
  const [newPostText, setNewPostText] = useState('');

  // Pre-populate user info
  useEffect(() => {
    if (user) {
      setPledgeForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  // Handle escape key to close modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPledgeModalOpen(false);
        setSelectedGuide(null);
        setDiscussionModalOpen(false);
        setSelectedDiscussion(null);
      }
    };
    if (pledgeModalOpen || selectedGuide || discussionModalOpen || selectedDiscussion) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [pledgeModalOpen, selectedGuide, discussionModalOpen, selectedDiscussion]);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Thank you, ${pledgeForm.name}! Your Eco Pledge for "${pledgeForm.pledgeType}" has been registered.`);
    setPledgeModalOpen(false);
  };

  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim() || !selectedDiscussion) return;
    
    const updatedDiscussions = discussions.map(d => {
      if (d.id === selectedDiscussion.id) {
        return {
          ...d,
          replies: d.replies + 1,
          posts: [...d.posts, newPostText]
        };
      }
      return d;
    });

    setDiscussions(updatedDiscussions);
    setSelectedDiscussion(updatedDiscussions.find(d => d.id === selectedDiscussion.id));
    setNewPostText('');
    toast.success('Reply posted successfully!');
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative pt-32 pb-24 bg-background text-foreground border-b border-border overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-primary/10 dark:fill-primary/20">
              <path d="M42.7,-73.4C55.9,-67.8,67.6,-57.4,76.5,-44.6C85.4,-31.8,91.5,-16.6,90.4,-2C89.3,12.7,81.1,26.7,71.2,38.1C61.3,49.5,49.8,58.3,37.1,65.3C24.4,72.3,10.6,77.5,-2.9,81.9C-16.4,86.4,-29.6,90,-41.4,85C-53.2,80,-63.5,66.4,-70.7,51.8C-77.9,37.2,-82,21.6,-83.4,6C-84.8,-9.6,-83.5,-25,-76.3,-37.6C-69.1,-50.2,-56,-60.1,-42.6,-65.6C-29.2,-71.1,-15.5,-72.3,-0.5,-71.5C14.5,-70.7,29.5,-79,42.7,-73.4Z" transform="translate(100 100) scale(1.1)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                <Leaf className="w-4 h-4" /> The Green Living Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-foreground">
                Sustainable living made simple and actionable.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10">
                Discover practical guides, join eco-challenges, and track your personal carbon footprint alongside a global community of changemakers.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg rounded-full font-bold shadow-md transition-all border-0"
                  onClick={() => setPledgeModalOpen(true)}
                >
                  Take the Eco Pledge
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Practical Guides */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Practical Sustainability Guides</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Step-by-step blueprints to make your home, diet, and lifestyle more environmentally friendly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(viewAllGuides ? ALL_GUIDES : ALL_GUIDES.slice(0, 3)).map((g) => {
                const Icon = g.icon;
                return (
                  <div key={g.id} className="bg-card border border-border p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-primary/10 dark:bg-primary/30 text-primary rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{g.title}</h3>
                      <p className="text-muted-foreground mb-6 line-clamp-3">{g.desc}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-primary hover:text-primary hover:bg-primary/10 px-0 self-start"
                      onClick={() => setSelectedGuide(g)}
                    >
                      Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={() => setViewAllGuides(!viewAllGuides)}
              >
                {viewAllGuides ? 'Show Less Guides' : 'View all 50+ Guides'}
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3: Community Forums & Challenges */}
        <section className="py-24 bg-emerald-50 dark:bg-primary/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Join the Eco-Challenge Network</h2>
                <p className="text-lg text-muted-foreground">
                  Sustainability is a team sport. Join monthly challenges, share your progress in the community forums, and earn Eco Points.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <p className="text-foreground pt-1"><strong>Join a Challenge:</strong> e.g. "30 Days No Plastic"</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <p className="text-foreground pt-1"><strong>Log Activities:</strong> Track daily progress on your dashboard</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <p className="text-foreground pt-1"><strong>Earn Badges:</strong> Unlock achievements and climb the leaderboard</p>
                  </li>
                </ul>
                <Button 
                  className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                  onClick={() => setDiscussionModalOpen(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-2"/> Browse Forums
                </Button>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-card rounded-3xl p-6 shadow-2xl border border-border">
                  <h3 className="font-bold text-lg mb-4">Trending Discussions</h3>
                  <div className="space-y-4">
                    {discussions.map((d) => (
                      <div 
                        key={d.id} 
                        className="p-4 rounded-xl bg-muted hover:bg-muted/80 cursor-pointer transition-colors"
                        onClick={() => setSelectedDiscussion(d)}
                      >
                        <div className="text-xs text-primary font-semibold mb-1">{d.category}</div>
                        <h4 className="font-bold text-foreground">{d.topic}</h4>
                        <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> {d.replies} replies
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Global Impact Tracker */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-16">Our Collective Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {impacts.map((imp, i) => {
                const Icon = imp.icon;
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/30 flex items-center justify-center mb-6">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="text-5xl font-black text-foreground mb-2 tracking-tighter">{imp.value}</div>
                    <div className="text-lg text-muted-foreground font-medium">{imp.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Share your green journey</h2>
            <p className="text-emerald-100 text-lg mb-10">
              Create your profile today, calculate your initial carbon footprint, and get a personalized sustainability action plan.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 border-0 h-14 px-10 text-lg rounded-full font-bold shadow-xl"
              onClick={() => setPledgeModalOpen(true)}
            >
              Get Your Action Plan
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />

      {/* Eco Pledge Form Modal */}
      {pledgeModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={(e) => e.target === e.currentTarget && setPledgeModalOpen(false)}
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-border animate-in zoom-in-95 fade-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-border bg-muted/30">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" /> 
                Eco Pledge & Carbon Plan
              </h3>
              <button 
                onClick={() => setPledgeModalOpen(false)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            
            <form onSubmit={handlePledgeSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <Input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  value={pledgeForm.name}
                  onChange={(e) => setPledgeForm({ ...pledgeForm, name: e.target.value })}
                  className="bg-background text-foreground border-border"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                <Input 
                  type="email" 
                  required
                  placeholder="you@example.com" 
                  value={pledgeForm.email} 
                  onChange={(e) => setPledgeForm({ ...pledgeForm, email: e.target.value })}
                  className="bg-background text-foreground border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Pledge Focus Area</label>
                <select 
                  value={pledgeForm.pledgeType} 
                  onChange={(e) => setPledgeForm({ ...pledgeForm, pledgeType: e.target.value })}
                  className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none font-medium"
                >
                  <option value="Waste Reduction">Zero Waste & Composting</option>
                  <option value="Energy Conservation">Renewable Energy (Solar)</option>
                  <option value="Water Saving">Rainwater Harvesting</option>
                  <option value="Sustainable Commute">Eco-Friendly Transit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Pledge Frequency</label>
                <select 
                  value={pledgeForm.frequency} 
                  onChange={(e) => setPledgeForm({ ...pledgeForm, frequency: e.target.value })}
                  className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none font-medium"
                >
                  <option value="Daily">Daily Actions</option>
                  <option value="Weekly">Weekly Habits</option>
                  <option value="Monthly">Monthly Check-Ins</option>
                </select>
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <Button 
                  type="button"
                  onClick={() => setPledgeModalOpen(false)}
                  variant="outline"
                  className="px-5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-sm hover:shadow-md transition-all animate-pulse-green border-0"
                >
                  Confirm Pledge
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Read Guide Modal */}
      {selectedGuide && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={(e) => e.target === e.currentTarget && setSelectedGuide(null)}
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border animate-in zoom-in-95 fade-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-border bg-muted/30">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                {(() => {
                  const Icon = selectedGuide.icon;
                  return <Icon className="w-5 h-5 text-primary" />;
                })()} 
                {selectedGuide.title}
              </h3>
              <button 
                onClick={() => setSelectedGuide(null)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <p className="text-sm font-semibold text-primary">{selectedGuide.desc}</p>
              <div className="border-t border-border pt-4">
                <p className="text-foreground leading-relaxed text-sm whitespace-pre-line">
                  {selectedGuide.content}
                </p>
              </div>
            </div>
            <div className="p-5 border-t border-border bg-muted/20 flex justify-end">
              <Button 
                onClick={() => {
                  setSelectedGuide(null);
                  toast.success('Guide bookmarked on your profile!');
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 border-0 shadow-sm"
              >
                Save to Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Forums Overview Modal */}
      {discussionModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={(e) => e.target === e.currentTarget && setDiscussionModalOpen(false)}
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border animate-in zoom-in-95 fade-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-border bg-muted/30">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> 
                Eco Forums Discussion Boards
              </h3>
              <button 
                onClick={() => setDiscussionModalOpen(false)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                  <div className="text-2xl font-bold text-primary">1,420+</div>
                  <div className="text-xs text-muted-foreground">Active Members</div>
                </div>
                <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                  <div className="text-2xl font-bold text-primary">48</div>
                  <div className="text-xs text-muted-foreground">Eco Challenges Run</div>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <h4 className="font-bold text-foreground mb-3">All Active Threads</h4>
                <div className="space-y-3">
                  {discussions.map(d => (
                    <div 
                      key={d.id} 
                      className="p-4 border border-border rounded-xl hover:border-primary/50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedDiscussion(d);
                        setDiscussionModalOpen(false);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-primary">{d.category}</span>
                        <span className="text-xs text-muted-foreground">Started by {d.author}</span>
                      </div>
                      <h5 className="font-semibold text-foreground mt-1">{d.topic}</h5>
                      <span className="text-xs text-muted-foreground block mt-2">{d.replies} replies</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-border bg-muted/20 flex justify-end gap-2">
              <Button 
                onClick={() => setDiscussionModalOpen(false)}
                variant="outline"
                className="rounded-full"
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  setDiscussionModalOpen(false);
                  toast.success('Please register or log in to create a new thread.');
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 border-0"
              >
                New Thread
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Discussion Details & Posts Modal */}
      {selectedDiscussion && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={(e) => e.target === e.currentTarget && setSelectedDiscussion(null)}
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border animate-in zoom-in-95 fade-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-border bg-muted/30">
              <div>
                <span className="text-xs font-semibold text-primary block">{selectedDiscussion.category}</span>
                <h3 className="text-lg font-bold text-foreground">{selectedDiscussion.topic}</h3>
              </div>
              <button 
                onClick={() => setSelectedDiscussion(null)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
              <div className="space-y-3">
                {selectedDiscussion.posts.map((post, i) => (
                  <div key={i} className={`p-4 rounded-xl text-sm ${i === 0 ? 'bg-primary/5 border border-primary/20' : 'bg-muted'}`}>
                    <div className="font-semibold text-foreground mb-1">
                      {i === 0 ? selectedDiscussion.author : `Contributor #${i}`}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{post}</p>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleNewPostSubmit} className="p-5 border-t border-border bg-muted/20 space-y-3">
              <Input 
                placeholder="Type your reply here..." 
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="bg-background border-border text-foreground"
                required
              />
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  onClick={() => setSelectedDiscussion(null)} 
                  variant="outline"
                  className="rounded-full"
                >
                  Close
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 border-0"
                >
                  Post Reply
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
