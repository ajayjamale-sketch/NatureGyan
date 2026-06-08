import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Leaf, Award, Target, TrendingUp, ChevronRight, Calendar, Play, X, User, Mail, Users, Globe, Image as ImageIcon , TreePine , Droplet , Check , Bug, Cat, Recycle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { getMockState, saveMockState, useMockStateListener } from '@/lib/mockState';
import { RegistrationModal } from '@/components/ui/registration-modal';

const weeklyData = [
  { day: 'Mon', hours: 1.5 }, { day: 'Tue', hours: 2.0 },
  { day: 'Wed', hours: 0.5 }, { day: 'Thu', hours: 3.0 },
  { day: 'Fri', hours: 2.5 }, { day: 'Sat', hours: 4.0 }, { day: 'Sun', hours: 1.0 },
];

const progressData = [
  { month: 'Jan', score: 40 }, { month: 'Feb', score: 52 },
  { month: 'Mar', score: 58 }, { month: 'Apr', score: 65 },
  { month: 'May', score: 72 }, { month: 'Jun', score: 78 },
];

// Helper to get a valid image URL – fallback if course.image is broken
const getImageUrl = (url: string | undefined, title: string) => {
  if (url && (url.startsWith('http') || url.startsWith('/'))) return url;
  // Fallback: use a placeholder service with the course title as seed
  return `https://picsum.photos/seed/${encodeURIComponent(title)}/200/150`;
};

// Modal component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-md w-full max-h-[90vh] bg-card border border-border rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
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



