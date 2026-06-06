import { BarChart3, TrendingUp, Award, Leaf, BookOpen, Target , Sprout , Bug , Waves , TreePine , Droplet } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const learningData = [
  { month: 'Jan', hours: 4 },
  { month: 'Feb', hours: 8 },
  { month: 'Mar', hours: 6 },
  { month: 'Apr', hours: 12 },
  { month: 'May', hours: 15 },
  { month: 'Jun', hours: 18 },
];

const ecoScoreData = [
  { name: 'Score', value: 78, fill: '#15803D' },
];

export default function DashboardPreview() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            Your Impact Dashboard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Track your learning &{' '}
            <span className="text-gradient">eco-impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time analytics on your courses, sustainability activities, carbon savings, and conservation contributions.
          </p>
        </div>

        {/* Dashboard Mock */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
          {/* Top Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-4 text-xs text-muted-foreground font-mono">naturegyan.in/dashboard</span>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: BookOpen, label: 'Courses', value: '8', sub: 'completed', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
                    { icon: Leaf, label: 'Eco Points', value: '2,450', sub: 'earned', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
                    { icon: Award, label: 'Badges', value: '12', sub: 'unlocked', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
                    { icon: Target, label: 'Challenges', value: '5', sub: 'active', color: 'text-sky-600 bg-sky-50 dark:bg-sky-900/20' },
                  ].map(({ icon: Icon, label, value, sub, color }) => (
                    <div key={label} className="rounded-xl p-3 bg-background border border-border">
                      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center mb-2`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-xl font-bold text-foreground">{value}</div>
                      <div className="text-xs text-muted-foreground">{sub}</div>
                    </div>
                  ))}
                </div>

                {/* Learning Progress Chart */}
                <div className="rounded-xl p-4 bg-background border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-sm text-foreground">Learning Hours</h4>
                    <span className="text-xs text-primary font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +20% this month
                    </span>
                  </div>
                  <ResponsiveContainer width="100%" height={140}>
                    <AreaChart data={learningData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#15803D" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#15803D" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} />
                      <YAxis tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.5 }} />
                      <Tooltip
                        contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                        formatter={(v) => [`${v}h`, 'Hours']}
                      />
                      <Area type="monotone" dataKey="hours" stroke="#15803D" strokeWidth={2} fill="url(#colorHours)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Active Courses */}
                <div className="rounded-xl p-4 bg-background border border-border">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Active Courses</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Biodiversity Fundamentals', progress: 65, color: 'bg-green-500' },
                      { name: 'Climate Change & Our Future', progress: 30, color: 'bg-sky-500' },
                      { name: 'Sustainable Living Practices', progress: 85, color: 'bg-amber-500' },
                    ].map((course) => (
                      <div key={course.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground font-medium truncate mr-2">{course.name}</span>
                          <span className="text-muted-foreground flex-shrink-0">{course.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${course.color} transition-all duration-700`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Eco Score */}
                <div className="rounded-xl p-4 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
                  <h4 className="font-semibold text-sm text-white/80 mb-2">Sustainability Score</h4>
                  <div className="flex items-center justify-center py-2">
                    <div className="relative">
                      <ResponsiveContainer width={120} height={120}>
                        <RadialBarChart cx={60} cy={60} innerRadius={35} outerRadius={55} data={ecoScoreData} startAngle={90} endAngle={-270}>
                          <RadialBar dataKey="value" background={{ fill: 'rgba(255,255,255,0.2)' }} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold">78</span>
                        <span className="text-xs text-white/70">/ 100</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-xs text-white/70">Excellent eco-lifestyle!</p>
                </div>

                {/* Recent Badges */}
                <div className="rounded-xl p-4 bg-background border border-border">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Recent Badges</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { emoji: <Sprout className="w-5 h-5 text-green-500" />, name: 'First Steps' },
                      { emoji: '🌳', name: 'Tree Planter' },
                      { emoji: <Bug className="w-5 h-5 text-blue-500" />, name: 'Bird Watcher' },
                      { emoji: '⚡', name: 'Eco Warrior' },
                      { emoji: <Waves className="w-5 h-5 text-cyan-500" />, name: 'Ocean Guardian' },
                      { emoji: '🔬', name: 'Researcher' },
                    ].map((badge) => (
                      <div key={badge.name} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-default" title={badge.name}>
                        <span className="text-xl">{badge.emoji}</span>
                        <span className="text-xs text-muted-foreground text-center leading-tight">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eco Impact */}
                <div className="rounded-xl p-4 bg-background border border-border">
                  <h4 className="font-semibold text-sm text-foreground mb-3">My Eco Impact</h4>
                  <div className="space-y-3 text-sm">
                    {[
                      { label: <span className="flex items-center gap-1"><TreePine className="w-4 h-4 text-green-600" /> Trees Planted</span>, value: '12' },
                      { label: '♻️ CO₂ Saved', value: '340 kg' },
                      { label: <span className="flex items-center gap-1"><Droplet className="w-4 h-4 text-blue-600" /> Water Conserved</span>, value: '1,200 L' },
                      { label: '🦁 Species Identified', value: '47' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-semibold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
