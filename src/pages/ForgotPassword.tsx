import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import logoImg from '@/assets/logo.jpg';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted/20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 mb-10 justify-center group">
          <img src={logoImg} alt="NatureGyan" className="w-10 h-10 rounded-xl object-cover group-hover:scale-105 transition-transform" />
          <span className="font-bold text-2xl text-foreground"><span className="text-primary">Nature</span>Gyan</span>
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {!sent ? (
            <>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-center text-card-foreground mb-2">Forgot your password?</h1>
              <p className="text-center text-muted-foreground mb-8">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={cn(error && 'border-destructive')}
                  />
                  {error && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
                </div>

                <Button type="submit" className="w-full gradient-primary text-white h-11 font-semibold" disabled={loading}>
                  {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : 'Send Reset Link'}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 mx-auto">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-card-foreground mb-2">Check your inbox</h1>
              <p className="text-muted-foreground mb-2">
                We've sent a password reset link to
              </p>
              <p className="font-medium text-foreground mb-6">{email}</p>
              <p className="text-sm text-muted-foreground mb-6">
                Didn't receive the email? Check your spam folder or try again in a few minutes.
              </p>
              <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
                Try a different email
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 justify-center">
              <ArrowLeft className="w-3 h-3" /> Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
