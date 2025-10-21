'use client';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForgotPassword } from '@/services/auth';

interface ForgotPasswordFormProps {
  onBack: () => void;
  onSuccess: (email: string) => void;
}

export function ForgotPasswordForm({
  onBack,
  onSuccess,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const { mutate: forgetPassword, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgetPassword(
      { email },
      {
        onSuccess: (res) => {
          if (res.status) {
            toast.success('OTP sent to your email');
            onSuccess(email);
          } else {
            toast.error(res.message || 'Failed to send OTP');
          }
        },
      },
    );
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-center">Forgot Password</h2>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <div className="flex items-center justify-end w-full gap-4">
        <Button disabled={isPending} type="submit">
          Send OTP
        </Button>
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </form>
  );
}
