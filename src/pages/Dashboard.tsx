import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, Bell, Search, Sun, Moon, BookOpen, Brain, Globe, Leaf,
  Users, Trophy, BarChart3, FileText, Calendar, Camera, TreePine,
  Megaphone, Shield, Activity, Star, GraduationCap, FlaskConical,
  Play, TrendingUp, CheckCircle, ArrowRight, Sparkles, Clock, MapPin,
  Heart, Share2, Plus, Binoculars, X, Filter, SlidersHorizontal, ArrowUpDown,
  Download, Eye, AlertTriangle, XCircle, Trash2, Send, MessageSquare, Check, Sparkle,
  PawPrint, Bird, Turtle
, Sprout , Droplet , Medal , Salad , ShoppingBag , ThumbsUp , Recycle , Cat } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { getMockState, saveMockState, useMockStateListener } from '@/lib/mockState';
import { RegistrationModal } from '@/components/ui/registration-modal';

// Role-based main dashboards
import StudentDashboard from '@/components/features/dashboard/StudentDashboard';
import TeacherDashboard from '@/components/features/dashboard/TeacherDashboard';
import ResearcherDashboard from '@/components/features/dashboard/ResearcherDashboard';
import EnthusiastDashboard from '@/components/features/dashboard/EnthusiastDashboard';
import NGODashboard from '@/components/features/dashboard/NGODashboard';
import AdminDashboard from '@/components/features/dashboard/AdminDashboard';

// ─── Sub-Page Components ───────────────────────────────────────────────────

