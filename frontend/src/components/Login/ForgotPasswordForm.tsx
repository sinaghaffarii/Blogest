'use client';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useForgotPassword } from '@/services/auth';

import { AuthCard } from './AuthCard';

interface ForgotData {
  email: string;
}

export function ForgotPasswordForm({
  onSuccess,
  onBack,
}: {
  onSuccess: (email: string) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotData>();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onSubmit = (data: ForgotData) => {
    forgotPassword(
      { email: data.email },
      {
        onSuccess: (res) => {
          if (res.status) {
            Swal.fire({ icon: 'success', text: 'ایمیل بازیابی ارسال شد.' });
            reset();
            onSuccess(data.email);
          }
        },
      },
    );
  };

  return (
    <AuthCard title="بازیابی رمز عبور" description="ایمیل خود را وارد کنید.">
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label htmlFor="email">ایمیل</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'ایمیل الزامی است.' })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? 'در حال پردازش...' : 'ارسال لینک بازیابی'}
        </Button>

        <Button type="button" variant="link" onClick={onBack}>
          بازگشت
        </Button>
      </form>
    </AuthCard>
  );
}
