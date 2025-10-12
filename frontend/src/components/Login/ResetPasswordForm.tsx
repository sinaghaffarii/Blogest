'use client';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useResetPassword } from '@/services/auth';

import { AuthCard } from './AuthCard';

interface ResetData {
  otp: string;
  newPassword: string;
}

export function ResetPasswordForm({
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
  } = useForm<ResetData>();
  const { mutate: resetPassword, isPending } = useResetPassword();

  const onSubmit = (data: ResetData) => {
    resetPassword(
      { email, otp: data.otp, newPassword: data.newPassword },
      {
        onSuccess: (res) => {
          if (res.status) {
            Swal.fire({
              icon: 'success',
              text: 'Password has been successfully changed.',
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
      title="Reset New Password"
      description="Enter your verification code and new password."
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

        <div className="grid gap-3">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            {...register('newPassword', {
              required: 'Password is required.',
              minLength: { value: 6, message: 'At least 6 characters' },
            })}
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? 'Processing...' : 'Change Password'}
        </Button>

        <Button type="button" variant="link" onClick={onBack}>
          Back
        </Button>
      </form>
    </AuthCard>
  );
}
