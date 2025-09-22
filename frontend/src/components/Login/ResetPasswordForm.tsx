'use client';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
              text: 'رمز عبور با موفقیت تغییر یافت.',
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
      title="تنظیم رمز عبور جدید"
      description="کد و رمز عبور جدید خود را وارد کنید."
    >
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label htmlFor="otp">کد تأیید</Label>
          <Input
            id="otp"
            type="text"
            {...register('otp', { required: 'کد تأیید الزامی است.' })}
          />
          {errors.otp && (
            <span className="text-red-500 text-sm">{errors.otp.message}</span>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="newPassword">رمز عبور جدید</Label>
          <Input
            id="newPassword"
            type="password"
            {...register('newPassword', {
              required: 'رمز عبور الزامی است.',
              minLength: { value: 6, message: 'حداقل ۶ کاراکتر' },
            })}
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? 'در حال پردازش...' : 'تغییر رمز عبور'}
        </Button>

        <Button type="button" variant="link" onClick={onBack}>
          بازگشت
        </Button>
      </form>
    </AuthCard>
  );
}
