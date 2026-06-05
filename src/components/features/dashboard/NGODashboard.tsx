import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, TreePine, Target, TrendingUp, Plus, MapPin,
  Calendar, CheckCircle, Clock, Heart, Share2, BarChart3,
  ChevronRight, Globe, Megaphone, Leaf, X, UserPlus, Check
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { getMockState, saveMockState, useMockStateListener } from '@/lib/mockState';

const campaignImpact = [
  { month: 'Jan', trees: 120, volunteers: 24 },
  { month: 'Feb', trees: 245, volunteers: 38 },
  { month: 'Mar', trees: 180, volunteers: 31 },
  { month: 'Apr', trees: 420, volunteers: 65 },
  { month: 'May', trees: 380, volunteers: 58 },
  { month: 'Jun', trees: 510, volunteers: 82 },
];

const volunteerGrowth = [
  { month: 'Jan', count: 124 },
  { month: 'Feb', count: 168 },
  { month: 'Mar', count: 195 },
  { month: 'Apr', count: 248 },
  { month: 'May', count: 312 },
  { month: 'Jun', count: 387 },
];

export default function NGODashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(getMockState());
  const [addCampaignModal, setAddCampaignModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; campaignId: string; campaignName: string }>({
    open: false,
    campaignId: '',
    campaignName: ''
  });

  // Track campaigns the current user has volunteered for
  const [userVolunteeredCampaigns, setUserVolunteeredCampaigns] = useState<string[]>(() => {
    const saved = localStorage.getItem(`volunteered_${user?.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Form states
  const [campName, setCampName] = useState('');
  const [campLocation, setCampLocation] = useState('');
  const [campTarget, setCampTarget] = useState('');
  const [campDesc, setCampDesc] = useState('');

  useEffect(() => {
    return useMockStateListener(() => {
      const newState = getMockState();
      setState(newState);
      // After state updates, re-sync user volunteered status from campaigns
      if (user?.id) {
        const volunteered = newState.campaigns
          .filter(c => c.participants?.includes(user.id))
          .map(c => c.id);
        setUserVolunteeredCampaigns(volunteered);
        localStorage.setItem(`volunteered_${user.id}`, JSON.stringify(volunteered));
      }
    });
  }, [user?.id]);

  // Sync user volunteered campaigns with current state whenever state changes
  useEffect(() => {
    if (user?.id && state.campaigns.length > 0) {
      const volunteered = state.campaigns
        .filter(c => c.participants?.includes(user.id))
        .map(c => c.id);
      if (JSON.stringify(volunteered) !== JSON.stringify(userVolunteeredCampaigns)) {
        setUserVolunteeredCampaigns(volunteered);
        localStorage.setItem(`volunteered_${user.id}`, JSON.stringify(volunteered));
      }
    }
  }, [state.campaigns, user?.id]);

  if (!user) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Link copied: ${text}`);
  };

  const handleShare = (campaignName: string) => {
    const shareUrl = `${window.location.origin}/campaigns/${encodeURIComponent(campaignName)}`;
    copyToClipboard(shareUrl);
  };

  const openVolunteerConfirm = (campaignId: string, campaignName: string) => {
    if (userVolunteeredCampaigns.includes(campaignId)) {
      toast.info(`You are already a volunteer for "${campaignName}"`);
      return;
    }
    setConfirmModal({ open: true, campaignId, campaignName });
  };

  const handleVolunteer = (campaignId: string, campaignName: string) => {
    // Find the campaign
    const campaign = state.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    // Update the campaign: add user to participants and increment volunteer count
    const updatedCampaigns = state.campaigns.map(camp => {
      if (camp.id === campaignId) {
        const participants = camp.participants || [];
        if (!participants.includes(user.id)) {
          participants.push(user.id);
        }
        return {
          ...camp,
          volunteers: participants.length, // recalc from participants length
          participants: participants
        };
      }
      return camp;
    });

    const updatedState = { ...state, campaigns: updatedCampaigns };
    saveMockState(updatedState);
    setState(updatedState);

    // Update local volunteered list (will also be updated by the useEffect)
    const newVolunteered = [...userVolunteeredCampaigns, campaignId];
    setUserVolunteeredCampaigns(newVolunteered);
    localStorage.setItem(`volunteered_${user.id}`, JSON.stringify(newVolunteered));

    toast.success(`You have successfully volunteered for "${campaignName}"! 🎉`);
    setConfirmModal({ open: false, campaignId: '', campaignName: '' });
  };

  const handleLaunchCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName.trim() || !campLocation.trim() || !campTarget.trim()) return;

    const targetNum = parseInt(campTarget);
    if (isNaN(targetNum) || targetNum <= 0) {
      toast.error('Please enter a valid target number');
      return;
    }

    const newCamp = {
      id: `camp_${Date.now()}`,
      name: campName,
      status: 'active',
      volunteers: 1,
      target: targetNum,
      achieved: 0,
      location: campLocation,
      deadline: 'Dec 2026',
      desc: campDesc || 'No description provided',
      participants: [user.id] // creator volunteers automatically
    };

    const updatedState = {
      ...state,
      campaigns: [newCamp, ...state.campaigns],
      flaggedContent: [
        {
          id: `f_camp_${Date.now()}`,
          type: 'Campaign Review',
          item: `${campName} by Green Earth Foundation`,
          time: 'Just now',
          severity: 'normal',
          details: 'New NGO campaign submitted for curation check.'
        },
        ...state.flaggedContent
      ]
    };
    saveMockState(updatedState);
    setState(updatedState);

    // Add to user's volunteered list
    const newVolunteered = [...userVolunteeredCampaigns, newCamp.id];
    setUserVolunteeredCampaigns(newVolunteered);
    localStorage.setItem(`volunteered_${user.id}`, JSON.stringify(newVolunteered));

    setCampName('');
    setCampLocation('');
    setCampTarget('');
    setCampDesc('');
    setAddCampaignModal(false);
    toast.success('Campaign launched! Live for citizen volunteers.');
  };

  const activeVolunteersCount = state.volunteers.filter(v => v.status === 'approved').length;
  const activeCampaigns = state.campaigns.filter(c => c.status === 'active');

  const stats = [
    { icon: TreePine, label: 'Trees Planted', value: '18,400', change: '+510 this month', color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
    { icon: Users, label: 'Active Volunteers', value: String(activeVolunteersCount + 380), change: 'Syncing live', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
    { icon: Target, label: 'Campaigns Active', value: String(activeCampaigns.length), change: 'Tracked live', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
    { icon: Globe, label: 'Impact Score', value: user.ecoPoints.toLocaleString(), change: '+640 this week', color: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">NGO Impact Dashboard 🌳</h1>
          <p className="text-muted-foreground mt-1 text-sm">Green Earth Foundation · {user.name} · Mobilizing eco-drives and volunteer actions.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            className="h-9 text-sm border-border text-foreground hover:bg-muted font-medium"
            onClick={() => navigate('/dashboard/volunteers')}
          >
            <Users className="w-4 h-4 mr-2" /> Manage Volunteers
          </Button>
          <Button
            className="gradient-primary text-white h-9 text-sm font-semibold"
            onClick={() => setAddCampaignModal(true)}
          >
            <Megaphone className="w-4 h-4 mr-2" /> Launch Campaign
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
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
          {/* Campaign Impact Chart */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Campaign Impact (2026)</h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Trees</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />Volunteers</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={campaignImpact} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <YAxis tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px', color: 'hsl(var(--card-foreground))' }} />
                <Bar dataKey="trees" fill="#15803D" name="Trees Planted" radius={[4, 4, 0, 0]} />
                <Bar dataKey="volunteers" fill="#0EA5E9" name="Volunteers Active" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Active Campaigns with Volunteer button */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">All Campaigns</h3>
              <Button
                className="gradient-primary text-white h-8 text-xs font-semibold"
                onClick={() => setAddCampaignModal(true)}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> New
              </Button>
            </div>
            <div className="space-y-4">
              {state.campaigns.slice(0, 3).map(c => {
                const hasVolunteered = userVolunteeredCampaigns.includes(c.id);
                return (
                  <div key={c.id} className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-foreground">{c.name}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>{c.status}</span>
                          {hasVolunteered && (
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" /> Volunteered
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5 flex-wrap">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" />{c.location}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3 text-primary" />{c.volunteers} volunteers</span>
                          <span>Due {c.deadline}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openVolunteerConfirm(c.id, c.name)}
                          disabled={hasVolunteered}
                          className={`p-1.5 rounded-lg transition-colors ${
                            hasVolunteered
                              ? 'bg-green-100 text-green-600 cursor-default'
                              : 'border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10'
                          }`}
                          title={hasVolunteered ? "Already volunteered" : "Volunteer for this campaign"}
                        >
                          {hasVolunteered ? <Check className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleShare(c.name)}
                          className="p-1.5 rounded-lg border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-colors"
                          title="Share campaign"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${Math.min((c.achieved / c.target) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-semibold flex-shrink-0">
                        {c.achieved.toLocaleString()} / {c.target.toLocaleString()}
                      </span>
                    </div>
                    {/* Full-width volunteer button */}
                    <div className="mt-3">
                      <Button
                        size="sm"
                        variant={hasVolunteered ? "outline" : "default"}
                        className={`w-full text-xs ${
                          hasVolunteered
                            ? 'border-green-500 text-green-600 bg-green-50 hover:bg-green-100'
                            : 'gradient-primary text-white'
                        }`}
                        onClick={() => openVolunteerConfirm(c.id, c.name)}
                        disabled={hasVolunteered}
                      >
                        {hasVolunteered ? (
                          <>
                            <Check className="w-3 h-3 mr-1" /> Already Volunteered
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3 h-3 mr-1" /> Volunteer for this campaign
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Volunteer Growth Chart */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground text-sm mb-3">Volunteer Growth</h3>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={volunteerGrowth} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }} />
                <YAxis tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '11px', color: 'hsl(var(--card-foreground))' }} />
                <Area type="monotone" dataKey="count" stroke="#0EA5E9" strokeWidth={2} fill="url(#colorVol)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top Volunteers */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Active Volunteers</h3>
              <button
                className="text-xs text-primary hover:underline font-semibold"
                onClick={() => navigate('/dashboard/volunteers')}
              >
                Manage
              </button>
            </div>
            <div className="space-y-3">
              {state.volunteers.slice(0, 4).map((v, idx) => (
                <div key={v.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">{idx + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{v.name}</div>
                    <div className="text-xs text-muted-foreground">{v.tasks} tasks completed</div>
                  </div>
                  <span className="text-xs font-semibold text-primary">{v.score} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Volunteering */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <h3 className="font-bold text-foreground text-lg">Confirm Volunteer</h3>
              <button onClick={() => setConfirmModal({ open: false, campaignId: '', campaignName: '' })} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <p>You are about to volunteer for:</p>
              <p className="font-bold text-primary text-center">{confirmModal.campaignName}</p>
              <p className="text-sm text-muted-foreground">You will be added to the campaign's volunteer list and receive updates.</p>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button variant="outline" onClick={() => setConfirmModal({ open: false, campaignId: '', campaignName: '' })}>Cancel</Button>
                <Button className="gradient-primary text-white" onClick={() => handleVolunteer(confirmModal.campaignId, confirmModal.campaignName)}>
                  Confirm Volunteer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Launch Campaign Modal */}
      {addCampaignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <h3 className="font-bold text-foreground text-lg">Launch Campaign</h3>
              <button onClick={() => setAddCampaignModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleLaunchCampaignSubmit} className="p-5 space-y-4">
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
                  <label className="text-xs font-semibold text-foreground block mb-1">Campaign Goal</label>
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
                <label className="text-xs font-semibold text-foreground block mb-1">Campaign Details</label>
                <textarea 
                  placeholder="Describe goals, target dates, meeting spots..."
                  value={campDesc}
                  onChange={e => setCampDesc(e.target.value)}
                  className="w-full bg-background border border-border text-foreground text-sm rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-primary h-20 resize-none"
                  required
                />
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" className="border-border text-foreground font-semibold" onClick={() => setAddCampaignModal(false)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-white font-semibold">Deploy Campaign</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}