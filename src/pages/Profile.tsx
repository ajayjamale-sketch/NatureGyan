import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Camera, MapPin, Calendar, Award, BookOpen, Leaf, Edit2, Save, X, Loader2 } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', bio: '', location: '' });
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    if (user) setForm({ name: user.name, bio: user.bio || '', location: user.location || '' });
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    updateUser({ name: form.name, bio: form.bio, location: form.location });
    setSaving(false);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 sm:px-6 h-16 flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5 text-muted-foreground" /></button>
          <h1 className="font-semibold text-foreground">My Profile</h1>
        </header>

        <main className="flex-1 p-4 sm:p-6 max-w-4xl">
          {/* Profile Header */}
          <div className="rounded-2xl overflow-hidden bg-card border border-border mb-6">
            <div className="h-32 gradient-primary relative">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-12 mb-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 ring-4 ring-background">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:opacity-90" onClick={() => toast.info('Photo upload coming soon')}>
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex-1 pt-12">
                  {editing ? (
                    <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="max-w-xs font-semibold" />
                  ) : (
                    <h2 className="text-2xl font-bold text-card-foreground">{user.name}</h2>
                  )}
                  <p className="text-muted-foreground capitalize text-sm">{user.role}</p>
                </div>
                <div className="flex gap-2">
                  {editing ? (
                    <>
                      <Button size="sm" className="gradient-primary text-white" onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-1" />Save</>}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                      <Edit2 className="w-4 h-4 mr-1" /> Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              {editing ? (
                <div className="space-y-4 max-w-lg">
                  <div className="space-y-1.5">
                    <Label>Bio</Label>
                    <Textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Tell us about your nature interests..." className="resize-none" rows={3} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Location</Label>
                    <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, Country" />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {user.bio && <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">{user.bio}</p>}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {user.location && <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-primary" />{user.location}</div>}
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4 text-primary" />Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: BookOpen, value: String(user.coursesCompleted || 8), label: 'Courses Completed', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
              { icon: Leaf, value: user.ecoPoints.toLocaleString(), label: 'Eco Points', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
              { icon: Award, value: String(user.badges?.length || 12), label: 'Badges Earned', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="rounded-xl p-4 bg-card border border-border text-center">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xl font-bold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          {/* Interests */}
          <div className="rounded-xl p-5 bg-card border border-border mb-6">
            <h3 className="font-semibold text-foreground mb-4">Learning Interests</h3>
            <div className="flex flex-wrap gap-2">
              {(user.interests || ['Wildlife', 'Biodiversity', 'Climate Change', 'Marine Conservation']).map(interest => (
                <span key={interest} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">{interest}</span>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Achievement Badges</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { emoji: '🌱', name: 'First Steps', desc: 'Completed first course' },
                { emoji: '🌳', name: 'Tree Planter', desc: 'Planted 10 trees' },
                { emoji: '🦋', name: 'Bird Watcher', desc: 'Identified 20 species' },
                { emoji: '⚡', name: 'Eco Warrior', desc: 'Completed 5 challenges' },
                { emoji: '🌊', name: 'Ocean Guardian', desc: 'Marine conservation study' },
                { emoji: '🔬', name: 'Researcher', desc: 'Accessed 50 research papers' },
                { emoji: '🤝', name: 'Community Builder', desc: 'Helped 100 learners' },
                { emoji: '🏆', name: 'Top Learner', desc: 'Top 1% on platform' },
              ].map(badge => (
                <div key={badge.name} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors text-center">
                  <span className="text-3xl">{badge.emoji}</span>
                  <div className="font-medium text-xs text-foreground">{badge.name}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{badge.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
