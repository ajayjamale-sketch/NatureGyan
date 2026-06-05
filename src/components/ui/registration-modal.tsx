import { useState } from 'react';
import { User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export type RegistrationType = 'course' | 'event' | 'community';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: RegistrationType;
  item?: any;
  onSuccess?: () => void;
}

export function RegistrationModal({ isOpen, onClose, type, item, onSuccess }: RegistrationModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTitle = () => {
    if (type === 'course') return 'Enroll in Course';
    if (type === 'event') return 'Register for Event';
    return 'Join Eco Community';
  };

  const getDescription = () => {
    if (type === 'course') return `Enroll in ${item?.title || 'this course'} and start learning today.`;
    if (type === 'event') return `Register for ${item?.name || 'this event'} and participate in community action.`;
    return 'Join our global network of changemakers and make an impact.';
  };

  const getSuccessMessage = () => {
    if (type === 'course') return `Successfully enrolled in ${item?.title || 'the course'}!`;
    if (type === 'event') return `Successfully registered for ${item?.name || 'the event'}!`;
    return `Welcome to the Eco Community! 🌍`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error('Please agree to the terms');
      return;
    }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setIsSubmitting(false);
    if (onSuccess) onSuccess();
    toast.success(getSuccessMessage());
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agree"
              checked={formData.agree}
              onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
              className="mt-1"
            />
            <label htmlFor="agree" className="text-xs text-muted-foreground">
              I agree to the terms of service and I'm excited to be part of this sustainable journey! 🌱
            </label>
          </div>
          
          <Button type="submit" className="w-full gradient-primary text-white" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : (type === 'course' ? 'Enroll Now' : type === 'event' ? 'Register' : 'Join Community')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
