import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import logoImg from '@/assets/logo.jpg';

const DEMO_ROLES = [
  { key: 'student', label: 'Student', emoji: '🎒', color: 'bg-green-500 hover:bg-green-600', desc: 'Courses & Eco-Challenges' },
  { key: 'teacher', label: 'Teacher', emoji: '🎓', color: 'bg-blue-500 hover:bg-blue-600', desc: 'Classroom & Analytics' },
  { key: 'researcher', label: 'Researcher', emoji: '🔬', color: 'bg-purple-500 hover:bg-purple-600', desc: 'Research & Publications' },
  { key: 'enthusiast', label: 'Enthusiast', emoji: '🦋', color: 'bg-amber-500 hover:bg-amber-600', desc: 'Species & Citizen Science' },
  { key: 'ngo', label: 'NGO / Org', emoji: '🌳', color: 'bg-teal-500 hover:bg-teal-600', desc: 'Campaigns & Volunteers' },
  { key: 'admin', label: 'Admin', emoji: '🛡️', color: 'bg-red-500 hover:bg-red-600', desc: 'Platform Management' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [bypassLoading, setBypassLoading] = useState<string | null>(null);
  const { login, loginAsRole, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success('Welcome back!', { description: 'You have signed in successfully.' });
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Sign in failed');
      setErrors({ password: result.error });
    }
  };

  const handleBypass = async (role: string) => {
    setBypassLoading(role);
    await loginAsRole(role);
    setBypassLoading(null);
    const demo = DEMO_ROLES.find(r => r.key === role);
    toast.success(`Signed in as ${demo?.label}!`, { description: 'Exploring the demo dashboard.' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 gradient-hero relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80"
          alt="Forest"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-30"
        />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logoImg} alt="NatureGyan" className="w-11 h-11 rounded-xl object-cover group-hover:scale-105 transition-transform shadow-lg" />
            <div className="leading-tight">
              <span className="font-bold text-xl text-white block leading-none">NatureGyan</span>
              <span className="text-[10px] text-white/50 leading-none">AI for Environmental Education</span>
            </div>
          </Link>
          <div>
            <h2 className="text-4xl font-bold mb-4 leading-tight text-white">
              Reconnect with the natural world
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-8">
              Your personalized journey through biodiversity, wildlife, and sustainability awaits.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '500+', label: 'Expert Courses' },
                { value: '2.4M+', label: 'Active Learners' },
                { value: '50K+', label: 'Species Database' },
                { value: '94%', label: 'Satisfaction Rate' },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl bg-white/10 px-4 py-3 border border-white/20">
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-white/60">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/40 text-xs">© 2026 NatureGyan. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-7/12 flex items-start justify-center overflow-y-auto py-8 px-6 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo + theme toggle */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2.5 lg:hidden group">
              <img src={logoImg} alt="NatureGyan" className="w-9 h-9 rounded-xl object-cover" />
              <span className="font-bold text-xl text-foreground leading-none">
                <span className="text-primary">Nature</span>Gyan
              </span>
            </Link>
            <button
              onClick={toggleTheme}
              className="ml-auto text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors text-xs flex items-center gap-1.5"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back</h1>
          <p className="text-muted-foreground mb-6 text-sm">Sign in to continue your learning journey</p>

          {/* Quick Demo Access */}
          <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Quick Demo Access</span>
              <span className="text-xs text-muted-foreground">— no credentials needed</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DEMO_ROLES.map(({ key, label, emoji, color, desc }) => (
                <button
                  key={key}
                  onClick={() => handleBypass(key)}
                  disabled={bypassLoading !== null}
                  className={cn(
                    'flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg text-white text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
                    color
                  )}
                >
                  {bypassLoading === key ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className="text-lg leading-none">{emoji}</span>
                  )}
                  <span className="font-semibold leading-none">{label}</span>
                  <span className="opacity-80 text-center leading-tight" style={{ fontSize: '10px' }}>{desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative text-center">
              <span className="text-xs text-muted-foreground bg-background px-3">or sign in with credentials</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-foreground text-sm font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={cn(errors.email && 'border-destructive focus-visible:ring-destructive')}
              />
              {errors.email && (
                <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground text-sm font-medium">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={cn('pr-10', errors.password && 'border-destructive focus-visible:ring-destructive')}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full gradient-primary text-white h-11 font-semibold text-sm" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</> : 'Sign In'}
            </Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative text-center">
              <span className="text-xs text-muted-foreground bg-background px-3">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { provider: 'Google', icon: '🌐' },
              { provider: 'GitHub', icon: '🐙' },
            ].map(({ provider, icon }) => (
              <Button
                key={provider}
                variant="outline"
                className="h-11 border-border text-foreground hover:bg-muted gap-2"
                onClick={() => toast.info(`${provider} login coming soon`)}
              >
                <span>{icon}</span> {provider}
              </Button>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
