import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, BookOpen, TrendingUp, Star, Plus, Eye, Edit, Trash2,
  MessageSquare, BarChart3, Clock, ChevronRight, CheckCircle, Send, X, Calendar, Image as ImageIcon
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { getMockState, saveMockState, useMockStateListener } from '@/lib/mockState';

// Helper for conditional classes
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// Helper to get valid image URL
const getImageUrl = (url: string | undefined, title: string) => {
  if (url && (url.startsWith('http') || url.startsWith('/'))) return url;
  return `https://picsum.photos/seed/${encodeURIComponent(title)}/200/150`;
};

// Modal component (reusable)
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

const studentEngagement = [
  { week: 'Wk 1', active: 18, completed: 8 },
  { week: 'Wk 2', active: 22, completed: 14 },
  { week: 'Wk 3', active: 19, completed: 11 },
  { week: 'Wk 4', active: 28, completed: 20 },
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(getMockState());
  
  // Modals
  const [createCourseModal, setCreateCourseModal] = useState(false);
  const [scheduleSessionModal, setScheduleSessionModal] = useState(false);
  const [chatStudent, setChatStudent] = useState<any | null>(null);
  const [studentsModalOpen, setStudentsModalOpen] = useState(false);
  const [coursesModalOpen, setCoursesModalOpen] = useState(false);

  // Form states
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Biodiversity');
  const [newCourseLevel, setNewCourseLevel] = useState('beginner');
  const [newCourseDuration, setNewCourseDuration] = useState('6 weeks');
  
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionDate, setNewSessionDate] = useState('');

  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  if (!user) return null;

  // Educator courses (mock)
  const myCourses = state.courses.slice(0, 4);

  const handleDeleteCourse = (courseId: string, title: string) => {
    const updated = state.courses.filter(c => c.id !== courseId);
    saveMockState({ ...state, courses: updated });
    setState({ ...state, courses: updated });
    toast.success(`"${title}" removed from your course library.`);
  };

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const newCourse = {
      id: `c_${Date.now()}`,
      title: newCourseTitle,
      description: `Course on ${newCourseTitle} curated by ${user.name}.`,
      category: newCourseCategory,
      level: newCourseLevel as any,
      duration: newCourseDuration,
      enrolled: 1,
      rating: 5.0,
      instructor: user.name,
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600'
    };

    const updatedCourses = [...state.courses, newCourse];
    const newAction = {
      id: `f_course_${Date.now()}`,
      type: 'Course Review',
      item: `${newCourseTitle} by ${user.name}`,
      time: 'Just now',
      severity: 'normal',
      details: 'New educator course draft submitted for validation.'
    };
    saveMockState({ ...state, courses: updatedCourses, flaggedContent: [newAction, ...state.flaggedContent] });
    setState({ ...state, courses: updatedCourses });
    setNewCourseTitle('');
    setCreateCourseModal(false);
    toast.success('Course created and queued for administration review!');
  };

  const handleScheduleSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionName.trim() || !newSessionDate.trim()) return;

    const newSession = {
      id: `ses_${Date.now()}`,
      name: newSessionName,
      date: newSessionDate,
      students: 0
    };

    const updatedSessions = [...state.sessions, newSession];
    saveMockState({ ...state, sessions: updatedSessions });
    setState({ ...state, sessions: updatedSessions });
    setNewSessionName('');
    setNewSessionDate('');
    setScheduleSessionModal(false);
    toast.success('Live session scheduled successfully!');
  };

  const handleSendReminder = (student: any) => {
    setChatStudent(student);
    setMessageText(`Hi ${student.name.split(' ')[0]}, let's sync up on your ${student.course} assignments. Let me know if you run into any questions!`);
  };

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    toast.success(`Message dispatched to ${chatStudent.name}!`);
    setChatStudent(null);
    setMessageText('');
  };

  const stats = [
    { icon: Users, label: 'Total Students', value: String(state.students.length + 1140), change: 'Syncing live', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
    { icon: BookOpen, label: 'My Live Courses', value: String(myCourses.length), change: '1 draft pending', color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
    { icon: Star, label: 'Average Rating', value: '4.8', change: 'Excellent feedback', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
    { icon: BarChart3, label: 'Completion Rate', value: '74%', change: '+8% vs last month', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Educator Dashboard 🎓</h1>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back, {user.name.split(' ')[0]}. Manage classroom streams and curriculum publications.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="h-9 text-sm border-border text-foreground hover:bg-muted font-medium" onClick={() => setStudentsModalOpen(true)}>
            <Users className="w-4 h-4 mr-2" /> View Student Roster
          </Button>
          <Button className="gradient-primary text-white h-9 text-sm font-semibold" onClick={() => setCreateCourseModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Create Course
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
          {/* Engagement Chart */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Student Engagement (This Month)</h3>
              <span className="text-xs text-muted-foreground">Active vs. Completed</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={studentEngagement} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <YAxis tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.6 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px', color: 'hsl(var(--card-foreground))' }} />
                <Bar dataKey="active" fill="#15803D" name="Active Students" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#0EA5E9" name="Completed Lessons" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Student Progress */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Student Roster Progress</h3>
              <Button variant="ghost" size="sm" className="text-primary text-xs font-semibold" onClick={() => setStudentsModalOpen(true)}>
                View all <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {state.students.slice(0, 4).map(s => (
                <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                    {s.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground truncate">{s.name}</span>
                      <span className={cn(
                        'text-[10px] px-2 py-0.5 rounded-full font-bold capitalize flex-shrink-0',
                        s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      )}>{s.status}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{s.course} · {s.lastActive}</div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground font-semibold">{s.progress}%</span>
                    </div>
                  </div>
                  <button
                    className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => handleSendReminder(s)}
                    title="Send reminder"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Educator Courses */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Course Library</h3>
              <button className="text-xs text-primary hover:underline font-semibold" onClick={() => setCoursesModalOpen(true)}>Manage All</button>
            </div>
            <div className="space-y-3">
              {myCourses.map(c => (
                <div key={c.id} className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-foreground leading-tight">{c.title}</span>
                    <div className="flex gap-1.5">
                      <button onClick={() => handleDeleteCourse(c.id, c.title)} className="p-1 hover:bg-background rounded text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>⭐ {c.rating || 5.0}</span>
                    <span>👥 {(c.enrolled || 1).toLocaleString()} enrolled</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 gradient-primary text-white text-sm h-9 font-semibold" onClick={() => setCreateCourseModal(true)}>
              <Plus className="w-4 h-4 mr-2" /> Create New Course
            </Button>
          </div>

          {/* Live Q&A Sessions */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Live Q&A Sessions
            </h3>
            <div className="space-y-3">
              {state.sessions.map(session => (
                <div key={session.id} className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors cursor-pointer" onClick={() => toast.success(`Opening streaming portal for: ${session.name}`)}>
                  <div className="text-sm font-semibold text-foreground leading-tight">{session.name}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{session.date}</span>
                    <span className="text-xs text-primary font-semibold">{session.students} registered</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 h-9 text-sm border-border text-foreground hover:bg-muted font-semibold" onClick={() => setScheduleSessionModal(true)}>
              <Plus className="w-4 h-4 mr-2" /> Schedule Stream
            </Button>
          </div>
        </div>
      </div>

      {/* ========== MODALS ========== */}

      {/* Student Roster Modal */}
      <Modal isOpen={studentsModalOpen} onClose={() => setStudentsModalOpen(false)} title="Student Roster">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">All students enrolled in your courses</p>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {state.students.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                  {s.name[0]}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.course} · Progress {s.progress}%</div>
                  <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => { handleSendReminder(s); setStudentsModalOpen(false); }}>Message</Button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Courses Management Modal */}
      <Modal isOpen={coursesModalOpen} onClose={() => setCoursesModalOpen(false)} title="Manage Courses">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">All your published courses</p>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {state.courses.map(course => {
              const isMine = course.instructor === user.name;
              return (
                <div key={course.id} className="flex gap-3 items-center p-3 rounded-lg border border-border">
                  <img src={getImageUrl(course.image, course.title)} alt={course.title} className="w-12 h-12 rounded-lg object-cover bg-muted" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">{course.title}</div>
                    <div className="text-xs text-muted-foreground">{course.category} · {course.level}</div>
                    {isMine && <div className="text-[10px] text-primary mt-1">You are the instructor</div>}
                  </div>
                  {isMine && (
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { handleDeleteCourse(course.id, course.title); setCoursesModalOpen(false); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* Message Chat Modal */}
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

      {/* Create Course Modal */}
      {createCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <h3 className="font-bold text-foreground text-lg">Publish Course Curriculum</h3>
              <button onClick={() => setCreateCourseModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCourseSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Course Title</label>
                <Input 
                  placeholder="e.g. Wildlife Preservation 101"
                  value={newCourseTitle}
                  onChange={e => setNewCourseTitle(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Category</label>
                  <select 
                    value={newCourseCategory} 
                    onChange={e => setNewCourseCategory(e.target.value)}
                    className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none font-medium"
                  >
                    <option value="Biodiversity">Biodiversity</option>
                    <option value="Climate">Climate</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Sustainability">Sustainability</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Course Difficulty</label>
                  <select 
                    value={newCourseLevel} 
                    onChange={e => setNewCourseLevel(e.target.value)}
                    className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-3 py-2 outline-none font-medium"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" className="border-border text-foreground" onClick={() => setCreateCourseModal(false)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-white font-semibold">Publish to Review Queue</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Session Modal */}
      {scheduleSessionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <h3 className="font-bold text-foreground text-lg">Schedule Live Q&A Stream</h3>
              <button onClick={() => setScheduleSessionModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleScheduleSessionSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Session Topic Name</label>
                <Input 
                  placeholder="e.g. Q&A on Bird Watching and Habitats"
                  value={newSessionName}
                  onChange={e => setNewSessionName(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Date and Time Description</label>
                <Input 
                  placeholder="e.g. Jun 10, 4PM"
                  value={newSessionDate}
                  onChange={e => setNewSessionDate(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="outline" className="border-border text-foreground" onClick={() => setScheduleSessionModal(false)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-white font-semibold">Schedule Session</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}