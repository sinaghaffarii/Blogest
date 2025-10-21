'use client';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/InputOtp';
import useOtpTimer from '@/hooks/useOtpTimer';
import { useVerifyEmail } from '@/services/auth';

interface VerifyOtpFormProps {
  email: string;
  onBack: () => void;
  onSuccess: () => void;
}

export default function VerifyOtpForm({
  email,
  onBack,
  onSuccess,
}: VerifyOtpFormProps) {
  const [otp, setOtp] = useState('');
  const { timeLeft, formatTime, expired } = useOtpTimer(10);
  const { mutate: verifyOtp, isPending } = useVerifyEmail();

  const handleVerify = () => {
    verifyOtp(
      { email, otp },
      {
        onSuccess: (res: { status: any; message: string }) => {
          if (res.status) {
            toast.success('Email verified successfully!');
            onSuccess();
          } else {
            toast.error(res.message);
          }
        },
        onError: () => toast.error('Invalid or expired OTP.'),
      },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Verify your email</DialogTitle>
        <DialogDescription>
          Enter the 6-digit code we sent to <strong>{email}</strong>.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center gap-3">
        <InputOTP
          disabled={isPending}
          maxLength={6}
          value={otp}
          onChange={setOtp}
          onComplete={() => handleVerify()}
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot index={i} key={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        {expired ? (
          <p className="text-sm text-red-500">OTP expired</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Expires in {formatTime(timeLeft)}
          </p>
        )}
      </div>

      <DialogFooter className="flex justify-between">
        <Button className="me-auto p-0 text-sm" variant="link" onClick={onBack}>
          Back to login
        </Button>
      </DialogFooter>
    </div>
  );
}
