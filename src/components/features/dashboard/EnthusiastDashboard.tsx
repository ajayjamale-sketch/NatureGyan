import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera, Eye, Map, Bird, Leaf, TrendingUp, Upload, Trophy,
  Globe, Star, Plus, Heart, Share2, ChevronRight, Binoculars, X
, Bug , Medal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { getMockState, saveMockState, useMockStateListener } from '@/lib/mockState';

const speciesData = [
  { month: 'Jan', species: 8 }, { month: 'Feb', species: 12 },
  { month: 'Mar', species: 18 }, { month: 'Apr', species: 24 },
  { month: 'May', species: 19 }, { month: 'Jun', species: 28 },
];

export default function EnthusiastDashboard() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(getMockState());
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [likedSightings, setLikedSightings] = useState<string[]>([]);
  
  // Custom sighting form states
  const [addSightingModal, setAddSightingModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Birds');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  if (!user) return null;

  const handleUpload = () => {
    setAddSightingModal(true);
  };

  const handleAddSighting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;

    setUploadingPhoto(true);
    setAddSightingModal(false);
    await new Promise(r => setTimeout(r, 1000));
    setUploadingPhoto(false);

    const newSighting = {
      id: `s_${Date.now()}`,
      name,
      scientific: `${category.toLowerCase()} species`,
      category,
      location,
      date: new Date().toISOString().split('T')[0],
      img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300',
      rare: Math.random() > 0.5,
      details
    };

    const updated = [newSighting, ...state.sightings];
    saveMockState({ sightings: updated });

    updateUser({
      ecoPoints: user.ecoPoints + 30
    });

    setName('');
    setLocation('');
    setDetails('');
    toast.success('Observation Logged!', { description: '+30 Eco Points added for citizen science research!' });
  };

  const toggleLike = (sightingId: string, name: string) => {
    setLikedSightings(prev =>
      prev.includes(sightingId) ? prev.filter(id => id !== sightingId) : [...prev, sightingId]
    );
    if (!likedSightings.includes(sightingId)) {
      toast.success(`Liked sighting: "${name}"`);
    }
  };

  const stats = [
    { icon: Eye, label: 'Species Identified', value: String(state.sightings.length), change: 'Logged in DB', color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
    { icon: Camera, label: 'Observations Logged', value: String(state.sightings.length + 620), change: '+62 this month', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
    { icon: Map, label: 'Locations Visited', value: '34', change: '5 new this year', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
    { icon: Trophy, label: 'Eco Points', value: user.ecoPoints.toLocaleString(), change: 'Level 3 Explorer', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">Nature Explorer Dashboard <Bug className="w-6 h-6 text-primary" /></h1>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back, {user.name.split(' ')[0]}! Log nature observations to earn Eco Points.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="h-9 text-sm border-border text-foreground hover:bg-muted font-medium" onClick={() => navigate('/dashboard/biodiversity')}>
            <Globe className="w-4 h-4 mr-2" /> Explore Species Map
          </Button>
          <Button className="gradient-primary text-white h-9 text-sm font-semibold" onClick={handleUpload} disabled={uploadingPhoto}>
            {uploadingPhoto ? 'Uploading...' : <><Upload className="w-4 h-4 mr-2" /> Identify Species</>}
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
          {/* Species Discovery Chart */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Species Discovered (2026)</h3>
              <span className="text-xs text-primary bg-primary/10 rounded-full px-3 py-1 font-semibold">109 total this year</span>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={speciesData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <YAxis tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px', color: 'hsl(var(--card-foreground))' }} />
                <Bar dataKey="species" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Sightings */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">My Citizen Sightings</h3>
              <Button variant="ghost" size="sm" className="text-primary text-xs font-semibold" onClick={() => navigate('/dashboard/sightings')}>
                View all <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {state.sightings.slice(0, 4).map(s => (
                <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <img src={s.img} alt={s.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground truncate">{s.name}</span>
                      {s.rare && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">Rare</span>}
                    </div>
                    <div className="text-xs text-muted-foreground">{s.category} · {s.location} · {s.date}</div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => toggleLike(s.id, s.name)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${likedSightings.includes(s.id) ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-muted-foreground hover:bg-muted'}`}
                    ><Heart className={`w-4 h-4 ${likedSightings.includes(s.id) ? 'fill-current' : ''}`} /></button>
                    <button onClick={() => toast.success(`Shared "${s.name}" sighting!`)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Birding Checklist */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Bird className="w-4 h-4 text-primary" /> Birding Milestones
            </h3>
            <div className="space-y-2.5">
              {[
                { group: 'Raptors', found: 18, total: 32 },
                { group: 'Waterbirds', found: 24, total: 40 },
                { group: 'Songbirds', found: 67, total: 95 },
                { group: 'Nocturnal Owls', found: 8, total: 20 },
              ].map(({ group, found, total }) => (
                <div key={group}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{group}</span>
                    <span className="text-foreground font-semibold">{found}/{total}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(found/total)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">My Badges</h3>
              <span className="text-xs text-primary font-semibold">{user.badges?.length || 0} earned</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {user.badges?.slice(0, 6).map((badge, i) => (
                <div key={i} className="aspect-square rounded-xl bg-muted flex flex-col items-center justify-center text-center p-1.5 hover:bg-primary/10 hover:scale-105 transition-all cursor-default border border-border/20" title={badge.description}>
                  <div className="flex items-center text-xl">{badge.icon ? <span className="text-2xl">{badge.icon}</span> : <Medal className="w-6 h-6 text-primary" />}</div>
                  <div className="text-[8px] font-bold text-foreground mt-1 truncate w-full">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sighting Identification Modal */}
      {addSightingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <h3 className="font-bold text-foreground text-lg">AI Species Identification</h3>
              <button onClick={() => setAddSightingModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSighting} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Species Name / Title</label>
                <Input 
                  placeholder="e.g. Indian Peacock"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Observation Category</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none font-semibold"
                  >
                    <option value="Birds">Birds</option>
                    <option value="Plants">Plants</option>
                    <option value="Insects">Insects</option>
                    <option value="Mammals">Mammals</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Observation Location</label>
                  <Input 
                    placeholder="e.g. Sanjay Gandhi NP"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="bg-background border-border text-foreground"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Field Observation Details</label>
                <Input 
                  placeholder="Blue throat plumage, nesting near bamboo groves..."
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" className="border-border text-foreground" onClick={() => setAddSightingModal(false)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-white font-semibold">Identify & Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
