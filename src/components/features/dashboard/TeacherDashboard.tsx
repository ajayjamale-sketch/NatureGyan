import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, BookOpen, TrendingUp, Star, Plus, Eye, Edit, Trash2,
  MessageSquare, BarChart3, Clock, ChevronRight, CheckCircle, Send, X, Calendar, Image as ImageIcon,
  FileText, ClipboardList, Megaphone, Award, GradingIcon
, GraduationCap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { getMockState, saveMockState, useMockStateListener } from '@/lib/mockState';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const getImageUrl = (url: string | undefined, title: string) => {
  if (url && (url.startsWith('http') || url.startsWith('/'))) return url;
  return `https://picsum.photos/seed/${encodeURIComponent(title)}/200/150`;
};

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

// Types for new features
type Assignment = {
  id: string;
  title: string;
  courseId: string;
  dueDate: string;
  submissions: {
    studentId: string;
    grade?: number;
    feedback?: string;
    submittedAt: string;
  }[];
};

type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export default function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(getMockState());
  
  // New local state for teacher-specific data
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('teacher_assignments');
    return saved ? JSON.parse(saved) : [];
  });
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('teacher_announcements');
    return saved ? JSON.parse(saved) : [
      { id: 'ann1', title: 'Welcome to the new semester!', content: 'Please check the updated syllabus.', date: '2025-03-01' }
    ];
  });

  // Modals
  const [createCourseModal, setCreateCourseModal] = useState(false);
  const [scheduleSessionModal, setScheduleSessionModal] = useState(false);
  const [chatStudent, setChatStudent] = useState<any | null>(null);
  const [studentsModalOpen, setStudentsModalOpen] = useState(false);
  const [coursesModalOpen, setCoursesModalOpen] = useState(false);
  
  // New modals
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedStudentForGrade, setSelectedStudentForGrade] = useState<{ student: any; assignment: Assignment } | null>(null);
  const [gradeValue, setGradeValue] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  const [studentReportModalOpen, setStudentReportModalOpen] = useState(false);
  const [selectedStudentReport, setSelectedStudentReport] = useState<any>(null);

  // Form states for Courses
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Biodiversity');
  const [newCourseLevel, setNewCourseLevel] = useState('beginner');
  const [newCourseDuration, setNewCourseDuration] = useState('6 weeks');
  
  // Form states for Sessions
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionDate, setNewSessionDate] = useState('');

  // New assignment form state
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentCourseId, setNewAssignmentCourseId] = useState('');
  const [newAssignmentDueDate, setNewAssignmentDueDate] = useState('');

  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    return useMockStateListener(() => setState(getMockState()));
  }, []);

  // Persist assignments & announcements to localStorage
  useEffect(() => {
    localStorage.setItem('teacher_assignments', JSON.stringify(assignments));
  }, [assignments]);
  useEffect(() => {
    localStorage.setItem('teacher_announcements', JSON.stringify(announcements));
  }, [announcements]);

  if (!user) return null;

  const myCourses = state.courses.slice(0, 4);

  // ---- Existing handlers (courses, sessions, messages) ----
  const handleDeleteCourse = (courseId: string, title: string) => {
    const updated = state.courses.filter(c => c.id !== courseId);
    saveMockState({ ...state, courses: updated });
    setState({ ...state, courses: updated });
    toast.success(`"${title}" removed from your course library.`);
  };

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    let updatedCourses = [...state.courses];
    if (editingCourseId) {
      updatedCourses = updatedCourses.map(c => c.id === editingCourseId ? { ...c, title: newCourseTitle, category: newCourseCategory, level: newCourseLevel as any, duration: newCourseDuration } : c);
      toast.success('Course updated successfully!');
    } else {
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
      updatedCourses = [...updatedCourses, newCourse];
      const newAction = {
        id: `f_course_${Date.now()}`,
        type: 'Course Review',
        item: `${newCourseTitle} by ${user.name}`,
        time: 'Just now',
        severity: 'normal',
        details: 'New educator course draft submitted for validation.'
      };
      saveMockState({ ...state, courses: updatedCourses, flaggedContent: [newAction, ...state.flaggedContent] });
      toast.success('Course created and queued for administration review!');
    }
    saveMockState({ ...state, courses: updatedCourses });
    setState({ ...state, courses: updatedCourses });
    setNewCourseTitle('');
    setEditingCourseId(null);
    setCreateCourseModal(false);
  };

  const openEditCourse = (course: any) => {
    setEditingCourseId(course.id);
    setNewCourseTitle(course.title);
    setNewCourseCategory(course.category || 'Biodiversity');
    setNewCourseLevel(course.level || 'beginner');
    setNewCourseDuration(course.duration || '6 weeks');
    setCreateCourseModal(true);
  };

  const openCreateCourse = () => {
    setEditingCourseId(null);
    setNewCourseTitle('');
    setNewCourseCategory('Biodiversity');
    setNewCourseLevel('beginner');
    setNewCourseDuration('6 weeks');
    setCreateCourseModal(true);
  };

  const handleScheduleSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionName.trim() || !newSessionDate.trim()) return;

    let updatedSessions = [...state.sessions];
    if (editingSessionId) {
      updatedSessions = updatedSessions.map(s => s.id === editingSessionId ? { ...s, name: newSessionName, date: newSessionDate } : s);
      toast.success('Session updated successfully!');
    } else {
      const newSession = { id: `ses_${Date.now()}`, name: newSessionName, date: newSessionDate, students: 0 };
      updatedSessions = [...updatedSessions, newSession];
      toast.success('Live session scheduled successfully!');
    }
    saveMockState({ ...state, sessions: updatedSessions });
    setState({ ...state, sessions: updatedSessions });
    setNewSessionName('');
    setNewSessionDate('');
    setEditingSessionId(null);
    setScheduleSessionModal(false);
  };

  const openEditSession = (session: any) => {
    setEditingSessionId(session.id);
    setNewSessionName(session.name);
    setNewSessionDate(session.date);
    setScheduleSessionModal(true);
  };

  const openCreateSession = () => {
    setEditingSessionId(null);
    setNewSessionName('');
    setNewSessionDate('');
    setScheduleSessionModal(true);
  };

  const handleDeleteSession = (id: string, name: string) => {
    const updated = state.sessions.filter(s => s.id !== id);
    saveMockState({ ...state, sessions: updated });
    setState({ ...state, sessions: updated });
    toast.success(`Session "${name}" has been cancelled.`);
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

  // ----- New Assignment Handlers -----
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignmentTitle.trim() || !newAssignmentCourseId) return;
    const newAssignment: Assignment = {
      id: `assign_${Date.now()}`,
      title: newAssignmentTitle,
      courseId: newAssignmentCourseId,
      dueDate: newAssignmentDueDate,
      submissions: []
    };
    setAssignments(prev => [...prev, newAssignment]);
    toast.success(`Assignment "${newAssignmentTitle}" created!`);
    setNewAssignmentTitle('');
    setNewAssignmentCourseId('');
    setNewAssignmentDueDate('');
    setAssignmentModalOpen(false);
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
    toast.success('Assignment removed');
  };

  const openGradeModal = (assignment: Assignment, student: any) => {
    setSelectedStudentForGrade({ student, assignment });
    const existing = assignment.submissions.find(s => s.studentId === student.id);
    setGradeValue(existing?.grade?.toString() || '');
    setFeedbackText(existing?.feedback || '');
    setGradeModalOpen(true);
  };

  const submitGrade = () => {
    if (!selectedStudentForGrade) return;
    const { student, assignment } = selectedStudentForGrade;
    const gradeNum = parseFloat(gradeValue);
    if (isNaN(gradeNum)) {
      toast.error('Please enter a valid number');
      return;
    }
    setAssignments(prev => prev.map(a => {
      if (a.id === assignment.id) {
        const existingSub = a.submissions.find(s => s.studentId === student.id);
        if (existingSub) {
          existingSub.grade = gradeNum;
          existingSub.feedback = feedbackText;
        } else {
          a.submissions.push({
            studentId: student.id,
            grade: gradeNum,
            feedback: feedbackText,
            submittedAt: new Date().toISOString()
          });
        }
      }
      return a;
    }));
    toast.success(`Grade ${gradeNum} saved for ${student.name}`);
    setGradeModalOpen(false);
    setSelectedStudentForGrade(null);
  };

  // ----- Announcements -----
  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementTitle.trim() || !newAnnouncementContent.trim()) return;
    const newAnn: Announcement = {
      id: `ann_${Date.now()}`,
      title: newAnnouncementTitle,
      content: newAnnouncementContent,
      date: new Date().toLocaleDateString()
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    toast.success('Announcement posted!');
    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setAnnouncementModalOpen(false);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    toast.success('Announcement deleted');
  };

  // ----- Student Report (average grade, assignment completion) -----
  const getStudentReport = (student: any) => {
    const studentAssignments = assignments.filter(a => {
      const course = state.courses.find(c => c.title === student.course);
      return course && a.courseId === course.id;
    });
    const grades = studentAssignments.flatMap(a => a.submissions.filter(s => s.studentId === student.id).map(s => s.grade || 0));
    const avgGrade = grades.length ? (grades.reduce((a,b) => a+b,0) / grades.length).toFixed(1) : 'N/A';
    const completedAssignments = studentAssignments.filter(a => a.submissions.some(s => s.studentId === student.id)).length;
    return { avgGrade, completedAssignments, totalAssignments: studentAssignments.length };
  };

  const stats = [
    { icon: Users, label: 'Total Students', value: String(state.students.length + 1140), change: 'Syncing live', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
    { icon: BookOpen, label: 'My Live Courses', value: String(myCourses.length), change: '1 draft pending', color: 'text-primary bg-primary/10 dark:bg-primary/30' },
    { icon: Star, label: 'Average Rating', value: '4.8', change: 'Excellent feedback', color: 'text-secondary bg-secondary/10 dark:bg-secondary/30' },
    { icon: BarChart3, label: 'Completion Rate', value: '74%', change: '+8% vs last month', color: 'text-primary bg-primary/10 dark:bg-primary/30' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome and top bar */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">Educator Dashboard <GraduationCap className="w-6 h-6 text-primary" /></h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage classroom streams, assignments, announcements, and grading.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="h-9 text-sm border-border text-foreground hover:bg-muted font-medium" onClick={() => setStudentsModalOpen(true)}>
            <Users className="w-4 h-4 mr-2" /> Student Roster
          </Button>
          <Button className="gradient-primary text-white h-9 text-sm font-semibold" onClick={() => openCreateCourse()}>
            <Plus className="w-4 h-4 mr-2" /> Create Course
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
              {state.students.slice(0, 4).map(s => {
                const report = getStudentReport(s);
                return (
                  <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                      {s.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground truncate">{s.name}</span>
                        <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-bold capitalize', s.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary')}>{s.status}</span>
                        {report.avgGrade !== 'N/A' && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">⭐ Avg: {report.avgGrade}</span>}
                      </div>
                      <div className="text-xs text-muted-foreground">{s.course} · {s.lastActive}</div>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground font-semibold">{s.progress}%</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" onClick={() => handleSendReminder(s)} title="Send reminder">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" onClick={() => { setSelectedStudentReport(s); setStudentReportModalOpen(true); }} title="View report">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assignments Section (NEW) */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2"><ClipboardList className="w-4 h-4 text-primary" /> Assignments & Grading</h3>
              <Button size="sm" className="h-8 text-xs" onClick={() => setAssignmentModalOpen(true)}><Plus className="w-3 h-3 mr-1" /> Create Assignment</Button>
            </div>
            {assignments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No assignments yet. Click "Create Assignment" to start.</p>
            ) : (
              <div className="space-y-3">
                {assignments.map(ass => {
                  const course = state.courses.find(c => c.id === ass.courseId);
                  const submissionsCount = ass.submissions.length;
                  const gradedCount = ass.submissions.filter(s => s.grade !== undefined).length;
                  return (
                    <div key={ass.id} className="p-3 rounded-lg border border-border hover:bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-foreground">{ass.title}</div>
                          <div className="text-xs text-muted-foreground">{course?.title || 'Unknown Course'} · Due: {ass.dueDate || 'No date'}</div>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => handleDeleteAssignment(ass.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-xs">
                        <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> Submissions: {submissionsCount} submitted</span>
                        <span>✅ Graded: {gradedCount}</span>
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setSelectedAssignment(ass)}>View Submissions</Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Course Library (unchanged but extended) */}
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
                      <button onClick={() => openEditCourse(c)} className="p-1 hover:bg-background rounded text-muted-foreground hover:text-primary"><Edit className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDeleteCourse(c.id, c.title)} className="p-1 hover:bg-background rounded text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>⭐ {c.rating || 5.0}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {(c.enrolled || 1).toLocaleString()} enrolled</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 gradient-primary text-white text-sm h-9 font-semibold" onClick={() => openCreateCourse()}><Plus className="w-4 h-4 mr-2" /> Create New Course</Button>
          </div>

          {/* Live Q&A Sessions (unchanged) */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Live Q&A Sessions</h3>
            <div className="space-y-3">
              {state.sessions.map(session => (
                <div key={session.id} className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-semibold">{session.name}</div>
                    <div className="flex gap-1">
                      <button onClick={() => openEditSession(session)} className="p-1 hover:bg-background rounded"><Edit className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDeleteSession(session.id, session.name)} className="p-1 hover:bg-background rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{session.date}</span>
                    <span className="text-primary font-semibold">{session.students} registered</span>
                  </div>
                  <Button size="sm" className="w-full h-7 text-xs gradient-primary text-white" onClick={() => toast.success(`Opening streaming portal for: ${session.name}`)}>Go Live</Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 h-9 text-sm" onClick={() => openCreateSession()}><Plus className="w-4 h-4 mr-2" /> Schedule Stream</Button>
          </div>

          {/* Announcements (NEW) */}
          <div className="rounded-xl p-5 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2"><Megaphone className="w-4 h-4 text-primary" /> Announcements</h3>
              <Button size="sm" className="h-8 text-xs" onClick={() => setAnnouncementModalOpen(true)}><Plus className="w-3 h-3 mr-1" /> Post</Button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {announcements.map(ann => (
                <div key={ann.id} className="p-2 border-b border-border last:border-0">
                  <div className="flex justify-between">
                    <div className="font-semibold text-sm">{ann.title}</div>
                    <button onClick={() => handleDeleteAnnouncement(ann.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{ann.content}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{ann.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== MODALS ========== */}

      {/* Student Roster Modal (enhanced with grades and report) */}
      <Modal isOpen={studentsModalOpen} onClose={() => setStudentsModalOpen(false)} title="Student Roster">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">All students enrolled in your courses</p>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {state.students.map(s => {
              const report = getStudentReport(s);
              return (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">{s.name[0]}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.course} · Progress {s.progress}%</div>
                    <div className="text-xs text-primary">Avg Grade: {report.avgGrade !== 'N/A' ? report.avgGrade : 'Not graded'} ({report.completedAssignments}/{report.totalAssignments} assignments)</div>
                    <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} /></div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => { handleSendReminder(s); setStudentsModalOpen(false); }}>Message</Button>
                    <Button size="sm" variant="ghost" onClick={() => { setSelectedStudentReport(s); setStudentReportModalOpen(true); setStudentsModalOpen(false); }}>Report</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* Courses Management Modal (unchanged) */}
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
                  {isMine && <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { handleDeleteCourse(course.id, course.title); setCoursesModalOpen(false); }}><Trash2 className="w-4 h-4" /></Button>}
                </div>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* Assignment Submissions Modal */}
      <Modal isOpen={!!selectedAssignment} onClose={() => setSelectedAssignment(null)} title={`Submissions: ${selectedAssignment?.title}`}>
        <div className="space-y-3">
          {selectedAssignment && state.students.map(student => {
            const submission = selectedAssignment.submissions.find(s => s.studentId === student.id);
            return (
              <div key={student.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-xs text-muted-foreground">{submission ? `Submitted: ${new Date(submission.submittedAt).toLocaleDateString()}` : 'Not submitted'}</div>
                  {submission?.grade !== undefined && <div className="text-sm text-primary">Grade: {submission.grade}</div>}
                </div>
                <Button size="sm" onClick={() => { openGradeModal(selectedAssignment, student); setSelectedAssignment(null); }}>Grade / Edit</Button>
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Grade Modal */}
      <Modal isOpen={gradeModalOpen} onClose={() => setGradeModalOpen(false)} title="Grade Assignment">
        {selectedStudentForGrade && (
          <div className="space-y-4">
            <p><strong>Student:</strong> {selectedStudentForGrade.student.name}</p>
            <p><strong>Assignment:</strong> {selectedStudentForGrade.assignment.title}</p>
            <div>
              <label className="text-xs font-semibold">Grade (0-100)</label>
              <Input type="number" value={gradeValue} onChange={e => setGradeValue(e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold">Feedback</label>
              <textarea value={feedbackText} onChange={e => setFeedbackText(e.target.value)} className="w-full border border-border rounded-md p-2 mt-1 text-sm" rows={3} />
            </div>
            <Button onClick={submitGrade} className="w-full gradient-primary text-white">Save Grade</Button>
          </div>
        )}
      </Modal>

      {/* Create Assignment Modal */}
      <Modal isOpen={assignmentModalOpen} onClose={() => setAssignmentModalOpen(false)} title="Create New Assignment">
        <form onSubmit={handleCreateAssignment} className="space-y-4">
          <div>
            <label className="text-xs font-semibold">Assignment Title</label>
            <Input value={newAssignmentTitle} onChange={e => setNewAssignmentTitle(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-semibold">Course</label>
            <select value={newAssignmentCourseId} onChange={e => setNewAssignmentCourseId(e.target.value)} className="w-full border border-border rounded-md p-2" required>
              <option value="">Select course</option>
              {state.courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold">Due Date</label>
            <Input type="date" value={newAssignmentDueDate} onChange={e => setNewAssignmentDueDate(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setAssignmentModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="gradient-primary text-white">Create</Button>
          </div>
        </form>
      </Modal>

      {/* Announcement Modal */}
      <Modal isOpen={announcementModalOpen} onClose={() => setAnnouncementModalOpen(false)} title="Post Announcement">
        <form onSubmit={handlePostAnnouncement} className="space-y-4">
          <div><label className="text-xs font-semibold">Title</label><Input value={newAnnouncementTitle} onChange={e => setNewAnnouncementTitle(e.target.value)} required /></div>
          <div><label className="text-xs font-semibold">Content</label><textarea value={newAnnouncementContent} onChange={e => setNewAnnouncementContent(e.target.value)} className="w-full border border-border rounded-md p-2" rows={4} required /></div>
          <div className="flex justify-end gap-2"><Button variant="outline" type="button" onClick={() => setAnnouncementModalOpen(false)}>Cancel</Button><Button type="submit" className="gradient-primary text-white">Post</Button></div>
        </form>
      </Modal>

      {/* Student Report Modal */}
      <Modal isOpen={studentReportModalOpen} onClose={() => setStudentReportModalOpen(false)} title={`Student Report: ${selectedStudentReport?.name}`}>
        {selectedStudentReport && (
          <div className="space-y-3">
            <p><strong>Course:</strong> {selectedStudentReport.course}</p>
            <p><strong>Progress:</strong> {selectedStudentReport.progress}%</p>
            <p><strong>Last Active:</strong> {selectedStudentReport.lastActive}</p>
            <div className="border-t pt-2">
              <h4 className="font-semibold">Assignment Performance</h4>
              {assignments.filter(a => state.courses.find(c => c.id === a.courseId && c.title === selectedStudentReport.course)).map(ass => {
                const sub = ass.submissions.find(s => s.studentId === selectedStudentReport.id);
                return (
                  <div key={ass.id} className="flex justify-between text-sm py-1">
                    <span>{ass.title}</span>
                    <span>{sub?.grade !== undefined ? `Grade: ${sub.grade}` : 'Not graded'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Modal>

      {/* Existing Chat Modal */}
      {chatStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b flex justify-between"><h3 className="font-bold">Send Message to {chatStudent.name}</h3><button onClick={() => setChatStudent(null)}><X className="w-5 h-5" /></button></div>
            <form onSubmit={handleSendMessageSubmit} className="p-5 space-y-4">
              <textarea value={messageText} onChange={e => setMessageText(e.target.value)} className="w-full border border-border rounded-lg p-3 h-28" required />
              <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setChatStudent(null)}>Cancel</Button><Button type="submit" className="gradient-primary text-white">Send</Button></div>
            </form>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {createCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <h3 className="font-bold text-foreground text-lg">{editingCourseId ? 'Edit Course Details' : 'Publish Course Curriculum'}</h3>
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
                <Button type="submit" className="gradient-primary text-white font-semibold">{editingCourseId ? 'Save Changes' : 'Publish to Review Queue'}</Button>
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
              <h3 className="font-bold text-foreground text-lg">{editingSessionId ? 'Edit Session' : 'Schedule Live Q&A Stream'}</h3>
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
                <Button type="submit" className="gradient-primary text-white font-semibold">{editingSessionId ? 'Save Changes' : 'Schedule Session'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}