'use client';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
            Swal.fire({ icon: 'success', text: 'ایمیل شما تأیید شد.' });
            reset();
            onSuccess();
          }
        },
      },
    );
  };

  return (
    <AuthCard
      title="تأیید ایمیل"
      description="کد ارسال شده به ایمیل خود را وارد کنید."
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

        <Button disabled={isPending} type="submit">
          {isPending ? 'در حال پردازش...' : 'تأیید ایمیل'}
        </Button>

        <Button type="button" variant="link" onClick={onBack}>
          بازگشت
        </Button>
      </form>
    </AuthCard>
  );
}
