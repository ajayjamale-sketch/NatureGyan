import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, BookOpen, FileText, Shield, TrendingUp, AlertTriangle,
  CheckCircle, XCircle, Eye, Settings, BarChart3,
  Globe, ChevronRight, Activity, Flag, Plus, Download, X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { getMockState, saveMockState, useMockStateListener } from '@/lib/mockState';
import { cn } from '@/lib/utils';

const userGrowth = [
  { month: 'Jan', users: 180000 }, { month: 'Feb', users: 210000 },
  { month: 'Mar', users: 245000 }, { month: 'Apr', users: 290000 },
  { month: 'May', users: 340000 }, { month: 'Jun', users: 392000 },
];

const contentBreakdown = [
  { name: 'Courses', value: 512, color: '#15803D' },
  { name: 'Blog Posts', value: 248, color: '#0EA5E9' },
  { name: 'Research', value: 134, color: '#8b5cf6' },
  { name: 'Events', value: 89, color: '#92400E' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(getMockState());
  const [processingAction, setProcessingAction] = useState<string | null>(null);
  const [searchUser, setSearchUser] = useState('');

  // Local state for user management list in admin dashboard
  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'Aryan Kapoor', role: 'Student', ecoPoints: 2450, status: 'active' },
    { id: 'u2', name: 'Ananya Krishnamurthy', role: 'Teacher', ecoPoints: 5800, status: 'active' },
    { id: 'u3', name: 'Dr. Suresh Iyer', role: 'Researcher', ecoPoints: 9200, status: 'active' },
    { id: 'u4', name: 'Riya Desai', role: 'Enthusiast', ecoPoints: 3750, status: 'active' },
    { id: 'u5', name: 'Vikram Nair', role: 'NGO', ecoPoints: 18400, status: 'active' },
  ]);

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  if (!user) return null;

  const handleAction = async (actionId: string, item: string, isApprove: boolean) => {
    setProcessingAction(actionId);
    await new Promise(r => setTimeout(r, 600));
    setProcessingAction(null);

    // Remove from queue
    const updated = state.flaggedContent.filter(f => f.id !== actionId);
    saveMockState({ flaggedContent: updated });

    if (isApprove) {
      toast.success(`Approved: ${item}`);
    } else {
      toast.error(`Rejected: ${item}`);
    }
  };

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

  const stats = [
    { icon: Users, label: 'Total Users', value: '2.4M', change: '+48K this month', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
    { icon: BookOpen, label: 'Courses Live', value: String(state.courses.length + 500), change: 'Tracked live', color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
    { icon: FileText, label: 'Action Items', value: String(state.flaggedContent.length), change: 'Moderation pending', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
    { icon: Activity, label: 'Platform Health', value: '99.8%', change: 'All systems normal', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Control Panel 🛡️</h1>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back, {user.name}. You have {state.flaggedContent.length} pending moderation actions.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="h-9 text-sm border-border text-foreground hover:bg-muted font-medium" onClick={() => toast.success('Exporting platform report...')}>
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button className="gradient-primary text-white h-9 text-sm font-semibold" onClick={() => navigate('/dashboard/system')}>
            <Settings className="w-4 h-4 mr-2" /> System Status
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
          {/* User Growth */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">User Growth (2026)</h3>
              <span className="text-xs text-primary bg-primary/10 rounded-full px-3 py-1 font-semibold">+212K this year</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={userGrowth} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <YAxis tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px', color: 'hsl(var(--card-foreground))' }} formatter={v => [`${(Number(v)/1000).toFixed(0)}K`, 'Users']} />
                <Line type="monotone" dataKey="users" stroke="#15803D" strokeWidth={2.5} dot={{ r: 4, fill: '#15803D' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pending Actions */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Moderation / Review Queue</h3>
              <span className="text-xs text-amber-600 bg-amber-100 dark:bg-amber-900/30 rounded-full px-2.5 py-0.5 font-semibold">{state.flaggedContent.length} pending</span>
            </div>
            <div className="space-y-3">
              {state.flaggedContent.map((action) => (
                <div key={action.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    action.severity === 'high' ? 'bg-red-100 dark:bg-red-950/20' : 'bg-primary/10'
                  }`}>
                    {action.severity === 'high'
                      ? <AlertTriangle className="w-4 h-4 text-red-500" />
                      : <Flag className="w-4 h-4 text-primary" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-primary">{action.type}</div>
                    <div className="text-sm text-foreground truncate font-semibold">{action.item}</div>
                    <div className="text-[10px] text-muted-foreground">{action.details || 'Awaiting platform moderation review.'}</div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleAction(action.id, action.item, true)}
                      disabled={processingAction === action.id}
                      className="w-7 h-7 rounded bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors disabled:opacity-50"
                      title="Approve"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAction(action.id, action.item, false)}
                      disabled={processingAction === action.id}
                      className="w-7 h-7 rounded bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors disabled:opacity-50"
                      title="Reject"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {state.flaggedContent.length === 0 && (
                <div className="text-center py-6 text-xs text-muted-foreground">Moderation queue cleared. No active review requests!</div>
              )}
            </div>
          </div>

          {/* User Management */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Quick User Actions</h3>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search users..."
                  className="h-7 text-xs w-36 bg-muted/50 border-border text-foreground"
                  value={searchUser}
                  onChange={e => setSearchUser(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-xs font-semibold text-muted-foreground">User</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold text-muted-foreground">Role</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold text-muted-foreground">Eco Score</th>
                    <th className="text-right py-2 px-2 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList
                    .filter(u => !searchUser || u.name.toLowerCase().includes(searchUser.toLowerCase()))
                    .map(u => (
                    <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 px-2">
                        <span className="font-semibold text-foreground text-xs">{u.name}</span>
                      </td>
                      <td className="py-2.5 px-2">
                        <span className="text-xs bg-muted px-2 py-0.5 rounded font-semibold text-muted-foreground">{u.role}</span>
                      </td>
                      <td className="py-2.5 px-2">
                        <span className="text-xs text-muted-foreground">{u.ecoPoints.toLocaleString()}</span>
                      </td>
                      <td className="py-2.5 px-2 text-right">
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
        </div>

        <div className="space-y-6">
          {/* Content Breakdown */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4 text-sm font-semibold">Content Distribution</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={contentBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                  {contentBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '11px', color: 'hsl(var(--card-foreground))' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {contentBreakdown.map(item => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" /> Platform Status
            </h3>
            <div className="space-y-3">
              {state.systemStatus.slice(0, 4).map(s => (
                <div key={s.service} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full flex-shrink-0', s.status === 'operational' ? 'bg-green-500' : 'bg-amber-500')} />
                    <span className="text-sm text-muted-foreground">{s.service}</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{s.uptime}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 h-8 text-xs border-border text-foreground hover:bg-muted font-semibold" onClick={() => navigate('/dashboard/system')}>
              View Status Page
            </Button>
          </div>

          {/* Quick Admin Actions */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Quick Panel Shortcuts</h3>
            <div className="space-y-2">
              {[
                { label: 'Moderate Community', action: () => navigate('/dashboard/moderation') },
                { label: 'Review Courses', action: () => navigate('/dashboard/content') },
                { label: 'Platform Users', action: () => navigate('/dashboard/users') },
              ].map(({ label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg border border-border text-xs text-foreground hover:bg-muted hover:border-primary/30 transition-all text-left font-medium"
                >
                  <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {label}
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
