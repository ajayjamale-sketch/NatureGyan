import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Shield, Palette, Globe, Trash2, Save, Loader2, Sun, Moon, Monitor } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    emailCourse: true, emailChallenge: true, emailCommunity: false,
    pushAll: true, pushMentions: true, pushBadges: true,
  });
  const [privacy, setPrivacy] = useState({ showProfile: true, showBadges: true, showActivity: false });
  const { user, isAuthenticated, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleSave = async (section: string) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    toast.success(`${section} settings saved!`);
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Globe },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 sm:px-6 h-16 flex items-center gap-4">
          <button className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">Settings</h1>
        </header>

        <main className="flex-1 p-4 sm:p-6 max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Sidebar Tabs */}
            <div className="sm:w-52 flex-shrink-0">
              <nav className="space-y-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-left',
                      activeTab === id
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    <Icon className="w-4 h-4" />{label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6">
              {activeTab === 'account' && (
                <div className="rounded-xl p-6 bg-card border border-border space-y-5">
                  <h2 className="font-semibold text-lg text-card-foreground">Account Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-foreground">Full Name</Label>
                      <Input defaultValue={user.name} className="bg-background text-foreground border-border" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-foreground">Email Address</Label>
                      <Input defaultValue={user.email} type="email" className="bg-background text-foreground border-border" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-foreground">Current Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-background text-foreground border-border" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-foreground">New Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-background text-foreground border-border" />
                    </div>
                  </div>
                  <Button className="gradient-primary text-white" onClick={() => handleSave('Account')} disabled={saving}>
                    {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
                  </Button>

                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-white" onClick={() => toast.error('Account deletion requires email confirmation')}>
                      <Trash2 className="w-4 h-4 mr-2" />Delete Account
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="rounded-xl p-6 bg-card border border-border space-y-6">
                  <h2 className="font-semibold text-lg text-card-foreground">Notification Preferences</h2>
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-foreground">Email Notifications</h3>
                    {[
                      { key: 'emailCourse', label: 'Course updates & reminders', desc: 'Get notified about new lessons and deadlines' },
                      { key: 'emailChallenge', label: 'New eco-challenges', desc: 'Stay updated on new environmental campaigns' },
                      { key: 'emailCommunity', label: 'Community replies & mentions', desc: 'When someone replies to your forum posts' },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <div>
                          <div className="text-sm font-medium text-foreground">{label}</div>
                          <div className="text-xs text-muted-foreground">{desc}</div>
                        </div>
                        <Switch
                          checked={notifications[key as keyof typeof notifications]}
                          onCheckedChange={v => setNotifications(n => ({ ...n, [key]: v }))}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-foreground">Push Notifications</h3>
                    {[
                      { key: 'pushAll', label: 'All push notifications', desc: 'Master toggle for all push alerts' },
                      { key: 'pushMentions', label: 'Mentions and replies', desc: 'When someone mentions you' },
                      { key: 'pushBadges', label: 'Badge achievements', desc: 'When you unlock a new badge' },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <div>
                          <div className="text-sm font-medium text-foreground">{label}</div>
                          <div className="text-xs text-muted-foreground">{desc}</div>
                        </div>
                        <Switch
                          checked={notifications[key as keyof typeof notifications]}
                          onCheckedChange={v => setNotifications(n => ({ ...n, [key]: v }))}
                        />
                      </div>
                    ))}
                  </div>
                  <Button className="gradient-primary text-white" onClick={() => handleSave('Notification')} disabled={saving}>
                    {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : <><Save className="w-4 h-4 mr-2" />Save Preferences</>}
                  </Button>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="rounded-xl p-6 bg-card border border-border space-y-6">
                  <h2 className="font-semibold text-lg text-card-foreground">Appearance Settings</h2>
                  <div>
                    <h3 className="font-medium text-sm text-foreground mb-3">Theme</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'light', label: 'Light', icon: Sun },
                        { id: 'dark', label: 'Dark', icon: Moon },
                        { id: 'system', label: 'System', icon: Monitor },
                      ].map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => { if (id !== 'system' && theme !== id) toggleTheme(); }}
                          className={cn(
                            'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                            (id !== 'system' && theme === id)
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground mb-3">Language</h3>
                    <select className="w-full max-w-xs h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm" onChange={() => toast.info('Language preference saved')}>
                      <option>English (Default)</option>
                      <option>Hindi — हिन्दी</option>
                      <option>Tamil — தமிழ்</option>
                      <option>Telugu — తెలుగు</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="rounded-xl p-6 bg-card border border-border space-y-6">
                  <h2 className="font-semibold text-lg text-card-foreground">Privacy Settings</h2>
                  <div className="space-y-4">
                    {[
                      { key: 'showProfile', label: 'Public profile', desc: 'Allow other learners to view your profile and learning journey' },
                      { key: 'showBadges', label: 'Show badges publicly', desc: 'Display your earned badges on your public profile page' },
                      { key: 'showActivity', label: 'Show learning activity', desc: 'Share your recent eco-activities and course progress with followers' },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-start justify-between py-3 border-b border-border/50 last:border-0">
                        <div className="flex-1 pr-4">
                          <div className="text-sm font-medium text-foreground">{label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</div>
                        </div>
                        <Switch
                          checked={privacy[key as keyof typeof privacy]}
                          onCheckedChange={v => setPrivacy(p => ({ ...p, [key]: v }))}
                        />
                      </div>
                    ))}
                  </div>
                  <Button className="gradient-primary text-white" onClick={() => handleSave('Privacy')} disabled={saving}>
                    {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : <><Save className="w-4 h-4 mr-2" />Save Privacy Settings</>}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
