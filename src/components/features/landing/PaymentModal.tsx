import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: number;
  yearly: boolean;
}

export function PaymentModal({ isOpen, onClose, planName, price, yearly }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Successfully subscribed to ${planName} plan!`);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            You are subscribing to the <span className="font-semibold text-foreground">{planName}</span> plan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border mb-2">
            <span className="text-sm font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-primary">
              {price === 0 ? 'Free' : `$${price}`}
              {price > 0 && <span className="text-sm text-muted-foreground font-normal">/{yearly ? 'year' : 'month'}</span>}
            </span>
          </div>
          
          {price > 0 && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="card">Card Number</Label>
                <Input id="card" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" type="password" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>Cancel</Button>
          <Button onClick={handlePayment} disabled={isProcessing} className="bg-primary text-white">
            {isProcessing ? 'Processing...' : (price === 0 ? 'Start for Free' : `Pay $${price}`)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
