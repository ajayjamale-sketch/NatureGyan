import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import logoImg from '@/assets/logo.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const roles = [
  { id: 'student', label: 'Student', emoji: '🎓' },
  { id: 'teacher', label: 'Educator', emoji: '👩‍🏫' },
  { id: 'researcher', label: 'Researcher', emoji: '🔬' },
  { id: 'enthusiast', label: 'Nature Enthusiast', emoji: '🦋' },
];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Please enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (!agreed) errs.agree = 'You must agree to the terms';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success('Account created!', { description: 'Welcome to NatureGyan. Start your learning journey!' });
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Registration failed');
    }
  };

  const pwdStrength = () => {
    if (!form.password) return 0;
    let score = 0;
    if (form.password.length >= 8) score++;
    if (/[A-Z]/.test(form.password)) score++;
    if (/[0-9]/.test(form.password)) score++;
    if (/[^A-Za-z0-9]/.test(form.password)) score++;
    return score;
  };
  const strength = pwdStrength();
  const strengthColors = ['', 'bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-green-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="min-h-screen flex">
      {/* Left Visual */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #14532d 0%, #166534 40%, #0c4a6e 100%)'
      }}>
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80"
          alt="Forest"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-40"
        />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logoImg} alt="NatureGyan" className="w-10 h-10 rounded-xl object-cover group-hover:scale-105 transition-transform" />
            <div className="leading-tight">
              <span className="font-bold text-xl text-white block leading-none">NatureGyan</span>
              <span className="text-[10px] text-white/40">AI for Nature Learning</span>
            </div>
          </Link>
          <div>
            <h2 className="text-3xl font-bold mb-4">Join 2.4M+ nature learners</h2>
            <p className="text-white/70 mb-8">Start your personalized environmental education journey today — completely free.</p>
            {['Free access to 20+ foundational courses', 'AI-powered species identification', 'Join eco-challenges & campaigns', 'Earn badges and certificates'].map(item => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-white/80">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-sm">© 2026 NatureGyan</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 bg-background overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Link to="/" className="flex items-center gap-2.5 mb-8 lg:hidden group">
            <img src={logoImg} alt="NatureGyan" className="w-9 h-9 rounded-xl object-cover" />
            <span className="font-bold text-xl text-foreground"><span className="text-primary">Nature</span>Gyan</span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Join the global nature learning community</p>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="mb-2 block">I am a...</Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, role: r.id }))}
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all text-left',
                    form.role === r.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-card-foreground hover:border-primary/40'
                  )}
                >
                  <span>{r.emoji}</span>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Aryan Kapoor"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={cn(errors.name && 'border-destructive')}
              />
              {errors.name && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={cn(errors.email && 'border-destructive')}
              />
              {errors.email && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className={cn('pr-10', errors.password && 'border-destructive')}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="flex gap-1 mt-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={cn('h-1 flex-1 rounded-full transition-colors', i <= strength ? strengthColors[strength] : 'bg-muted')} />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">{strengthLabels[strength]}</span>
                </div>
              )}
              {errors.password && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 accent-primary"
              />
              <label htmlFor="agree" className="text-sm text-muted-foreground leading-relaxed">
                I agree to NatureGyan's{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>
            {errors.agree && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.agree}</p>}

            <Button type="submit" className="w-full gradient-primary text-white h-11 font-semibold" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating account...</> : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
