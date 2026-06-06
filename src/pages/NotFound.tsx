import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, ArrowLeft , Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImg from '@/assets/logo.jpg';

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-lg">
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <img src={logoImg} alt="NatureGyan" className="w-10 h-10 rounded-xl object-cover" />
          <span className="font-bold text-xl text-foreground"><span className="text-primary">Nature</span>Gyan</span>
        </div>

        {/* Illustration */}
        <div className="flex justify-center text-8xl mb-6"><Leaf className="w-24 h-24 text-green-500" /></div>

        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Looks like this page wandered off into the wilderness. The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="gradient-primary text-white group" onClick={() => navigate('/')}>
            <Home className="w-4 h-4 mr-2" /> Back to Home
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Features', href: '/features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Contact', href: '/contact' },
          ].map(({ label, href }) => (
            <button
              key={label}
              onClick={() => navigate(href)}
              className="p-3 rounded-xl bg-muted/50 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
