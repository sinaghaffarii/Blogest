'use client';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/InputOtp';
import { useResetPassword } from '@/services/auth';

interface ResetPasswordFormProps {
  email: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function ResetPasswordForm({
  email,
  onBack,
  onSuccess,
}: ResetPasswordFormProps) {
  const { mutate: resetPassword, isPending } = useResetPassword();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeat) return toast.error('Passwords do not match');
    resetPassword(
      { email, otp, newPassword: password },
      {
        onSuccess: (res) => {
          if (res.status) {
            toast.success('Password successfully changed');
            onSuccess();
          } else {
            toast.error(res.message || 'Failed to reset password');
          }
        },
      },
    );
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-center">Reset Password</h2>

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot index={i} key={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
      />
      <Input
        type="password"
        value={repeat}
        onChange={(e) => setRepeat(e.target.value)}
        placeholder="Repeat new password"
      />

      <div className="flex items-center justify-end w-full gap-4">
        <Button disabled={isPending || otp.length < 6} type="submit">
          Reset Password
        </Button>
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </form>
  );
}
