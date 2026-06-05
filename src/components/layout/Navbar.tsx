import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown, LogOut, User, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logoImg from '@/assets/logo.jpg';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHeroPage = location.pathname === '/';
  const isTransparent = !scrolled && isHeroPage;

  const isActive = (href: string) =>
    location.pathname === href || (href !== '/' && location.pathname.startsWith(href));

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : isHeroPage ? 'bg-transparent' : 'bg-background/95 backdrop-blur-md border-b border-border'
      )}
    >
      <nav className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <img
            src={logoImg}
            alt="NatureGyan"
            className="w-9 h-9 rounded-xl object-cover shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105"
          />
          <div className="leading-tight">
            <span className="font-bold text-lg tracking-tight block leading-none">
              <span className={isTransparent ? 'text-green-400' : 'text-primary'}>Nature</span>
              <span className={isTransparent ? 'text-white' : 'text-foreground'}>Gyan</span>
            </span>
            <span className={`text-[9px] leading-none hidden sm:block ${isTransparent ? 'text-white/50' : 'text-muted-foreground'}`}>AI for Environmental Education</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive(link.href)
                  ? isTransparent ? 'text-green-400 bg-white/10' : 'text-primary bg-primary/10'
                  : isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className={cn(
              'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
              isTransparent
                ? 'text-white/70 hover:text-white hover:bg-white/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn('flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors', isTransparent ? 'hover:bg-white/10' : 'hover:bg-muted')}>
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-white text-xs font-bold">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className={cn('hidden sm:block text-sm font-medium max-w-[100px] truncate', isTransparent ? 'text-white' : 'text-foreground')}>{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2.5">
                  <p className="font-semibold text-sm truncate text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  <p className="text-xs text-primary font-medium mt-0.5 capitalize">{user.role}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                  <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={isTransparent ? 'text-white hover:bg-white/10 hover:text-white' : 'text-foreground hover:bg-muted'}
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button size="sm" className="gradient-primary text-white hover:opacity-90 shadow-sm" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className={cn('md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors', isTransparent ? 'text-white hover:bg-white/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
                <Button variant="outline" className="border-border text-foreground" onClick={() => navigate('/login')}>Sign In</Button>
                <Button className="gradient-primary text-white" onClick={() => navigate('/register')}>Get Started Free</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-0.5 mt-3 pt-3 border-t border-border">
                <Link to="/dashboard" className="px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/profile" className="px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted flex items-center gap-2">
                  <User className="w-4 h-4" /> Profile
                </Link>
                <button onClick={handleLogout} className="px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 flex items-center gap-2 text-left">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
