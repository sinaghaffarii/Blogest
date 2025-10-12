'use client';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useVerifyEmail } from '@/services/auth';

import { AuthCard } from './AuthCard';

interface VerifyData {
  otp: string;
}

export function VerifyEmailForm({
  email,
  onSuccess,
  onBack,
}: {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VerifyData>();
  const { mutate: verifyEmail, isPending } = useVerifyEmail();

  const onSubmit = (data: VerifyData) => {
    verifyEmail(
      { email, otp: data.otp },
      {
        onSuccess: (res) => {
          if (res.status) {
            Swal.fire({
              icon: 'success',
              text: 'Your email has been verified.',
            });
            reset();
            onSuccess();
          }
        },
      },
    );
  };

  return (
    <AuthCard
      title="Verify Email"
      description="Enter the code sent to your email."
    >
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            type="text"
            {...register('otp', { required: 'Verification code is required.' })}
          />
          {errors.otp && (
            <span className="text-red-500 text-sm">{errors.otp.message}</span>
          )}
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? 'Processing...' : 'Verify Email'}
        </Button>

        <Button type="button" variant="link" onClick={onBack}>
          Back
        </Button>
      </form>
    </AuthCard>
  );
}
