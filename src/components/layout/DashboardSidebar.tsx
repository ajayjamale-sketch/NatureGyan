import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Brain, Globe, Leaf, Users,
  Trophy, BarChart3, FileText, Calendar, User, Settings,
  LogOut, ChevronLeft, ChevronRight,
  GraduationCap, FlaskConical, Camera, TreePine, Shield,
  Megaphone, Star, Activity, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import logoImg from '@/assets/logo.jpg';

const BASE_NAV = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
];

const STUDENT_NAV = [
  { icon: BookOpen, label: 'My Courses', href: '/dashboard/courses' },
  { icon: Brain, label: 'AI Assistant', href: '/dashboard/ai' },
  { icon: Globe, label: 'Biodiversity', href: '/dashboard/biodiversity' },
  { icon: Leaf, label: 'Sustainability', href: '/dashboard/sustainability' },
  { icon: Trophy, label: 'Eco-Challenges', href: '/dashboard/challenges' },
  { icon: Users, label: 'Community', href: '/dashboard/community' },
  { icon: FileText, label: 'Research', href: '/dashboard/research' },
  { icon: Calendar, label: 'Events', href: '/dashboard/events' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
];

const TEACHER_NAV = [
  { icon: GraduationCap, label: 'My Courses', href: '/dashboard/courses' },
  { icon: Users, label: 'My Students', href: '/dashboard/students' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Calendar, label: 'Sessions', href: '/dashboard/events' },
  { icon: Brain, label: 'AI Assistant', href: '/dashboard/ai' },
  { icon: Trophy, label: 'Eco-Challenges', href: '/dashboard/challenges' },
  { icon: Users, label: 'Community', href: '/dashboard/community' },
];

const RESEARCHER_NAV = [
  { icon: FlaskConical, label: 'My Research', href: '/dashboard/research' },
  { icon: FileText, label: 'Publications', href: '/dashboard/publications' },
  { icon: Users, label: 'Collaborators', href: '/dashboard/community' },
  { icon: Globe, label: 'Biodiversity Data', href: '/dashboard/biodiversity' },
  { icon: Brain, label: 'AI Assistant', href: '/dashboard/ai' },
  { icon: Calendar, label: 'Events', href: '/dashboard/events' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
];

const ENTHUSIAST_NAV = [
  { icon: Camera, label: 'My Sightings', href: '/dashboard/sightings' },
  { icon: Globe, label: 'Species Explorer', href: '/dashboard/biodiversity' },
  { icon: Brain, label: 'AI Identifier', href: '/dashboard/ai' },
  { icon: Trophy, label: 'Eco-Challenges', href: '/dashboard/challenges' },
  { icon: Users, label: 'Citizen Science', href: '/dashboard/community' },
  { icon: Calendar, label: 'Events', href: '/dashboard/events' },
  { icon: BarChart3, label: 'My Stats', href: '/dashboard/analytics' },
];

const NGO_NAV = [
  { icon: Megaphone, label: 'Campaigns', href: '/dashboard/campaigns' },
  { icon: Users, label: 'Volunteers', href: '/dashboard/volunteers' },
  { icon: TreePine, label: 'Eco Impact', href: '/dashboard/impact' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Calendar, label: 'Events', href: '/dashboard/events' },
  { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
  { icon: Users, label: 'Community', href: '/dashboard/community' },
];

const ADMIN_NAV = [
  { icon: Users, label: 'User Management', href: '/dashboard/users' },
  { icon: BookOpen, label: 'Course Management', href: '/dashboard/courses' },
  { icon: FileText, label: 'Content Review', href: '/dashboard/content' },
  { icon: Shield, label: 'Moderation', href: '/dashboard/moderation' },
  { icon: Megaphone, label: 'Campaigns', href: '/dashboard/campaigns' },
  { icon: Calendar, label: 'Events', href: '/dashboard/events' },
  { icon: Activity, label: 'Platform Analytics', href: '/dashboard/analytics' },
  { icon: Star, label: 'System Status', href: '/dashboard/system' },
];

function getRoleNav(role?: string) {
  switch (role) {
    case 'teacher': return TEACHER_NAV;
    case 'researcher': return RESEARCHER_NAV;
    case 'enthusiast': return ENTHUSIAST_NAV;
    case 'ngo': return NGO_NAV;
    case 'admin': return ADMIN_NAV;
    default: return STUDENT_NAV;
  }
}

const ROLE_LABELS: Record<string, string> = {
  student: 'Student',
  teacher: 'Educator',
  researcher: 'Researcher',
  enthusiast: 'Nature Enthusiast',
  ngo: 'NGO / Org',
  admin: 'Administrator',
};

const ROLE_COLORS: Record<string, string> = {
  student: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  teacher: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  researcher: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  enthusiast: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  ngo: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
  admin: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

interface DashboardSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function DashboardSidebar({ mobileOpen, onMobileClose }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Signed out successfully');
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const roleNav = getRoleNav(user?.role);
  const allNav = [...BASE_NAV, ...roleNav];

  const handleNavClick = (href: string) => {
    onMobileClose();
    navigate(href);
  };

  const sidebarContent = (
    <div className={cn('flex flex-col h-full transition-all duration-300 bg-sidebar', collapsed ? 'w-16' : 'w-64')}>
      {/* Logo */}
      <div className={cn('flex items-center gap-2 px-3 border-b border-sidebar-border h-16', collapsed ? 'justify-center' : 'px-4')}>
        <Link to="/" className="flex items-center gap-2.5 group" onClick={onMobileClose}>
          <img
            src={logoImg}
            alt="NatureGyan Logo"
            className="w-9 h-9 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
          />
          {!collapsed && (
            <div className="leading-tight">
              <span className="font-bold text-base text-sidebar-foreground block leading-none">
                <span className="text-primary">Nature</span>Gyan
              </span>
              <span className="text-[10px] text-muted-foreground leading-none">AI for Nature Learning</span>
            </div>
          )}
        </Link>
        {/* Mobile close */}
        <button
          className="ml-auto lg:hidden w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
          onClick={onMobileClose}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Role Badge */}
      {!collapsed && user && (
        <div className="px-4 py-2.5 border-b border-sidebar-border">
          <span className={cn('text-xs font-semibold rounded-full px-2.5 py-1 inline-block', ROLE_COLORS[user.role] || 'bg-primary/10 text-primary')}>
            {ROLE_LABELS[user.role] || user.role}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-2.5 space-y-0.5 overflow-y-auto">
        {allNav.map(({ icon: Icon, label, href }) => (
          <button
            key={`${href}-${label}`}
            onClick={() => handleNavClick(href)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left group',
              isActive(href)
                ? 'bg-primary text-white shadow-sm'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              collapsed && 'justify-center px-2'
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className={cn('flex-shrink-0', isActive(href) ? 'w-4 h-4 text-white' : 'w-4 h-4')} />
            {!collapsed && <span className="truncate">{label}</span>}
            {!collapsed && isActive(href) && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0" />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-2.5 border-t border-sidebar-border space-y-0.5">
        <button
          onClick={() => { onMobileClose(); navigate('/profile'); }}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-sidebar-foreground hover:bg-sidebar-accent text-left',
            collapsed && 'justify-center px-2',
            location.pathname === '/profile' && 'bg-sidebar-accent text-sidebar-accent-foreground'
          )}
          title={collapsed ? 'My Profile' : undefined}
        >
          <User className="w-4 h-4 flex-shrink-0" />
          {!collapsed && 'My Profile'}
        </button>
        <button
          onClick={() => { onMobileClose(); navigate('/settings'); }}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-sidebar-foreground hover:bg-sidebar-accent text-left',
            collapsed && 'justify-center px-2',
            location.pathname === '/settings' && 'bg-sidebar-accent text-sidebar-accent-foreground'
          )}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && 'Settings'}
        </button>
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-destructive hover:bg-destructive/10 text-left',
            collapsed && 'justify-center px-2'
          )}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && 'Sign Out'}
        </button>

        {/* User Card */}
        {!collapsed && user && (
          <div
            className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg bg-sidebar-accent cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => { onMobileClose(); navigate('/profile'); }}
          >
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-white text-xs font-bold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.ecoPoints.toLocaleString()} eco pts</p>
            </div>
          </div>
        )}

        {/* Collapse Toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-full items-center justify-center px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-sidebar-accent transition-colors mt-1 gap-1.5"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border min-h-screen sticky top-0 transition-all duration-300 flex-shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}>
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="relative z-50 flex flex-col bg-sidebar border-r border-sidebar-border w-72 max-w-[85vw] h-full overflow-y-auto shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
