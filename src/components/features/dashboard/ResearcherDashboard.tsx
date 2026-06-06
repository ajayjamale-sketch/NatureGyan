import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, BookOpen, Users, TrendingUp, Download, ExternalLink,
  Plus, Eye, MessageSquare, Globe, Clock, Star, Upload, Search, X, User, Mail, CheckCircle
, Microscope } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { getMockState, saveMockState, useMockStateListener } from '@/lib/mockState';

const publicationViews = [
  { month: 'Jan', views: 320 }, { month: 'Feb', views: 480 },
  { month: 'Mar', views: 390 }, { month: 'Apr', views: 620 },
  { month: 'May', views: 750 }, { month: 'Jun', views: 890 },
];

const expertiseData = [
  { subject: 'Biodiversity', A: 95 }, { subject: 'Genomics', A: 88 },
  { subject: 'Ecology', A: 82 }, { subject: 'Conservation', A: 90 },
  { subject: 'Climate', A: 75 }, { subject: 'Field Work', A: 92 },
];

// Helper for conditional classes
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// Reusable Modal
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-2xl w-full max-h-[90vh] bg-card border border-border rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-70px)]">{children}</div>
      </div>
    </div>
  );
}

// Registration Form for joining Research Network
function JoinNetworkModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    institution: '',
    researchArea: 'Biodiversity',
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error('Please agree to the collaboration terms');
      return;
    }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setIsSubmitting(false);
    onSuccess();
    toast.success(`Welcome ${formData.name.split(' ')[0]}! You've joined the Global Research Network.`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join Research Network">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Institution / Organization</label>
          <input
            type="text"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="e.g., Wildlife Institute of India"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Primary Research Area</label>
          <select
            value={formData.researchArea}
            onChange={(e) => setFormData({ ...formData, researchArea: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Biodiversity">Biodiversity</option>
            <option value="Climate Change">Climate Change</option>
            <option value="Conservation">Conservation</option>
            <option value="Genomics">Genomics</option>
            <option value="Ecology">Ecology</option>
          </select>
        </div>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agreeNetwork"
            checked={formData.agree}
            onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
            className="mt-1"
          />
          <label htmlFor="agreeNetwork" className="text-xs text-muted-foreground">
            I agree to share my research interests and collaborate with the network.
          </label>
        </div>
        <Button type="submit" className="w-full gradient-primary text-white" disabled={isSubmitting}>
          {isSubmitting ? 'Joining...' : 'Join Network'}
        </Button>
      </form>
    </Modal>
  );
}

export default function ResearcherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(getMockState());
  const [searchPaper, setSearchPaper] = useState('');
  
  // Modals
  const [submitPaperModal, setSubmitPaperModal] = useState(false);
  const [browseModalOpen, setBrowseModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [joinNetworkModalOpen, setJoinNetworkModalOpen] = useState(false);
  const [networkJoined, setNetworkJoined] = useState(false);

  // Form states for paper submission
  const [paperTitle, setPaperTitle] = useState('');
  const [paperJournal, setPaperJournal] = useState('');
  const [paperCategory, setPaperCategory] = useState('Biodiversity');

  // Collaboration state
  const [collabRequests, setCollabRequests] = useState([
    { id: 'cr1', from: 'Dr. Kavya Nair', inst: 'WWF India', topic: 'Tiger habitat mapping' },
    { id: 'cr2', from: 'Prof. Rajesh Kumar', inst: 'IIT Bombay', topic: 'Species genomics' },
  ]);

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  if (!user) return null;

  // Filter papers authored by user (simulated)
  const myPapers = state.researchPapers.filter(p => p.authors.toLowerCase().includes(user.name.split(' ')[1]?.toLowerCase() || 'suresh'));

  const handleDownload = (id: string, title: string) => {
    const updated = state.researchPapers.map(p => {
      if (p.id === id) return { ...p, downloads: p.downloads + 1 };
      return p;
    });
    saveMockState({ ...state, researchPapers: updated });
    setState({ ...state, researchPapers: updated });
    toast.success(`Downloading PDF: ${title.slice(0, 30)}...`);
  };

  const handleAcceptCollab = (id: string, name: string) => {
    setCollabRequests(prev => prev.filter(r => r.id !== id));
    toast.success(`Accepted collaboration with ${name}!`);
  };

  const handleDeclineCollab = (id: string, name: string) => {
    setCollabRequests(prev => prev.filter(r => r.id !== id));
    toast.info(`Declined request from ${name}`);
  };

  const handleSubmitPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperTitle.trim()) return;

    const newPaper = {
      id: `p_${Date.now()}`,
      title: paperTitle,
      authors: user.name,
      year: new Date().getFullYear(),
      category: paperCategory,
      downloads: 1,
      journal: paperJournal || 'NatureGyan Publications',
      status: 'published'
    };

    const updatedPapers = [newPaper, ...state.researchPapers];
    saveMockState({ ...state, researchPapers: updatedPapers });
    setState({ ...state, researchPapers: updatedPapers });
    setPaperTitle('');
    setPaperJournal('');
    setSubmitPaperModal(false);
    toast.success('Research paper uploaded successfully!');
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const stats = [
    { icon: FileText, label: 'Papers Published', value: String(myPapers.length), change: 'Tracked live', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
    { icon: Eye, label: 'Total Citations', value: '1,240', change: '+89 this month', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
    { icon: Users, label: 'Active Collaborators', value: networkJoined ? '19' : '18', change: networkJoined ? '+1 new member' : '4 new this year', color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
    { icon: Star, label: 'H-Index', value: '14', change: 'Top 5% in field', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">Research Dashboard <Microscope className="w-6 h-6 text-primary" /></h1>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back, Dr. {user.name.split(' ')[0]}. Oversee publication milestones and collaborate with international institutes.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="h-9 text-sm border-border text-foreground hover:bg-muted font-medium" onClick={() => setBrowseModalOpen(true)}>
            <Search className="w-4 h-4 mr-2" /> Browse Publications
          </Button>
          <Button className="gradient-primary text-white h-9 text-sm font-semibold" onClick={() => setSubmitPaperModal(true)}>
            <Upload className="w-4 h-4 mr-2" /> Upload Manuscript
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, change, color }) => (
          <div key={label} className="rounded-xl p-4 bg-card border border-border hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            <div className="text-xs text-primary mt-1 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3 h-3" /> {change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Citation Views Chart */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Publication Views (2026)</h3>
              <span className="text-xs text-primary bg-primary/10 rounded-full px-3 py-1 font-semibold">3,450 total this year</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={publicationViews} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <YAxis tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px', color: 'hsl(var(--card-foreground))' }} />
                <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4, fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Publications */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">My Manuscripts</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search papers..."
                    className="pl-8 h-7 text-xs bg-muted/50 border-border text-foreground w-40"
                    value={searchPaper}
                    onChange={e => setSearchPaper(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {myPapers
                .filter(p => !searchPaper || p.title.toLowerCase().includes(searchPaper.toLowerCase()))
                .map(pub => (
                <div key={pub.id} className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors group">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground leading-tight mb-1">{pub.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-primary">{pub.journal}</span>
                        <span>•</span>
                        <span>{pub.year}</span>
                        <span>•</span>
                        <span>{pub.downloads} downloads</span>
                        <span className="px-1.5 py-0.5 bg-green-50 text-green-700 font-semibold rounded capitalize">{pub.status}</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button
                        onClick={() => handleDownload(pub.id, pub.title)}
                        className="p-1.5 rounded-lg bg-background border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-colors"
                        title="Download"
                      ><Download className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              ))}
              {myPapers.length === 0 && (
                <div className="text-center py-6 text-xs text-muted-foreground">No published manuscripts found. Use manuscript uploader to submit!</div>
              )}
            </div>
            <Button className="w-full mt-4 gradient-primary text-white text-sm h-9 font-semibold" onClick={() => setSubmitPaperModal(true)}>
              <Plus className="w-4 h-4 mr-2" /> Upload New Publication
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Expertise Radar */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-3 text-sm">Research Expertise</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={expertiseData}>
                <PolarGrid stroke="currentColor" strokeOpacity={0.15} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.7 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Expertise" dataKey="A" stroke="#15803D" fill="#15803D" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Active Projects */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Active Projects</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Biodiversity Mapping — Karnataka', collab: 3, progress: 65, deadline: 'Aug 2026', description: 'Satellite and ground survey integration for Western Ghats biodiversity hotspots.' },
                { name: 'AI Wildlife Detection Study', collab: 5, progress: 30, deadline: 'Dec 2026', description: 'Developing deep learning models for camera trap species identification.' },
                { name: 'Mangrove Restoration Impact Analysis', collab: 2, progress: 80, deadline: 'Jul 2026', description: 'Long-term carbon sequestration and biodiversity recovery assessment.' },
              ].map(p => (
                <div key={p.name} className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors cursor-pointer" onClick={() => handleProjectClick(p)}>
                  <div className="text-sm font-semibold text-foreground leading-tight mb-1">{p.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">{p.collab} collaborators · Due {p.deadline}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold">{p.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collaboration Requests */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Collab Requests
              </h3>
              <Button variant="ghost" size="sm" className="text-primary text-xs font-semibold" onClick={() => setJoinNetworkModalOpen(true)}>
                Join Network <Globe className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {collabRequests.map(r => (
                <div key={r.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-sm font-semibold text-foreground">{r.from}</div>
                  <div className="text-xs text-muted-foreground">{r.inst}</div>
                  <div className="text-xs text-primary mt-1">{r.topic}</div>
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 text-xs py-1 rounded bg-primary text-white hover:opacity-90 transition-opacity font-semibold" onClick={() => handleAcceptCollab(r.id, r.from)}>Accept</button>
                    <button className="flex-1 text-xs py-1 rounded border border-border text-muted-foreground hover:bg-muted transition-colors font-semibold" onClick={() => handleDeclineCollab(r.id, r.from)}>Decline</button>
                  </div>
                </div>
              ))}
              {collabRequests.length === 0 && (
                <div className="text-center py-4 text-xs text-muted-foreground">No pending requests.</div>
              )}
            </div>
            {networkJoined && (
              <div className="mt-3 pt-3 border-t border-border text-xs text-green-600 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> You are a member of the Global Research Network
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========== MODALS ========== */}

      {/* Browse Publications Modal */}
      <Modal isOpen={browseModalOpen} onClose={() => setBrowseModalOpen(false)} title="All Research Publications">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Browse the latest research from the global community</p>
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title, author..."
              className="pl-9 bg-background border-border"
              value={searchPaper}
              onChange={e => setSearchPaper(e.target.value)}
            />
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {state.researchPapers
              .filter(p => !searchPaper || p.title.toLowerCase().includes(searchPaper.toLowerCase()) || p.authors.toLowerCase().includes(searchPaper.toLowerCase()))
              .map(pub => (
              <div key={pub.id} className="p-3 rounded-lg border border-border hover:bg-muted/30">
                <div className="font-semibold text-foreground text-sm">{pub.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{pub.authors} · {pub.year} · {pub.journal}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-primary">{pub.downloads} downloads</span>
                  <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => { handleDownload(pub.id, pub.title); toast.info(`Downloading ${pub.title}`); }}>
                    <Download className="w-3 h-3 mr-1" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Project Details Modal */}
      <Modal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} title={selectedProject?.name || 'Project Details'}>
        {selectedProject && (
          <div className="space-y-4">
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm text-foreground">{selectedProject.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Collaborators:</span>
                <span className="ml-2 font-semibold text-foreground">{selectedProject.collab}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Deadline:</span>
                <span className="ml-2 font-semibold text-foreground">{selectedProject.deadline}</span>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Progress:</span>
              <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${selectedProject.progress}%` }} />
              </div>
              <span className="text-xs text-muted-foreground mt-1 block">{selectedProject.progress}% complete</span>
            </div>
            <Button className="w-full gradient-primary text-white" onClick={() => { toast.info(`Collaboration request sent for ${selectedProject.name}`); setProjectModalOpen(false); }}>
              Request to Join Project
            </Button>
          </div>
        )}
      </Modal>

      {/* Upload Manuscript Modal */}
      {submitPaperModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <h3 className="font-bold text-foreground text-lg">Upload Manuscript</h3>
              <button onClick={() => setSubmitPaperModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitPaper} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Paper Title</label>
                <Input 
                  placeholder="e.g. Wildlife genomic mapping in the Western Ghats"
                  value={paperTitle}
                  onChange={e => setPaperTitle(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Journal Organization</label>
                  <Input 
                    placeholder="e.g. Nature Conservation"
                    value={paperJournal}
                    onChange={e => setPaperJournal(e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Subject Field</label>
                  <select 
                    value={paperCategory} 
                    onChange={e => setPaperCategory(e.target.value)}
                    className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none font-medium"
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
                <Button type="submit" className="gradient-primary text-white font-semibold">Publish manuscript</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Research Network Modal */}
      <JoinNetworkModal 
        isOpen={joinNetworkModalOpen} 
        onClose={() => setJoinNetworkModalOpen(false)} 
        onSuccess={() => setNetworkJoined(true)} 
      />
    </div>
  );
}