function CoursesPage() {
  const { user, updateUser } = useAuth();
  const [state, setState] = useState(getMockState());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'title' | 'rating' | 'enrolled'>('title');

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleEnrollOrResume = (courseId: string, title: string, hasProgress: boolean) => {
    if (hasProgress) {
      // Resume
      toast.success(`Resuming: ${title}`, { description: "Opening your last learning session..." });
    } else {
      // Enroll
      const updatedCourses = state.courses.map(c => {
        if (c.id === courseId) {
          return { ...c, progress: 10, enrolled: (c.enrolled || 0) + 1 };
        }
        return c;
      });
      saveMockState({ courses: updatedCourses });
      
      // Update user points
      if (user) {
        updateUser({
          ecoPoints: user.ecoPoints + 50
        });
      }
      toast.success(`Enrolled in ${title}!`, { description: "+50 Eco Points awarded!" });
    }
  };

  const handleComplete = (courseId: string, title: string) => {
    const updatedCourses = state.courses.map(c => {
      if (c.id === courseId) {
        return { ...c, progress: 100 };
      }
      return c;
    });
    saveMockState({ courses: updatedCourses });

    if (user) {
      updateUser({
        coursesCompleted: (user.coursesCompleted || 0) + 1,
        ecoPoints: user.ecoPoints + 150
      });
    }
    toast.success(`Congratulations! Completed course: ${title}`, { description: "+150 Eco Points awarded!" });
  };

  const categories = ['All', ...Array.from(new Set(state.courses.map(c => c.category)))];

  const filteredCourses = state.courses
    .filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'enrolled') return (b.enrolled || 0) - (a.enrolled || 0);
      return 0;
    });

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nature Learning Academy</h1>
          <p className="text-muted-foreground text-sm mt-1">Enroll in expert courses and build your eco credentials</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-primary/10 text-primary font-bold px-3 py-1.5 rounded-full border border-primary/20">
            {user?.coursesCompleted || 0} Courses Completed
          </span>
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 bg-card border border-border p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input 
            placeholder="Search courses or educators..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 bg-background border-border text-foreground"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select 
            value={selectedCategory} 
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
            <option value="enrolled">Sort by Popularity</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredCourses.map(c => {
          const hasProgress = c.progress !== undefined && c.progress > 0;
          const isCompleted = c.progress === 100;
          return (
            <div key={c.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group flex flex-col justify-between">
              <div>
                <div className="relative h-40 overflow-hidden bg-muted">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 right-3 bg-white/95 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm">{c.category}</span>
                  {hasProgress && !isCompleted && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div className="h-full bg-primary" style={{ width: `${c.progress}%` }} />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{c.description}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>
                    <span className="capitalize">{c.level}</span>
                    <span><Star className="inline w-4 h-4 text-yellow-500 mr-1" /> {c.rating} ({c.enrolled?.toLocaleString()} learners)</span>
                  </div>
                  <div className="text-xs font-medium text-foreground mb-2">Instructor: <span className="text-muted-foreground">{c.instructor}</span></div>
                </div>
              </div>
              <div className="p-4 pt-0 border-t border-border/40 mt-auto bg-muted/10">
                {isCompleted ? (
                  <div className="flex items-center justify-between py-2 text-xs font-semibold text-primary dark:text-primary">
                    <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Course Completed</span>
                    <span>100%</span>
                  </div>
                ) : hasProgress ? (
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground"><span>Progress</span><span>{c.progress}%</span></div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${c.progress}%` }} />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 gradient-primary text-white h-8 text-xs font-medium" onClick={() => handleEnrollOrResume(c.id, c.title, true)}>
                        <Play className="w-3 h-3 mr-1.5" /> Resume
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 h-8 text-xs border-primary/30 text-primary hover:bg-primary hover:text-white" onClick={() => handleComplete(c.id, c.title)}>
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="w-full mt-2 h-8 text-xs border-primary/30 text-primary hover:bg-primary hover:text-white font-medium" onClick={() => handleEnrollOrResume(c.id, c.title, false)}>
                    Enroll Free
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AIAssistantPage() {
  const { user, updateUser } = useAuth();
  const [state, setState] = useState(getMockState());
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm your AI Nature Assistant.  Ask me anything about wildlife, plants, ecosystems, climate change, or conservation. You can also type 'identify [bird/plant/insect]' to simulate our computer-vision species identification, or ask for conservation tips!" },
  ]);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    'What is biodiversity?',
    'Identify Blue Morpho Butterfly',
    'How do I make apartment compost?',
    'What causes climate change?'
  ];

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    let reply = '';
    const norm = text.toLowerCase();

    if (norm.includes('identify') || norm.includes('morpho') || norm.includes('butterfly') || norm.includes('bird') || norm.includes('plant')) {
      // Simulate Species identification
      let speciesName = 'Blue Morpho Butterfly';
      let confidence = '98.4%';
      let category = 'Insects';
      let scientific = 'Morpho peleides';
      let details = 'Found mainly in Central and South America. Wings are iridescent metallic blue.';

      if (norm.includes('bird') || norm.includes('peacock')) {
        speciesName = 'Indian Peacock';
        confidence = '97.1%';
        category = 'Birds';
        scientific = 'Pavo cristatus';
        details = 'National bird of India, known for stunning fan of metallic blue-green feathers.';
      } else if (norm.includes('plant') || norm.includes('lotus')) {
        speciesName = 'Indian Lotus';
        confidence = '95.8%';
        category = 'Plants';
        scientific = 'Nelumbo nucifera';
        details = 'Aquatic perennial plant with large pink flowers, sacred in Hindu/Buddhist traditions.';
      }

      reply = `[AI Image Recognition Tool Success]\n\nSpecies Identified: ${speciesName}\nScientific Name: ${scientific}\nCategory: ${category}\nConfidence Score: ${confidence}\n\nHabitat/Details: ${details}\n\nObservation saved to your "My Sightings" database. You gained +30 Eco Points!`;

      // Save to sightings
      const newSighting = {
        id: `s_ai_${Date.now()}`,
        name: speciesName,
        scientific,
        category,
        location: user?.location || 'India',
        date: new Date().toISOString().split('T')[0],
        img: category === 'Birds' ? 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=300' :
             category === 'Plants' ? 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300' : 
             'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
        rare: false,
        details: `Identified using AI Nature Assistant. ${details}`
      };
      
      const updatedSightings = [newSighting, ...state.sightings];
      saveMockState({ sightings: updatedSightings });

      if (user) {
        updateUser({ ecoPoints: user.ecoPoints + 30 });
      }

    } else if (norm.includes('biodiversity')) {
      reply = 'Biodiversity refers to the variety of life on Earth — from genes and species to entire ecosystems. It includes the diversity within species, between species, and of ecosystems. Currently, Earth hosts an estimated 8.7 million species, though only about 1.2 million have been described scientifically. Biodiversity is essential for ecosystem resilience, food security, medicine, and climate regulation.';
    } else if (norm.includes('compost') || norm.includes('sustainable')) {
      reply = 'Apartment composting is easy with a vermicomposting (worm bin) or Bokashi system! 1) Use a sealed container with air vents. 2) Layer carbon-rich browns (shredded cardboard, dry leaves) with nitrogen-rich greens (vegetable scraps, coffee grounds). 3) Maintain moisture like a wrung-out sponge. 4) Avoid meats, oils, and dairy. You will get rich organic fertilizer in 4-6 weeks!';
    } else if (norm.includes('climate')) {
      reply = 'Climate change refers to long-term shifts in global temperatures and weather patterns. Human activities since the 1800s — primarily burning fossil fuels — have been the main driver. This releases greenhouse gases (CO₂, methane, nitrous oxide) that trap heat in the atmosphere. Effects include rising temperatures, melting ice caps, rising sea levels, more extreme weather events, and biodiversity loss.';
    } else {
      reply = `Interesting query about "${text}"! In environmental science, this connects to ecological dynamics. To learn more, check out our Biodiversity Fundamentals or Forest Ecology courses in the Academy tab. Every observation and question helps us build a greener planet.`;
    }

    setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">AI Nature Assistant & Species ID</h1>
          <p className="text-xs text-muted-foreground font-medium">Powered by NatureGyan AI · Nature Q&A, Bird/Plant ID & Learning Support</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-primary bg-primary/10 dark:bg-primary/30 dark:text-primary rounded-full px-2.5 py-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Online
        </span>
      </div>

      <div className="bg-card border border-border rounded-2xl flex-1 flex flex-col min-h-[450px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
          {messages.map((msg, i) => (
            <div key={i} className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : '')}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line',
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-tr-sm'
                  : 'bg-muted text-foreground rounded-tl-sm border border-border/30'
              )}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto border-t border-border/30 pt-3">
          {suggestions.map(s => (
            <button key={s} onClick={() => sendMessage(s)} className="flex-shrink-0 text-xs border border-border text-muted-foreground hover:border-primary hover:text-primary bg-background rounded-full px-3 py-1.5 transition-colors whitespace-nowrap font-medium">
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a question or type 'identify peacock'..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              className="flex-1 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
              disabled={loading}
            />
            <Button className="gradient-primary text-white px-4" onClick={() => sendMessage(input)} disabled={loading || !input.trim()}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BiodiversityPage() {
  const [state, setState] = useState(getMockState());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeSpecies, setActiveSpecies] = useState<any | null>(null);

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const species = [
    { name: 'Bengal Tiger', scientific: 'Panthera tigris tigris', status: 'Endangered', habitat: 'South Asia', img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400', category: 'Mammals', desc: 'Bengal tigers are key predators occupying grasslands, dry and wet deciduous forests, and mangrove ecosystems like the Sundarbans. Their numbers are slowly recovering thanks to intense anti-poaching measures.', facts: ['Lifespan: 10-15 years', 'Diet: Carnivore', 'Weight: Up to 220kg'] },
    { name: 'Indian Peacock', scientific: 'Pavo cristatus', status: 'Least Concern', habitat: 'South Asia', img: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400', category: 'Birds', desc: 'Peacocks are famous for their magnificent courtship plumage displays. They eat seeds, insects, fruits, and small reptiles, and are highly adapted to deciduous forest floors.', facts: ['National bird of India', 'Tail feathers make up 60% of total length', 'Omnivorous'] },
    { name: 'Snow Leopard', scientific: 'Panthera uncia', status: 'Vulnerable', habitat: 'Himalayas', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMWJ7c2OH8Q_LeZ0ExhlxXmvEdRzQcKGPE49PRYxCuKE-L3FWlFXeqtV68jUfI_XeOdFHng86cvQVKoXX3cN-LL3VHGy5Bnfcsra2Og&s=10', category: 'Mammals', desc: 'Often called the ghost of the mountains, they live in high, rocky, rugged terrains. They are threatened by climate warming, habitat fragmentation, and loss of wild prey.', facts: ['Live at altitudes up to 5,500m', 'Thick tail acts as blanket', 'Solitary predator'] },
    { name: 'Indian Lotus', scientific: 'Nelumbo nucifera', status: 'Least Concern', habitat: 'Wetlands', img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400', category: 'Plants', desc: 'The lotus grows in shallow muddy ponds and river systems. Its unique leaf surface exhibits the Lotus Effect (highly water repellent), keeping it pristine.', facts: ['National flower of India', 'Seeds remain viable for centuries', 'Highly symbolic'] },
    { name: 'Gharial', scientific: 'Gavialis gangeticus', status: 'Critically Endangered', habitat: 'Northern India', img: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=400', category: 'Reptiles', desc: 'Gharials are unique river-dwelling crocodilians with extremely long, thin snouts studded with sharp teeth, highly adapted to catching fish. Main threats are river fragmentation.', facts: ['Snout shape changes with sex', 'Critically rare', 'Strictly piscivorous'] },
    { name: 'Great Hornbill', scientific: 'Buceros bicornis', status: 'Vulnerable', habitat: 'Northeast India', img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400', category: 'Birds', desc: 'A majestic bird with a prominent yellow-black helmet-like structure (casque) on its beak. They play a critical role in forest regeneration by dispersing large seeds.', facts: ['Casque is mostly hollow keratin', 'Monogamous pairs', 'Nest in tree cavities'] },
  ];

  const statusColors: Record<string, string> = {
    'Endangered': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Critically Endangered': 'bg-red-200 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    'Vulnerable': 'bg-secondary/10 text-secondary dark:bg-secondary/30 dark:text-secondary',
    'Least Concern': 'bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary',
  };

  const categories = ['All', 'Mammals', 'Birds', 'Plants', 'Reptiles'];
  const statuses = ['All', 'Critically Endangered', 'Endangered', 'Vulnerable', 'Least Concern'];

  const filteredSpecies = species.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.scientific.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.habitat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Biodiversity Explorer</h1>
          <p className="text-muted-foreground text-sm mt-1">Discover, study, and track conservation status of regional flora and fauna</p>
        </div>
        <div className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5">
          <Binoculars className="w-4 h-4 text-primary" /> {species.length} Species Catalogued
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Mammals', count: 'Mammal Species', icon: PawPrint, active: selectedCategory === 'Mammals' },
          { label: 'Birds', count: 'Bird Species', icon: Bird, active: selectedCategory === 'Birds' },
          { label: 'Plants', count: 'Flora database', icon: Leaf, active: selectedCategory === 'Plants' },
          { label: 'Reptiles', count: 'Cold blooded', icon: Turtle, active: selectedCategory === 'Reptiles' }
        ].map(c => {
          const Icon = c.icon;
          return (
            <button 
              key={c.label} 
              onClick={() => setSelectedCategory(c.active ? 'All' : c.label)} 
              className={cn(
                "bg-card border rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-primary/40 hover:shadow-md transition-all", 
                c.active ? "border-primary ring-1 ring-primary" : "border-border"
              )}
            >
              <div className="mb-2 p-2 bg-primary/10 rounded-lg text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-bold text-foreground">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.count}</div>
            </button>
          );
        })}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 bg-card border border-border p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input 
            placeholder="Search by name, scientific name or habitat..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 bg-background border-border text-foreground"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedStatus} 
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none"
          >
            <option value="All">All Statuses</option>
            {statuses.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {selectedCategory !== 'All' && (
            <Button size="sm" variant="ghost" className="text-xs text-red-500 font-semibold" onClick={() => setSelectedCategory('All')}>Clear Filter</Button>
          )}
        </div>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-4">Featured Species ({filteredSpecies.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredSpecies.map(s => (
          <div key={s.name} onClick={() => setActiveSpecies(s)} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-0.5">
            <div className="h-44 overflow-hidden relative">
              <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className={cn('absolute top-2 right-2 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm', statusColors[s.status] || 'bg-gray-100 text-gray-600')}>{s.status}</span>
            </div>
            <div className="p-4">
              <div className="font-bold text-foreground text-base leading-tight group-hover:text-primary transition-colors">{s.name}</div>
              <div className="text-xs text-muted-foreground italic mt-0.5">{s.scientific}</div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{s.category}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{s.habitat}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeSpecies && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="relative h-52 bg-muted">
              <img src={activeSpecies.img} alt={activeSpecies.name} className="w-full h-full object-cover" />
              <button onClick={() => setActiveSpecies(null)} className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/75 px-3 py-1 rounded text-white text-xs font-semibold">
                {activeSpecies.status}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{activeSpecies.name}</h3>
                <p className="text-sm text-muted-foreground italic">{activeSpecies.scientific}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{activeSpecies.desc}</p>
              <div className="bg-muted/50 p-4 rounded-xl space-y-1.5">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">Scientific Facts</h4>
                {activeSpecies.facts.map((f: string, idx: number) => (
                  <p key={idx} className="text-xs text-foreground font-medium">• {f}</p>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Habitat: <b className="text-foreground">{activeSpecies.habitat}</b></span>
                <span className="text-xs text-muted-foreground ml-auto">Category: <b className="text-foreground">{activeSpecies.category}</b></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChallengesPage() {
  const { user, updateUser } = useAuth();
  const [state, setState] = useState(getMockState());
  const [submittingProof, setSubmittingProof] = useState<string | null>(null);

  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<{id: string, title: string} | null>(null);

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleJoin = (id: string, title: string) => {
    setActiveChallenge({ id, title });
    setJoinModalOpen(true);
  };

  const handleJoinSuccess = () => {
    if (!activeChallenge) return;
    toast.success(`Joined Eco-Challenge: "${activeChallenge.title}"!`, { description: "Work on the task and submit proof when done." });
  };

  const handleSubmitProof = async (id: string, title: string, pts: number) => {
    setSubmittingProof(id);
    await new Promise(r => setTimeout(r, 1200));
    setSubmittingProof(null);

    const updated = state.challenges.map(c => {
      if (c.id === id) return { ...c, completed: true, participants: c.participants + 1 };
      return c;
    });
    saveMockState({ challenges: updated });

    if (user) {
      updateUser({
        ecoPoints: user.ecoPoints + pts,
        badges: [
          ...user.badges,
          { id: `badge_${Date.now()}`, name: `${title} Champion`, icon: <Medal className="w-5 h-5 text-yellow-500" />, description: `Successfully completed: ${title}`, earnedAt: new Date().toISOString().split('T')[0] }
        ]
      });
    }

    toast.success(`Challenge Verified!`, { description: `Awarded +${pts} Eco Points and a new Achievement Badge!` });
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Eco-Challenges</h1>
          <p className="text-muted-foreground text-sm mt-1">Complete nature and sustainability challenges to earn points & badges</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-2 text-center flex-shrink-0">
          <div className="text-xl font-bold text-primary">{user?.ecoPoints.toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Your Eco Points</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {state.challenges.map(c => (
          <div key={c.id} className={cn('bg-card border rounded-xl p-5 hover:shadow-md transition-all flex flex-col justify-between', c.completed ? 'border-green-200 dark:border-green-800 bg-green-50/20 dark:bg-primary/10' : 'border-border hover:border-primary/30')}>
            <div>
              <div className="flex items-start justify-between mb-3">
                {c.completed ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/30 rounded-full px-2.5 py-1">
                    <CheckCircle className="w-3 h-3" /> Completed
                  </span>
                ) : (
                  <span className="text-xs font-bold text-primary bg-primary/10 rounded-full px-2.5 py-1">+{c.pts} pts</span>
                )}
              </div>
              <h3 className="font-semibold text-foreground text-base mb-1">{c.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
            </div>
            
            <div className="space-y-3 mt-auto">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.participants.toLocaleString()} joined</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Due {c.deadline}</span>
              </div>
              {!c.completed ? (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 h-8 text-xs border-border text-foreground" onClick={() => handleJoin(c.id, c.title)}>
                    Join
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 gradient-primary text-white h-8 text-xs font-semibold" 
                    disabled={submittingProof === c.id}
                    onClick={() => handleSubmitProof(c.id, c.title, c.pts)}
                  >
                    {submittingProof === c.id ? 'Verifying...' : 'Submit Proof'}
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="outline" className="w-full h-8 text-xs border-green-300 text-primary dark:border-green-700 dark:text-primary bg-green-50/50 dark:bg-primary/20" disabled>
                  ✓ Claimed
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <RegistrationModal 
        isOpen={joinModalOpen} 
        onClose={() => setJoinModalOpen(false)} 
        type="community" 
        item={activeChallenge ? { title: activeChallenge.title } : undefined} 
        onSuccess={handleJoinSuccess} 
      />
    </div>
  );
}

function CommunityPage() {
  const { user } = useAuth();
  const [state, setState] = useState(getMockState());
  const [searchTerm, setSearchTerm] = useState('');
  const [newPostModal, setNewPostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostEmoji, setNewPostEmoji] = useState(<Sprout className="w-5 h-5 text-primary" /> as React.ReactNode);
  const [newPostCategory, setNewPostCategory] = useState('Ecology');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [activeForum, setActiveForum] = useState<string | null>(null);

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleJoinForum = (forumName: string) => {
    setActiveForum(forumName);
    setJoinModalOpen(true);
  };

  const handleJoinSuccess = () => {
    if (!activeForum) return;
    const updated = state.communityPosts.map(f => {
      if (f.name === activeForum) {
        return { ...f, members: f.members + 1 };
      }
      return f;
    });
    saveMockState({ communityPosts: updated });
    toast.success(`Joined community: ${activeForum}!`);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;

    const newForum = {
      id: `f_${Date.now()}`,
      name: newPostTitle,
      members: 1,
      posts: 1,
      latest: `First post by ${user?.name || 'anonymous'}`,
      emoji: newPostEmoji,
      category: newPostCategory
    };

    saveMockState({ communityPosts: [newForum, ...state.communityPosts] });
    setNewPostTitle('');
    setNewPostModal(false);
    toast.success(`Community Topic Created!`, { description: `You started the "${newPostTitle}" forum!` });
  };

  const filteredForums = state.communityPosts.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Eco-Community Forums</h1>
          <p className="text-muted-foreground text-sm mt-1">Discuss research, share sightings, and organize cleanups with global conservationists</p>
        </div>
        <Button className="gradient-primary text-white font-semibold" onClick={() => setNewPostModal(true)}>
          + Create Topic
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input 
          placeholder="Search forums and topics..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-9 bg-card border-border text-foreground"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredForums.map(f => (
          <div key={f.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base truncate">{f.name}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="bg-primary/5 text-primary px-2 py-0.5 rounded-full font-medium">{f.category}</span>
                  <span>{f.members.toLocaleString()} members</span>
                  <span>{f.posts.toLocaleString()} posts</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-8 text-xs border-border text-foreground hover:bg-muted font-medium" onClick={() => handleJoinForum(f.name)}>
                Join
              </Button>
            </div>
            <div className="bg-muted/30 rounded-lg px-3 py-2 border border-border/30">
              <p className="text-xs text-muted-foreground truncate">Latest: <span className="text-foreground font-medium">{f.latest}</span></p>
            </div>
          </div>
        ))}
      </div>

      {newPostModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-foreground text-lg">Create a Community Topic</h3>
              <button onClick={() => setNewPostModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreatePost} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Topic Title</label>
                <Input 
                  placeholder="e.g. Wildlife Preservation in Western Ghats"
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Category</label>
                  <select 
                    value={newPostCategory} 
                    onChange={e => setNewPostCategory(e.target.value)}
                    className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none"
                  >
                    <option value="Ecology">Ecology</option>
                    <option value="Birds">Birds</option>
                    <option value="Climate">Climate</option>
                    <option value="Marine">Marine</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Photography">Photography</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" className="border-border text-foreground" onClick={() => setNewPostModal(false)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-white font-semibold">Publish Topic</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <RegistrationModal 
        isOpen={joinModalOpen} 
        onClose={() => setJoinModalOpen(false)} 
        type="community" 
        item={activeForum ? { title: activeForum } : undefined} 
        onSuccess={handleJoinSuccess} 
      />
    </div>
  );
}

function EventsPage() {
  const { user, updateUser } = useAuth();
  const [state, setState] = useState(getMockState());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const [regModalOpen, setRegModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<{id: string, name: string} | null>(null);

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleRegisterClick = (id: string, name: string, isRegistered: boolean) => {
    if (isRegistered) {
      // Direct cancellation
      const updated = state.events.map(e => {
        if (e.id === id) {
          return { ...e, registered: false, spots: e.spots + 1 };
        }
        return e;
      });
      saveMockState({ events: updated });
      toast.info(`Cancelled registration for ${name}`);
    } else {
      // Open form
      setActiveEvent({ id, name });
      setRegModalOpen(true);
    }
  };

  const handleRegisterSuccess = () => {
    if (!activeEvent) return;
    const updated = state.events.map(e => {
      if (e.id === activeEvent.id) {
        return { ...e, registered: true, spots: e.spots - 1 };
      }
      return e;
    });
    saveMockState({ events: updated });

    if (user) {
      updateUser({ ecoPoints: user.ecoPoints + 40 });
    }
    toast.success(`Registered for ${activeEvent.name}!`, { description: "+40 Eco Points awarded. Tickets sent to your registered email!" });
  };

  const types = ['All', 'Nature Walk', 'Cleanup', 'Conference', 'Workshop', 'Campaign', 'Eco Tour'];

  const filteredEvents = state.events.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || e.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events & Activities</h1>
          <p className="text-muted-foreground text-sm mt-1">Discover eco tours, cleanup programs, birdwatching hikes, and workshops</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-card border border-border p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input 
            placeholder="Search events by name or city..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 bg-background border-border text-foreground"
          />
        </div>
        <select 
          value={selectedType} 
          onChange={e => setSelectedType(e.target.value)}
          className="bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none"
        >
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredEvents.map(e => (
          <div key={e.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 duration-200 flex flex-col justify-between group">
            <div>
              <div className="h-36 overflow-hidden relative bg-muted">
                <img src={e.img} alt={e.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 bg-primary/90 text-white rounded-full">{e.type}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors">{e.name}</h3>
                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-primary" /> {e.date} at {e.time}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary" /> {e.location}</div>
                  <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-primary" /> {e.spots} spots remaining</div>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <Button 
                size="sm" 
                className={cn('w-full h-8 text-xs font-semibold', e.registered ? 'bg-muted text-foreground border border-border hover:bg-muted/80' : 'gradient-primary text-white')}
                onClick={() => handleRegisterClick(e.id, e.name, e.registered || false)}
              >
                {e.registered ? 'Cancel Registration' : 'Register Now'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <RegistrationModal 
        isOpen={regModalOpen} 
        onClose={() => setRegModalOpen(false)} 
        type="event" 
        item={activeEvent ? { name: activeEvent.name } : undefined} 
        onSuccess={handleRegisterSuccess} 
      />
    </div>
  );
}

function AnalyticsPage() {
  const { user } = useAuth();
  const [state, setState] = useState(getMockState());

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  if (!user) return null;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">My Analytics & Eco Progress</h1>
      <p className="text-muted-foreground text-sm mb-6">Real-time tracker for courses completed, challenges logged, and sustainability profile</p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Completed Courses', value: user.coursesCompleted || 0, icon: <BookOpen className="w-5 h-5" />, change: 'Updated live' },
          { label: 'Your Eco Points', value: user.ecoPoints.toLocaleString(), icon: <Leaf className="w-5 h-5" />, change: 'Rank #42' },
          { label: 'Achievements', value: user.badges?.length || 0, icon: '🏅', change: 'Level 3 Naturalist' },
          { label: 'Active Sightings', value: state.sightings.length, icon: <Camera className="w-5 h-5" />, change: 'In Citizen database' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            <div className="text-xs text-primary mt-1 font-semibold">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4 border-b border-border/40 pb-2">Your Environmental Impact Metrics</h3>
          {[
            { emoji: <TreePine className="w-5 h-5 text-primary" />, label: 'Reforestation contribution', value: '12 Trees' },
            { emoji: <Recycle className="w-5 h-5 text-primary" />, label: 'Travel CO₂ emissions offset', value: '340 kg' },
            { emoji: <Droplet className="w-5 h-5 text-blue-600" />, label: 'Simulated Water conserved', value: '1,200 Litres' },
            { emoji: <Cat className="w-5 h-5 text-yellow-600" />, label: 'Species identified in wilderness', value: `${state.sightings.length} flora/fauna` },
          ].map(({ emoji, label, value }) => (
            <div key={label} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-2"><span>{emoji}</span><span className="text-sm text-muted-foreground">{label}</span></div>
              <span className="text-sm font-bold text-foreground">{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4 border-b border-border/40 pb-2">Unlocked Badges ({user.badges?.length || 0})</h3>
          <div className="grid grid-cols-2 gap-3 max-h-[250px] overflow-y-auto pr-1">
            {user.badges?.map((b, idx) => (
              <div key={idx} className="bg-muted/50 rounded-xl p-3 text-center border border-border/30 hover:bg-muted transition-colors cursor-default" title={b.description}>
                <div className="flex justify-center text-2xl mb-1">{b.icon || <Medal className="w-8 h-8 text-yellow-500" />}</div>
                <div className="text-xs font-bold text-foreground truncate">{b.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{b.description}</div>
              </div>
            ))}
            {(!user.badges || user.badges.length === 0) && (
              <div className="col-span-2 text-center py-8 text-xs text-muted-foreground">No badges earned yet. Join challenges to win!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchPage() {
  const { user } = useAuth();
  const [state, setState] = useState(getMockState());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [submitPaperModal, setSubmitPaperModal] = useState(false);

  // Form states
  const [paperTitle, setPaperTitle] = useState('');
  const [paperAuthors, setPaperAuthors] = useState('');
  const [paperJournal, setPaperJournal] = useState('');
  const [paperCategory, setPaperCategory] = useState('Biodiversity');

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleDownload = (id: string, title: string) => {
    const updated = state.researchPapers.map(p => {
      if (p.id === id) return { ...p, downloads: p.downloads + 1 };
      return p;
    });
    saveMockState({ researchPapers: updated });
    toast.success(`Downloading PDF: ${title.slice(0, 30)}...`, { description: "Peer-reviewed paper downloaded successfully." });
  };

  const handleSubmitPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperTitle.trim() || !paperAuthors.trim()) return;

    const newPaper = {
      id: `p_${Date.now()}`,
      title: paperTitle,
      authors: paperAuthors,
      year: new Date().getFullYear(),
      category: paperCategory,
      downloads: 1,
      journal: paperJournal || 'NatureGyan Publications',
      status: user?.role === 'admin' ? 'published' : 'under-review'
    };

    saveMockState({ researchPapers: [newPaper, ...state.researchPapers] });
    
    // Add to admin action queue for review
    if (user?.role !== 'admin') {
      const newAction = {
        id: `f_paper_${Date.now()}`,
        type: 'Research Submit',
        item: `Paper: ${paperTitle} by ${paperAuthors}`,
        time: 'Just now',
        severity: 'normal',
        details: `Submitted for content check under ${paperCategory}.`
      };
      saveMockState({ flaggedContent: [newAction, ...state.flaggedContent] });
    }

    setPaperTitle('');
    setPaperAuthors('');
    setPaperJournal('');
    setSubmitPaperModal(false);
    toast.success('Research paper submitted!', { description: user?.role === 'admin' ? 'Paper published directly.' : 'Pending approval in review queue.' });
  };

  const categories = ['All', 'Biodiversity', 'Pollution', 'Climate', 'Conservation'];

  const filteredPapers = state.researchPapers.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.journal && p.journal.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Research Repository</h1>
          <p className="text-muted-foreground text-sm mt-1">Search peer-reviewed papers, regional reports, and scientific studies</p>
        </div>
        <Button className="gradient-primary text-white font-semibold flex-shrink-0" onClick={() => setSubmitPaperModal(true)}>
          <FileText className="w-4 h-4 mr-2" /> Upload Manuscript
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-card border border-border p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input 
            placeholder="Search papers by keywords, authors, journals..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 bg-background border-border text-foreground"
          />
        </div>
        <select 
          value={selectedCat} 
          onChange={e => setSelectedCat(e.target.value)}
          className="bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none"
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filteredPapers.map(p => (
          <div key={p.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug text-sm sm:text-base">{p.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">Authors: {p.authors} · {p.year} {p.journal && `· Journal: ${p.journal}`}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-semibold">{p.category}</span>
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-semibold', p.status === 'published' ? 'bg-green-50 text-primary dark:bg-primary/20' : 'bg-amber-50 text-secondary dark:bg-secondary/20')}>{p.status}</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-1.5">
                <Button size="sm" variant="outline" className="h-8 text-xs border-border text-foreground hover:bg-muted flex items-center gap-1.5" onClick={() => handleDownload(p.id, p.title)}>
                  <Download className="w-3.5 h-3.5" /> <span>{p.downloads.toLocaleString()}</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {submitPaperModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-foreground text-lg">Submit Research Manuscript</h3>
              <button onClick={() => setSubmitPaperModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitPaper} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Paper Title</label>
                <Input 
                  placeholder="e.g. Microplastics ingestion in marine ecosystems"
                  value={paperTitle}
                  onChange={e => setPaperTitle(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Authors (separated by commas)</label>
                <Input 
                  placeholder="e.g. Dr. A. Kumar, Prof. R. Sharma"
                  value={paperAuthors}
                  onChange={e => setPaperAuthors(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Journal / Org</label>
                  <Input 
                    placeholder="e.g. Indian Ecological Society"
                    value={paperJournal}
                    onChange={e => setPaperJournal(e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Field Category</label>
                  <select 
                    value={paperCategory} 
                    onChange={e => setPaperCategory(e.target.value)}
                    className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none"
                  >
                    <option value="Biodiversity">Biodiversity</option>
                    <option value="Pollution">Pollution</option>
                    <option value="Climate">Climate</option>
                    <option value="Conservation">Conservation</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" className="border-border text-foreground" onClick={() => setSubmitPaperModal(false)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-white font-semibold">Submit for Review</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SustainabilityPage() {
  const { user, updateUser } = useAuth();
  const [carbonKm, setCarbonKm] = useState('');
  const [carbonResult, setCarbonResult] = useState<number | null>(null);
  const [activeGuide, setActiveGuide] = useState<any | null>(null);

  const guides = [
    { title: 'Zero Waste Kitchen', desc: 'Reduce food waste by 80% with these practical tips. Composting organic materials and recycling glass/plastics properly.', time: '5 min read', emoji: <Salad className="w-5 h-5" />, content: 'Step 1: Auditing your trash. Figure out what food items spoil fastest and buy them in smaller quantities.\nStep 2: Composting. Keep a bin for food peels, eggshells, and coffee grounds.\nStep 3: Preserve creatively. Learn to pickle vegetables, freeze surplus herbs in olive oil, and reuse vegetable scraps to make stocks.' },
    { title: 'Home Solar Guide', desc: 'Calculate your solar potential and save on electricity. Rooftop panel sizes, inverters, and battery storage.', time: '8 min read', emoji: <Sun className="w-5 h-5 text-yellow-500" />, content: 'Step 1: Check your roof area and sun exposure. 1kW solar setup needs roughly 100 sq ft.\nStep 2: Understand your energy consumption bills. Match your average daily units to the panel array capacity.\nStep 3: Off-grid vs Net Metering. Choose net metering to feed excess solar back into the utility grid.' },
    { title: 'Ethical Shopping', desc: 'How to identify and support sustainable brands. Checking fairtrade certification and organic labels.', time: '6 min read', emoji: <ShoppingBag className="w-5 h-5" />, content: 'Step 1: Look for certifications like Global Organic Textile Standard (GOTS) and Fair Trade.\nStep 2: Avoid fast fashion. Invest in high-durability, repairable clothing.\nStep 3: Support zero-waste packaging, local farmers, and biodegradable container options.' },
    { title: 'Water-Wise Garden', desc: 'Grow food at home using just 30% of normal water. Drip irrigation, mulching, and drought-resistant native plant choices.', time: '7 min read', emoji: <Droplet className="w-5 h-5" />, content: 'Step 1: Mulching. Add coconut coir, woodchips or organic straw to retain moisture in potting soils.\nStep 2: Rainwater harvesting. Install simple drums connected to terrace downspouts.\nStep 3: Drip nozzles. Automate root-level watering in early mornings to minimize evaporative loss.' },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">Sustainability Hub</h1>
      <p className="text-muted-foreground text-sm mb-6">Adopt sustainable daily practices and estimate your travel carbon footprint</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">Travel Carbon Footprint Calculator</h3>
          <p className="text-xs text-muted-foreground mb-4">Calculate CO₂ emissions and adapt your travel habits</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Monthly car/bike travel (km)</label>
              <Input placeholder="e.g. 500" value={carbonKm} onChange={e => setCarbonKm(e.target.value)} className="bg-background border-border text-foreground" />
            </div>
            <Button className="w-full gradient-primary text-white font-semibold" onClick={() => {
              const km = parseFloat(carbonKm) || 0;
              const co2 = Math.round(km * 0.21);
              setCarbonResult(co2);
              
              if (user) {
                // Adjust score based on carbon emission
                let scoreImpact = 75;
                if (co2 < 50) scoreImpact = 88;
                else if (co2 < 100) scoreImpact = 78;
                else scoreImpact = 62;

                updateUser({ ecoPoints: user.ecoPoints + 20 });
              }
              toast.success('Carbon footprint calculated!', { description: "+20 Eco Points for tracking impact!" });
            }}>Calculate My Footprint</Button>
            
            {carbonResult !== null && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">{carbonResult} kg CO₂</div>
                <div className="text-xs text-muted-foreground mt-1">Estimated monthly travel emissions</div>
                <div className="text-xs text-primary mt-2 font-medium">
                  {carbonResult < 50 ? <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> Excellent carbon score!</span> : carbonResult < 100 ? <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4 text-blue-500" /> Good, try carpooling or biking!</span> : <span className="flex items-center gap-1"><AlertTriangle className="w-4 h-4 text-secondary" /> Consider carbon offsetting or public transit</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-4 border-b border-border/40 pb-2">Sustainability Scorecard</h3>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-primary">{carbonResult !== null && carbonResult < 50 ? 88 : 72}</div>
              <div className="text-xs text-muted-foreground mt-1">/ 100 · Good Sustainability Health</div>
            </div>
            {[{ label: 'Energy Use', score: 68 }, { label: 'Green Travel', score: carbonResult !== null && carbonResult < 50 ? 88 : 75 }, { label: 'Organic Food & Composting', score: 80 }].map(s => (
              <div key={s.label} className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>{s.label}</span><span>{s.score}%</span></div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${s.score}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-4">Eco-Friendly Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guides.map(g => (
          <div key={g.title} onClick={() => setActiveGuide(g)} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group flex gap-4">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">{g.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{g.desc}</p>
              <span className="text-xs text-primary font-semibold mt-2 block">{g.time}</span>
            </div>
          </div>
        ))}
      </div>

      {activeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-foreground text-base sm:text-lg">{activeGuide.title}</h3>
              </div>
              <button onClick={() => setActiveGuide(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-xs text-primary font-semibold uppercase">{activeGuide.time} · Sustainability Handbook</p>
              <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{activeGuide.content}</p>
              <div className="pt-4 border-t border-border flex justify-end">
                <Button className="gradient-primary text-white font-semibold text-xs" onClick={() => {
                  if (user) {
                    updateUser({ ecoPoints: user.ecoPoints + 15 });
                  }
                  setActiveGuide(null);
                  toast.success("Read completed!", { description: "+15 Eco Points gained." });
                }}>I implemented this! (+15 pts)</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GenericSubPage Dynamic Components ──────────────────────────────────────

function MySightingsPage() {
  const { user, updateUser } = useAuth();
  const [state, setState] = useState(getMockState());
  const [addSightingModal, setAddSightingModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Birds');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleAddSighting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;

    const newSighting = {
      id: `s_${Date.now()}`,
      name,
      scientific: `${category.toLowerCase()} species`,
      category,
      location,
      date: new Date().toISOString().split('T')[0],
      img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300',
      rare: Math.random() > 0.6,
      details
    };

    saveMockState({ sightings: [newSighting, ...state.sightings] });

    if (user) {
      updateUser({ ecoPoints: user.ecoPoints + 40 });
    }

    setName('');
    setLocation('');
    setDetails('');
    setAddSightingModal(false);
    toast.success('Observation Logged!', { description: '+40 Eco Points for nature reporting!' });
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Nature Sightings</h1>
          <p className="text-muted-foreground text-sm mt-1">Your documented plant, bird, insect, and mammal observations</p>
        </div>
        <Button className="gradient-primary text-white font-semibold" onClick={() => setAddSightingModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Log Observation
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.sightings.map(s => (
          <div key={s.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="h-32 bg-muted relative">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                {s.rare && <span className="absolute top-2 right-2 text-[10px] bg-secondary text-white font-bold px-2 py-0.5 rounded-full">Rare</span>}
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">{s.category}</span>
                <h3 className="font-bold text-foreground text-base leading-tight mt-1">{s.name}</h3>
                <p className="text-xs text-muted-foreground italic">{s.scientific}</p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{s.details || 'No additional field notes logged.'}</p>
              </div>
            </div>
            <div className="p-4 pt-0 border-t border-border/20 flex justify-between items-center text-xs text-muted-foreground bg-muted/10">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{s.location}</span>
              <span>{s.date}</span>
            </div>
          </div>
        ))}
      </div>

      {addSightingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <h3 className="font-bold text-foreground text-lg">Log Nature Observation</h3>
              <button onClick={() => setAddSightingModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSighting} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Species Name / Description</label>
                <Input 
                  placeholder="e.g. Red-whiskered Bulbul"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Category</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none"
                  >
                    <option value="Birds">Birds</option>
                    <option value="Plants">Plants</option>
                    <option value="Insects">Insects</option>
                    <option value="Mammals">Mammals</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Location Visited</label>
                  <Input 
                    placeholder="e.g. Lalbagh Botanical Garden"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="bg-background border-border text-foreground"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Field Notes</label>
                <Input 
                  placeholder="Describe colors, activity, weather or size..."
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" className="border-border text-foreground" onClick={() => setAddSightingModal(false)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-white font-semibold">Add Sighting (+40 pts)</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function MyStudentsPage() {
  const [state, setState] = useState(getMockState());
  const [chatStudent, setChatStudent] = useState<any | null>(null);
  const [messageText, setMessageText] = useState('');
  const [addStudentModal, setAddStudentModal] = useState(false);

  // Form states
  const [stuName, setStuName] = useState('');
  const [stuEmail, setStuEmail] = useState('');
  const [stuCourse, setStuCourse] = useState('Biodiversity 101');

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stuName.trim() || !stuEmail.trim()) return;

    const newStu = {
      id: `stu_${Date.now()}`,
      name: stuName,
      email: stuEmail,
      course: stuCourse,
      progress: 0,
      lastActive: 'Just registered',
      status: 'active'
    };

    saveMockState({ students: [...state.students, newStu] });
    setStuName('');
    setStuEmail('');
    setAddStudentModal(false);
    toast.success(`Student ${stuName} added and enrolled!`);
  };

  const handleSendReminder = (student: any) => {
    setChatStudent(student);
    setMessageText(`Hi ${student.name.split(' ')[0]}, just checking in on your progress in ${student.course}! Let me know if you need help.`);
  };

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    toast.success(`Message dispatched to ${chatStudent.name}!`);
    setChatStudent(null);
    setMessageText('');
  };

  const handleDeleteStudent = (id: string, name: string) => {
    const updated = state.students.filter(s => s.id !== id);
    saveMockState({ students: updated });
    toast.success(`Removed student ${name}`);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Student Roster</h1>
          <p className="text-muted-foreground text-sm mt-1">Track student learning milestones, message struggling pupils, and edit course assignments</p>
        </div>
        <Button className="gradient-primary text-white font-semibold" onClick={() => setAddStudentModal(true)}>
          + Add Student
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Student Name</th>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Active Course</th>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Milestone Progress</th>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Last Activity</th>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Status</th>
              <th className="text-right p-3 text-xs font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {state.students.map(s => (
              <tr key={s.id} className="hover:bg-muted/10">
                <td className="p-3">
                  <div className="font-semibold text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.email}</div>
                </td>
                <td className="p-3 text-xs font-medium text-foreground">{s.course}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-foreground">{s.progress}%</span>
                  </div>
                </td>
                <td className="p-3 text-xs text-muted-foreground">{s.lastActive}</td>
                <td className="p-3">
                  <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize', 
                    s.status === 'active' ? 'bg-green-50 text-primary dark:bg-primary/20' : 
                    s.status === 'at-risk' ? 'bg-amber-50 text-secondary dark:bg-secondary/20' : 
                    'bg-red-50 text-red-600 dark:bg-red-950/20'
                  )}>{s.status}</span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button size="sm" variant="outline" className="h-7 text-xs border-border text-foreground hover:bg-muted" onClick={() => handleSendReminder(s)}>
                      <MessageSquare className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-950/20" onClick={() => handleDeleteStudent(s.id, s.name)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chat simulation modal */}
      {chatStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-foreground text-base">Send Student Message ({chatStudent.name})</h3>
              <button onClick={() => setChatStudent(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSendMessageSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Message Content</label>
                <textarea 
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  className="w-full bg-background border border-border text-foreground text-sm rounded-lg p-3 outline-none focus:ring-1 focus:ring-primary h-28 resize-none"
                  required
                />
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" className="border-border text-foreground" onClick={() => setChatStudent(null)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-white font-semibold flex items-center gap-1"><Send className="w-3.5 h-3.5" /> Send</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add student modal */}
      {addStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <h3 className="font-bold text-foreground text-lg">Enlist New Student</h3>
              <button onClick={() => setAddStudentModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Student Full Name</label>
                <Input 
                  placeholder="e.g. Aditi Roy"
                  value={stuName}
                  onChange={e => setStuName(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Email Address</label>
                <Input 
                  type="email"
                  placeholder="e.g. aditi@student.com"
                  value={stuEmail}
                  onChange={e => setStuEmail(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Enrolled Course Topic</label>
                <select 
                  value={stuCourse} 
                  onChange={e => setStuCourse(e.target.value)}
                  className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none"
                >
                  <option value="Biodiversity 101">Biodiversity 101</option>
                  <option value="Climate Science">Climate Science</option>
                  <option value="Wildlife Biology">Wildlife Biology</option>
                  <option value="Ecology Basics">Ecology Basics</option>
                </select>
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" className="border-border text-foreground" onClick={() => setAddStudentModal(false)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-white font-semibold">Enlist & Invite</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CampaignsPage() {
  const { user } = useAuth();
  const [state, setState] = useState(getMockState());
  const [addCampaignModal, setAddCampaignModal] = useState(false);

  // Form states
  const [campName, setCampName] = useState('');
  const [campLocation, setCampLocation] = useState('');
  const [campTarget, setCampTarget] = useState('');
  const [campDesc, setCampDesc] = useState('');

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName.trim() || !campLocation.trim() || !campTarget.trim()) return;

    const newCamp = {
      id: `camp_${Date.now()}`,
      name: campName,
      status: 'active',
      volunteers: 0,
      target: parseInt(campTarget) || 1000,
      achieved: 0,
      location: campLocation,
      deadline: 'Dec 2026',
      desc: campDesc
    };

    saveMockState({ campaigns: [newCamp, ...state.campaigns] });
    
    // Add pending review for admin check if NGO
    if (user?.role === 'ngo') {
      const newAction = {
        id: `f_camp_${Date.now()}`,
        type: 'Campaign Review',
        item: `Campaign: ${campName} by Green Earth Foundation`,
        time: 'Just now',
        severity: 'normal',
        details: `NGO launched new campaign targeting ${campTarget} trees/cleanup milestones.`
      };
      saveMockState({ flaggedContent: [newAction, ...state.flaggedContent] });
    }

    setCampName('');
    setCampLocation('');
    setCampTarget('');
    setCampDesc('');
    setAddCampaignModal(false);
    toast.success('Campaign launched and dispatched to review queue!');
  };

  const handleJoinCampaign = (id: string, name: string) => {
    const updated = state.campaigns.map(c => {
      if (c.id === id) return { ...c, volunteers: c.volunteers + 1 };
      return c;
    });
    saveMockState({ campaigns: updated });
    toast.success(`Joined campaign: ${name}`, { description: "You are now registered as a volunteer!" });
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Conservation Campaigns</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage, fund, and mobilize volunteers for environmental sustainability drives</p>
        </div>
        <Button className="gradient-primary text-white font-semibold" onClick={() => setAddCampaignModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Launch Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.campaigns.map(c => (
          <div key={c.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base sm:text-lg">{c.name}</h3>
                <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full capitalize',
                  c.status === 'active' ? 'bg-green-50 text-primary dark:bg-primary/20' :
                  c.status === 'planning' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/20' :
                  'bg-gray-100 text-gray-600 dark:bg-gray-800'
                )}>{c.status}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{c.desc || 'Active campaign for environmental ecosystem conservation.'}</p>
              
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 flex-wrap">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{c.location}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{c.volunteers} volunteers</span>
                <span>Deadline: {c.deadline}</span>
              </div>
            </div>

            <div className="space-y-3 mt-auto">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>Milestone Achieved</span>
                <span>{c.achieved.toLocaleString()} / {c.target.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${Math.min((c.achieved / c.target) * 100, 100)}%` }} />
              </div>
              {c.status === 'active' && (
                <Button size="sm" className="w-full text-white gradient-primary text-xs font-semibold h-8" onClick={() => handleJoinCampaign(c.id, c.name)}>
                  Volunteer For Campaign
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {addCampaignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-foreground text-lg">Launch Conservation Campaign</h3>
              <button onClick={() => setAddCampaignModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCampaign} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Campaign Title</label>
                <Input 
                  placeholder="e.g. Save Pulicat Lake Bird Sanctuary"
                  value={campName}
                  onChange={e => setCampName(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Campaign Target Goal</label>
                  <Input 
                    type="number"
                    placeholder="e.g. 5000"
                    value={campTarget}
                    onChange={e => setCampTarget(e.target.value)}
                    className="bg-background border-border text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Location Region</label>
                  <Input 
                    placeholder="e.g. Chennai, TN"
                    value={campLocation}
                    onChange={e => setCampLocation(e.target.value)}
                    className="bg-background border-border text-foreground"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Campaign Brief Description</label>
                <textarea 
                  placeholder="Describe goals, target dates, meeting spots..."
                  value={campDesc}
                  onChange={e => setCampDesc(e.target.value)}
                  className="w-full bg-background border border-border text-foreground text-sm rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-primary h-20 resize-none"
                  required
                />
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" className="border-border text-foreground" onClick={() => setAddCampaignModal(false)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-white font-semibold">Deploy Campaign</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function VolunteersPage() {
  const [state, setState] = useState(getMockState());
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleToggleStatus = (id: string, name: string, current: string) => {
    const nextStatus = current === 'approved' ? 'pending' : 'approved';
    const updated = state.volunteers.map(v => {
      if (v.id === id) return { ...v, status: nextStatus, tasks: nextStatus === 'approved' ? 1 : 0 };
      return v;
    });
    saveMockState({ volunteers: updated });
    toast.success(`Volunteer status for ${name} shifted to: ${nextStatus}`);
  };

  const handleRemove = (id: string, name: string) => {
    const updated = state.volunteers.filter(v => v.id !== id);
    saveMockState({ volunteers: updated });
    toast.success(`Removed volunteer: ${name}`);
  };

  const filteredVolunteers = state.volunteers.filter(v => 
    selectedStatus === 'All' || v.status === selectedStatus
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Volunteer Directory</h1>
          <p className="text-muted-foreground text-sm mt-1">Review active, pending, and top volunteers enrolled in Green Earth Foundation campaigns</p>
        </div>
        <select 
          value={selectedStatus} 
          onChange={e => setSelectedStatus(e.target.value)}
          className="bg-card border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none"
        >
          <option value="All">All Applications</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending Review</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Volunteer Details</th>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Contact</th>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Tasks Logged</th>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Cumulative Impact</th>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Status</th>
              <th className="text-right p-3 text-xs font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredVolunteers.map(v => (
              <tr key={v.id} className="hover:bg-muted/10">
                <td className="p-3 font-semibold text-foreground">{v.name}</td>
                <td className="p-3 text-xs text-muted-foreground">
                  <div>{v.email}</div>
                  <div>{v.phone}</div>
                </td>
                <td className="p-3 text-xs text-foreground font-semibold">{v.tasks} completed</td>
                <td className="p-3 text-xs text-primary font-bold">{v.score} pts</td>
                <td className="p-3">
                  <span className={cn('text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase',
                    v.status === 'approved' ? 'bg-green-50 text-primary dark:bg-primary/20' : 'bg-amber-50 text-secondary dark:bg-secondary/20'
                  )}>{v.status}</span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button size="sm" variant="outline" className="h-7 text-xs border-border text-foreground hover:bg-muted font-medium" onClick={() => handleToggleStatus(v.id, v.name, v.status)}>
                      {v.status === 'approved' ? 'Revoke' : 'Approve'}
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900/30" onClick={() => handleRemove(v.id, v.name)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EcoImpactPage() {
  const [plantedInput, setPlantedInput] = useState('');
  const [waterInput, setWaterInput] = useState('');
  const [wasteInput, setWasteInput] = useState('');
  
  // Custom states logged in local state
  const [impactStats, setImpactStats] = useState({
    trees: 18400,
    water: 12000,
    waste: 2400
  });

  const handleLogImpact = (e: React.FormEvent) => {
    e.preventDefault();
    const trees = parseInt(plantedInput) || 0;
    const water = parseInt(waterInput) || 0;
    const waste = parseInt(wasteInput) || 0;

    if (trees === 0 && water === 0 && waste === 0) return;

    setImpactStats(prev => {
      const next = {
        trees: prev.trees + trees,
        water: prev.water + water,
        waste: prev.waste + waste
      };
      toast.success('Environmental impact metrics aggregated!');
      return next;
    });

    setPlantedInput('');
    setWaterInput('');
    setWasteInput('');
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">Eco Impact Tracker</h1>
      <p className="text-muted-foreground text-sm mb-6">Input daily reforestation, recycling, and carbon reduction offsets to refresh campaign metrics</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
          <div className="flex justify-center text-3xl mb-1"><TreePine className="w-8 h-8 text-primary" /></div>
          <div className="text-2xl font-bold text-foreground">{impactStats.trees.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground font-medium">Native Saplings Planted</div>
        </div>
        <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
          <div className="flex justify-center text-3xl mb-1"><Droplet className="w-8 h-8 text-blue-600" /></div>
          <div className="text-2xl font-bold text-foreground">{impactStats.water.toLocaleString()} L</div>
          <div className="text-xs text-muted-foreground font-medium">Irrigation Water Preserved</div>
        </div>
        <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
          <div className="flex justify-center text-3xl mb-1"><Trash className="w-8 h-8 text-gray-600" /></div>
          <div className="text-2xl font-bold text-foreground">{impactStats.waste.toLocaleString()} kg</div>
          <div className="text-xs text-muted-foreground font-medium">Recycled Solid Waste</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 shadow-sm max-w-lg">
        <h3 className="font-bold text-foreground text-base border-b border-border/40 pb-2 mb-4">Log Daily Action Metrics</h3>
        <form onSubmit={handleLogImpact} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Trees Planted</label>
              <Input placeholder="e.g. 5" type="number" value={plantedInput} onChange={e => setPlantedInput(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Water Saved (L)</label>
              <Input placeholder="e.g. 50" type="number" value={waterInput} onChange={e => setWaterInput(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Recycled (kg)</label>
              <Input placeholder="e.g. 10" type="number" value={wasteInput} onChange={e => setWasteInput(e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="w-full gradient-primary text-white font-semibold">Integrate Metrics</Button>
        </form>
      </div>
    </div>
  );
}

function UserManagementPage() {
  const [state, setState] = useState(getMockState());
  const [searchTerm, setSearchTerm] = useState('');
  
  // Custom mock users
  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'Aryan Kapoor', email: 'aryan.student@naturegyan.in', role: 'student', status: 'active' },
    { id: 'u2', name: 'Dr. Ananya Krishnamurthy', email: 'ananya.teacher@naturegyan.in', role: 'teacher', status: 'active' },
    { id: 'u3', name: 'Dr. Suresh Iyer', email: 'suresh.researcher@naturegyan.in', role: 'researcher', status: 'active' },
    { id: 'u4', name: 'Riya Desai', email: 'riya.enthusiast@naturegyan.in', role: 'enthusiast', status: 'active' },
    { id: 'u5', name: 'Vikram Nair', email: 'vikram.ngo@naturegyan.in', role: 'ngo', status: 'active' },
    { id: 'u6', name: 'Suspended Account', email: 'spammer@naturegyan.in', role: 'student', status: 'suspended' },
  ]);

  const handleToggleStatus = (id: string, name: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active';
        toast.success(`User status for ${name} switched to: ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleChangeRole = (id: string, newRole: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        toast.success(`Role updated successfully to ${newRole}`);
        return { ...u, role: newRole as any };
      }
      return u;
    }));
  };

  const filtered = usersList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">Review accounts, assign moderation/educator roles, and suspend violating nodes</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search users by name/email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 bg-card border-border text-foreground"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Account User</th>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Role</th>
              <th className="text-left p-3 text-xs font-semibold text-foreground">Access Status</th>
              <th className="text-right p-3 text-xs font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-muted/10">
                <td className="p-3">
                  <div className="font-semibold text-foreground">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </td>
                <td className="p-3">
                  <select 
                    value={u.role} 
                    onChange={e => handleChangeRole(u.id, e.target.value)}
                    className="bg-background border border-border text-foreground text-xs rounded px-2 py-1 outline-none font-medium"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Educator</option>
                    <option value="researcher">Researcher</option>
                    <option value="enthusiast">Enthusiast</option>
                    <option value="ngo">NGO</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3">
                  <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full uppercase',
                    u.status === 'active' ? 'bg-green-50 text-primary dark:bg-primary/20' : 'bg-red-50 text-red-600 dark:bg-red-950/20'
                  )}>{u.status}</span>
                </td>
                <td className="p-3 text-right">
                  <Button size="sm" variant="outline" className="h-7 text-xs border-border text-foreground hover:bg-muted font-medium" onClick={() => handleToggleStatus(u.id, u.name)}>
                    {u.status === 'active' ? 'Suspend' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContentReviewPage() {
  const [state, setState] = useState(getMockState());

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleApprove = (id: string, item: string) => {
    const updated = state.flaggedContent.filter(f => f.id !== id);
    saveMockState({ flaggedContent: updated });
    toast.success(`Approved item: ${item}`);
  };

  const handleReject = (id: string, item: string) => {
    const updated = state.flaggedContent.filter(f => f.id !== id);
    saveMockState({ flaggedContent: updated });
    toast.error(`Rejected and removed item: ${item}`);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">Content Review Queue</h1>
      <p className="text-muted-foreground text-sm mb-6">Review course curriculum drafts, NGO campaigns, and scientific publications</p>

      <div className="space-y-3">
        {state.flaggedContent.filter(f => !f.type.includes('Flag')).map(a => (
          <div key={a.id} className="bg-card border border-border p-4 rounded-xl flex items-start gap-4 justify-between hover:shadow-sm transition-all">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">{a.type}</span>
              <h3 className="font-bold text-foreground text-sm sm:text-base leading-snug mt-1.5">{a.item}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{a.details || 'Pending review by platform administrator.'}</p>
              <div className="text-[10px] text-muted-foreground mt-2">Submitted: {a.time}</div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
              <Button size="sm" className="bg-primary hover:bg-primary text-white font-semibold text-xs h-8" onClick={() => handleApprove(a.id, a.item)}>
                Approve
              </Button>
              <Button size="sm" variant="outline" className="border-red-200 text-red-500 hover:bg-red-50 text-xs h-8 font-semibold" onClick={() => handleReject(a.id, a.item)}>
                Reject
              </Button>
            </div>
          </div>
        ))}
        {state.flaggedContent.filter(f => !f.type.includes('Flag')).length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-xs">No pending course or manuscript submissions in review.</div>
        )}
      </div>
    </div>
  );
}

function ModerationPage() {
  const [state, setState] = useState(getMockState());

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleDismiss = (id: string) => {
    const updated = state.flaggedContent.filter(f => f.id !== id);
    saveMockState({ flaggedContent: updated });
    toast.success('Flag dismissed successfully');
  };

  const handleDelete = (id: string, name: string) => {
    const updated = state.flaggedContent.filter(f => f.id !== id);
    saveMockState({ flaggedContent: updated });
    toast.error(`Removed content: "${name}"`);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">Community Moderation Control</h1>
      <p className="text-muted-foreground text-sm mb-6">Action flagged content, user messages, and inappropriate posts reported by citizen scientists</p>

      <div className="space-y-3">
        {state.flaggedContent.filter(f => f.type.includes('Flag')).map(a => (
          <div key={a.id} className="bg-card border border-border p-4 rounded-xl flex items-start gap-4 justify-between hover:shadow-sm transition-all border-l-red-500">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold px-2.5 py-1 rounded-full uppercase">Severity: {a.severity}</span>
              <h3 className="font-bold text-foreground text-sm sm:text-base leading-snug mt-2">{a.item}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Reported for: {a.details}</p>
              <div className="text-[10px] text-muted-foreground mt-2">Reported: {a.time}</div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
              <Button size="sm" variant="outline" className="border-border text-foreground text-xs h-8 font-semibold" onClick={() => handleDismiss(a.id)}>
                Dismiss
              </Button>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs h-8 font-semibold" onClick={() => handleDelete(a.id, a.item)}>
                Delete Post
              </Button>
            </div>
          </div>
        ))}
        {state.flaggedContent.filter(f => f.type.includes('Flag')).length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-xs">Clean community slate! No active flagged posts found.</div>
        )}
      </div>
    </div>
  );
}

function SystemStatusPage() {
  const [state, setState] = useState(getMockState());

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  const handleFlushCache = () => {
    toast.success("System Cache Flushed Successfully!");
  };

  const handleBackup = () => {
    toast.success("Full System Backup Initiated!", { description: "Saving database snapshot to secure cloud bucket..." });
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Status Monitoring</h1>
          <p className="text-muted-foreground text-sm mt-1">Platform microservice latency, server status, and backup operations logs</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted" onClick={handleFlushCache}>
            Flush Cache
          </Button>
          <Button size="sm" className="gradient-primary text-white font-semibold" onClick={handleBackup}>
            Trigger Backup
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-foreground text-base border-b border-border/40 pb-2 mb-4">Active Microservices</h3>
          <div className="space-y-3.5">
            {state.systemStatus.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn('w-2 h-2 rounded-full', s.status === 'operational' ? 'bg-primary animate-pulse' : 'bg-secondary animate-pulse')} />
                  <span className="text-sm font-medium text-foreground">{s.service}</span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>{s.uptime} uptime</span>
                  <span className={cn('px-2 py-0.5 rounded text-[10px] font-bold uppercase', s.status === 'operational' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary')}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-foreground text-base border-b border-border/40 pb-2 mb-4">Admin Operation Logs</h3>
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {state.systemLogs.map((l, idx) => (
              <div key={idx} className="flex justify-between items-start text-xs border-b border-border/30 pb-2 last:border-0">
                <div>
                  <div className="font-semibold text-foreground">{l.action}</div>
                  <div className="text-muted-foreground text-[10px]">User: {l.user}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-primary bg-green-50 px-2 py-0.5 rounded font-bold">{l.status}</span>
                  <div className="text-muted-foreground text-[9px] mt-0.5">{l.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Route → Component Mapping ────────────────────────────────────────────

function renderSubRoute(pathname: string) {
  const route = pathname.replace('/dashboard', '') || '/';
  switch (route) {
    case '/courses': return <CoursesPage />;
    case '/ai': return <AIAssistantPage />;
    case '/biodiversity': return <BiodiversityPage />;
    case '/sustainability': return <SustainabilityPage />;
    case '/challenges': return <ChallengesPage />;
    case '/community': return <CommunityPage />;
    case '/research':
    case '/publications': return <ResearchPage />;
    case '/events': return <EventsPage />;
    case '/analytics':
    case '/reports': return <AnalyticsPage />;
    case '/sightings': return <MySightingsPage />;
    case '/students': return <MyStudentsPage />;
    case '/campaigns': return <CampaignsPage />;
    case '/volunteers': return <VolunteersPage />;
    case '/impact': return <EcoImpactPage />;
    case '/users': return <UserManagementPage />;
    case '/content': return <ContentReviewPage />;
    case '/moderation': return <ModerationPage />;
    case '/system': return <SystemStatusPage />;
    default: return null;
  }
}

// ─── Main Dashboard Component ──────────────────────────────────────────────

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!user) return null;

  const isSubRoute = location.pathname !== '/dashboard';
  const subContent = isSubRoute ? renderSubRoute(location.pathname) : null;

  const renderRoleDashboard = () => {
    switch (user.role) {
      case 'teacher': return <TeacherDashboard />;
      case 'researcher': return <ResearcherDashboard />;
      case 'enthusiast': return <EnthusiastDashboard />;
      case 'ngo': return <NGODashboard />;
      case 'admin': return <AdminDashboard />;
      default: return <StudentDashboard />;
    }
  };

  const notifications = [
    { icon: <BookOpen className="w-4 h-4" />, text: 'New lesson available in Biodiversity', time: '2h ago' },
    { icon: '🏅', text: 'You earned the "Eco Warrior" badge!', time: '5h ago' },
    { icon: <TreePine className="w-4 h-4" />, text: 'Tree Planting Challenge ending soon', time: '1d ago' },
    { icon: <MessageSquare className="w-4 h-4 text-blue-500" />, text: 'Reply in Forest Ecology Forum', time: '2d ago' },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <DashboardSidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 sm:px-6 h-16 flex items-center gap-3 flex-shrink-0">
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-sm hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search courses, species, topics..."
                className="pl-9 h-9 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:bg-background"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    toast.info(`Searching for "${searchQuery}"...`);
                    // Redirect to courses with query if relevant
                    navigate(`/dashboard/courses?q=${encodeURIComponent(searchQuery)}`);
                    setSearchQuery('');
                  }
                }}
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground">Notifications</span>
                    <button onClick={() => { setNotifOpen(false); toast.success('All notifications marked as read'); }} className="text-xs text-primary hover:underline font-semibold">Mark all read</button>
                  </div>
                  <div className="divide-y divide-border">
                    {notifications.map((n, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => setNotifOpen(false)}>
                        <span className="text-lg mt-0.5 flex-shrink-0">{n.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground leading-tight">{n.text}</p>
                          <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-border">
                    <button onClick={() => setNotifOpen(false)} className="text-xs text-primary hover:underline w-full text-center font-semibold">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            <Avatar
              className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all ml-1"
              onClick={() => navigate('/profile')}
            >
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-white text-xs font-bold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-background/50">
          {isSubRoute && subContent ? subContent : renderRoleDashboard()}
        </main>
      </div>

      {notifOpen && <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />}
    </div>
  );
}