export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(getMockState());
  const [resumingCourse, setResumingCourse] = useState<string | null>(null);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'courses' | 'events' | 'resume' | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showRegForm, setShowRegForm] = useState(false);
  const [regType, setRegType] = useState<'course' | 'event' | 'community'>('course');
  const [regItem, setRegItem] = useState<any>(null);
  const [communityJoined, setCommunityJoined] = useState(false);

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  if (!user) return null;

  // Active courses
  const activeCourses = state.courses
    .filter(c => c.progress !== undefined && c.progress > 0 && c.progress < 100)
    .slice(0, 3);
  const displayCourses = activeCourses.length > 0 ? activeCourses : state.courses.slice(0, 3);
  const registeredEvents = state.events.filter(e => e.registered);

  // State updater
  const updateState = (newState: any) => {
    setState(newState);
    saveMockState(newState);
  };

  // Enroll in a course
  const handleEnroll = (course: any) => {
    if (course.progress !== undefined && course.progress > 0) {
      toast.info('You are already enrolled in this course');
      return;
    }
    setRegType('course');
    setRegItem(course);
    setShowRegForm(true);
  };

  const onEnrollSuccess = () => {
    const updatedCourses = state.courses.map(c => 
      c.id === regItem.id ? { ...c, progress: 0 } : c
    );
    updateState({ ...state, courses: updatedCourses });
  };

  // Register for event
  const handleRegisterEvent = (event: any) => {
    if (event.registered) {
      toast.info('You are already registered for this event');
      return;
    }
    setRegType('event');
    setRegItem(event);
    setShowRegForm(true);
  };

  const onRegisterSuccess = () => {
    const updatedEvents = state.events.map(e => 
      e.id === regItem.id ? { ...e, registered: true } : e
    );
    updateState({ ...state, events: updatedEvents });
  };

  // Join community
  const handleJoinCommunity = () => {
    if (communityJoined) {
      toast.info('You are already a member');
      return;
    }
    setRegType('community');
    setRegItem(null);
    setShowRegForm(true);
  };

  const onCommunityJoinSuccess = () => {
    setCommunityJoined(true);
  };

  // Resume course
  const handleResume = async (course: any) => {
    setResumingCourse(course.id);
    await new Promise(r => setTimeout(r, 600));
    setResumingCourse(null);
    setSelectedCourse(course);
    setModalType('resume');
    setModalOpen(true);
  };

  const continueLesson = () => {
    toast.success(`Continuing "${selectedCourse.title}" - opening lesson...`);
    setModalOpen(false);
  };

  // Open browse modals
  const openCoursesModal = () => {
    setModalType('courses');
    setModalOpen(true);
  };

  const openEventsModal = () => {
    setModalType('events');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setSelectedCourse(null);
  };

  const stats = [
    { icon: BookOpen, label: 'Courses Completed', value: String(user.coursesCompleted || 0), change: 'Tracked live', color: 'text-primary bg-primary/10 dark:bg-primary/30' },
    { icon: Leaf, label: 'Eco Points', value: user.ecoPoints.toLocaleString(), change: 'Rank #42', color: 'text-primary bg-primary/10 dark:bg-primary/30' },
    { icon: Award, label: 'Badges Earned', value: String(user.badges?.length || 0), change: 'Level 3 Naturalist', color: 'text-secondary bg-secondary/10 dark:bg-secondary/30' },
    { icon: Target, label: 'Nature Observations', value: String(state.sightings.length), change: 'Logged in DB', color: 'text-accent bg-accent/10 dark:bg-accent/30' },
  ];

  const recentActivity = [
    { icon: <BookOpen className="w-4 h-4 text-primary" />, text: 'Enrolled in Ecology & Biodiversity fundamentals', time: 'Active now' },
    { icon: <Bug className="w-4 h-4 text-blue-500" />, text: `Logged ${state.sightings.length} species sightings`, time: 'Updated live' },
    { icon: <TreePine className="w-4 h-4 text-primary" />, text: communityJoined ? 'You joined the Eco Challenge Network' : 'Join the Eco Challenge Network', time: communityJoined ? 'Just now' : '1 day ago', action: !communityJoined ? handleJoinCommunity : undefined },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">Welcome back, {user.name.split(' ')[0]}! <Leaf className="w-6 h-6 text-primary" /></h1>
          <p className="text-muted-foreground mt-1 text-sm">You have {activeCourses.length} active courses and {registeredEvents.length} registered events.</p>
        </div>
        <Button className="gradient-primary text-white hidden sm:flex gap-2 shrink-0 font-semibold" onClick={openCoursesModal}>
          <BookOpen className="w-4 h-4" /> Browse Courses
        </Button>
      </div>

      {/* Stats Grid */}
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
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Learning Hours This Week</h3>
              <span className="text-xs text-primary bg-primary/10 rounded-full px-3 py-1 font-semibold">14.5 hrs total</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weeklyData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <YAxis tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px', color: 'hsl(var(--card-foreground))' }} formatter={(v) => [`${v}h`, 'Hours']} />
                <Bar dataKey="hours" fill="#15803D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Active Courses */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Continue Learning</h3>
              <Button variant="ghost" size="sm" className="text-primary text-xs font-semibold" onClick={openCoursesModal}>
                All courses <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {displayCourses.map(course => {
                const progress = course.progress !== undefined ? course.progress : 0;
                const imgSrc = getImageUrl(course.image, course.title);
                return (
                  <div key={course.id} className="flex gap-3 items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <img 
                      src={imgSrc} 
                      alt={course.title} 
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-muted"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/fallback/200/150'; }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">{course.title}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0 font-semibold">{progress}%</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-shrink-0 h-8 text-xs border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors font-semibold"
                      disabled={resumingCourse === course.id}
                      onClick={() => handleResume(course)}
                    >
                      {resumingCourse === course.id ? '...' : <><Play className="w-3 h-3 mr-1" />Resume</>}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-2">
              {recentActivity.map((activity, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${activity.action ? 'hover:bg-muted/50 cursor-pointer' : 'hover:bg-muted/50'}`}
                  onClick={() => activity.action ? activity.action() : toast.info(activity.text)}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-tight">{activity.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                  {activity.action && !communityJoined && (
                    <Button size="sm" variant="ghost" className="text-primary text-xs" onClick={(e) => { e.stopPropagation(); activity.action(); }}>Join</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Eco Score */}
          <div className="rounded-xl p-5 gradient-primary text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-white/90">Sustainability Score</h3>
              <span className="text-xs bg-white/20 rounded-full px-2.5 py-0.5 text-white font-semibold">This Month</span>
            </div>
            <div className="text-5xl font-bold text-white mb-1">78</div>
            <div className="text-sm text-white/70 mb-4 font-medium">/ 100 — Excellent!</div>
            <div className="space-y-2">
              {[{ label: 'Learning', value: 85 }, { label: 'Eco Actions', value: 72 }, { label: 'Community', value: 68 }].map(({ label, value }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs text-white/70 mb-1"><span>{label}</span><span>{value}%</span></div>
                  <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Chart */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground text-sm mb-3">Score Progress</h3>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={progressData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#15803D" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#15803D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }} />
                <YAxis tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '11px', color: 'hsl(var(--card-foreground))' }} />
                <Area type="monotone" dataKey="score" stroke="#15803D" strokeWidth={2} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Eco Impact */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">My Eco Impact</h3>
            <div className="space-y-3">
              {[
                { emoji: <TreePine className="w-8 h-8 text-primary" />, label: 'Trees Planted', value: '12' },
                { emoji: <Recycle />, label: 'CO₂ Saved', value: '340 kg' },
                { emoji: <Droplet className="w-8 h-8 text-blue-500" />, label: 'Water Conserved', value: '1,200 L' },
                { emoji: <Cat className="w-8 h-8 text-red-500" />, label: 'Species Identified', value: String(state.sightings.length) },
              ].map(({ emoji, label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{emoji}</span>
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Events */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Registered Events
            </h3>
            <div className="space-y-3">
              {registeredEvents.map(event => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={openEventsModal}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary leading-none">{event.date.split(' ')[1]}</span>
                    <span className="text-[10px] text-primary/70">{event.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{event.name}</div>
                    <div className="text-xs text-muted-foreground">{event.location} · {event.time}</div>
                  </div>
                </div>
              ))}
              {registeredEvents.length === 0 && (
                <div className="text-center py-4 text-xs text-muted-foreground">
                  No registered events.{' '}
                  <button className="text-primary hover:underline font-semibold" onClick={openEventsModal}>
                    Find events
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Community Card */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Eco Community
            </h3>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-foreground">Join our global network of changemakers</p>
                <p className="text-xs text-muted-foreground">Connect, share, and grow together</p>
              </div>
              <Button 
                variant={communityJoined ? "ghost" : "default"} 
                className={communityJoined ? "text-muted-foreground" : "gradient-primary text-white"}
                onClick={handleJoinCommunity}
                disabled={communityJoined}
              >
                {communityJoined ? 'Member' : 'Join Now'}
              </Button>
            </div>
            {communityJoined && (
              <div className="mt-3 pt-3 border-t border-border text-xs text-primary flex items-center gap-1">
                <Globe className="w-3 h-3" /> You're part of 12,345 members worldwide
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {/* Courses Modal */}
      <Modal isOpen={modalOpen && modalType === 'courses'} onClose={closeModal} title="All Courses">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-3">Browse and enroll in new courses</p>
          <div className="grid gap-4">
            {state.courses.map(course => {
              const isEnrolled = course.progress !== undefined && course.progress > 0;
              const imgSrc = getImageUrl(course.image, course.title);
              return (
                <div key={course.id} className="flex gap-3 items-center p-2 rounded-lg border border-border">
                  <img 
                    src={imgSrc} 
                    alt={course.title} 
                    className="w-12 h-12 rounded-lg object-cover bg-muted"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/fallback/200/150'; }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">{course.title}</div>
                    <div className="text-xs text-muted-foreground">{course.category}</div>
                    {isEnrolled && (
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{course.progress}%</span>
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant={isEnrolled ? "ghost" : "default"}
                    className={isEnrolled ? "text-muted-foreground" : "gradient-primary text-white"}
                    onClick={() => {
                      if (isEnrolled) {
                        toast.info('You are already enrolled');
                      } else {
                        handleEnroll(course);
                        closeModal();
                      }
                    }}
                  >
                    {isEnrolled ? 'Enrolled' : 'Enroll'}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* Events Modal */}
      <Modal isOpen={modalOpen && modalType === 'events'} onClose={closeModal} title="Upcoming Events">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Join local sustainability events and earn Eco Points</p>
          <div className="grid gap-3">
            {state.events.map(event => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-primary">{event.date.split(' ')[1]}</span>
                  <span className="text-[10px] text-primary/70">{event.date.split(' ')[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{event.name}</div>
                  <div className="text-xs text-muted-foreground">{event.location} · {event.time}</div>
                  <div className="text-xs mt-1 text-primary">{event.registered ? <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Registered</span> : 'Available'}</div>
                </div>
                <Button
                  size="sm"
                  variant={event.registered ? "ghost" : "outline"}
                  className="text-xs"
                  disabled={event.registered}
                  onClick={() => {
                    if (!event.registered) {
                      handleRegisterEvent(event);
                      closeModal();
                    }
                  }}
                >
                  {event.registered ? 'Registered' : 'Join'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Resume Modal */}
      <Modal isOpen={modalOpen && modalType === 'resume' && selectedCourse} onClose={closeModal} title={`Resume: ${selectedCourse?.title}`}>
        <div className="space-y-4">
          <img 
            src={getImageUrl(selectedCourse?.image, selectedCourse?.title)} 
            alt={selectedCourse?.title} 
            className="w-full h-32 object-cover rounded-lg bg-muted"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/fallback/200/150'; }}
          />
          <div className="space-y-2">
            <p className="text-sm text-foreground">Continue where you left off (Lesson 4: Ecosystem Interactions)</p>
            <div className="bg-muted/50 rounded-lg p-3 text-sm">
              <p className="font-medium flex items-center gap-1"><Target className="w-4 h-4" /> Learning Objective:</p>
              <p className="text-muted-foreground">Understand how energy flows through different trophic levels in a forest ecosystem.</p>
            </div>
            <Button className="w-full gradient-primary text-white" onClick={continueLesson}>
              <Play className="w-4 h-4 mr-2" /> Continue Learning
            </Button>
          </div>
        </div>
      </Modal>

      {/* Registration Form Modal - handles courses, events, community */}
      <RegistrationModal
        isOpen={showRegForm}
        onClose={() => setShowRegForm(false)}
        type={regType}
        item={regItem}
        onSuccess={regType === 'course' ? onEnrollSuccess : regType === 'event' ? onRegisterSuccess : onCommunityJoinSuccess}
      />
    </div>
  );
}